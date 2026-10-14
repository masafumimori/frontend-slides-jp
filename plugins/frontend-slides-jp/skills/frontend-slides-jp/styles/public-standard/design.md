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
