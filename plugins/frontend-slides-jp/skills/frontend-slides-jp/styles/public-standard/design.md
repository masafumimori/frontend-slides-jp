# Public Standard design system

## 1. Thesis

Dignity through precision, not decoration. Every slide is built from a 12-column grid, an 8px spacing scale, three weights of rule and exact Japanese and Latin typesetting, and every number on it carries its unit, its comparison and its source.

## 2. Tokens

```css
:root {
  --stage-bg: #E9E9EC;
  --slide-bg: #FFFFFF;
  --ink: #1A1A1C;
  --ink-2: #55555C;
  --rule: #D6D6DB;
  --rule-strong: #1A1A1C;
  --blue: #0A3BD1;

  --font-jp: 'Noto Sans JP', sans-serif;
  --font-num: 'IBM Plex Sans', 'Noto Sans JP', sans-serif;

  /* 8px spacing scale */
  --s1: 8px; --s2: 16px; --s3: 24px; --s4: 32px; --s5: 48px; --s6: 64px; --s7: 96px; --s8: 128px;

  /* 12-column grid at 1920: 120px margins, 24px gutter, 118px column */
  --margin-x: 120px;
  --gutter: 24px;

  --t-label: 22px;
  --t-note: 18px;
  --t-body: 26px;
  --t-h2: 64px;
  --t-h1: 108px;

  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
}
```

The only colors outside the tokens are in the SVG chart: the previous-period series and its legend swatch are `#9A9AA2`, the x-axis baseline is `#1A1A1C` at 1.5px, and gridlines are `#D6D6DB` at 1px.

Grid. `.grid` is `display: grid; grid-template-columns: repeat(12, 1fr); column-gap: var(--gutter)`, placed with `left: var(--margin-x); right: var(--margin-x)`. All horizontal positions are column spans; all gaps come from `--s1` to `--s8`. The two exceptions in the reference are hand-tuned optical values (22px under spec rows, 20px step padding); do not add more.

Numbers. `.num` sets `font-family: var(--font-num); font-feature-settings: "tnum", "lnum"; letter-spacing: -0.01em`. Wrap every figure in a `span.num`, including figures inside Japanese sentences (`令和8年度 上半期（<span class="num">4</span>月〜<span class="num">9</span>月）`).

Base CSS note. `viewport-base.css` sets `.slide :is(h1,h2,h3)` to tracking 0 and line-height 1.35, and `.slide :is(p,li,td,dd)` to tracking .02em and line-height 1.7. This style keeps its own values. The role classes are written `.slide .label`, `.slide .note`, `.slide h2` so they beat the base, and single-line rows (spec values, KPI values, quadrant headers, plan title, result rows, TOC rows) set `line-height: normal` so baselines stay where the grid puts them. When adding a new `p` with a one-class selector, either prefix it with `.slide` or give it an explicit line-height.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Display (cover title) | Noto Sans JP | 700 | 108px (`--t-h1`) | 1.3 | .02em |
| H1 (contents title) | Noto Sans JP | 700 | 88px | 1.2 | .02em |
| H2 (conclusion headline) | Noto Sans JP | 700 | 64px (`--t-h2`) | 1.38 | .02em |
| H3 (TOC item) | Noto Sans JP | 700 | 40px | 1.3 | .02em |
| Cover period line | Noto Sans JP | 500 | 32px | normal | .03em |
| Body (lead) | Noto Sans JP | 400 | 26px (`--t-body`) | 1.7 | .02em |
| Body (agenda, TOC note) | Noto Sans JP | 500 / 400 | 24 / 22px | 1.6 / 1.5 | .02em |
| Card heading (chart title, KPI label, quadrant action) | Noto Sans JP | 700 | 22 to 24px | 1.4 (chart title: normal) | .02em |
| Small body (KPI description, steps, quadrant examples) | Noto Sans JP | 400 | 19 to 21px | 1.55 to 1.6 | .02em |
| Label (blue) | Noto Sans JP | 700 | 22px (`--t-label`) | 1.4 | .03em |
| Note, caption, running header | Noto Sans JP | 400 | 18px (`--t-note`) | 1.6 | .02 to .03em |
| Number (KPI) | IBM Plex Sans | 500 | 104px | 1.05 | -.02em |
| Number (quadrant) | IBM Plex Sans | 500 | 96px | .9 | -.02em |
| Number (result, spec) | IBM Plex Sans | 500 | 80 / 44px | 1 / normal | -.01em |
| Unit after a number | Noto Sans JP | 700 | 30px (KPI), 26 to 28px, 22px (spec) | normal | .02em |
| Chapter and TOC numerals | IBM Plex Sans | 500 | 30px, blue | normal | .02em |
| Page number | IBM Plex Sans | 400, current page 600 | 18px | normal | .04em |

