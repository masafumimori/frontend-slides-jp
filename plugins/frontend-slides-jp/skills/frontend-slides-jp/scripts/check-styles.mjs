// Validates every styles/<slug>/ folder against styles/README.md and
// rewrites styles/selection-index.json from the style.json files.
//   node scripts/check-styles.mjs [styles-dir] [--only <slug>]

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const customDir = args[0] && !args[0].startsWith('--') ? args[0] : null;
const stylesDir = customDir ?? join(root, 'styles');
const catalog = new Map(JSON.parse(readFileSync(join(root, 'fonts/catalog.json'), 'utf8')).fonts.map(f => [f.family, f]));
const formats = JSON.parse(readFileSync(join(root, 'formats.json'), 'utf8'));
const bases = Object.fromEntries(Object.values(formats).map(f => [f.base, readFileSync(join(root, f.base), 'utf8').trim()]));

const ENUMS = {
  formality: ['low', 'medium', 'high'],
  density: ['low', 'medium', 'high'],
  scheme: ['light', 'dark'],
  writing: ['horizontal', 'vertical'],
  group: ['business', 'tech', 'stage', 'editorial'],
};
const REQUIRED = ['slug', 'name', 'name_ja', 'tagline', 'summary_ja', 'group', 'mood', 'formality', 'density', 'scheme',
  'best_for', 'avoid_for', 'formats', 'writing', 'needs', 'fonts', 'colors', 'refs'];

const errors = [];
const index = [];

for (const slug of readdirSync(stylesDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).filter(n => !only || n === only).sort()) {
  const dir = join(stylesDir, slug);
  const fail = msg => errors.push(`${slug}: ${msg}`);
  for (const file of ['style.json', 'preview.md', 'design.md']) {
    if (!existsSync(join(dir, file))) fail(`missing ${file}`);
  }
  if (!existsSync(join(dir, 'style.json'))) continue;

  const style = JSON.parse(readFileSync(join(dir, 'style.json'), 'utf8'));
  for (const key of REQUIRED) if (!(key in style)) fail(`style.json lacks "${key}"`);
  if (style.slug !== slug) fail(`slug "${style.slug}" does not match folder`);
  for (const [key, allowed] of Object.entries(ENUMS)) {
    if (!allowed.includes(style[key])) fail(`${key} "${style[key]}" not in ${allowed.join('|')}`);
  }
  for (const f of style.formats ?? []) if (!formats[f]) fail(`unknown format "${f}"`);

  const families = [style.fonts?.heading, style.fonts?.body, ...(style.fonts?.latin ?? []), ...(style.fonts?.extra ?? [])].filter(Boolean);
  for (const family of families) if (!catalog.has(family)) fail(`font "${family}" is not in fonts/catalog.json`);
  const heading = catalog.get(style.fonts?.heading);
  const okRoles = style.writing === 'vertical' ? ['any', 'vertical-heading'] : ['any'];
  if (heading && !okRoles.includes(heading.role)) {
    fail(`heading font "${heading.family}" has role "${heading.role}"; palt${style.writing === 'vertical' ? '/vpal' : ''} would not tighten it`);
  }

  const colors = Object.entries(style.colors ?? {});
  if (colors.length > 6) fail(`${colors.length} color tokens; at most 6`);
  for (const [name, hex] of colors) if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) fail(`color ${name} "${hex}" is not #RRGGBB`);

  // heading, body and latin load in every reference; an extra family may serve one format only.
  const core = [style.fonts?.heading, style.fonts?.body, ...(style.fonts?.latin ?? [])].filter(Boolean);
  const extra = (style.fonts?.extra ?? []).filter(Boolean);
  const extraLoaded = new Set();

  // Every format a style claims needs its own working reference and thumbnails.
  if (!style.formats?.length) fail('formats is empty');
  for (const f of style.formats ?? []) {
    const format = formats[f];
    if (!format) continue;
    const file = format.reference;
    if (!existsSync(join(dir, file))) { fail(`${f}: missing ${file}`); continue; }
    const html = readFileSync(join(dir, file), 'utf8');
    if (!html.includes(bases[format.base])) fail(`${file} does not paste ${format.base} verbatim`);
    for (const family of core) {
      if (!html.includes(family.replaceAll(' ', '+'))) fail(`${file} does not load "${family}" from Google Fonts`);
    }
    for (const family of extra) if (html.includes(family.replaceAll(' ', '+'))) extraLoaded.add(family);
    for (const [, src] of html.matchAll(/(?:src|href)="(?![a-z][a-z0-9+.-]*:|#)([^"]+)"/g)) {
      if (!existsSync(join(dir, src))) fail(`${file} points at missing ${src}`);
    }
    if (new RegExp(`<section class="${format.unit}"[^>]*\\sid="d-`).test(html)) fail(`${file}: a diagram id sits on .${format.unit}; put it on a wrapper around the figure`);
    const units = (html.match(new RegExp(`class="${format.unit}[\\s"]`, 'g')) ?? []).length;
    if (units < 4) fail(`${file} has fewer than 4 .${format.unit} sections`);
    for (const n of ['01', '02', '03', '04']) {
      if (!existsSync(join(dir, format.thumbs, `${n}.jpg`))) fail(`missing ${format.thumbs}/${n}.jpg (node scripts/shoot.mjs styles/${slug}/${file} --out styles/${slug}/${format.thumbs} --width ${f === 'doc-a4' ? 400 : 640} --jpg --first 4)`);
    }
  }
  for (const family of extra) if (!extraLoaded.has(family)) fail(`no reference loads extra font "${family}" from Google Fonts`);

  const { fonts, colors: palette, refs, ...meta } = style;
  index.push({
    ...meta,
    fonts,
    palette: Object.values(palette ?? {}),
    preview_md: `styles/${slug}/preview.md`,
    design_md: `styles/${slug}/design.md`,
    references: Object.fromEntries((style.formats ?? []).filter(f => formats[f]).map(f => [f, {
      html: `styles/${slug}/${formats[f].reference}`,
      thumbs: ['01', '02', '03', '04'].map(n => `styles/${slug}/${formats[f].thumbs}/${n}.jpg`),
    }])),
  });
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
if (!customDir && !only) {
  writeFileSync(join(stylesDir, 'selection-index.json'), JSON.stringify({ styles: index }, null, 2) + '\n');
}
console.log(`${index.length} styles ok`);
