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

## 7. Document pages

`reference-a4.html` is a 6-page company brochure for a 周年誌 (cover, 理念 statement, 当主の挨拶, 沿革, figure, 会社概要). Sizes are px at the 1240×1754 page. Tokens are the same as section 2, plus `--sumi-10` (a paper shade for the fourth chart series), `--desk-bg: #D8D2C6`, `--dan: 704px` and `--dan-gap: 46px`. Documents have no `.rv` motion. Each page is vertical inside (read right to left); pages still stack top to bottom.

### 版面 and 段組

- Every page is set as the odd (left) page of a right-bound (右綴じ) vertical book, so the 小口 (fore-edge) is the left edge. The 版面 is 天 150, 地 150, ノド (right) 96, 小口 (left) 128: x 128–1144, y 150–1604. The frame lives in the 128px left margin. A printed spread would mirror it on even pages. On screen every page is the same, so the frame does not move.
- **2段組.** The 版面 is two 段 of 704px stacked top and bottom, with a 46px 段間: 上段 y 150–854, 下段 y 900–1604. Every page uses this grid: headings sit in the 上段, leads in the 下段 of the same strip, and timelines, lists and data islands take one 段 each.
- **本文.** Noto Serif JP 400, 23px, line-height 1.8 (a 41.4px line pitch), tracking .02em, so one line holds exactly 30字 (30 × 23.46 = 704). A 段 of 704px holds 17 lines. The body is ベタ組み: `.honbun` sets `font-feature-settings: normal` to override the `vpal` of `.tate`, so the 字送り is even and 30字 fill the line. It is justified (the base rule), with a 1字 indent. Use CSS multicol in vertical-rl: `width: 704px` (17 lines), `height: 1454px`, `column-count: 2`, `column-gap: 46px`, `column-fill: auto`. In vertical-rl the columns stack top to bottom, so the text fills the 上段 right to left, then the 下段. Never set body text in one 段 across the full 1454px height (60字 per line).
- **Numerals.** Use the rule in section 3. 1 digit and 3+ digits in 漢数字 (三度, 百七十年, 二〇二六年), 2 digits in `.tcy` (明治<span>22</span>年, <span>41</span>パーセント). In the horizontal islands, numbers are EB Garamond lining figures (1856年, 4,800万円).
- **Latin in vertical text.** Half-width Latin rotates 90° in vertical-rl (`EU` lies on its side). Write abbreviations of 1–3 letters in full-width (`ＥＵ`), which sits upright one letter per em, and wrap them in `.abbr { white-space: nowrap }`: without it a line break split `Ｅ|Ｕ` in testing. `.tcy` also works for 2 half-width letters, but squashes 3 (`ISO`). Longer Latin goes into the horizontal parts. The only Latin set sideways is the caption (`.cap`).

### Page frame (every page except the cover)

- **柱 (running head)**, `.hashira`: vertical, `left: 54px; top: 150px` (aligned with the 天 of the 版面), 19px, tracking .12em, `--sumi-60`. Text is `略社名　誌名　<b>章番号　章名</b>`, the current chapter in 500 `--sumi`. In vertical books the 柱 sits in the 小口 margin at the 天. That replaces the default horizontal running head at top 64.
- **ノンブル (folio)**, `.nombre`: two Latin digits, EB Garamond 22px `--sumi-60`, centred in a 30px box at `left: 48px; bottom: 64px`, under a 1px × 48px `--rule`. This is the 16:9 ノンブル moved to the 地 of the 小口. Arabic folios are the modern norm in vertical books too, so no 漢数字.
- **爪 (chapter tab)**, `.tsume`: a `--sumi` field 36 × 190px bleeding off the left edge. Inside, the chapter number and name are set vertically in `--paper`, 17px 500, tracking .1em. It steps 190px lower per chapter: `top: calc(600px + (var(--ch) - 1) * 190px)`, chapter 1 at 600 and chapter 5 at 1360. That is how a bound book's thumb index shows the chapter on the closed fore-edge. The step is the only frame element that changes between pages. The tab carries no `--ai`, because indigo is not decoration.
- **Latin caption**, `.cap.v`: vertical (sideways Latin), `right: 96px; top: 150px`, 17px, tracking .22em, uppercase. It is the first column read on each page. It is the kicker; the heading beside it is 3–5× larger.

### Pages

