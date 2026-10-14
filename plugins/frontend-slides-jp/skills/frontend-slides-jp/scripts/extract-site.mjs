// Records what a website renders, as raw facts for references/brand-import.md:
// colors by role, CSS custom properties, the type of each text role, corner radii,
// logo candidates (saved as files) and two screenshots. It reads the site; it never
// decides the brand.
//   node scripts/extract-site.mjs <url> [<url> …] --out <dir>
// Writes <dir>/site-facts.json, <dir>/site-<n>.png (first screen) and
// <dir>/site-<n>-full.png (whole page, up to 8000px). Give 1–3 URLs of one site:
// the home page, plus a company or product page.
// Needs Playwright: PLAYWRIGHT_MODULE=/path/to/node_modules/playwright/index.mjs

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const args = process.argv.slice(2);
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : null;
const urls = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--out');
if (!out || !urls.length) throw new Error('usage: extract-site.mjs <url> [<url> …] --out <dir>');
for (const u of urls) if (!/^https?:\/\//.test(u)) throw new Error(`not an http(s) URL: ${u}`);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'ja-JP', reducedMotion: 'reduce' });
const sites = [];

for (const [i, url] of urls.entries()) {
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => page.waitForLoadState('load'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  const n = i + 1;
  await page.screenshot({ path: join(out, `site-${n}.png`) });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.screenshot({ path: join(out, `site-${n}-full.png`), fullPage: true, clip: { x: 0, y: 0, width: 1440, height: Math.min(height, 8000) } });

  const facts = await page.evaluate(() => {
    const hex = c => {
      const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
      if (!m || (m[4] !== undefined && Number(m[4]) < 0.5)) return null;
      return '#' + m.slice(1, 4).map(v => Math.round(Number(v)).toString(16).padStart(2, '0')).join('').toUpperCase();
    };
    const sat = h => {
      const [r, g, b] = [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16) / 255);
      const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
      return { s: max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1)), l };
    };
    const tally = () => new Map();
    const add = (map, key, w) => key && map.set(key, (map.get(key) ?? 0) + w);
    const text = tally(), bg = tally(), border = tally(), accent = tally();
    const radii = tally();
    let largest = null;

    for (const el of document.body.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.3) continue;
      const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('');
      if (own) add(text, hex(cs.color), own.length * parseFloat(cs.fontSize));
      const b = hex(cs.backgroundColor);
      if (b) add(bg, b, r.width * r.height);
      if (parseFloat(cs.borderTopWidth) > 0) add(border, hex(cs.borderTopColor), r.width);
      // Accent: a saturated color on something a visitor acts on or is told to look at.
      const action = el.matches('a, button, [role="button"], input[type="submit"], .btn, [class*="button"]');
      for (const c of [b, own ? hex(cs.color) : null]) {
        if (!c) continue;
        const { s, l } = sat(c);
        if (s > 0.35 && l > 0.15 && l < 0.85) add(accent, c, action ? 3 : 1);
      }
      if (action && cs.borderRadius !== '0px') add(radii, parseFloat(cs.borderRadius) >= 999 ? 'pill' : cs.borderRadius, 1);
      if (own && (!largest || parseFloat(cs.fontSize) > parseFloat(getComputedStyle(largest).fontSize))) largest = el;
    }
    const top = (map, k = 8) => {
      const total = [...map.values()].reduce((a, b) => a + b, 0) || 1;
      return [...map].sort((a, b) => b[1] - a[1]).slice(0, k).map(([hex, w]) => ({ hex, share: Math.round((w / total) * 1000) / 10 }));
    };

    // Custom properties from same-origin sheets; cross-origin sheets cannot be read.
    const vars = {};
    for (const sheet of document.styleSheets) {
      let rules;
      try { rules = sheet.cssRules; } catch { continue; }
      for (const rule of rules ?? []) {
        if (!rule.style || !/^(:root|html|body)$/.test(rule.selectorText ?? '')) continue;
        for (const name of rule.style) {
          if (!name.startsWith('--')) continue;
          const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || rule.style.getPropertyValue(name).trim();
          if (/#[0-9a-f]{3,8}\b|rgb|hsl|oklch|font|serif|sans|gothic|mincho|px|rem/i.test(value + name)) vars[name] = value;
        }
      }
    }

    const type = sel => {
      const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
      if (!el) return null;
      const cs = getComputedStyle(el);
      return { selector: typeof sel === 'string' ? sel : sel.tagName.toLowerCase() + (sel.className ? '.' + String(sel.className).split(' ')[0] : ''), family: cs.fontFamily, weight: cs.fontWeight, size: cs.fontSize, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, sample: el.textContent.trim().slice(0, 40) };
    };
    // h1 is often the logo; the largest text on the page is the display type.
    const roles = {
      display: type(largest),
      h1: type('h1'), h2: type('h2'), h3: type('h3'),
      body: type('main p, article p, p'), link: type('nav a, header a'), button: type('button, .btn, a[class*="button"]'),
    };
    const loaded = [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/"/g, '')))];
    const fontServices = [...document.querySelectorAll('link[href], script[src]')]
      .map(e => e.href || e.src)
      .filter(u => /fonts\.googleapis|typekit|use\.adobe|fontplus|typesquare|morisawa|fontawesome|webfont/i.test(u));

    const abs = u => { try { return new URL(u, location.href).href; } catch { return null; } };
    const logos = [];
    for (const el of document.querySelectorAll('header img, header svg, img, svg, a[href="/"] img')) {
      // A logo sits in the header or footer and says so in its own names, or is the home link there.
      const id = [el.id, el.getAttribute('class'), el.getAttribute('src'), el.closest('a')?.getAttribute('class')].join(' ');
      const frame = !!el.closest('header, footer, nav, [class*="header"], [class*="footer"]');
      const home = !!el.closest('a[href="/"], a[href="./"], a[href="' + location.origin + '/"]');
      if (!frame || !(/logo|brand/i.test(id) || home)) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 16 || logos.some(l => (l.src && l.src === abs(el.currentSrc || el.src)) || (l.markup && l.markup === el.outerHTML.slice(0, 20000)))) continue;
      logos.push(el.tagName === 'IMG'
        ? { kind: 'img', src: abs(el.currentSrc || el.src), alt: el.alt, width: Math.round(r.width), height: Math.round(r.height) }
        : { kind: 'svg', markup: el.outerHTML.slice(0, 20000), width: Math.round(r.width), height: Math.round(r.height) });
      if (logos.length >= 4) break;
    }
    const meta = n => document.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.content ?? null;
    const icons = [...document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]')].map(l => abs(l.href));

    return {
      title: document.title, lang: document.documentElement.lang || null, description: meta('description'),
      colors: { text: top(text), background: top(bg), border: top(border, 5), accent: top(accent, 6) },
      cssVariables: vars, type: roles, fontsLoaded: loaded, fontServices,
      radii: [...radii].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([v, c]) => ({ value: v, count: c })),
      logos, icons, ogImage: meta('og:image') ? abs(meta('og:image')) : null,
    };
  });

  // Logo files are fetched from this machine, so only from public hosts, without redirects,
  // and only as images. SVG from the site is untrusted markup: it is cleaned before saving.
  for (const [k, l] of facts.logos.entries()) {
    if (l.kind !== 'img' || !l.src || !(await publicHost(l.src))) continue;
    const res = await page.request.get(l.src, { maxRedirects: 0, timeout: 15000 }).catch(() => null);
    if (!res?.ok()) continue;
    const ext = (res.headers()['content-type'] ?? '').match(/image\/(svg|png|jpe?g|webp|gif)/)?.[1].replace('jpeg', 'jpg');
    const body = await res.body();
    if (!ext || body.length > 2_000_000) continue;
    l.file = `site-${n}-logo-${k + 1}.${ext}`;
    writeFileSync(join(out, l.file), ext === 'svg' ? cleanSvg(body.toString('utf8')) : body);
  }
  facts.logos.forEach((l, k) => {
    if (l.kind !== 'svg') return;
    const file = `site-${n}-logo-${k + 1}.svg`;
    const svg = l.markup.includes('xmlns') ? l.markup : l.markup.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    writeFileSync(join(out, file), cleanSvg(svg));
    l.file = file;
    delete l.markup;
  });
  sites.push({ url, screenshot: `site-${n}.png`, fullPage: `site-${n}-full.png`, ...facts });
  await page.close();
}

