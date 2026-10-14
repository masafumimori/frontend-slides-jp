# Infographic design system

A document-only style (`doc-a4`). All sizes are px at the 1240×1754 page.

## 1. Thesis

Pictures carry the numbers. Following ISOTYPE (Otto Neurath, Gerd Arntz) and Japanese public pictograms, a quantity is shown by **repeating one pictogram at a stated unit, never by stretching it**: the signature device is the **counted row** with its unit chip (`1つ ＝ 1,000世帯`). Every page carries at least one counted row. All pictograms and scenes come from one kit drawn on one grid, in flat ink, one key color and one blue. The exact number stays next to the row, and the source line stays under the figure.

## 2. Tokens

```css
:root {
    --ink: #1F2A30;
    --key: #D64933;
    --key-text: #B8381F;
    --sea: #2F6A8C;
    --mute: #5A6268;
    --paper: #F8F6F1;

    --sea-tint: color-mix(in srgb, var(--sea) 14%, var(--paper));
    --sea-mid: color-mix(in srgb, var(--sea) 40%, var(--paper));
    --ink-tint: color-mix(in srgb, var(--ink) 8%, var(--paper));
    --ink-ghost: color-mix(in srgb, var(--ink) 18%, var(--paper));
    --rule: color-mix(in srgb, var(--ink) 25%, var(--paper));

    --jp-head: "Noto Sans JP", sans-serif;
    --jp-body: "BIZ UDPGothic", sans-serif;
    --num: "Jost", sans-serif;

    --desk-bg: #DAD6CC;
    --page-bg: var(--paper);
}
```

Color roles (two accents, each with one job):

