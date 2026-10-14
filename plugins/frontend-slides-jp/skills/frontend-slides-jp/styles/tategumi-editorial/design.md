# Tategumi Editorial: design system

All sizes are px at the 1920×1080 stage. Every value below is copied from `reference.html`; copy its CSS, not its copy.

## 1. Thesis

The slide is a page of a Japanese book: headings and prose are set vertically and read from the right edge toward the left, and only numbers and charts stay horizontal, gathered into one island on the left. Indigo (ai) marks only what changes or the single fact the slide exists to show.

## 2. Tokens

```css
:root {
  --paper: #F2EEE5;
  --sumi: #1D1C1A;
  --ai: #24466B;
  --sumi-60: rgba(29, 28, 26, .62);
  --sumi-35: rgba(29, 28, 26, .35);
  --rule: rgba(29, 28, 26, .22);
  --ai-30: #BCC6D1;
  --ai-55: #8297AE;
  --stage-bg: #121110;
  --slide-bg: var(--paper);
  --mincho: "Noto Serif JP", serif;
  --latin: "EB Garamond", "Noto Serif JP", serif;
  --ease: cubic-bezier(.2, .7, .1, 1);
}
```

- `--sumi`: all primary text, the 1px rule under the KPI row, the chart baseline (1.5px), the matrix row line.
- `--sumi-60`: leads on the TOC, secondary lines, captions, 柱, ノンブル, chart axis labels.
- `--rule`: every hairline between columns and every gridline. 1px, never thicker.
- `--ai`: change, the future, the one emphasized fact; also the TOC chapter numerals and the cover mark.
- `--ai-30`: context bars in a chart. `--ai-55`: a second shade, for a chart that needs two series (not used in the reference).
- `--sumi-35`: tertiary text such as past or inactive items (not used in the reference).

Fonts load as `family=EB+Garamond:wght@400;500;600&family=Noto+Serif+JP:wght@400;500;600&display=swap`.

## 3. Type scale

V = vertical (`.tate`), H = horizontal. Tracking in em.

| Role | Family | Weight | Size | Line-height | Tracking | Mode |
| --- | --- | --- | --- | --- | --- | --- |
| Display (cover title) | Noto Serif JP | 600 | 124 | 1.42 | .02 | V |
| H1 (slide statement) | Noto Serif JP | 600 | 80–92 (92 on a 3-line statement with a chart, 80 on a diagram) | 1.45–1.5 | .02 | V |
| H1 short (目次, 2 chars) | Noto Serif JP | 600 | 84 | 1 | .02 | V |
| H2 (column key, one or two kanji) | Noto Serif JP | 600 | 64 | 1 | 0 | V |
| H2 (TOC entry) | Noto Serif JP | 600 | 54 | 1.3 | .02 | V |
| H3 (matrix cell statement) | Noto Serif JP | 600 | 31 | 1.55 | .02 | V |
| Lead | Noto Serif JP | 400 | 25 (27 on the cover) | 2 (2.05 on the cover) | .03 (.04 on the cover) | V |
| Body secondary | Noto Serif JP | 400 | 20–22, sumi-60 | 1.85–1.9 | .03 | V |
| Row label | Noto Serif JP | 600 | 24 | — | .08 | V |
| 柱 (running head) | Noto Serif JP | 400, current section 500 sumi | 19, sumi-60 | — | .12 | V |
| Caption, Latin | EB Garamond | 400 | 17, uppercase, sumi-60 | — | .22 | H |
| Data label | Noto Serif JP | 400 | 20, sumi-60 | — | .03 | H |
| Source note | Noto Serif JP | 400 | 17, sumi-60 | 1.7 | .02 (base) | H |
| Number, hero | EB Garamond | 500, ai | 210 | .82 | -.02 | H |
| Number, secondary | EB Garamond | 500 | 84 | .82 | 0 | H |
| Unit after number | Noto Serif JP | 600 | 60 (hero), 26 (secondary), 6px gap | — | 0 | H |
| Year span (cover) | EB Garamond | 400 | 168 | .9 | -.01 | H |
| ノンブル, TOC page | EB Garamond | 400 | 22 / 26, sumi-60 | — | 0 | H |
| Chart labels | EB Garamond | 400 axis 17, year 20; end values 500 at 30 | — | — | H |

### Measured typesetting facts (Chromium 130, Google Fonts css2, 2026-10-14)

- `palt` does nothing in `writing-mode: vertical-rl`: 0.0% gain for every family tested. `vpal` is the vertical feature. On `百年、つづく「ことば」の店。` at 100px, Noto Serif JP went 1400 → 1146px with `vpal` (18.1% tighter); Noto Sans JP 18.1%, Shippori Mincho 22.5%, Zen Old Mincho and BIZ UDPMincho 0%. Do not swap the heading family to one with no `vpal`.
- On a run with brackets and parentheses (`「百年」、つづく。（二〇二六）`), `vpal` took 1500 → 1171px (21.9%). `text-spacing-trim` (`trim-both`, `space-all`, `normal`) changed nothing in the same build (1500px each), so `vpal` is the only working tightener.
- Horizontally, `fonts/catalog.json` records Noto Serif JP at `palt_gain` 0.165 and `vpal_gain` 0.164, so the horizontal parts (data labels, notes) keep the base `palt`.
- `text-combine-upright: all` works: `令和<span class="tcy">26</span>年` measures exactly 4em tall.

