# Swiss Typogrid — design system

All sizes are px on the 1920×1080 stage. Copy CSS from `reference.html`; this file says what each rule is for and how to extend it.

## 1. Thesis

The grid is the picture. A 12-column × 6-row module is drawn on the slide, and every block of type, every rule and every bar starts and ends on its lines. Black 900-weight Japanese against small Latin text carries the hierarchy. One signal red per slide marks the single thing to look at.

## 2. Tokens

```css
:root {
  --paper: #F5F4F0;
  --ink: #0B0B0B;
  --signal: #E10600;
  --mute: #8C8B87;
  --stage-bg: #0B0B0B;
  --slide-bg: var(--paper);
  --jp: "Noto Sans JP", sans-serif;
  --lat: "Schibsted Grotesk", "Noto Sans JP", sans-serif;
  --col: 122px;
  --gut: 24px;
}
```

Derived colors used in `reference.html` (do not add others):

| Use | Value |
| --- | --- |
| Grid lines on paper | `rgba(11,11,11,.08)` |
| Grid lines on red | `rgba(255,255,255,.16)` |
| Table hairlines (matrix cells, row labels) | `rgba(11,11,11,.25)` |
| Chart baselines | `rgba(11,11,11,.18)` |
| Text and rules on the red panel | `#fff` |

### The module

| | Value |
| --- | --- |
| Grid box | x 96–1824, y 120–1008 (1728 × 888) |
| Margins | 96 left and right; 120 top (the running head lives in y 44–92); 72 bottom |
| Column | 122, gutter 24, pitch 146 |
| Row | 128, gutter 24, pitch 152 |
| Column n | starts at x = 96 + 146(n−1), ends 122 later |
| Row n | starts at y = 120 + 152(n−1), ends 128 later |

| Col | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| x start | 96 | 242 | 388 | 534 | 680 | 826 | 972 | 1118 | 1264 | 1410 | 1556 | 1702 |

| Row | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- |
| y start | 120 | 272 | 424 | 576 | 728 | 880 |

Span widths: n columns = 146n − 24 (1→122, 2→268, 3→414, 4→560, 5→706, 6→852, 8→1144, 10→1436, 12→1728). Span heights: n rows = 152n − 24 (1→128, 2→280, 3→432, 4→584, 6→888).

### How elements snap

- Every slide body is one `.grid` (`position:absolute; left:96px; top:120px; 1728×888; grid-template-columns: repeat(12, var(--col)); grid-template-rows: repeat(6, 128px); gap: var(--gut)`). Place blocks only with `grid-column` / `grid-row`. No absolute `left`/`top` inside the grid, no `margin-left`, no centering.
- A block's vertical edge is its row line: `align-self: start` hangs it from the top of its first row, `align-self: end` stands it on the bottom of its last row. The bottom row of the slide always stands on y 1008.
- Optical correction is the only exception, and it is fixed per size: the 272px title uses `margin-top: -14px`, 84px headlines `-6px`, the 218px cover year `-8px`, so the ink (not the line box) touches the row line.
- Nested layouts reuse the module instead of inventing widths: the contents row is `var(--col)` + 4 columns + 3 columns; the matrix is its own `repeat(12, var(--col))` with `column-gap: var(--gut)`; the cover facts are `repeat(2, 268px)` (two 2-column spans). A table column or a chart label column is exactly one column (122).
- The running head (`.head`) is the same 12-column grid at y 44, height 48, with a 2px ink bottom rule: series name in col 1, Japanese name in col 4, section in col 7, page `NN / NN` in col 12. Empty `<span></span>` cells hold the columns.
- Anything outside the grid box sits on fixed lines: the running head at y 44, a footnote at y 1024 (`.foot`, left 96, width 1728). The cover's red panel starts at x 1264 (col 9) and bleeds to the right and top/bottom edges.
- Drawn grid lines (`.gridlines`) are a second grid with the same template placed before `.grid` in the DOM. Each `<i>` is one column and draws its left and right edges (1px). Draw only the columns the slide needs (the cover draws cols 1–8 on paper and 9–12 on red; the matrix draws all 12).

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking | Class |
| --- | --- | --- | --- | --- | --- | --- |
| Display (cover title) | Noto Sans JP | 900 | 272 | 1.0 | 0 | `.h-xl` |
| h1 (section statement) | Noto Sans JP | 900 | 112 | 1.12 | .01em | `.h-l` |
| h2 (slide headline, the conclusion) | Noto Sans JP | 900 | 84 | 1.16 | .01em | `.h-m` |
| h3 (list item) | Noto Sans JP | 900 | 60 | 1.05 | .01em | `.s-toc .nm h3` |
| h4 (table row label) | Noto Sans JP | 900 | 30 | 1.1 | .01em | `.s-mx .rl h4` |
| Latin name block | Schibsted Grotesk | 900 | 60 | .98 | −.01em, uppercase | `.s-cover .latin` |
| Body | Noto Sans JP | 500 | 28 (27 cover lead, 24 side note, 22 list text) | 1.75 (1.7 side, 1.55 list) | .02em | `.body` |
| Caption / source | Noto Sans JP | 500 | 17, color mute | 1.6 | .02em | `.note` |
| Label | Schibsted Grotesk | 700 | 18, uppercase | 1.3 | .14em | `.lab`, red with `.lab.sig` |
| Running head | Schibsted Grotesk (JP cells Noto Sans JP) | 500 (page 700) | 17 | 1.35 | .06em (JP .02em) | `.head` |
| Number | Schibsted Grotesk | 900 | 218 cover year · 168 KPI and counts · 96 dates · 72 facts · 44 matrix day | .86 (1.0 at ≤96) | −.02em, tabular | `.num` |
| Chart value / year | Schibsted Grotesk | 700 | 34–36 | 1.0 | 0, tabular | `.bar .v`, `.bar .y` |
| Unit | Noto Sans JP | 900 | about ⅓ of its number: 56 with 168 (KPI), 48 with 168 (counts), 34 with 96, 26 with 72 | — | 0 | `.unit` |