The unit is 0.25 to 0.3 of its number and sits on the same baseline (`display: flex; align-items: baseline`). Numbers are weight 500, never 700, so large figures stay even in color.

## 4. Signature devices

**Top edge.** `.slide::before`, 8px of `--blue` across the full width at top 0. Every slide, the cover included.

**Running header.** `.run-head` at top 48, between the margins: left is the chapter number in ink 500 and the chapter name, right is the document title, both 18px `--ink-2`, with a 1px `--rule` underline 16px below. Content slides only; the cover has none. The contents slide puts the organisation where the chapter number goes.

**Footer.** `.run-foot` at bottom 48: the left side is a `.note` with `※` definitions and then `出典：` with the source and the as-of date; the right is `<b>03</b> / 15` in Plex 18px. Every content slide has a source line. If a slide has no external source, say what the numbers are (`※ 自課集計、速報値`).

**Rule weights.** Exactly three, each with one job. 4px `--blue`: the top of a KPI block or the agenda block (the thing to read first). 2px `--rule-strong`: the top of a list, table, spec block or plan, and chart and matrix axes. 1px `--rule`: between rows and quadrants. Rules never box content; there are no four-sided borders except the document-number tag.

**Label → number → description.** `.kpi`: 4px blue rule, 16px padding, a 22px/700 label, 8px, the number with its unit, 8px, a 20px `--ink-2` description that gives the comparison (`前年同月比 <b>+20.4</b>ポイント`) with figures in ink 500 Plex. Four KPIs sit in a 2×2 grid across columns 8 to 12, 32px row gap.

**Blue label above a headline.** `.head-block` at top 136: a `.label` that names the slide's job (`結論`, or the question being answered), 16px, then the two-line H2 that states the conclusion. The H2 is always a sentence ending in `。`.

**Spec list.** `dl.spec` topped by 2px ink: rows of a 22px gray term and a right-aligned value, 24px above and 22px below, 1px rule between.

**Matrix.** A 2×2 grid with a 2px ink left and bottom axis, 1px `--rule` inner lines, vertical-rl y-axis labels (`多い / 年間申請件数 / 少ない`) and x-axis labels below. The quadrant to act on gets a 4px blue inset top line (`box-shadow: inset 0 4px 0 var(--blue)`) and a blue label. No fills.

**Line chart.** SVG drawn from the data arrays, so slide numbers and chart numbers cannot disagree. Current series 4px `--blue` with a 7px end dot and a 24px/600 ink value; comparison series 2.5px `#9A9AA2` with hollow markers and 20px values. Legend top right as 28px line swatches. Y labels at left with `%` only on the top tick.

**Motion.** `.rv` fades in and rises 12px over .6s on `--ease`; `.d1` to `.d5` delay 80ms each. Off under `prefers-reduced-motion`.

## 5. Slide grammar

Content frame: top edge, running header at 48, head block at 136 (label plus two-line H2, which ends near 360), body from about 388 to 948, footer at bottom 48.

**The four reference slides.**
1. Cover. Title in columns 1 to 7, spec list in 9 to 12, organisation and document number along the bottom.
2. Contents. Columns 1 to 4: `Contents` label, 88px `目次`, a 26px lead, and the agenda block (4px blue rule) pinned to the bottom. Columns 6 to 12: a 2px-topped `ol` whose four rows share the height equally, each `01` (blue Plex), H3 plus a 22px note, and a right-aligned page.
3. Conclusion and numbers. Head block, then a line chart in columns 1 to 7 and the 2×2 KPI grid in columns 8 to 12.
4. Diagram. Head block, the matrix in columns 1 to 9, and a plan column in 10 to 12 (2px-topped title, 1px-ruled steps with a blue 20px `when`, and a result row `68.4 → 77.7%` pinned to the bottom).

**Comparison.** Head block, then two blocks in columns 1 to 6 and 7 to 12, each topped by 2px ink with the option name as a 24px/700 heading. Below, the same ordered rows in both (1px rules), so values line up across. The recommended option's top rule becomes 4px blue and its label turns blue. No check marks or colored cells.

**Table.** A real `table` spanning columns 1 to 12: header row 18px/700 `--ink-2` under a 2px ink top rule, body rows 22px with 1px `--rule` between and 16 to 24px vertical padding, numbers right-aligned in `.num`, units in the header (`件`, `%`) rather than every cell. Highlight a row only with a blue label in its first cell. Footnote with source is mandatory.

**Quote.** Used for an official statement or a resident's comment. Head-block position, the quote as 48 to 64px/700 ink in 「」, then a 22px/500 attribution line (name, role, date) and the source in the footer. No quote-mark ornaments, no italics.

