// Records what a website renders, as raw facts for references/brand-import.md:
// colors by role, CSS custom properties, the type of each text role, corner radii,
// logo candidates (saved as files, from what the page loaded) and two screenshots.
// It reads the site; it never decides the brand.
//   node scripts/extract-site.mjs <url> [<url> …] --out <dir> [--allow-private]
// Writes <dir>/site-facts.json, <dir>/site-<n>.png (first screen) and
// <dir>/site-<n>-full.png (whole page, up to 8000px). Give 1–3 URLs of one site:
// the home page, plus a company or product page.
// Needs Playwright: PLAYWRIGHT_MODULE=/path/to/node_modules/playwright/index.mjs

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { lookup } from 'node:dns';
import http from 'node:http';
import https from 'node:https';
import { BlockList, isIP } from 'node:net';

// True for a public unicast address. IPv6 is allowed only in global unicast (2000::/3) outside
// the ranges that embed or tunnel an IPv4 address; IPv4 must miss every special-purpose range.
const BLOCKED_V4 = new BlockList();
for (const [net, bits] of [['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16],
  ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15],
  ['198.51.100.0', 24], ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4]]) BLOCKED_V4.addSubnet(net, bits, 'ipv4');
const GLOBAL_V6 = new BlockList();
GLOBAL_V6.addSubnet('2000::', 3, 'ipv6');
const BLOCKED_V6 = new BlockList();
for (const [net, bits] of [['2001::', 32], ['2001:db8::', 32], ['2002::', 16]]) BLOCKED_V6.addSubnet(net, bits, 'ipv6');
function publicAddress(a) {
  a = String(a).replace(/^\[|\]$/g, '').replace(/%.*$/, '');
  const kind = isIP(a);
  if (kind === 4) return !BLOCKED_V4.check(a, 'ipv4');
  if (kind === 6) return GLOBAL_V6.check(a, 'ipv6') && !BLOCKED_V6.check(a, 'ipv6');
  return false;
}
// Every request of the page is made here, not by the browser: the name is resolved once, every
// address is checked, and the connection goes to the checked address. A name that answers
// differently on a second lookup (DNS rebinding) never gets that second lookup.
function checkedLookup(hostname, options, cb) {
  lookup(hostname, { all: true, verbatim: true }, (err, list) => {
    if (err) return cb(err);
    if (!list.length || !list.every(({ address }) => publicAddress(address))) {
      return cb(Object.assign(new Error(`${hostname} is not a public address`), { code: 'EBLOCKED' }));
    }
    return options.all ? cb(null, list) : cb(null, list[0].address, list[0].family);
  });
}
const MAX_BODY = 25_000_000;
// One request, then its redirects, each hop through checkedLookup. Chromium follows a redirect
// from a fulfilled response without routing it again, so redirects never reach the browser.
function send(url, { method = 'GET', headers = {}, body = null, allowPrivate = false } = {}, hops = 0) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    if (!/^https?:$/.test(u.protocol)) return reject(new Error(`blocked scheme ${u.protocol}`));
    const host = u.hostname.replace(/^\[|\]$/g, '');
    if (!allowPrivate && isIP(host) && !publicAddress(host)) return reject(new Error(`${host} is not a public address`));
    const h = { ...headers, host: u.host, 'accept-encoding': 'identity' };
    const r = (u.protocol === 'https:' ? https : http).request(u, {
      method, headers: h, timeout: 20000, ...(allowPrivate ? {} : { lookup: checkedLookup }),
    }, res => {
      const location = res.headers.location;
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && location) {
        res.resume();
        if (hops >= 5) return reject(new Error('too many redirects'));
        const keep = [307, 308].includes(res.statusCode);
        return send(new URL(location, u).href, { method: keep ? method : 'GET', headers, body: keep ? body : null, allowPrivate }, hops + 1).then(resolve, reject);
      }
      const chunks = [];
      let size = 0;
      res.on('data', c => { size += c.length; if (size > MAX_BODY) res.destroy(new Error('response too large')); else chunks.push(c); });
      res.on('error', reject);
      res.on('end', () => resolve({ url: u.href, status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
    });
    r.on('timeout', () => r.destroy(new Error('timeout')));
    r.on('error', reject);
    if (body) r.write(body);
    r.end();
  });
}
async function fetchFor(route, allowPrivate) {
  const req = route.request();
  if (/^(data|blob):/.test(req.url())) return route.continue();
  try {
    const headers = Object.fromEntries(Object.entries(await req.allHeaders()).filter(([k]) => !k.startsWith(':') && k !== 'host'));
    const res = await send(req.url(), { method: req.method(), headers, body: req.postDataBuffer(), allowPrivate });
    const h = {};
    for (const [k, v] of Object.entries(res.headers)) {
      if (!/^(content-encoding|content-length|transfer-encoding|connection|location)$/i.test(k)) h[k] = Array.isArray(v) ? v.join('\n') : String(v);
    }
    await route.fulfill({ status: res.status, headers: h, body: res.body });
  } catch {
    await route.abort('blockedbyclient').catch(() => {});
  }
}

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const args = process.argv.slice(2);
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : null;
const urls = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--out');
// --allow-private lets the page reach private addresses: only for the user's own staging site.
const allowPrivate = args.includes('--allow-private');
if (!out || !urls.length) throw new Error('usage: extract-site.mjs <url> [<url> …] --out <dir> [--allow-private]');
for (const u of urls) if (!/^https?:\/\//.test(u)) throw new Error(`not an http(s) URL: ${u}`);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'ja-JP', reducedMotion: 'reduce', serviceWorkers: 'block' });
// Requests the route cannot see: service workers are blocked above, WebSockets are closed here.
await context.routeWebSocket(/.*/, ws => ws.close());
await context.route('**/*', route => fetchFor(route, allowPrivate));
// The sanitizer runs in its own blank page, where no script from the site can reach its builtins.
const sanitizer = await (await browser.newContext()).newPage();
await sanitizer.goto('about:blank');
const sites = [];

for (const [i, url] of urls.entries()) {
  const page = await context.newPage();
  // Logo files come from what the page loaded, through fetchFor; no request is made for them.
  const images = new Map();
  page.on('response', r => { if (r.request().resourceType() === 'image' && r.ok()) images.set(r.url(), r); });
  // Resolve the page's own redirects first, so the browser opens the final URL and relative
  // links resolve against it.
  const target = await send(url, { allowPrivate }).catch(e => { throw new Error(`cannot open ${url}: ${e.message}${allowPrivate ? '' : ' (use --allow-private for your own staging site)'}`); });
  await page.goto(target.url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => page.waitForLoadState('load'));
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

  // Site SVG is untrusted markup: it is rebuilt from an allowlist in the browser before saving.
  for (const [k, l] of facts.logos.entries()) {
    let ext = 'svg', data;
    if (l.kind === 'img') {
      const res = l.src && images.get(l.src);
      if (!res) continue;
      ext = (res.headers()['content-type'] ?? '').match(/image\/(svg|png|jpe?g|webp|gif)/)?.[1].replace('jpeg', 'jpg');
      const body = await res.body().catch(() => null);
      if (!ext || !body || body.length > 2_000_000) continue;
      data = ext === 'svg' ? body.toString('utf8') : body;
    } else {
      data = l.markup;
      delete l.markup;
    }
    if (ext === 'svg') data = await sanitizer.evaluate(cleanSvg, String(data).slice(0, 500_000));
    if (!data) continue;
    l.file = `site-${n}-logo-${k + 1}.${ext}`;
    writeFileSync(join(out, l.file), data);
  }
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

// Runs in the page: parses SVG markup and rebuilds it from allowed elements and attributes.
// References survive only as fragments (#id), in attributes and in CSS.
function cleanSvg(markup) {
  const ELEMENTS = new Set(['svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'text', 'tspan',
    'defs', 'clippath', 'mask', 'lineargradient', 'radialgradient', 'stop', 'use', 'symbol', 'title', 'desc', 'style']);
  const ATTRS = /^(id|class|d|x|y|x1|y1|x2|y2|cx|cy|r|rx|ry|width|height|viewbox|points|transform|fill|fill-rule|fill-opacity|stroke|stroke-width|stroke-linecap|stroke-linejoin|stroke-miterlimit|stroke-dasharray|stroke-opacity|opacity|clip-path|clip-rule|mask|offset|stop-color|stop-opacity|gradientunits|gradienttransform|font-family|font-size|font-weight|text-anchor|letter-spacing|preserveaspectratio|xmlns|style|href|xlink:href|aria-label|role)$/i;
  // CSS keeps url(#id) only. Anything that could still load or escape (another url(), a CSS
  // escape, image-set, @import, @font-face, markup) empties the whole value instead of patching it.
  const css = t => {
    const kept = t.replace(/url\(\s*(['"]?)#([\w-]+)\1\s*\)/gi, '\u0001$2\u0002');
    if (/url\s*\(|\\|image-set|@import|@font-face|expression|[<>]/i.test(kept)) return '';
    return kept.replace(/\u0001([\w-]+)\u0002/g, 'url(#$1)');
  };
  const doc = new DOMParser().parseFromString(markup, 'image/svg+xml');
  const root = doc.documentElement;
  if (!root || root.nodeName.toLowerCase() !== 'svg' || doc.querySelector('parsererror')) return null;
  const NS = 'http://www.w3.org/2000/svg';
  const out = document.implementation.createDocument(NS, 'svg', null);
  const copy = (src, dst) => {
    for (const attr of src.attributes ?? []) {
      const name = attr.name, value = attr.value;
      if (!ATTRS.test(name)) continue;
      if (/href$/i.test(name) && !/^#[\w-]+$/.test(value.trim())) continue;
      if (name === 'style') { dst.setAttribute('style', css(value)); continue; }
      if (name === 'xmlns') continue;
      if (/^(fill|stroke|clip-path|mask)$/i.test(name) && /url\(/i.test(value)) { dst.setAttribute(name, css(value)); continue; }
      if (name === 'xlink:href') dst.setAttribute('href', value.trim());
      else dst.setAttribute(name, value);
    }
    for (const child of src.childNodes) {
      if (child.nodeType === 3) {
        dst.appendChild(out.createTextNode(dst.nodeName === 'style' ? css(child.textContent) : child.textContent));
      } else if (child.nodeType === 4 && dst.nodeName === 'style') {
        dst.appendChild(out.createTextNode(css(child.textContent)));
      } else if (child.nodeType === 1 && ELEMENTS.has(child.nodeName.toLowerCase())) {
        const tag = { clippath: 'clipPath', lineargradient: 'linearGradient', radialgradient: 'radialGradient' }[child.nodeName.toLowerCase()] ?? child.nodeName.toLowerCase();
        copy(child, dst.appendChild(out.createElementNS(NS, tag)));
      }
    }
  };
  copy(root, out.documentElement);
  // Prefix ids so a pasted logo cannot shadow the deck's own ids or globals (DOM clobbering).
  const ids = new Set([...out.querySelectorAll('[id]')].map(e => e.id));
  const ref = v => v.replace(/#([\w-]+)/g, (m, id) => (ids.has(id) ? `#logo-${id}` : m));
  for (const el of out.querySelectorAll('*')) {
    if (el.id) el.id = `logo-${el.id}`;
    for (const a of ['href', 'style', 'fill', 'stroke', 'clip-path', 'mask']) if (el.hasAttribute(a)) el.setAttribute(a, ref(el.getAttribute(a)));
    if (el.localName === 'style') el.textContent = ref(el.textContent);
  }
  const result = new XMLSerializer().serializeToString(out);
  // The file may later be pasted into HTML. Parse the result the way the HTML parser does and
  // refuse it if anything outside the allowlist appears there.
  const check = document.implementation.createHTMLDocument('').createElement('div');
  check.innerHTML = result;
  for (const el of check.querySelectorAll('*')) {
    if (!ELEMENTS.has(el.localName.toLowerCase()) || el.namespaceURI !== NS) return null;
    for (const { name, value } of el.attributes) {
      if (!ATTRS.test(name) || /^on/i.test(name)) return null;
      if (/href$/i.test(name) && !/^#[\w-]+$/.test(value)) return null;
      if (/url\s*\(/i.test(value) && css(value) !== value) return null;
    }
    if (el.localName === 'style' && css(el.textContent) !== el.textContent) return null;
  }
  return result;
}
