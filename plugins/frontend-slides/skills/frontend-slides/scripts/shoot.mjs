// Screenshots every .slide of a deck, one image per slide.
//   node scripts/shoot.mjs <deck.html> --out <dir> [--width 1920] [--phone] [--jpg]
// --width sets the image width (the stage is always rendered at 1920×1080).
// --phone renders in a 390×844 viewport instead, to check the stage scales as a whole.
// Prints page errors and the families that loaded. Needs Playwright:
//   PLAYWRIGHT_MODULE=/path/to/node_modules/playwright/index.mjs

import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const args = process.argv.slice(2);
const flag = name => args.includes(name);
const opt = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const deck = args[0];
const out = opt('--out', null);
if (!deck || !out) throw new Error('usage: shoot.mjs <deck.html> --out <dir> [--width N] [--phone] [--jpg]');

const phone = flag('--phone');
const viewport = phone ? { width: 390, height: 844 } : { width: 1920, height: 1080 };
const scale = phone ? 2 : Number(opt('--width', 1920)) / 1920;
const type = flag('--jpg') ? 'jpeg' : 'png';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport, deviceScaleFactor: scale, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
await page.goto('file://' + resolve(deck), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const count = await page.locator('.slide').count();
for (let i = 0; i < count; i++) {
  await page.evaluate(i => {
    document.querySelectorAll('.slide').forEach((s, j) => {
      s.classList.toggle('active', j === i);
      s.classList.toggle('visible', j === i);
    });
  }, i);
  await page.waitForTimeout(150);
  const file = `${out}/${String(i + 1).padStart(2, '0')}.${type === 'jpeg' ? 'jpg' : 'png'}`;
  await page.screenshot({ path: file, type, ...(type === 'jpeg' ? { quality: 78 } : {}) });
}
const fonts = await page.evaluate(() => [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))]);
await browser.close();
console.log(JSON.stringify({ slides: count, errors, fonts, out }));