### Numeral rule (vertical runs)

| Digits | Treatment | Examples from the deck |
| --- | --- | --- |
| 1 | 漢数字 | 四倍, 週休三日, 年に四本, chapter numbers 一 二 三 四 |
| 2 | 縦中横: `<span class="tcy">48</span>` | 杉桶48本, 年12万人, 明治23年, 14人から22人 |
| 3 or more | 漢数字 | 二百年, 二〇二九年 (digit by digit with 〇), 二百ミリリットル (place values) |

Years are written digit by digit (二〇二六); quantities use place values (二百, 十年). The horizontal island uses EB Garamond lining figures instead (4.1, 25, 31, 2016), and the 柱, ノンブル and TOC page numbers use two Latin digits (02, 12). The horizontal source note and the cover date stay in 漢数字 so the voice matches the vertical text.

### How the base CSS interacts with vertical text

`viewport-base.css` defaults slides to palt, `h1–h3` to tracking 0 / line-height 1.35 and `p, li, td, dd` to tracking .02em / line-height 1.7, all at zero specificity. In vertical text `line-height` is the distance between columns, so the base 1.35 and 1.7 cram the columns. Every vertical heading and paragraph in this style is styled with a two-class selector (`.s3 .head`, `.s4 .band .m`, specificity 0,2,0 or higher) that sets its own line-height and tracking from the table above; any deck rule beats the base. The base `.tate` supplies `writing-mode: vertical-rl` and `vpal`. `.tcy` resets `font-feature-settings: normal` so two digits keep their own widths.

## 4. Signature devices

- **`.tate` and `.v`.** Every vertical run carries `class="tate"`. `.v { position: absolute; margin: 0 }` places one run by `right`/`top` (and a fixed `height` for leads, which sets the column length). `.tate > * { margin: 0 }` stacks children as columns. Use on every Japanese heading and paragraph except data labels and notes.
- **Right-to-left reading order.** The statement starts at `right:150px; top:132px`. The lead sits to its left, then a 1px `--rule` vertical line, then the content. Never place the heading on the left.
- **Hand-broken columns.** Each vertical heading and lead is broken with `<br>` at phrase boundaries into 2–3 columns, each short enough to fit the column without wrapping (lead columns are 520–600px tall at 25px).
- **Data island.** All numbers and charts sit horizontally in one block at `left:150px; top:120px; width:900px`, separated from the vertical text by a full-height 1px rule (`right:810px; top:132px; height:820px`). See the chart rules below.
- **柱 and ノンブル.** Every inner slide has a vertical 柱 at `left:64px; top:120px` (`deck name　section`, the current part in 500 sumi) and a ノンブル at `left:64px; bottom:96px`, 26px wide, with a 1px × 48px rule above it. The cover and closing have neither.
- **Column grid with hairlines.** TOC and matrix columns are separated by 1px `--rule` borders; the leftmost column also gets a left border. Columns read right to left (`flex-direction: row-reverse`).
- **Square mark.** 64px square, 1.5px ai border, one kanji at 36px 600 in ai. Cover and closing only.
- **Motion.** `.rv` elements fall in: opacity 0 → 1 and `translateY(-14px)` → 0, .9s `--ease`, delay `var(--i) * 110ms + 120ms`. Number `--i` from the rightmost element (0) leftward so columns appear in reading order. Reduced motion shows everything at once.

### Charts next to vertical text

- Charts are never vertical and never rotated. They are inline SVG, horizontal, in the data island, with every label in EB Garamond.
- One series: bars in `--ai-30`, the latest or focal bar in `--ai`. Label only the first and last bar values (30px 500, 14px above the bar). Year labels (20px) sit with their baseline 34px below the 1.5px sumi baseline; the focal year in sumi, others sumi-60.
- Gridlines every 100 units in `--rule`, axis numbers 17px at the left edge, no axis line on the left.
- Above the chart: a horizontal header row with the title (21px) on the left and units (18px sumi-60, `単位 キロリットル　年度`) on the right.
- Above that, the KPI row: hero number 210px ai, then secondary numbers 84px separated by 1px `--rule` verticals, all sitting on a 1px sumi bottom line. Labels 20px sumi-60 above each number.
- Source note at `left:150px; bottom:96px; width:900px`, horizontal, 17px sumi-60.
- The vertical heading states the conclusion the chart proves (海外出荷は、十年で四倍になった。); the hero number repeats it in Latin figures (4.1倍).

## 5. Slide grammar

### Reference slides