**Timeline.** A 2px ink rule across columns 1 to 12. Each milestone is a column span: a 20px/700 blue date above the rule (`令和8年10月`), a 22px/700 title and a 20px `--ink-2` description below. Past milestones are ink, future ones `--ink-2`; mark today with the 4px blue rule segment over the current span.

**Team.** For a project structure, not portraits: a table of roles. Each row is the department in 22px/700, the responsibility in 20px, and the head count in a `.num`. If an organisation chart is needed, draw boxes as 1px-ruled rows, not rounded cards.

**Closing.** Not a thank-you slide. A decision or next-steps slide: head block with label `審議事項` or `今後の予定`, then a 2px-topped numbered list of what is being asked, each with a date and owner, and the contact (department, extension, email) in the footer note position.

## 6. Slop signs

- [ ] Blue used as a fill on any area (cards, quadrants, table rows, a full-bleed gate). Blue is the top edge, labels, numerals, 4px rules and the current series only.
- [ ] Even spacing everywhere and no hierarchy: the H2, labels and notes at similar sizes, or every block the same weight.
- [ ] Double rules: a bordered card inside a ruled list, or a four-sided box around a KPI.
- [ ] Number and unit at the same size, or the unit not on the number's baseline.
- [ ] A figure set in Noto Sans JP instead of `.num`, so digits in a column do not align.
- [ ] A content slide without a source line, or with `出典：各種資料` instead of a named source and date.
- [ ] A headline that is a topic (`上半期の成果`) instead of a sentence with the conclusion.
- [ ] A chart with more than two series colors, a 3D effect, or numbers on the slide that differ from the chart data.
- [ ] Icons, illustrations, shadows, rounded corners or gradients added to "soften" it.
- [ ] Running header or page number missing, or the page count not matching the deck.
- [ ] A one-class `p` selector losing to the base's `.slide p` line-height and drifting off the grid. Compare row baselines with the reference.

## 7. Document pages

`reference-a4.html` is an administrative plan (行政計画) excerpt: cover, contents, a two-column background page with the plan-position figure, the policy tree, the KPI table, and the promotion / contact back page. Same four colors, same three rule weights, same label → number → description; only the sizes change. Sizes are px at the 1240×1754 page.

Tokens. The `:root` block above, with `--desk-bg: #E9E9EC`, `--page-bg: #FFFFFF`, `--margin-x: 96px`, `--text-w: 1048px`, `--t-label: 20px`, `--t-note: 17px`, `--t-body: 22px`, `--t-h2: 54px`, `--t-h1: 96px`, and one more family: `--font-body: 'BIZ UDPGothic', 'Noto Sans JP', sans-serif`. Body paragraphs, leads, notes, sources and table sub-lines use the UD face; headings, labels and table headings stay in Noto Sans JP; every figure stays in `.num` (IBM Plex Sans). BIZ UDPGothic is `body-only` in the catalog, so it never sets a heading.

**Page frame.**
- Top edge: `.page::before`, 8px `--blue` across the full width at top 0, on every page including the cover.
- Running head `.rh`: top 64, inset 96, 18px `--ink-2`, 1px `--rule` 14px below. Left `<b>汐見市</b>` plus the document name; right `<b>第N章</b>` plus the chapter name (the bold part in ink 500). The contents page puts `目次` on the right.
- Folio `.folio`: bottom 56, right 96, Plex 19px `<b>24</b> / 60` (current page ink 600). Page numbers are the main volume's, so an excerpt keeps them.
- Chapter tab `.tab`: a ladder of all six chapter numbers on the outer edge (x 1176–1240, top 240, 52px per step, 1px `--rule` between steps and on its left side). The current step has a 4px blue inset bar on its left, a blue Plex 600 numeral and `aria-current`; below the ladder (top 576) the chapter name is set vertically in 18px ink 700 with the number in `text-combine-upright`. The current chapter is shown by bar, weight and name, never by color alone. The contents page lights no step and sets `目次` vertically.
- Foot slot `.foot`: left 96, right 220, bottom 52, ※ notes in 17px `--ink-2`, bottom-aligned with the folio. Keep it to two lines (about 53 字 each); content above it ends by about 1600.

**Head block.** `.head` at top 140: the 20px blue label naming the section (`3-3　施策の体系`), 16px, the two-line H2 at 54px/700/1.38 ending in `。`, then a 26px BIZ UDPGothic lead of two lines. It ends near 450; the body starts at 470–490.

