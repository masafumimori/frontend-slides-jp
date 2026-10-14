// Writes styles/gallery.html, a browsable page of every style, from the
// style.json files and the thumbs check-styles.mjs requires.
//   node scripts/build-gallery.mjs

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const stylesDir = join(root, 'styles');
const styles = readdirSync(stylesDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => JSON.parse(readFileSync(join(stylesDir, d.name, 'style.json'), 'utf8')));

const GROUPS = [
  ['business', 'ビジネス', '会社紹介・経営計画・公式報告'],
  ['tech', 'テック', 'テック企業・研究開発・技術説明'],
  ['stage', '登壇・発表', 'カンファレンス・製品発表・イベント'],
  ['editorial', 'ブランド・編集', 'ブランドブック・思想・周年'],
];
const LABEL = {
  scheme: { light: '明るい地', dark: '暗い地' },
  formality: { low: 'カジュアル', medium: '標準', high: 'フォーマル' },
  density: { low: '少なめ', medium: '中くらい', high: '多め' },
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const card = s => {
  const fonts = [s.fonts.heading, s.fonts.body, ...(s.fonts.latin ?? [])].filter((f, i, a) => f && a.indexOf(f) === i);
  const tags = [LABEL.scheme[s.scheme], `格式 ${LABEL.formality[s.formality]}`, `文字量 ${LABEL.density[s.density]}`,
    s.writing === 'vertical' ? '縦組み' : null, s.needs.includes('photos') ? '写真が必要' : null,
    s.formats.includes('doc-a4') ? 'A4冊子に対応' : null].filter(Boolean);
  const slides = s.formats.includes('slide-16x9');
  const a4 = s.formats.includes('doc-a4')
    ? `<a class="a4" href="${s.slug}/reference-a4.html" target="_blank" rel="noopener">${['01', '02', '03', '04'].map(n => `<img src="${s.slug}/thumbs-a4/${n}.jpg" alt="" loading="lazy">`).join('')}</a>`
    : '';
  return `
  <article class="style" data-scheme="${s.scheme}" data-formality="${s.formality}" data-photos="${s.needs.includes('photos')}" data-a4="${s.formats.includes('doc-a4')}" id="${s.slug}">
    ${slides ? `<a class="cover" href="${s.slug}/reference.html" target="_blank" rel="noopener"><img src="${s.slug}/thumbs/01.jpg" alt="${esc(s.name_ja)}の表紙" loading="lazy"></a>
    <div class="strip">${['02', '03', '04'].map(n => `<a href="${s.slug}/reference.html#${Number(n)}" target="_blank" rel="noopener"><img src="${s.slug}/thumbs/${n}.jpg" alt="" loading="lazy"></a>`).join('')}</div>` : ''}
    ${a4}
    <div class="body">
      <h3>${esc(s.name_ja)}<code>${s.slug}</code></h3>
      <p class="summary">${esc(s.summary_ja)}</p>
      <dl>
        <dt>向く場面</dt><dd>${esc(s.best_for)}</dd>
        <dt>書体</dt><dd>${esc(fonts.join(' / '))}</dd>
        <dt>色</dt><dd class="chips">${Object.values(s.colors).map(c => `<span style="--c:${c}" title="${c}"></span>`).join('')}</dd>
      </dl>
      <p class="tags">${tags.map(t => `<span>${t}</span>`).join('')}</p>
    </div>
  </article>`;
};

const sections = GROUPS.map(([key, title, note]) => {
  const members = styles.filter(s => s.group === key).sort((a, b) => a.slug.localeCompare(b.slug));
  return `
<section class="group" data-group="${key}">
  <header><h2>${title}</h2><p>${note}</p><span class="n">${members.length}</span></header>
  <div class="grid">${members.map(card).join('')}</div>
</section>`;
}).join('');

const html = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Style Gallery</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Inter+Tight:wght@500;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#f5f4f1;--card:#fff;--ink:#16161a;--sub:#6b6965;--rule:#e2dfd9;--acc:#d6461f}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#121214;--card:#1b1b1f;--ink:#efede9;--sub:#9b978f;--rule:#2d2c30;--acc:#ff7a4d}}
:root[data-theme=dark]{--bg:#121214;--card:#1b1b1f;--ink:#efede9;--sub:#9b978f;--rule:#2d2c30;--acc:#ff7a4d}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:500 14px/1.7 'Noto Sans JP',sans-serif;font-feature-settings:"palt";line-break:strict;word-break:auto-phrase}
.wrap{max-width:1320px;margin:0 auto;padding:56px 24px 96px}
.top{display:flex;flex-wrap:wrap;gap:24px 40px;align-items:flex-end;justify-content:space-between;padding-bottom:28px;border-bottom:2px solid var(--ink)}
.eyebrow{font:700 11px/1 'Inter Tight',sans-serif;letter-spacing:.22em;color:var(--acc);margin:0 0 14px}
h1{font-weight:900;font-size:clamp(30px,4.4vw,52px);line-height:1.2;margin:0}
.lede{color:var(--sub);margin:12px 0 0;max-width:40em}
.filters{display:flex;flex-wrap:wrap;gap:8px}
.filters button{font:700 13px/1 'Noto Sans JP';padding:10px 14px;border-radius:999px;border:1px solid var(--rule);background:var(--card);color:var(--ink);cursor:pointer}
.filters button[aria-pressed=true]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
nav.toc{display:flex;flex-wrap:wrap;gap:6px 18px;margin:18px 0 0;font-size:13px}
nav.toc a{color:var(--sub);text-decoration:none}nav.toc a:hover{color:var(--ink)}
.group{margin-top:56px}
.group>header{display:flex;align-items:baseline;gap:14px;margin-bottom:18px}
.group h2{font-size:22px;font-weight:900;margin:0}.group header p{margin:0;color:var(--sub);font-size:13px}
.group .n{margin-left:auto;font:700 13px 'Inter Tight';color:var(--sub)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:20px}
.style{background:var(--card);border:1px solid var(--rule);border-radius:10px;overflow:hidden;display:flex;flex-direction:column}
.style[hidden]{display:none}
.cover img,.strip img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:var(--rule)}
.strip{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;border-top:2px solid var(--card);background:var(--card)}
.cover:hover img,.strip a:hover img{opacity:.88}
.body{padding:18px 20px 20px;display:flex;flex-direction:column;gap:10px;flex:1}
h3{margin:0;font-size:19px;font-weight:900;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
h3 code{font:500 12px 'Inter Tight',monospace;color:var(--sub)}
.summary{margin:0;color:var(--sub)}
dl{display:grid;grid-template-columns:auto 1fr;gap:4px 14px;margin:0;font-size:13px}
dt{color:var(--sub)}dd{margin:0}
.chips{display:flex;gap:5px;align-items:center}.chips span{width:16px;height:16px;border-radius:50%;background:var(--c);box-shadow:0 0 0 1px var(--rule)}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin:auto 0 0}.tags span{font-size:12px;padding:3px 9px;border-radius:999px;border:1px solid var(--rule);color:var(--sub)}
.a4{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:10px;background:var(--rule)}.a4 img{display:block;width:100%;aspect-ratio:1240/1754;object-fit:cover;box-shadow:0 1px 3px rgba(0,0,0,.18)}.a4:hover img{opacity:.88}
.empty{color:var(--sub);margin-top:40px}
@media (max-width:440px){.grid{grid-template-columns:1fr}}
</style></head><body><div class="wrap">
<div class="top">
  <div><p class="eyebrow">FRONTEND-SLIDES-JP · STYLES</p><h1>スタイル一覧</h1>
  <p class="lede">${styles.length}種のスタイルを用途ごとに並べています。表紙を押すと4枚の見本が開き、矢印キーで送れます。縦長の4枚はA4冊子の見本で、押すと冊子が開きます。使いたいスタイルは名前か右の英字名でスキルに伝えてください。</p></div>
  <div class="filters" role="group" aria-label="絞り込み">
    <button data-f="all" aria-pressed="true">すべて</button>
    <button data-f="light" aria-pressed="false">明るい地</button>
    <button data-f="dark" aria-pressed="false">暗い地</button>
    <button data-f="formal" aria-pressed="false">フォーマル</button>
    <button data-f="nophoto" aria-pressed="false">写真なしで作れる</button>
    <button data-f="a4" aria-pressed="false">A4冊子に対応</button>
  </div>
</div>
<nav class="toc">${GROUPS.flatMap(([key]) => styles.filter(s => s.group === key).sort((a, b) => a.slug.localeCompare(b.slug))).map(s => `<a href="#${s.slug}">${esc(s.name_ja)}</a>`).join('')}</nav>
${sections}
<p class="empty" hidden>条件に合うスタイルはありません。</p>
</div>
<script>
const tests={all:()=>true,light:e=>e.dataset.scheme==='light',dark:e=>e.dataset.scheme==='dark',formal:e=>e.dataset.formality==='high',nophoto:e=>e.dataset.photos==='false',a4:e=>e.dataset.a4==='true'};
document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  let shown=0;
  document.querySelectorAll('.style').forEach(e=>{const ok=tests[b.dataset.f](e);e.hidden=!ok;shown+=ok});
  document.querySelectorAll('.group').forEach(g=>g.hidden=!g.querySelector('.style:not([hidden])'));
  document.querySelector('.empty').hidden=shown>0;
}));
</script></body></html>
`;
writeFileSync(join(stylesDir, 'gallery.html'), html);
console.log(`gallery: ${styles.length} styles`);