- **Cover.** The 16:9 cover rotated into portrait. Title vertical at `right: 120px; top: 180px`, 128px 600, line-height 1.42, three hand-broken columns, the last in `--ai`. A 1px `--rule` at `right: 690px` (640px tall), then a 3-column lead at `right: 730px`, 27px, line-height 2.05. The year span sits in the lower left (`left: 120px; top: 1110px`, EB Garamond 168px, 1856 / 92px hairline / 2026 in ai, a 22px caption). The maker block (64px mark, company 30px 600) is at `left: 120px; bottom: 104px`; the date (漢数字, 20px) and the fictional-data line (17px) at `right: 120px; bottom: 104px`. No frame.
- **Statement (理念).** 上段: label 社是 (26px 600 `--sumi-60`), the 社是 at 88px 600 with line-height 1.5 in three columns (the promise in ai), a 1px rule, then the origin of the 社是 as a 4-column lead in `--sumi-60`. A 1px `--rule` across the 段間 at y 877. 下段: a 30px label column, then three 290px columns separated by hairlines (the TOC device): 漢数字 32px 500, title 40px 600 line-height 1.35 in two lines, explanation 22px `--sumi-60` in two lines. The lower third stays empty paper.
- **Message (reading page).** A 260px strip at the right: the heading in the 上段 (60px 600, two columns, `right: 132px`), the lead in the 下段 (25px, three columns), and the speaker beside it (role 18px `--sumi-60`, name 30px 600 tracking .12em). A full-height 1px rule at `right: 374px`, then the 2段組 本文 at `right: 398px` (about 1,000字 in 34 lines). The signature closes the text 地付き (`text-align: end`): date 23px `--sumi-60`, name 28px 600 tracking .16em. No portrait photo.
- **沿革 (the A4 timeline).** The heading and lead strip as on the message page, with the heading at 56px. Then a full-height rule at `right: 334px` and two tiers of 752px (`right: 358px`), one per 段, each with four 188px event columns read right to left, oldest at the top right. Each tier has a 1px `--sumi` time axis 44px below the 段 top, with the Western year above it at each column's right hairline (EB Garamond 24px `--sumi-60`, horizontal). Under the axis, from 76px, each column holds the era year (22px 500 `--sumi-60`, 2 digits in `.tcy`), a title (30px 600) and two lines (20px `--sumi-60`). From 452px a minor event follows: a 28px hairline, then the era year (`--sumi`) and two hand-broken lines (20px). A turning point the headline names gets an 11px `--ai` square on the axis, a 500 `--sumi` year and an `--ai` title. The lead explains the mark (藍の印は…). Eight main and eight minor events fit; with more, add a page. Do not shrink the columns.
- **Figure (data island).** The A4 move: the island leaves the left side of the 16:9 slide and takes the 下段 instead. 上段: the heading (64px, line-height 1.45, three columns, the fact in ai), a 3-column lead, a rule, then 10 lines of 本文 in the same 30字 measure. A 1px `--rule` at y 877 across the 版面 separates the vertical text from the horizontal island (x 128–1144, from y 900). In the island: the KPI row (hero 176px ai with a 50px unit, two secondary numbers at 76px, labels 20px `--sumi-60`, a 1px `--sumi` bottom line), the chart header (21px title, 18px units), then the chart at 1016 × 400. The source line sits at `bottom: 116px` (17px `--sumi-60`, 漢数字 dates, 架空のデータ). The reference fits `d-stacked-100`. Years and percentages are EB Garamond (row labels 22px, the latest year in `--sumi`; values 22px 500; ticks 17px), and the legend keys are Noto Serif JP 20px, the only Japanese in a chart. Series run ai, `--ai-55`, `--ai-30`, `--sumi-10`, with a 3px paper gap between segments and no bold. The accent series, the hero number and the heading phrase are one fact (41%, 四割).
- **Data (会社概要).** 上段: `会社概要` at 84px with line-height 1, a 3-column lead, a rule, then four 176px site columns with hairlines (name 34px 600, two lines 22px `--sumi-60`; the new site in ai). 下段: the profile table as a horizontal island, full 版面 width. It has a 1px `--sumi` top line and twelve rows of about 52px under 1px `--rule`; labels are a 200px column at 20px `--sumi-60`, values 21px, figures EB Garamond 23px. The row of the new site is in ai, the same fact as its column above. An as-of line and the fictional-data line sit in the notes slot.

### How page-base.css behaves in vertical-rl (measured, Chromium 130)

- `:where(.page) :where(p) { text-align: justify; word-break: normal }` works in vertical-rl. It justifies along the column, so 本文 lines end flush at the 地 of each 段. Hand-broken leads are unaffected, because lines ended by `<br>` are not justified. Nothing to override.
- `:where(.page) { font-feature-settings: "palt" }` does nothing in vertical text; `.tate` supplies `vpal`. Headings and leads keep `vpal`. 本文 overrides it to `normal` (ベタ組み) in this style.
- `:where(.page) :where(h1, h2, h3) { line-height: 1.4 }` and `p { line-height: 1.8 }` set the distance between vertical columns. 1.8 is right for 本文. Every heading and lead sets its own line-height with a two-class selector, as in section 3.
- `.page svg { max-height: 100% }` is harmless: the chart wrapper has a fixed 1016 × 400 box. The chart reads `data-w`/`data-h`, but the svg's `clientWidth` under the page zoom (0.29 on a phone) measured 1016, the layout size, so `clientWidth` would also work.
- Print (`zoom: 0.64`) keeps the vertical layout: `export-pdf.sh` printed six A4 pages identical to the screen.

### Document slop signs (in addition to section 6)

- [ ] A horizontal running head at the top of a vertical page, or a folio on the right. Here the 柱 and ノンブル sit in the left (小口) margin.
- [ ] 本文 in one 段 longer than about 30字 per line, or set with `vpal` (uneven 字送り, ragged grid).
- [ ] An 爪 that does not step with the chapter, or one in ai.
- [ ] A data island beside the vertical text instead of in the 下段, or a chart crossing the y 877 rule.
- [ ] Half-width Latin in vertical text (rotated sideways), or a full-width abbreviation split across two lines.
- [ ] A vertical block whose columns overflow to the right of its box. A vertical-rl block inside a horizontal parent is placed from the left, so a box that is too narrow pushes its first column onto the neighbour. Size the box, or right-align it with `display: flex; justify-content: flex-end` on the parent.
