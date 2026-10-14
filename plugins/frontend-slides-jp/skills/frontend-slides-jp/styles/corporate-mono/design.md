# Corporate Mono design system

## 1. Thesis

A white document with one corporate color that marks structure, never decoration. The color fills the cover and chapter gates, runs down the left chapter band, and shades charts, so a reader always knows where they are and which number matters.

## 2. Tokens

```css
:root {
  --brand: #9C3A21;
  --brand-tint: #F5EAE4;
  --ink: #1E1A17;
  --ink-2: #6B635D;
  --rule: #DCD5CF;
  --paper: #FFFFFF;
  --chart-1: #E8D2C8;
  --chart-2: #C98A73;
  --stage-bg: #141110;

  --font-jp: 'IBM Plex Sans JP', sans-serif;
  --font-en: 'Hanken Grotesk', 'IBM Plex Sans JP', sans-serif;

  --band: 88px;
  --pad-l: 184px;
  --pad-r: 104px;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Color jobs:

- `--brand` fills the cover, the gate panel, the chapter band and the shared-ledger lane of a diagram. As text it marks only the kicker, the current TOC entry, the hero number, the key bar value and the "after" value.
- `--brand-tint` is the one pale surface. Use it for a highlighted table row or the recommended column of a comparison. It is not in the four reference slides; never put a card or shadow on it.
- `--ink` is text and the structural rule (1px) under headers, axes and section heads. `--rule` is the 1px rule between rows.
- `--ink-2` is labels, notes, units, page numbers and "before" values.
- `--chart-1` is the baseline or oldest series, `--chart-2` the other bars, `--brand` the one bar the headline is about.
- On brand ground, text is `#fff`; secondary text is white at 70 to 85% opacity; rules are white at 30 to 55%.

Layout constants: content slides start at `--pad-l` 184px (88px band plus 96px gutter) and end at `--pad-r` 104px from the right. Cover and gate panel use a 120px left edge. Footer baseline sits at bottom 44px.

## 3. Type scale

All Japanese is IBM Plex Sans JP with `palt` from the base CSS. All English, digits, chapter numbers and page numbers use class `.en` (Hanken Grotesk, `tnum` and `lnum`). Headings `h1`–`h3` get line-height 1.35 and tracking 0 from the base CSS; `p, li, td, dd` get line-height 1.7 and tracking 0.02em.

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Display, cover English | Hanken Grotesk | 300 | 156px | 1.0 | -0.01em |
| Gate number | Hanken Grotesk | 300 | 340px | 1 | -0.03em |
| Gate English title | Hanken Grotesk | 300 | 120px | 1.02 | -0.005em |
| Cover Japanese copy (h1 role) | IBM Plex Sans JP | 700 | 60px | 1.45 | 0.02em |
| Gate Japanese title | IBM Plex Sans JP | 700 | 44px | normal | 0.02em |
| Headline, `h2.headline` | IBM Plex Sans JP | 700 | 66px | 1.35 | 0 |
| Kicker | Hanken Grotesk, uppercase | 500 | 22px | 1 | 0.12em |
| Section head (chart title, lane phase) | IBM Plex Sans JP | 700 | 22px / 26px | normal | 0.01em / 0.02em |
| TOC chapter | IBM Plex Sans JP | 500 (700 current) | 28px | 1.5 | 0.02em |
| Body, diagram cell | IBM Plex Sans JP | 400 | 22px | 1.55 | 0.02em |
| Body small, TOC sub-item | IBM Plex Sans JP | 400 | 20px | 1.5 | 0.02em |
| Label | IBM Plex Sans JP | 500 | 20px (18px under sub-KPIs) | normal | 0.02em |
| Caption, note | IBM Plex Sans JP | 400 | 16px | 1.7 | 0.02em |
| Hero number | Hanken Grotesk | 300 | 248px | 0.86 | -0.035em |
| Hero unit | Hanken Grotesk | 400 | 68px | 1 | 0 |
| Sub-KPI number | Hanken Grotesk | 400 | 88px | 1 | -0.02em |
| Sub-KPI unit (Japanese) | IBM Plex Sans JP | 500 | 26px | 1 | 0 |
| Bar value / unit | Hanken Grotesk | 500 / 400 | 26px / 16px | 1 | 0 |
| Result after / before | Hanken Grotesk | 500 / 400 | 64px / 44px | 1 | 0 |
| Breadcrumb, company name | IBM Plex Sans JP | 400 (crumb number 600) | 17px | 1 | 0.02em |
| Page number | Hanken Grotesk | 400 (current 600) | 20px | 1 | 0.06em |
| Copyright | Hanken Grotesk | 400 | 15px | 1 | 0.04em |
| Band chapter number | Hanken Grotesk | 500 | 26px | 1 | 0.04em |
| Band chapter name, vertical | IBM Plex Sans JP | 500 | 22px | 1 | 0.03em |

