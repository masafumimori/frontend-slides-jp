# One-Message Talk: design system

## 1. Thesis

Each slide says one conclusion in the biggest type on the page, navy on a light gray-blue ground. Time is the talk's subject and its scale, so every duration is drawn as cells where one cell is one minute, from the cover meter to the clock in the footer.

## 2. Tokens

```css
:root {
  --bg: #F0F2F5;
  --ink: #0D2A4A;
  --ink-sub: #5E6E82;
  --accent: #E2621B;
  --stage-bg: #F0F2F5;
  --slide-bg: #F0F2F5;
  --ghost: rgba(13,42,74,.34);

  --font: "Inter Tight", "Noto Sans JP", sans-serif;

  --pad-x: 160px;
  --pad-top: 128px;
  --pad-bottom: 96px;

  --size-cover: 200px;
  --size-statement: 150px;
  --size-head: 120px;
  --size-body: 44px;
  --size-meta: 26px;

  /* the minute cell: 1 cell = 1 minute, on every slide */
  --cell-gap: 8px;

  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Fixed non-token colors used in `reference.html`:
- Navy shades for stacked phases, darkest first: `#0D2A4A`, `#2F4A68`, `#546B86`, `#8091A6`.
- Chart bars: `rgba(13,42,74,.2)` before the change, `rgba(13,42,74,.62)` after it, `var(--accent)` for the latest value.
- Grid lines `rgba(13,42,74,.12)`, baseline `var(--ink)`, change marks `2px dashed rgba(13,42,74,.45)`.
- Talk clock cells: spent `rgba(13,42,74,.40)`, now `var(--accent)`, ahead `inset 0 0 0 2px rgba(13,42,74,.22)`.

## 3. Type scale

One stack for everything: `var(--font)`. Inter Tight sets Latin and figures, Noto Sans JP sets kana and kanji. Wrap standalone figures in `.num` (Inter Tight, tracking -0.01em).

`palt` comes from the base CSS on `.slide`. Display type keeps it. Running text turns it off with `.body, .meta, .label, .from { font-feature-settings: normal; }` so mid-sentence 。 and 、 keep their full width.

The base CSS gives `h1–h3` line-height 1.35 and `p` line-height 1.7. Every display and body class below is written as `.slide .<class>` so its own line-height wins. Keep that prefix when you add a class that sets line-height on a heading or paragraph.

| Role | Class | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- | --- |
| Display (cover title) | `.slide .cover-title` | stack, figures `.num` at 1.04em | 900 | 200px | 1.14 | 0 |
| Statement (gate) | `.slide .statement` | stack | 900 | 150px | 1.24 | 0 |
| h1 (slide conclusion) | `.slide .headline` | stack | 900 | 120px | 1.2 | 0 |
| Callout under a diagram | `.slide .saved` | stack, accent | 900 | 80px | 1 | 0 |
| Body | `.slide .body` | stack | 500 | 44px | 1.6 | 0.02em |
| Lead line under a number | `.kpi .from` | stack | 700 | 40px | 1.7 (base) | 0.02em |
| Section number | `.gate-label .no` | Inter Tight, accent | 900 | 40px | normal | 0 |
| Section name | `.gate-label .meta` | stack, sub ink | 700 | 32px | normal | 0.02em |
| Row label | `.lane .who .t` / `.m` | stack | 900 / 700 | 40px / 30px | 1.1 / 1.7 | 0.01em / 0 |
| Number label | `.kpi .label` | stack, sub ink | 700 | 32px | 1.7 | 0.02em |
| Caption, scale, folio | `.meta` | stack, sub ink | 700 | 26px | 1.7 (base) | 0.02em |
| Chart axis | `.grid-line span` | Inter Tight, sub ink | 500 | 24px | normal | 0 |
| Chart mark / x label | `.mark span` / `.xlab span` | stack | 700 | 24px | normal | 0.02em |
| Number | `.kpi .value .n` | Inter Tight, accent | 900 | 260px | 0.9 | -0.03em |
| Unit | `.kpi .value .u` | stack, accent | 900 | 76px | normal | 0 |
| Bar value | `.bar b` | Inter Tight, accent | 900 | 30px | normal | 0 |

Number to unit is about 3.4 to 1 (260 to 76). Text the audience must read is 40px or larger. 24 to 32px is only for captions, scales and axis labels.

## 4. Signature devices

**Minute cells** (`.cells` + `renderCells(el, total, fill)`). The job is to make time countable. `total` is the row length in minutes. `fill` is a list of `[fromMin, toMin, color]`. Each cell is one minute wide; a fractional last cell is drawn proportionally narrower; a cell that a phase boundary crosses gets a hard-stop gradient. Cells not covered by `fill` are ghost outlines (`inset 0 0 0 2px var(--ghost)`). Gap 8px, radius 2px. Heights: 76px on the cover, 64px in a lane row, 18px in the clock. Rows that are compared share the same `total` and the same width, so a cell is the same minute in every row. Use them on the cover, on any before/after or breakdown of a duration, and inside charts (bars are striped at one stripe per minute). Never use cells for a quantity that is not minutes.

**Talk clock** (`renderClocks()`, `.folio`). The job is page numbers that mean something. Every slide except the cover carries `data-at="<minute>"`, the minute of the slot where that slide starts. The folio sits at bottom 60px between the 160px margins: the talk title on the left in `.meta`, and on the right the current time in accent, one 14×18px cell per minute of the slot with 4px gap (spent, now, ahead), and the end time. `TALK = { start: [14, 20], minutes: 25 }` sets the slot and the cell count (25 in the reference). Change `minutes` to the real slot length and set `data-at` on every slide. The minute is the deck's only unit: when the subject is measured in hours or days, convert it to minutes or keep the squares to the clock and the timeline, where design.md allows days or weeks.