Rules:
- The type-scale classes set their own line-height and tracking; the base block is wrapped in `:where()` and has zero specificity, so any deck rule wins over it. The `.slide` prefixes in `reference.html` are harmless and not required.
- Japanese is always Noto Sans JP; Latin words, numbers and labels are always Schibsted Grotesk. Do not set a Japanese headline in the Latin family to "make it Swiss".
- Weights in use: 900 for headings and numbers, 700 for labels and chart values, 500 for text. Do not use 400 or below at slide sizes.
- Headlines break by hand with `<br>` at phrase boundaries (2 lines). Keep each line within its column span; at 84px with .01em tracking a 10-column span (1436) holds 16 characters.

## 4. Signature devices

| Device | Job | Where |
| --- | --- | --- |
| Drawn grid (`.gridlines`) | Shows the module the slide is built on; in tables it becomes the column rules | Cover, tables and calendars. Not on slides whose blocks already draw the structure with rules (contents, KPI) |
| Knockout (`.ko`, `.ko.on-sig`, `.fit`) | A text block paints `--slide-bg` (or red on the panel) behind itself, so grid lines stop at its edges and never cross a glyph. `.fit` (`justify-self: start`) shrinks the ground to the text width so lines keep running beside short lines | Every text block that sits over drawn grid lines: titles, headlines, leads, side notes, matrix row labels and the corner cell. Not on matrix value cells, where the line is the table rule |
| Cell inset | Matrix cells and day headers get `padding-left: 10px` so their content clears the column line | Any table drawn on the grid |
| Running head | Series, name, section and page on the column lines | Every slide, cover included. The cover head never repeats the title or the Latin name |
| Block rule | 3px ink top rule starts every content block (KPI, list row, day header); 10px for emphasis (weekend days); 2px for the head and facts; 1px hairlines inside tables | Everywhere a block begins. No boxes, cards, fills or shadows |
| Red panel | One full-height signal block from col 9 to the bleed, holding white numbers | Cover; a section divider may reuse it |
| Signal accent | The one item to look at: current year bar, the share being argued, the "night" programme | At most one category per slide. Never on two unrelated things |
| Area squares | Matrix values drawn as ink squares whose side is `sqrt(v/max) × 64` px, next to the number | Calendars and frequency tables |
| Rise | One staggered rise per slide (`.rv`, `--i` × 90ms, 24px, .8s) | Content blocks only, never the head or grid lines |

Data on charts and tables is generated from one JS array per slide (`VISITORS`, `PROGRAMS`) so numbers in the chart and the text cannot drift.

## 5. Slide grammar

### Reference slides

1. **Cover** (`.s-cover`). Red panel cols 9–12. Left: 272px title rows 1–4; Latin name (once) cols 1–4 and lead cols 5–8 standing on y 1008. Right, in white: year rows 1–2, dates rows 3–4 under a 3px rule, two facts rows 5–6. Head split at x 1264 into an ink-ruled left part and a white-ruled right part.
2. **Contents / gate** (`.s-toc`). Intro label + 112px statement in cols 1–4 from row 1; supporting body cols 1–3 standing on row 6. Four rows in cols 5–12, each `1fr`, each starting with a 3px rule (last one closed with a bottom rule): index (1 col), name + Latin label + one-line description (4 cols), count with unit (3 cols). The highlighted row is red in index and count only.
3. **Conclusion + numbers** (`.s-kpi`). 84px two-line conclusion cols 1–10, rows 1–2. Two KPI blocks cols 1–5 (rows 3–4 hanging, rows 5–6 standing), each label → 168px number + 56px unit → note or split bar. Chart cols 7–12 rows 3–6: label, four rows of year (1 col) + value + bar, source note at the bottom. Only the current year is red.
4. **Diagram / matrix** (`.s-mx`). 84px headline cols 1–8 rows 1–2 with knockout; side note cols 10–12 standing on row 2. Matrix rows 3–6 across all 12 columns: row labels cols 1–2, one day per column cols 3–12, header row 92px then four `1fr` rows. Drawn grid lines become the column rules; footnote at y 1024.