**Numbering.** Government-document conventions: `第N章` in the label and running head, `1-1` section headings, `（1）` sub-headings, `図3-1` / `表5-1` captions, `※1` notes. Captions `.cap` sit on a 2px ink rule with the number in blue Plex 500, the title 24px/700 and a unit or key note right-aligned in 18px. A source line `.src` (17px `--ink-2`, `出典：` with the issuer, date and 「架空のデータ」 for invented numbers) sits directly under every figure and table.

**Cover.** Blue top edge, label (策定年月・本編/概要版) at 140, `第3次` 44px/700, the title 96px/700 in two lines broken at the plan name, the period line 30px/500 with Plex figures, and the basic goal in 26px. Below, one schematic visual on a 2px rule: the future network, drawn with the style's line language only (railway as an ink band with white dashes, the lines being strengthened as 5px blue, feeders 2.5px `--ink-2`, demand-responsive zones as dashed outlines with a `--rule` hatch, hubs as white squares with a 3px ink border) and a legend of drawn samples plus words. Then a four-cell spec strip on a 2px ink rule (Plex 48px numbers with 22px units, 1px rules between cells), and the organisation and the bordered document tag along the bottom, with the fictional-data note under the tag.

**Contents.** Label `Contents`, 72px `目次`, lead; a 2px-topped `ol` of six chapters sharing the height (Plex 30px blue `01`, a 19px `第1章`, 34px/700 chapter name, 20px section list, right-aligned Plex page). Chapters included in the excerpt carry a blue 18px/700 `本書に収録` label and an ink 600 page number. A row of three KPI blocks (4px blue rule, 72px number) closes the page.

**Reading page.** Two 500px columns with a 48px gutter at top 480: `1-1` heading on a 2px ink rule (26px/700, blue Plex number), `（1）` sub-headings 22px/700, paragraphs in BIZ UDPGothic 22px/1.8 with a 1em indent (about 22 字 per line). Split the columns by hand at a paragraph boundary; never let a sentence or number break across the columns. A full-width figure follows (here 図1-1 計画の位置づけ: blocks are rules plus text, the plan itself on the 4px blue rule, the upper plan above, the law and related plans either side, the implementation plan below, arrows 2px ink labelled 即する／根拠／整合／具体化).

**Figure page.** Diagrams from `references/diagrams.md` at 1048px wide, drawn in the style's rules, never in boxes. The reference adapts `d-logic-tree` into the policy tree (基本目標 → 基本方針 → 施策 → 主な指標): leaves on equal rows with an 18px gap between groups, each parent centred on its children, elbow links 1.5px `--ink-2`. The goal sits on a 4px blue rule with a blue key, each policy on a 2px ink rule with `方針 N` (blue Plex), measures as 1px-ruled rows (blue Plex `1-1`, 21px/500 label), each group opening with 2px ink. The bar column becomes the indicator column. Priority measures carry a 4px blue left bar and a bordered blue `重点` tag, explained in a key at the right of the caption. The reference pins the SVG size with `data-w`/`data-h`; `clientWidth` would also work, since the page zoom does not change it. A 用語解説 block (2px rule, two columns of term 19px/700 + definition 18px) may follow the figure.

**Table page.** Three KPI blocks first (4px blue rule, `912 → 1,000万人` with the past value 30px `--ink-2` and the target 76px Plex 500), then the table: header 18px/700 `--ink-2` under the caption rule and over a 2px ink line, rows with 1px rules and 13px padding, indicator name 21px/700 with its unit in （ ） and the method in an 18px UD sub-line, 基準年度 as its own column, values right-aligned Plex 28px, target in 600. Direction is a glyph plus a word (`↑ 増やす`, `↓ 減らす`, `→ 維持`), never a color. The main indicator gets a blue number and a blue `主指標` label, nothing else.

**Back page.** Head block, the timeline grammar (2px ink rule, five spans, a blue 20px month above, Latin caps step 18px, title 22px/700, description broken by hand at about 9 字), the 4px blue segment over the step done by the council; a roles table (who 21px/700 with an 18px sub-line, role 20px UD, count in Plex); then the contact block on a 4px blue rule: department 30px/700, a `dl` of address, phone, FAX and mail, and a side column with where to read the plan, the universal-design statement and the issue date.

**Document slop signs (in addition to section 6).**
- [ ] A page without the top edge, running head, folio or tab, or a tab whose current chapter is shown only by color.
- [ ] A figure or table without its `図N-N` / `表N-N` number or without a source line under it.
- [ ] Information carried by color alone: a status cell tinted green or red, a map line told apart only by hue. Add a glyph, a word, a weight or a pattern.
- [ ] A policy tree or position chart built from rounded or four-sided boxes instead of rules.
- [ ] Body text in Noto Sans JP instead of the UD face, or a heading set in BIZ UDPGothic.
- [ ] A sentence or number broken across the two columns.