**Accent word.** The job is to say which part of the conclusion to remember. One `.accent` span per slide, on a word or a number, never on a whole line. Accent also marks the "after" value wherever cells, bars or labels show it.

**Gap brace** (`.gap-brace` + `.saved`). The job is to name the difference between two rows of cells. A 3px accent bracket open at the top spans from the end of the shorter row to the end of the longer one, 16px under the row; the callout sits 60px under the row, left-aligned to the brace.

**Gate label** (`.gate-label`). Section number in accent Inter Tight and the section's question in sub ink, at the top-left padding corner. Only on statement slides.

## 5. Slide grammar

All content is left-aligned to `--pad-x` 160px. The heading sits at `--pad-top` 128px. Line breaks in display type are placed by hand with `<br>` at phrase boundaries (after 、 or between bunsetsu), never left to the browser. Two lines for a headline, at most three for a statement.

**Reference slides.**
1. Cover. See `preview.md`. The title states the change as before and after ("CIの18分を、3分にした話。"), and the meter draws exactly those two numbers.
2. Statement (gate). Gate label at the top. Statement 150px, three lines, 80px under the label. One body line 56px under it, carrying the numbers that support the claim. Nothing else.
3. Conclusion + number. Headline 120px, two lines. Below it, from top 470px to bottom 150px, a grid of `600px 1fr` with 120px column gap. Left column bottom-aligned: label, the number at 260px with its unit, and a "from" line. Right column: a bar chart whose y scale is minutes, bars striped one stripe per minute, change points as dashed vertical marks with labels, x labels at month starts.
4. Diagram. Headline 120px, two lines. Two lanes from top 500px, 200px apart. Each lane has a 230px label column (name 40px 900, total 30px 700) and a cell row starting at 260px with phase labels 48px above the cells. The legend "1マス＝1分" sits right-aligned 56px above the first lane. The gap brace and callout go under the shorter row.

**Derived slides.**
- Comparison. Two lanes as in slide 4, one per option, same `total`. Put the option you recommend second and fill it accent; fill the other with the navy shades. The headline names the winner. More than three options becomes a table.
- Table. Headline 120px, two lines. A table under it starting near top 470px, at most 4 rows and 4 columns, cells 40px 500, header row 26px 700 sub ink, rows separated by `2px solid rgba(13,42,74,.12)` and no vertical rules. Durations inside a cell may carry a short inline cell row (18px tall) to the right of the number. One cell or row in accent, the one the headline is about.
- Quote. Statement layout without the gate label. The quote at 120px 900 in two or three hand-broken lines, wrapped in 「」. The speaker and role in `.meta` 32px under it, 56px gap. No quotation-mark ornaments.
- Timeline. Headline 120px. One long cell row across the full width, `total` = the length of the period in minutes for a talk agenda, or relabel the unit in the legend for days or weeks and keep "1マス＝1<unit>" visible. Phase labels above the row as in slide 4, the current phase in accent. For an agenda slide, the row is the talk itself and must match the talk clock's `minutes`.
- Team. Headline 120px that says what the team did, not "メンバー紹介". Up to four people in a row of equal columns from top 500px: name 48px 900, role 30px 500 sub ink, one line of 40px 700 about their part. No photos and no avatars unless the deck supplies them; if it does, square, 240px, no rounding beyond 2px.
- Closing. Statement slide with no gate label: the one sentence to remember at 150px, a body line with where to find the slides or code, and the talk clock at its last minute. No "ご清聴ありがとうございました" as the only content; if it is used, keep it to `.meta` above the statement.
- Heading-only slide. Allowed. Headline or statement alone, accent on one word, talk clock at the bottom.

## 6. Slop signs

- [ ] A heading names a topic ("背景について", "結果") instead of stating a conclusion.
- [ ] More than one accent span on a slide, or a whole line in accent.
- [ ] Cells used for a quantity that is not time, or compared rows with different `total`, so one cell means different minutes.
- [ ] The cover meter does not match the numbers in the title.
- [ ] `data-at` missing or out of order, so the talk clock goes backwards or ends past the slot.
- [ ] Display type left to wrap on its own, splitting a word, or a line that ends with a single kana.
- [ ] Heading line-height reverted to 1.35 because a new class lost the `.slide` prefix, and two lines of 900 type look loosened apart, or a title collides with the meter.
- [ ] Positive letter-spacing on kana headings. Tracking stays 0.
- [ ] Heading set in a family without palt (Zen Kaku Gothic, M PLUS, BIZ UD); the kana sit loose at 900.
- [ ] `palt` left on running text, so 。 and 、 inside a sentence collapse to half width.
- [ ] Bullet lists, nested hierarchy, or more than five lines of text on a slide.
- [ ] Icons, illustrations, gradients, shadows or boxes added to fill the empty space.
- [ ] Centered layout anywhere except the numbers inside a chart.
- [ ] A black or dark slide, or a dark code block. Code goes on the light ground in navy.
- [ ] Charts in more than one hue. Use the navy shades plus accent for the single value the headline cites.
- [ ] Readable text under 40px, or the 26px meta size used for anything but captions, scales and the folio.
- [ ] Every slide is headline plus three bullets.
