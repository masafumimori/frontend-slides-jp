// Fills fonts/catalog.json with what Google Fonts actually serves:
// available weights, a ready css2 query, and whether palt (horizontal) and
// vpal (vertical) tighten Japanese text. Rerun after adding a family.
//
//   npm install --prefix /tmp/pw playwright && npx --prefix /tmp/pw playwright install chromium
//   PLAYWRIGHT_MODULE=/tmp/pw/node_modules/playwright/index.mjs node scripts/measure-fonts.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const catalogPath = fileURLToPath(new URL('../fonts/catalog.json', import.meta.url));
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));

const SAMPLE = 'ことこと、「待つ」時間までおいしい。';
const TIGHT = 0.02;

const raw = await (await fetch('https://fonts.google.com/metadata/fonts')).text();
const meta = new Map(JSON.parse(raw.slice(raw.indexOf('{'))).familyMetadataList.map(f => [f.family, f]));

for (const font of catalog.fonts) {
  const m = meta.get(font.family);
  if (!m) throw new Error(`${font.family} is not on Google Fonts`);
  font.weights = Object.keys(m.fonts).filter(k => /^\d+$/.test(k)).map(Number).sort((a, b) => a - b);
  font.css = `family=${font.family.replaceAll(' ', '+')}:wght@${font.weights.join(';')}`;
}

const ja = catalog.fonts.filter(f => f.script === 'ja');
const query = ja.map(f => f.css).join('&');
const span = (f, mode, feature) =>
  `<span data-f="${f.family}" data-k="${mode}-${feature}" style="font-family:'${f.family}';font-size:80px;` +
  `white-space:nowrap;display:inline-block;font-feature-settings:${feature === 'on' ? `'${mode === 'h' ? 'palt' : 'vpal'}'` : 'normal'};` +
  `${mode === 'v' ? 'writing-mode:vertical-rl;' : ''}">${SAMPLE}</span>`;
const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?${query}&display=block" rel="stylesheet"></head><body>
${ja.map(f => ['h', 'v'].map(mode => span(f, mode, 'off') + span(f, mode, 'on')).join('')).join('<br>')}
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const sizes = await page.evaluate(() => {
  const out = {};
  for (const el of document.querySelectorAll('span')) {
    const r = el.getBoundingClientRect();
    out[el.dataset.f] ??= { loaded: document.fonts.check(`80px "${el.dataset.f}"`) };
    out[el.dataset.f][el.dataset.k] = el.dataset.k.startsWith('v') ? r.height : r.width;
  }
  return out;
});
await browser.close();

for (const font of ja) {
  const s = sizes[font.family];
  if (!s.loaded) throw new Error(`${font.family} did not load`);
  const gain = (off, on) => Math.round((1 - on / off) * 1000) / 1000;
  font.palt_gain = gain(s['h-off'], s['h-on']);
  font.vpal_gain = gain(s['v-off'], s['v-on']);
  font.palt = font.palt_gain > TIGHT;
  font.vpal = font.vpal_gain > TIGHT;
  font.role = font.palt ? 'any' : font.vpal ? 'vertical-heading' : 'body-only';
}

catalog.measured = {
  date: new Date().toISOString().slice(0, 10),
  method: `Chromium, Google Fonts css2, 80px "${SAMPLE}", gain = 1 - with/without`,
};
writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(ja.map(f => `${f.family.padEnd(22)} palt ${f.palt_gain}  vpal ${f.vpal_gain}  ${f.role}`).join('\n'));