- `--ink`: every pictogram by default, text, rules, the cover's ground band, chapter tab, folio tile, pictogram tiles.
- `--key`: the fill of the **one counted thing the headline names** (the 紙類 row, the sorting centre on the cross-section, the cover's factory and trucks). 4.0:1 on paper, so it is used for graphics only (≥ 3:1). Text in the accent uses `--key-text` (5.4:1).
- `--sea`: the second category and the landscape: water, river, sea, mountains (as `--sea-tint` and `--sea-mid`), trains; also the kicker and chapter numbers (5.5:1).
- `--ink-ghost`: unfilled slots of a counted row ("of 10"). `--ink-tint`: the ground under a cross-section and pull boxes.

Meaning is never carried by color alone: the key row also has a text tag (「最多」) or its value in the headline, slots are filled vs. ghost by shape position, and route lines are labelled with their minutes.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Cover title | Noto Sans JP | 900 | 124 | 1.18 | 0 |
| Headline (h1) | Noto Sans JP | 800 | 60 | 1.38 | 0 |
| Kicker | Jost caps, sea, key dot before | 600 | 20 | 1 | 0.14em |
| Lead | BIZ UDPGothic | 400 | 26 | 1.75 | 0.02em |
| Section heading (reading page) | Noto Sans JP, 44px spot pictogram before | 700 | 27 | 1.4 | 0 |
| Body | BIZ UDPGothic | 400 | 22 | 1.8 | 0.02em |
| Row label | Noto Sans JP / Jost share under it | 700 / 500 | 22 / 18 | 1.3 | 0 |
| Row value | Jost / unit Noto Sans JP 700 | 600 | 36 / 18 | 1 | 0 |
| Big number | Jost / unit Noto Sans JP 700 | 600 | 80 (KPI), 76 (summary), 132 (cycle centre) / about 1/3 | 1 | -0.01em |
| Unit chip | Noto Sans JP 700, numbers Jost 600 | | 18 (16 small) | 1 | 0 |
| Notes, sources | BIZ UDPGothic | 400 | 17 | 1.7 | 0 |
| Running head, folio | Noto Sans JP 700 19 / Jost 600 22 | | | | |

## 4. Signature devices

### The counted row (the signature)

- One pictogram per unit, in a line; long counts wrap at a fixed number per line (14 at 40px, 13 at 30px, 20 at 44px), so equal counts make equal lengths across rows.
- A remainder is the pictogram cut from the left to its fraction of the 48-unit box (12.5 → twelve and the left half of one). Never round a remainder away and never scale a pictogram to show size.
- When the row shows a share ("10 のうち 7.3"), draw all slots: filled in tone, the rest `--ink-ghost`.
- Every row has a **unit chip**: 2px ink border, radius 4, the pictogram at 24–30px, `1つ ＝ 200 t`. One chip may serve a whole table when all rows share the unit (say so: 「どの記号も1つ ＝ 200 t」).
- The exact value sits at the row's end or above it, and the source line is in the foot slot.
- Built by the `.iso` script in `reference-a4.html`: `data-sym`, `data-n` (may be fractional), `data-slots`, `data-key` (how many of the first pictograms take the key color), `data-per`, `data-size`, `data-gap`, `data-tone` (`ink`, `key`, `paper`), `data-label` (the `aria-label`).
- Sizes: 40px in a data table, 26–30px in a KPI or table cell, 44px on the cover band, 38px in a pull box; never below 20px.

### The pictogram kit

Construction grammar (draw every new pictogram this way):

1. **Grid**: `viewBox="0 0 48 48"`. Live area 4–44 on both axes; only the sun's rays and leaf stem may reach 2 units from the edge. Coordinates in whole units, halves only where a 45° line demands them.
2. **No strokes.** Every shape is a filled primitive; color comes from `currentColor` (`fill` inherited from `<use>`).
3. **Primitives**: circles; rectangles, square-cornered or with the **one radius, 4 units**; 45° cuts and slopes (roofs, shoulders, cabs, mountains). No other angles, no free curves except circle arcs.
4. **Gaps, not lines**: parts are separated by a gap of at least 2 units (roof and wall, head and torso, cab and box). Holes (windows, screens, ¥) are `fill-rule="evenodd"` sub-paths, never paint in the paper color, so pictograms work on ink and paper alike.
5. **Smallest detail 3–4 units**, so a pictogram still reads at 20px.
6. **Silhouettes, no faces**: people are counting units (ISOTYPE), not characters. No skin colors, no facial features, no gendered clothing.
7. **Composites** (`p-family`) reuse other symbols with `<use>` scaled 0.5–0.75 and keep the 2-unit gap.

The 17 symbols, defined once in a hidden `<svg class="kit">` (not `display: none`) and placed with `<use href="#p-…">`:

| id | Built from |
| --- | --- |
| `p-person` | head circle r5, torso rect r4, two leg rects with a 2-unit gap |
| `p-family` | two persons at 0.75, one at 0.5 |
| `p-house` | 45° roof triangle, wall with a door notch |
| `p-factory` | three 45° sawtooth teeth, chimney, wall with a door notch |
| `p-truck` | box rect r4, cab with a 45° cut, two wheel circles |
| `p-shop` | 45° awning trapezoid, wall with a door notch |
| `p-leaf` | two circle-arc halves split along the diagonal, 45° stem |
| `p-drop` | circle with two 45° tangents to the tip |
| `p-yen` | disc with a ¥ hole (45° arms, two bars) |
| `p-doc` | sheet with a 45° corner cut, three line holes |
| `p-phone` | rect r4, screen and button holes |
| `p-train` | body r4, window and light holes, two 45° feet |
| `p-tree` | crown circle r14, trunk rect |
| `p-sun` | disc r10, eight 4×8 rays at 45° steps |
| `p-bottle` | cap, 45° shoulders, label gap, body r4 |
| `p-can` | rim and body r4 |
| `p-box` | split lid, body with a handle-slot hole |

To add a pictogram: name it `p-<noun>`, sketch it on the 48 grid with the primitives above, check it at 20px and 120px beside `p-house`, and check its visual weight (filled area about 35–55% of the live area). One noun, one pictogram: never two drawings for the same thing in one document.

### Scenes

Larger illustrations composed from the kit plus three landscape primitives: **45° triangles** for mountains and slopes, a **ground line** with an ink or `--ink-tint` field below, and flat **water** bands in `--sea`. Pictograms stand on the ground: `y = ground − size × 44/48`. Sizes are multiples of 24 (72, 96, 120, 144, 240) so line weights stay comparable. Depth comes only from overlap and tone (sea-tint behind sea-mid), never from perspective, isometric views, shadows or gradients. The key color marks the scene's subject only.

### Connectors

The only lines that are not rules: routes and cycle links, 5px ink, square ends, finished with a filled 90° chevron (45° each side, 22px). Leaders to labels are not used; labels sit next to their object.

### Frame devices

- **Running head** at top 64 over a 2px ink rule at 112: logo tile (36px ink square, key leaf) and organisation name left; chapter number (Jost 22 sea) and name right.
- **Chapter tab**: ink strip 56×340 on the right edge at top 240, radius 4 on the inner corners, holding the chapter's pictogram (34px paper), number and vertical name. Each chapter owns one pictogram.
- **Folio**: a 48px ink tile with the Jost page number at bottom 56, right 96, preceded by the document title in 17px mute.
- **Pictogram tile**: an ink square (88–96px, radius 8) with the pictogram in paper (or key for the one fact). Used for cycle nodes and summary rows.

## 5. Page grammar

Every page except the cover: running head, chapter tab, page head (kicker at top 150, headline 60px, lead 26px), body from about top 540, foot slot rule at about 1548 (bottom 136), folio.

1. **Cover.** Title and sub on paper; a scene from 700 to 1296; an ink ground band below with the headline number, a paper counted row and the meta with 「架空のデータ」.
2. **数字で見る (in numbers).** A counted-row table (category pictogram + label + share | row | value), one shared unit chip in the caption line, the key row in key color with a 「最多」 tag. Below, three KPIs under 6px ink rules, each with a big number, its own small counted row, a note and a unit chip.
3. **Flow or cycle.** `d-cycle` from `references/diagrams.md`, redrawn: nodes are pictogram tiles with STEP number, name and one value; links follow the ellipse and are trimmed 18px outside the node boxes; the centre value in key-text with the key pictogram above. Below: a short paragraph and a counted row of the people or vehicles involved.
4. **Map or cross-section.** A full-bleed scene (the river basin as a cross-section) with towns numbered in ink discs and routes ending in chevrons at the subject; below, a table whose middle column is a counted row per town.
5. **Reading page.** Two 500px columns, section headings led by a 44px spot pictogram over a 2px ink rule, one pull box (`--ink-tint`, radius 4) holding a counted row and its value.
6. **Summary and contact.** Three summary rows (tile, big number, sentence; the first with a counted row), an ink contact block with pictogram-led channels, and a two-column profile table with thin rules.

Deriving other pages:
- **Comparison (before/after, two years)**: two counted rows of the same pictogram and unit, one above the other, labelled with the year; the change as a number at the right. Never two different units.
- **Timeline**: a ground line as the time axis, events as pictograms standing on it, years in Jost under the line.
- **Table**: thin rules, label column in Noto Sans JP 700; a counted row may replace one numeric column when the values share a unit.
- **Map**: for prefecture data use `d-tile-map-jp` with ink tiles; otherwise a cross-section or a list grouped by area, each group with a counted row.
- **Q&A / voice**: the person pictogram in a tile beside the quote; no invented faces or names that read as real people.

## 6. Slop signs

- [ ] A quantity shown by enlarging a pictogram, or a row whose unit chip is missing.
- [ ] A remainder rounded away, or a count that does not match the stated value (5,600 t at 200 t = 28 pictograms).
- [ ] Two drawings for the same noun, or a pictogram that breaks the grammar (strokes, odd angles, a second corner radius, faces).
- [ ] Gradients, drop shadows, glassy cards, isometric or 3D clip-art, emoji, icon fonts.
- [ ] The key color on more than the one thing the headline names; key text below 4.5:1 (use `--key-text`).
- [ ] Meaning in color alone (a key row without its tag or headline mention; ghost slots without the "of 10" note in the chip).
- [ ] A figure without its source line, or invented data not marked 「架空のデータ」.
- [ ] Illustration as decoration only: a scene that carries no labels, routes or counts.
- [ ] Running head, chapter tab or folio shifting between pages.
- [ ] Body under 22px, or one column across the full 1048px.

## 7. Document pages

This style exists only as `doc-a4`; the frame above is the page frame.

- **Running head**: top 64, inset 96, 19px Noto Sans JP 700; 2px ink rule at top 112 across 96–1144. Same on every page except the cover.
- **Folio**: 48px ink tile at bottom 56, right 96, Jost 600 22px; document title before it in 17px mute.
- **Chapter tab**: right outer edge, x 1184–1240, top 240, height 340; the chapter's pictogram at the top. Chapters: 01 数字で見る (doc), 02 循環 (truck), 03 地図 (house), 04 暮らし (bottle), 05 窓口 (phone).
- **Margins**: 96 left and right; kicker at 150; content ends above the foot rule at about 1548. Scenes may run full-bleed (x 0–1240); text and counted rows never do.
- **Cover**: the scene is the visual and the ground band holds one counted row; no photo is needed. With photos, keep them out of the cover and use them on a separate page with a pictogram caption.
- **Reading page**: kicker, headline 60px, lead 26px, then two 500px columns of 22px body (about 22 字 per line); spot pictograms only at section heads, one pull box per page.
- **Figure page**: patterns from `references/diagrams.md` at 1048px wide and 560–760px tall, redrawn with the kit: nodes as pictogram tiles, links as 5px connectors with chevrons, numbers in Jost, labels in Noto Sans JP. Map `--d-ink` to `--ink`, `--d-accent` to `--key` (text: `--key-text`), `--d-sub` to `--sea`, `--d-tint` to `--ink-tint`, `--d-rule` to `--rule`. Bar charts of counts become counted rows; keep bars only for values without a natural unit (rates over time), as flat ink bars with the key on one bar.
