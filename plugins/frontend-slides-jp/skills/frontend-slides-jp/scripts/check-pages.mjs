// Checks a doc-a4 document against the page rules in references/document-pages.md
// by rendering it: page size, the page frame, text that leaves its page or is clipped,
// a diagram id on .page, and text set below note or body size.
//   node scripts/check-pages.mjs <file.html> [<file.html> …] [--phone]
// Errors break a rule; warnings need a look at the screenshot. Exits 1 on any error.
// Needs Playwright: PLAYWRIGHT_MODULE=/path/to/node_modules/playwright/index.mjs

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const files = process.argv.slice(2).filter(a => !a.startsWith('--'));
if (!files.length) throw new Error('usage: check-pages.mjs <file.html> [<file.html> …] [--phone]');
// --phone renders as a phone (Pixel 7), where the column is zoomed to about 0.3 and Chrome
// rounds line boxes; text that only overflows there shows up as an error too.
const phone = process.argv.includes('--phone');

const formats = JSON.parse(readFileSync(fileURLToPath(new URL('../formats.json', import.meta.url)), 'utf8'));
const { width: W, height: H } = formats['doc-a4'].stage;

const browser = await chromium.launch();
let failed = false;

for (const file of files) {
  // W + 32 keeps the column fit at zoom 1, so every rect is in page px.
  const { devices } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
  const page = await browser.newPage(phone ? { ...devices['Pixel 7'], reducedMotion: 'reduce' } : { viewport: { width: W + 32, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(`script error: ${e}`));
  await page.goto('file://' + resolve(file), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const result = await page.evaluate(({ W, H, phone }) => {
    const errors = [], warnings = [];
    const pages = [...document.querySelectorAll('.page')];
    if (pages.length < 1) errors.push('no .page sections');
    const digits = /[0-9０-９〇一二三四五六七八九十]/;

    // Elements that hold visible text of their own.
    const ownText = el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    const visible = (el, r) => {
      if (r.width < 1 || r.height < 1) return false;
      const cs = getComputedStyle(el);
      return cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0;
    };

    pages.forEach((pg, i) => {
      const n = i + 1;
      const box = pg.getBoundingClientRect();
      // On a phone the page is drawn smaller; k turns screen px back into page px.
      const k = phone ? box.width / W : 1;
      if (!phone && (Math.round(box.width) !== W || Math.round(box.height) !== H)) {
        errors.push(`page ${n}: ${Math.round(box.width)}×${Math.round(box.height)}, not ${W}×${H}`);
      }
      if (/^d-/.test(pg.id)) errors.push(`page ${n}: id="${pg.id}" sits on .page; put it on a wrapper around the figure`);

      const texts = [...pg.querySelectorAll('*')].filter(ownText).map(el => {
        const r = el.getBoundingClientRect();
        return { el, r, x: (r.left - box.left) / k, y: (r.top - box.top) / k, right: (r.right - box.left) / k, bottom: (r.bottom - box.top) / k };
      }).filter(t => visible(t.el, t.r));

      for (const t of texts) {
        if (t.x < -1 || t.y < -1 || t.right > W + 1 || t.bottom > H + 1) {
          const s = t.el.textContent.trim().slice(0, 24);
          errors.push(`page ${n}: text leaves the page at (${Math.round(t.x)}, ${Math.round(t.y)}): "${s}"`);
        }
      }
      for (const el of pg.querySelectorAll('*')) {
        const cs = getComputedStyle(el);
        if (!/hidden|clip/.test(cs.overflow) || !el.textContent.trim() || el.closest('svg')) continue;
        if (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2) {
          warnings.push(`page ${n}: text may be clipped in <${el.tagName.toLowerCase()} class="${el.className}">`);
        }
      }

      // The cover carries no frame; every other page has a running head and a folio.
      if (i > 0) {
        // A vertical page (tategumi) may set its running head down the outer edge instead.
        const head = t => (t.bottom <= 220 && t.y >= 0)
          || (/vertical/.test(getComputedStyle(t.el).writingMode) && (t.right <= 220 || t.x >= W - 220));
        if (!texts.some(head)) errors.push(`page ${n}: no running head in the top 220px or down the outer edge`);
        if (!texts.some(t => t.y >= H - 220 && t.bottom <= H && digits.test(t.el.textContent))) {
          errors.push(`page ${n}: no folio (a page number) in the bottom 220px`);
        }
      }

      // Notes and sources stay at 17px or more; body text is not shrunk to fit.
      for (const p of pg.querySelectorAll('p')) {
        const size = parseFloat(getComputedStyle(p).fontSize);
        const text = p.textContent.replace(/\s+/g, '');
        if (p.closest('svg') || [...p.querySelectorAll('*')].some(c => parseFloat(getComputedStyle(c).fontSize) >= 20)) continue;
        if (size < 17 && text.length >= 20) warnings.push(`page ${n}: text at ${size}px ("${text.slice(0, 16)}…"); notes and sources are 17–18px`);
        else if (size < 20 && text.length >= 160) warnings.push(`page ${n}: ${text.length} characters at ${size}px ("${text.slice(0, 16)}…"); body text is 22–24px`);
      }
    });
    return { pages: pages.length, errors, warnings };
  }, { W, H, phone });

  result.errors.unshift(...errors);
  if (result.errors.length) failed = true;
  console.log(JSON.stringify({ file, ...result }));
  await page.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