1. **Cover.** Vertical title (124px) right, vertical lead left of a rule, the year span (168px EB Garamond) top-left, the mark and company name bottom-left, the date bottom-right.
2. **Contents.** `目次` (84px) at the right edge with `Contents` (Latin caption, vertical-rl) at its foot, a 3-column vertical intro (25px sumi-60), then four 236px-minimum columns at `right:450px`, each 840px tall: chapter numeral (32px 500 ai, 漢数字), title (54px), two-line subline (22px sumi-60), page number at the column foot (26px EB Garamond).
3. **Conclusion + number.** Vertical 3-line statement (92px, the key phrase in ai), a 3-column lead, a full-height rule, and the data island: KPI row, chart header, 900×400 bar chart, source note.
4. **Diagram (matrix).** Vertical statement (80px) at the right. At `right:580px`, a 90px row-label column (変えないもの at top 170, 変えるもの at top 526 in ai) and four 262px columns, each 840px tall: column key (64px) at the top, a "keep" band (top 140) and a "change" band (top 496, with a 1px sumi top border, statements in ai). Each band holds a 31px statement and a 20px sumi-60 explanation.

### Derived slides

- **Chapter gate.** Cover layout without the year span: the chapter numeral (漢数字) in ai at 124px as the first column at `right:150px`, the chapter title at 124px in sumi beside it, a 2-column lead at 25px. 柱 and ノンブル present.
- **Comparison.** The matrix with two columns instead of four, columns widened to 360px; right column = before / today (sumi), left column = after / plan (ai statements). Keep the row line at top 496 if both sides have two levels; otherwise one band per column.
- **Table.** Up to 4 items × 2 rows: use the matrix (columns are items, bands are attributes, row labels in the 90px column). Anything wider, or any table of numbers, goes horizontal into the data island: Noto Serif JP 20px labels, EB Garamond 30px values, 1px `--rule` row lines, 1px sumi header line, the focal row in ai. The vertical heading stays on the right.
- **Quote.** One vertical quote at `right:150px; top:132px`, Noto Serif JP 500, 80px, line-height 1.6, inside 「」 (vpal places the brackets); the speaker as a vertical 22px sumi-60 column left of a 1px rule. Leave the left half empty paper; no photo.
- **Timeline.** Columns right to left, oldest on the right, like the TOC: each 280px column (a 2-line explanation needs about 270px; at most four events per slide) with the year in 漢数字 (32px 500), the event title (31–54px), a 2-line explanation (22px sumi-60). Past columns in sumi, future columns' numerals and titles in ai. 2-digit era years go in `.tcy` (明治<span class="tcy">23</span>年).
- **Team.** One 236px column per person, right to left: role (20px sumi-60), name (54px 600, a space between family and given name), two-line note (22px sumi-60). At most five people per slide. No portraits unless the user supplies them; never use icons in their place.
- **Closing.** Mirror the cover: one vertical sentence (124px, the last phrase in ai) at the right, a 1–2 column lead, the mark and company name bottom-left, the date or contact bottom-right in 漢数字. No 柱 or ノンブル.

## 6. Slop signs

- [ ] Any Japanese heading or paragraph set horizontally outside the data island, the source note, the cover date or the maker block.
- [ ] A vertical run without `.tate` (computed `font-feature-settings` should be `"vpal"`, not `"palt"`); loose 、。「」 spacing is the visible symptom.
- [ ] A 1-digit or 3+-digit Arabic number inside vertical text (rotated sideways), or a 2-digit number without `.tcy`, or `.tcy` holding 3 or more digits (squashed).
- [ ] Latin words longer than a caption inside vertical text; move them to the horizontal parts.
- [ ] A vertical heading or paragraph inheriting the base line-height 1.35 / 1.7 (columns touching) or the base tracking 0.
- [ ] A hand-broken column that wraps again because it is longer than its column height, leaving one or two characters in an extra column.
- [ ] A column starting with 、 or 。 or a line ending with 「.
- [ ] The heading not at the right edge, or content that has to be read left to right before the heading.
- [ ] A chart drawn vertically or rotated, Japanese axis labels in the chart, or the chart crossing the rule into the vertical text.
- [ ] More than one hero number per slide, or numbers in Noto Serif JP instead of EB Garamond in the island.
- [ ] Indigo on something that is neither a change nor the focal fact (decorative ai), or ai elements on one slide that point at different facts (on slide 3 the phrase 四倍, the 4.1 hero, the last bar and its 484 label are one fact).
- [ ] Rules thicker than 1px (the chart baseline is 1.5px, the mark 1.5px), drop shadows, gradients, rounded cards, icons, photos used as decoration.
- [ ] Missing 柱 or ノンブル on an inner slide, or present on the cover or closing.
- [ ] Chapter numbers written 1. 2. 3. or ①②③ instead of 一 二 三.
- [ ] Text smaller than 17px, or a matrix with more than four item columns.
- [ ] Reveal order that animates left to right instead of from the rightmost column.
