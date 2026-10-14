// Screenshots every .slide of a deck, or every .page of a doc-a4 document,
// one image each. The format comes from the file: .page without .slide is doc-a4.
//   node scripts/shoot.mjs <file.html> --out <dir> [--width N] [--phone] [--jpg]
// --width sets the image width (the stage always renders at its formats.json size).
// --phone renders in a 390×844 viewport instead, to check the stage scales as a whole.
// Prints page errors, console warnings and the families that loaded. Needs Playwright:
//   PLAYWRIGHT_MODULE=/path/to/node_modules/playwright/index.mjs

import { mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const args = process.argv.slice(2);
const flag = name => args.includes(name);
const opt = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const deck = args[0];
const out = opt('--out', null);
if (!deck || !out) throw new Error('usage: shoot.mjs <deck.html> --out <dir> [--width N] [--phone] [--jpg]');

const formats = JSON.parse(readFileSync(fileURLToPath(new URL('../formats.json', import.meta.url)), 'utf8'));
const source = readFileSync(deck, 'utf8');
const format = /class="page[\s"]/.test(source) && !/class="slide[\s"]/.test(source) ? 'doc-a4' : 'slide-16x9';
const { width: W, height: H } = formats[format].stage;
const unit = '.' + formats[format].unit;

const phone = flag('--phone');
// A document zooms its 1240px column to (window − 32px); leave that gutter so pages render at full size.
const viewport = phone ? { width: 390, height: 844 } : format === 'doc-a4' ? { width: W + 32, height: 1000 } : { width: W, height: H };
const scale = phone ? 2 : Number(opt('--width', W)) / W;
const type = flag('--jpg') ? 'jpeg' : 'png';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport, deviceScaleFactor: scale, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
const warnings = [];
page.on('console', m => { if (['warning', 'error'].includes(m.type())) warnings.push(m.text()); });
await page.goto('file://' + resolve(deck), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const count = await page.locator(unit).count();
for (let i = 0; i < count; i++) {
  const file = `${out}/${String(i + 1).padStart(2, '0')}.${type === 'jpeg' ? 'jpg' : 'png'}`;
  const shot = { path: file, type, ...(type === 'jpeg' ? { quality: 78 } : {}) };
  if (format === 'doc-a4') {
    // Pages are stacked; capture each one as an element.
    await page.locator(unit).nth(i).screenshot(shot);
    continue;
  }
  await page.evaluate(i => {
    document.querySelectorAll('.slide').forEach((s, j) => {
      s.classList.toggle('active', j === i);
      s.classList.toggle('visible', j === i);
    });
  }, i);
  await page.waitForTimeout(150);
  await page.screenshot(shot);
}
const fonts = await page.evaluate(() => [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))]);
await browser.close();
console.log(JSON.stringify({ format, [format === 'doc-a4' ? 'pages' : 'slides']: count, errors, warnings, fonts, out }));
