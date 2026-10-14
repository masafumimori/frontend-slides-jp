// Checks that references/diagrams.md and references/diagrams.html describe the same patterns.
//   node scripts/check-diagrams.mjs
// Every `### d-<id>` entry needs a `<section id="d-<id>">` slide and a
// `/* BEGIN d-<id> */ … /* END d-<id> */` CSS block, and every slide needs an entry.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('../references/', import.meta.url));
const md = readFileSync(dir + 'diagrams.md', 'utf8');
const html = readFileSync(dir + 'diagrams.html', 'utf8');

const entries = [...md.matchAll(/^### (d-[a-z0-9-]+)/gm)].map(m => m[1]);
const slides = [...html.matchAll(/<section class="slide" id="(d-[a-z0-9-]+)"/g)].map(m => m[1]);
const problems = [];
const dupes = list => list.filter((id, i) => list.indexOf(id) !== i);

for (const id of dupes(entries)) problems.push(`${id}: listed twice in diagrams.md`);
for (const id of dupes(slides)) problems.push(`${id}: two slides in diagrams.html`);
for (const id of entries) if (!slides.includes(id)) problems.push(`${id}: entry without a slide`);
for (const id of slides) {
  if (!entries.includes(id)) problems.push(`${id}: slide without an entry`);
  if (!html.includes(`/* BEGIN ${id} */`) || !html.includes(`/* END ${id} */`)) problems.push(`${id}: CSS block markers missing`);
}
const picked = new Set([...md.split('## Rules')[0].matchAll(/`(d-[a-z0-9-]+)`/g)].map(m => m[1]));
for (const id of slides) if (!picked.has(id)) problems.push(`${id}: missing from the "Pick by relationship" table`);

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`diagrams: ${slides.length} patterns ok`);