A unit is always smaller than its number and sits on the same baseline (`display: flex; align-items: baseline`). Japanese units such as 社 and か所 use Plex; `%` and `h` stay in Hanken.

## 4. Signature devices

- **Two-layer ground.** Brand full bleed for the cover (`.cover.on-brand`) and the left 1160px panel of a gate; white for every content slide. Never put brand ground behind a content slide's body.
- **Chapter band** (`aside.band`, 88px wide, full height, `--brand`). Logo mark 34px at top 52px, chapter number 64px below it, a 40px white hairline, then the chapter name in `writing-mode: vertical-rl`. It answers "which chapter am I in". It appears on every content slide, never on the cover or gates, and always carries the chapter name. The color never changes per chapter.
- **Boxed breadcrumb** (`.crumb`, top 52px, left `--pad-l`). 1px `--ink` box split by 1px rules: chapter number, chapter name, current page title. Company name sits opposite (`.corp`, top 60px, right `--pad-r`).
- **Footer** (`.foot`, bottom 44px). `© Company` left, `NN | total` right with the current number in 600 `--ink`.
- **Kicker plus conclusion headline** (`.head`, top 168px). English kicker with a 36×2px brand dash, then a 66px Japanese headline 30px below it that states the conclusion, broken by hand into at most two lines.
- **Gate panel.** Left 1160px brand panel: logo mark, `CHAPTER` label at top 238px, the chapter number at 340px, the English title at top 610px (two lines), the Japanese title at top 900px. The right column (left 1256px) is the TOC with the current chapter in brand 700 and its sub-pages listed with page numbers.
- **Mono-shade chart.** Bars in `--chart-1` (baseline), `--chart-2` (others) and `--brand` (the one the headline cites). Value labels sit on the bars; a dashed `--ink-2` reference line labels the baseline; the x-axis label of the key bar is `--ink` 700. One 1px `--ink` rule under the title and one on the axis; no gridlines, no legend box.
- **Hero number block.** Label above, the number in `--brand` at 248px, then a 1px `--ink` rule and two sub-KPIs at 88px in `--ink`.
- **Swimlane spine.** In a process diagram the company's own lane is a full brand row with white 700 text and chevrons between phases; the actors above and below are white rows with 2px brand ticks pointing at the spine.
- **Before/after result line** (bottom 104px). Label, the "before" value in `--ink-2`, a light arrow, the "after" value in `--brand`, and the source note pushed right.
- **Motion.** `.reveal` items rise 24px and fade over 0.7s with `--ease`, staggered by `.d1`–`.d4` (0.08s to 0.38s). Bars grow from the bottom; cover ledger bars grow from the left. Reduced motion shows the end state.

## 5. Slide grammar

Every content slide is: band, crumb, corp, head (kicker plus headline at top 168px), one body block starting at top 452 to 470px between `--pad-l` and `--pad-r`, an optional note, and the footer. Body blocks align to those two edges; the 920px line is the right column start when the body splits.

The four reference slides:

1. **Cover.** Brand ground. Logo at 120/96px, English display plus Japanese copy at top 318px, a content-specific visual in white lines on the right (left 1196px), meta row at bottom 104px, page number only.
2. **Gate.** Brand panel left (1160px) with chapter number and bilingual title; white right column with the full TOC and the current chapter expanded into sub-pages.
3. **Conclusion plus number.** Headline states the result. Left column (600px wide at top 470px) holds the hero number and two sub-KPIs; right column (left 920px) holds the mono-shade chart; source note at bottom 96px in the right column.
4. **Diagram.** Headline states the mechanism. A grid from top 452px with a 200px actor column and four phase columns; the company lane is the brand spine; a before/after result line at bottom 104px.

Derived slides:

- **Comparison.** Same head. Body is a grid with a 200px criteria column and two or three option columns, header row with a 1px `--ink` rule under 26px 700 option names, rows separated by 1px `--rule`, 22px cells. The recommended column gets `--brand-tint` ground and a brand option name; nothing else is colored. State the winner in the headline.
- **Table.** Header row 18px 500 `--ink-2` with a 1px `--ink` rule; body rows 66px tall (the ledger rhythm) with 1px `--rule` between; numbers right-aligned in `.en` with `tnum`, units in the header, not repeated per cell. Highlight at most one row with `--brand-tint` and brand text for its key value. Source note 16px below.
- **Quote.** Content slide with band and crumb. The quote in Plex 700 at 60px (cover copy size), line-height 1.45, max two or three hand-broken lines, starting at `--pad-l`, top about 360px. Speaker name 20px 500 and role 16px `--ink-2` below a 36×2px brand dash. No quote-mark ornaments. For a mission or statement slide, use brand full bleed like the cover instead.
- **Timeline.** Horizontal 1px `--ink` axis at about top 600px across the body width. Year labels in Hanken 500 26px above the axis, events in 20px Plex below, 2px brand ticks at each point. The current or milestone year in `--brand`; past years `--ink`, future years `--ink-2`. For headcount or revenue over time, use the mono-shade bar chart instead.
- **Team.** Up to four members in equal columns from `--pad-l` to `--pad-r`, 40px gaps. Photo (square, no rounding, grayscale or natural) or an initial block in `--chart-1`, then name in Plex 700 28px, English name in `.en` 16px `--ink-2` with 0.08em tracking, role 18px, then two lines of 20px body. Separate columns with nothing but the gap.
- **Closing.** Brand full bleed like the cover: logo at 120/96px, a one-line English display at 156px, the Japanese call to action at 60px 700 below, and contact or next-step meta in the 20px meta row at bottom 104px. Page number only, no band.
- **New chapter.** Always a gate: brand panel plus TOC with the new chapter current. Update the band chapter number and name on every following content slide.

## 6. Slop signs

- [ ] A second accent color appears (blue links, green "up" arrows, orange highlights). The deck has one color plus its shades.
- [ ] The band changes color per chapter, or appears without the chapter number and vertical chapter name.
- [ ] The band, crumb or footer appears on the cover, a gate or the closing slide.
- [ ] The headline names a topic ("導入効果について") instead of stating the conclusion.
- [ ] The English display size (156px or larger) is used on content slides; only cover, gates and closing get it.
- [ ] A chart uses a rainbow of series, 3D, gradients, gridlines or a legend box, or more than one bar is full `--brand`.
- [ ] KPI tiles get icons, drop shadows, rounded cards or gradients; the pale tint carries a card with a shadow.
- [ ] Number and unit render at the same size, or units, thousands separators and decimal places differ between figures.
- [ ] More than three emphasis methods in one slide (the system uses brand color, weight 700 and size; add nothing else, no underlines or highlighter marks).
- [ ] A figure has no note or source line at 16px `--ink-2`.
- [ ] Body text runs the full 1632px width; split into the left 600px column and the right column from 920px instead.
- [ ] Japanese headlines wrap where the author did not break them, or a line ends with a single character. Break by hand at phrase boundaries.
- [ ] Digits or English set in Plex instead of `.en`, or Japanese set in Hanken.
- [ ] Page numbers, breadcrumb title and TOC page references disagree with the actual slide order.
- [ ] Elements sit off the 184px / 104px edges, the 168px head top or the 44px footer baseline.

## 7. Document pages

`reference-a4.html` is a 6-page integrated report (cover, contents, message, value-creation cycle, highlights, five-year data). Sizes are px at the 1240×1754 page. Tokens are the same as section 2, plus `--m: 96px` (left and right margin, text width 1048px) and `--tab: 56px`. The desk behind the pages is `#E6E1DC`, not the dark slide stage. Documents carry no `.reveal` motion.

Frame (every page except the cover, same place on every page):

- **Running head** (`.rh`, top 64px, 36px tall, from 96px to 96px). Left: the document name, 18px `--ink-2`, with the short company name in 500 `--ink` before it. Right: the slide deck's boxed breadcrumb (`.crumb`, 1px `--ink`, 18px), split into chapter number (`.en` 600), chapter name and page title. The crumb moved from the left to the right so the organization stays on the left, as the reference reports do.
- **Chapter tab** (`.tab`, right 0, top 240px, 56px wide). The slide's 88px chapter band becomes a short brand tab on the outer edge: chapter number in Hanken 500 22px, a 32px white hairline, then the chapter name vertical in Plex 500 20px with 0.08em tracking. One color for every chapter. Where the tab sits on brand ground (the contents page), it inverts to white with brand text (`.tab.inv`).
- **Folio** (`.folio`, bottom 56px). Left `© Company` Hanken 15px `--ink-2`; right `NN | total` Hanken 20px, the page number 600 `--ink`. Page numbers are the printed book's, and must match the contents page.
- **Text block** (`.frame`, top 140px, bottom 120px, 96px sides) is a flex column, so the notes slot (`.notes`, 17px `--ink-2` above a 1px `--rule`) sits on the bottom edge with `margin-top: auto`.