### Deriving other slides

- **Comparison** (2 or 3 options). Headline cols 1–10 rows 1–2. Options as equal spans on rows 3–6: two options = cols 1–6 and 7–12; three = cols 1–4, 5–8, 9–12. Each option starts with a 3px rule, then a label, a 60px name, body text, and one number at the bottom row line. The recommended option gets the red number; the others stay ink. No VS badges, no checkmark icons.
- **Table.** Use the matrix pattern: draw the grid lines, put row labels in cols 1–2 (or 1–3) with paper ground, one column per field. Header row 3px rule with Schibsted 700 labels; body cells 1px `rgba(11,11,11,.25)` top rules and a 10px inset. Keep numbers flush left at the inset, like every other cell, so each column reads from its line. At most 10 data columns and 6 rows; split the table otherwise.
- **Quote.** Quote in Noto Sans JP 900 at 84px (or 112px for under 12 characters), cols 1–9 hanging from row 1 with knockout over drawn grid lines. Attribution: name in Japanese 28px/500 plus role as a `.lab` in mute, cols 1–4 standing on row 6, under a 3px rule. Quotation marks are the Japanese 「」 inside the text, not decorative oversized marks.
- **Timeline.** Horizontal: one column per period (years or months) on cols 3–12, drawn grid lines on, period number as a 44px Schibsted 900 header under a 3px rule (10px rule for the current period), events as 22px text in the cells, row labels for tracks in cols 1–2. The present period is the one red header. Vertical alternative for long text: rows 1–6 as six steps, year in col 1–2 as a 72px number, text cols 3–8.
- **Team.** Members as 2-column or 3-column spans (4 or 6 per row, max 2 rows of people per slide). Each: 3px rule, name in Noto Sans JP 900 30px, role as `.lab` mute, one line of body. Photos, if supplied, are grayscale rectangles filling the span width with the same aspect, top-aligned on a row line; never circles.
- **Closing.** Reuse the cover geometry: red panel cols 9–12 with the next date or call to action as a 96–218px number in white; on paper, a 112px statement cols 1–8 hanging from row 1 and the contact or URL as 28px body standing on row 6. Same head as the cover, page number last.
- **Section divider.** 272px Latin section number (`02`) in Schibsted 900, cols 1–4 rows 1–2, the section name at 112px cols 1–8 rows 3–4, grid lines drawn with knockout. Optionally the red panel.

## 6. Slop signs

Check every slide before delivery:

- [ ] A drawn grid line crosses a letter, digit or the edge of a unit. Every text block over drawn lines has `.ko` (`.ko.on-sig` on red); table cells clear the line by the 10px inset.
- [ ] A block starts or ends off the module: an `left:`/`top:` value inside `.grid`, a width that is not 146n − 24, or a block that floats between row lines instead of hanging from or standing on one.
- [ ] Grid lines drawn on a slide whose blocks already draw rules (lists, KPI blocks), so lines double up.
- [ ] The same text appears twice on a slide: the title or the Latin name repeated in the running head, a headline repeated as its label.
- [ ] More than one red thing per slide, or red used for decoration (a red underline, a red icon) instead of the one item to look at.
- [ ] A fifth color, a gradient, a shadow, a rounded corner, a card box or an icon. The style has rules and type only.
- [ ] Centered text anywhere. Everything is flush left on a column line.
- [ ] A number and its unit at the same size, or a number in the Japanese family. Units are about ⅓ of the number, numbers are Schibsted 900 tabular.
- [ ] Mixed weights in one role (a 700 headline next to a 900 one), or weight 400 at slide sizes.
- [ ] Latin text set in Noto Sans JP, or Japanese set in Schibsted Grotesk.
- [ ] A headline that names a topic ("日程について") instead of stating the conclusion ("週末は昼に開き、平日は夜に集める。").
- [ ] Bars or squares not proportional to the data, or chart numbers typed by hand instead of generated from the data array.
- [ ] A heading that falls back to the base `line-height: 1.35` because its class sets none, so the 272px title grows taller than rows 1–4.
- [ ] Body text below 17px, or more than 5 lines of body in one block.
- [ ] Hand-placed line breaks that now wrap a second time: check each `<br>` line fits its column span at the final size.