await browser.close();
const result = {
  note: 'What the site renders, not a brand guide. Shares are relative weights (text by length × size, backgrounds by area). Verify every value against a screenshot before using it.',
  extracted: new Date().toISOString(),
  sites,
};
writeFileSync(join(out, 'site-facts.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ out, sites: sites.map(s => ({ url: s.url, title: s.title, accent: s.colors.accent.slice(0, 3), h1: s.type.h1?.family, logos: s.logos.length })) }));

// True when every address the host resolves to is public (not loopback, private or link-local).
async function publicHost(url) {
  let host;
  try {
    const u = new URL(url);
    if (!/^https?:$/.test(u.protocol)) return false;
    host = u.hostname.replace(/^\[|\]$/g, '');
  } catch { return false; }
  const addrs = isIP(host) ? [{ address: host }] : await lookup(host, { all: true }).catch(() => []);
  if (!addrs.length) return false;
  return addrs.every(({ address: a }) => !(
    /^(0\.|10\.|127\.|169\.254\.|192\.168\.)/.test(a) || /^172\.(1[6-9]|2\d|3[01])\./.test(a)
    || /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(a)
    || /^(::1?$|f[cd]|fe[89ab]|::ffff:(0|10|127|169\.254|192\.168)\.)/i.test(a)));
}

// Strip what can run or reach out from an SVG: scripts, embedded documents, event handlers,
// @import, and references that are not fragments or inline images. Style blocks stay:
// logos often set their fills there.
function cleanSvg(svg) {
  return svg
    .replace(/<(script|foreignObject|iframe|object|embed)\b[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<(script|foreignObject|iframe|object|embed)\b[^>]*\/?>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s+(xlink:)?href\s*=\s*("(?!#|data:image\/(png|jpe?g|gif|webp);)[^"]*"|'(?!#|data:image\/(png|jpe?g|gif|webp);)[^']*')/gi, '')
    .replace(/@import[^;]*;?/gi, '')
    .replace(/url\(\s*['"]?(?!#)[^)]*\)/gi, 'none');
}