Page head: kicker (Hanken 500 22px, uppercase, 0.12em, 36×2px brand dash) at the frame top, headline Plex 700 64px with line-height 1.38, 28px below it and broken by hand into two lines. That keeps the kicker about a third of the headline. Lead: 26px, line-height 1.75, 32px below, hand-broken into 2–3 lines.

Reading: body 22px, line-height 1.8, two columns (`column-count: 2`, 48px gap, about 22 字 a column at 1048px). Body paragraphs are justified with `word-break: normal` and a 1字 indent, which overrides the base `auto-phrase` (it leaves ragged column edges). Section heads inside columns are Plex 700 24px after a 14px brand square. Give the column box a fixed height and `column-fill: auto` so the second column starts where the first ends; use `balance` for a short closing text.

Page types:

- **Cover.** Brand full bleed like the slide cover. Logo at 120/96px, English display Hanken 300 156px at top 300px in two lines, Japanese copy 60px 700 64px below. The content-specific visual is a white-line ledger from top 980px (120px sides, 280px label column, 62px rows, 25% vertical guides at white 28%), here each pipe's install year to now (solid 6px with a 20px square at now) and on to its design life (2px dashed). Meta row at bottom 104px with the fictional-data line. No frame.
- **Contents.** A 640px brand panel across the top holds the running head in white, the logo mark at top 168px, `Contents` Hanken 300 156px at top 226px, `目次` 44px 700 right-aligned at the text edge, and the editorial policy (period, scope, frameworks) as three columns of 18px text under 1px white 45% rules from top 440px. Under the panel, from top 700px: one row per chapter (88px number column in brand Hanken 500 26px, chapter name 32px 700 with the English name 17px uppercase `--ink-2`, page number Hanken 500 22px), and its pages in three columns at 20px under it, rows split by 1px `--rule`, 1px `--ink` on top.
- **Message.** No photo: the page is type. Kicker, quoted headline (no quote marks), a three-line lead, then the speaker line (36×2px brand dash, name 26px 700 with 0.08em tracking, role 18px and English name 16px in `--ink-2`). A 1px `--ink` rule opens the two columns; the date, role and signature (28px 700, 0.16em) close the second column right-aligned.
- **Figure.** Kicker, headline, lead, then the figure under a 1px `--ink` rule across the 1048px text width, about 650px tall, its source line 14px under it, and two short columns of body text below. The reference fits `d-cycle` (five steps of the iron loop): nodes are square white boxes with 1px `--ink`, the ring and arrowheads `--chart-2` at 3px, step numbers in brand Hanken 500, and the center value is the one brand element in the hero number style (Hanken 300 150px with a 48px unit). The pattern reads its size from its own box; the page zoom does not change `clientWidth`, so no fixed size is needed.
- **Highlights.** Head, then two columns from 52px below: the hero number block on the left (440px: label, value Hanken 300 216px in brand, a 1px `--ink` rule and two sub-KPIs at 76px with label and comparison lines) and the mono-shade bar chart on the right (from 520px: 24px 700 title over a 1px `--ink` rule, 330px plot, 26px gaps, the headline's bar in brand, the oldest in `--chart-1`, the others in `--chart-2`, a dashed `--ink-2` reference line explained in the title). Below, a 3×2 grid of non-financial figures (Hanken 400 68px, label 18px above, comparison 17px `--ink-2` below, 1px `--rule` under each), all in `--ink`.
- **Data.** A five-year table over the full text width: header 18px 500 `--ink-2` over a 1px `--ink` rule, group rows (財務 / 非財務) 17px 500 over a 1px `--ink` rule, 50px rows split by 1px `--rule`, labels 20px with the unit 16px `--ink-2` after them, numbers Hanken 21px right-aligned, the latest year 600. One row gets `--brand-tint` with its latest value in brand. Every cell, including the company profile below (two columns of label/value pairs), is inset 12px so the tinted row does not shift.

Document slop signs (in addition to section 6):

- [ ] The band stays 88px wide down the left edge of a document page. On pages it is the 56px tab on the right.
- [ ] The running head, tab or folio moves between pages, or appears on the cover.
- [ ] A second brand-colored number on a page that already has a hero number.
- [ ] Body text set ragged with `auto-phrase` in columns, or shrunk below 22px to fit.
- [ ] A photo placeholder in place of the president's portrait. Without a photo, the speaker line and signature carry the page.
