# Geometric Blue design system

## 1. Thesis

Blue and white only, and the one ornament is data. Every square on a slide encodes something real: the cover grid is the headline read by a model, the logo is a causal mask, a layer's depth of blue is its place in the stack.

## 2. Tokens

```css
:root {
  --blue: #1534D6;
  --ink: #0A1A5E;
  --tint: #E9EDFD;
  --white: #FFFFFF;
  --line: color-mix(in srgb, var(--blue) 22%, var(--white));
  --stage-bg: #0A1A5E;
  --slide-bg: var(--white);

  --jp: 'IBM Plex Sans JP', sans-serif;
  --en: 'Archivo', 'IBM Plex Sans JP', sans-serif;
  --mono: 'IBM Plex Mono', 'IBM Plex Sans JP', monospace;

  --m: 120px;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Derived colors are always `color-mix` of `--blue` or `--ink` with `--white`, never a new hue:

| Use | Value |
| --- | --- |
| Muted text (captions, sublines) | `--ink` at 58 to 72% (`color-mix(in srgb, var(--ink) 60%, var(--white))`) |
| Hairlines inside cards | `--line` (blue 22%) |
| Layer fills, from top layer to base | `--tint`, blue 22%, blue 62%, `--blue` |
| Meter track | blue 26% |
| Gate text, muted | white 62 to 78% over blue; gate rules white 35% |
| SVG chart grid and sub-labels | `#C9D2F6` lines, `#6B76A3` text |

Classes: `.en` sets `font-family: var(--en); font-stretch: 112%; font-feature-settings: normal`. `.mono` sets the mono family with `font-feature-settings: normal`. Japanese text keeps the base `palt`.

Base CSS note. `viewport-base.css` gives `.slide :is(h1,h2,h3)` tracking 0 and line-height 1.35, and `.slide :is(p,li,td,dd)` tracking .02em and line-height 1.7. This style overrides both on purpose: every heading sets its own tracking (.02em) and line-height, and every single-line `p` label sets `line-height: 1.5` (or `normal` for Archivo labels) so absolute positions stay where they were drawn. Since the base block is wrapped in `:where()` and has zero specificity, so any deck rule wins over it, a single class such as `.crumb` is enough; the `.slide` prefixes in `reference.html` are harmless.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Display (cover headline) | IBM Plex Sans JP | 700 | 100px | 1.32 | .02em |
| Gate number | Archivo, stretch 125% | 800 | 420px | 1 | -.01em |
| H1 (gate title) | IBM Plex Sans JP | 700 | 120px | 1.2 | .02em |
| H2 (centered lead headline) | IBM Plex Sans JP | 700 | 64px | 1.4 | .02em |
| Gate subline | IBM Plex Sans JP | 500 | 34px | 1.5 | .03em |
| Lead sentence | IBM Plex Sans JP | 400 | 26px | 1.5 | .03em |
| Card header bar, crumb | IBM Plex Sans JP | 700 / 500 | 22px | 1.5 | .02em / .03em |
| Body (card list) | IBM Plex Sans JP | 400 | 21px | 1.55 | .02em |
| Body (table cell) | IBM Plex Sans JP | 400 | 20px | 1.6 | .02em |
| Caption, footer | IBM Plex Sans JP | 400 | 18 to 19px | 1.5 | .03em |
| Matrix caption | IBM Plex Mono | 400 | 17px | 1.7 | .02em |
| Eyebrow, CHAPTER | Archivo, stretch 112% | 700 / 600 | 26 / 24px | normal | .22em / .3em |
| Number (KPI) | Archivo, stretch 100% | 700 | 96px | 1 | -.01em |
| Number (card total) | Archivo, stretch 100% | 700 | 76px | 1 | 0 |
| Number (table cell) | Archivo, stretch 100% | 700 | 40px | normal | 0 |
| Unit after a number | IBM Plex Sans JP | 700 | 30px (20px in tables) | normal | .02em |
| Index numerals (01 to 04) | Archivo, stretch 125% | 800 | 34px | normal | .04em |

The number is about 3× its unit. Latin brand words (`YOMIKAKI`) are Archivo stretch 125%, 800, 22px, tracking .14em.

## 4. Signature devices

**Attention matrix (cover only).** `svg#attn`, 720×740, at left 1086 top 84. It draws the causal attention of the cover headline's own tokens: row i is the token being read, column j the token it looks back at. Cells with j ≤ i are 52px squares (6px gap) in `--blue` at one of four fill-opacities. Cells with j > i are a 6px square at opacity .28, the future the model cannot see yet. Row labels sit right of the grid, column labels above it in `writing-mode: vertical-rl`, both 20px/500 ink. A caption below says what the grid is, with a four-square legend (.14, .34, .6, 1).

To regenerate it from a new deck's title, edit only the two inputs in the cover IIFE:

1. `tok`: the cover headline split into the tokens a reader would chunk (content word, then particle: `['日本語','を','根っこ','から', …]`). Drop line breaks. Keep the final `。` as its own token. Use 6 to 14 tokens. The reference's `cell = 52` is sized for its 11 tokens; for another count set `cell = Math.min(64, Math.floor(640 / n) - 6)` so the grid keeps filling the 720×740 box (with 8 tokens at 52px the lower third stays empty). Keep the label font at 20px.
2. `link`: a map of `'row,col'` to a boost between 0.6 and 2.0, for pairs that really depend on each other (a verb looking back at its object, a compound's second half at its first, the final `。` at the main verb). Only `col < row` keys mean anything. Use 8 to 14 links; with none, the grid is a plain recency diagonal.

Also update the cover `h1` to the same headline and rewrite the caption's token count. The rest is fixed and should be left alone. The raw score is `1.1` for column 0 (the attention sink), plus the link boost, plus `1.2·exp(-(i−j)/1.4)` for recency, plus `0.5·hash(i,j)` deterministic noise. Each row goes through a softmax, and the weight is quantized to opacity 1 above .3, .6 above .18, .34 above .1, else .14. Then check the result by eye: the strongest cells should land on the links you meant, and the caption must say what the grid is. If the weights are not measured from a real model, write that it is a schematic (`見出しの語どうしの関係を、注意の重みの形で描いた模式図。`) instead of claiming a model produced it.

**Logo mark.** `svg.logo`, viewBox `0 0 3 3`, drawn by JS: the 3×3 lower triangle (6 squares, .84 units, .08 inset) in blue, 30px, beside the Archivo wordmark. Top right of content slides at top 60, right 120. Swap the wordmark text per deck; keep the mask.

**Breadcrumb.** `.slide .crumb` at left 120, top 64: a 6×26px blue bar, then the chapter number and name, 22px/500 blue.

**Centered lead headline.** `.slide .lead-head`, top 150, centered across the full width, 64px/700, two lines broken by hand, one phrase in `em` (blue, no italics). This is the one centered element on a content slide. Everything below it is left-aligned.

**Blue header bar card.** `.card` / `.kpi`: 2px blue border, square corners, a blue `h3` bar (22px/700 white, padding 8 to 10px 22px). Lists inside use a 10px blue square bullet and `--line` hairlines.

**Meter.** A 14px bar under a KPI: track blue 26%, fill `--blue` at the KPI's share. Use only when the number is a share of something.

**Layer stack.** Rows 118px high, 10px apart, filled from `--tint` (top) to `--blue` (base). Text turns white on the two darkest steps. Index numerals stay blue on the two light steps. A 28px-wide flow arrow column may sit right of the stack.

**Square bullets.** Hollow 16px squares with a 2px border for TOC items, filled for the current one. A 14px filled square before the eyebrow. Never circles.

**Gate.** Full-bleed `--blue`. CHAPTER label at top 104, the number at top 150 (left 104), title at top 600, subline at top 772, TOC on the right at left 1180, top 530, rows 92px with 2px white-35% rules.

**Motion.** `.reveal` rises 24px and fades over .8s on `--ease`, staggered `--i × 90ms + 120ms`. Matrix cells fade over .35s, delayed `r × 70ms + c × 12ms + 300ms`. Both are disabled under `prefers-reduced-motion`.

## 5. Slide grammar

Content slides share one frame: crumb top left, logo top right, the centered lead headline at top 150, the body from top 400 to about 950 between x=120 and x=1800, and a footer at bottom 52 (deck name left, `13 / 48` right in Archivo 500, 18px, 60% ink).

**The four reference slides.**
1. Cover. Left text column, right attention matrix. The only slide with the matrix.
2. Gate. Blue ground, giant number, title, subline, TOC with the current chapter filled.
3. Conclusion + numbers. Lead headline states the result; a 26px lead sentence gives the why at top 352. Left (x 120 to 1160): an SVG bar chart with a title row ruled 2px ink, bars in one blue (ours solid, others at .26 opacity), values in Archivo. Right (x 1260 to 1800): two stacked KPI cards with meters.
4. Layered model. Lead headline, a 4-row layer stack with a header row (17px, 58% ink), and two cards on the right (a bullet list and a total).

**Comparison.** Two columns of equal width under the lead headline. Each is a `.card` with its blue header bar naming the option. The recommended option keeps the 2px blue border; the other uses `--line`. Put the deciding numbers as Archivo 76px totals at the same height in both cards.

**Table.** Use the layer-row grammar without the color steps: a header row in 17px muted ink, then rows 72 to 96px high separated by 1px `--line`, numbers right-aligned in Archivo 40px with a 20px unit. Shade only the row the headline is about, with `--tint`.

**Quote.** No crumb change. The quote is the lead headline itself, pushed down to the vertical center (64 to 80px/700, centered, one phrase in blue). Attribution under it at 22px/500 muted ink, preceded by a 6×26px blue bar. No quote marks as ornaments.

**Timeline.** A 2px ink rule across x 120 to 1800 at mid-height. Each event is a 16px square on the rule (filled for past and current, hollow for future, the same code as the gate TOC), the year above in Archivo 34px/800 stretch 125%, the label below in 22px/700 and a 19px muted note. Up to 6 events.

**Team.** Cards in a row of 3 or 4. A square photo (no rounding, no circle) or, without photos, a 3×3 cell glyph built from the person's initials in the motif's opacity steps. Blue header bar with the name; role and one sentence in the body at 21px.

**Closing.** Gate layout on blue: the logo mask scaled to 360px in white where the number sits, the closing message as the 120px title, and contact lines as the TOC rows. Optionally redraw the attention matrix in white on the closing message, using the same two inputs.

## 6. Slop signs

- [ ] A second hue appears anywhere (orange, green, a purple gradient). Only `--blue`, `--ink` and their white mixes are allowed.
- [ ] Squares scattered in slide corners as decoration, or the matrix repeated on content slides.
- [ ] The matrix tokens do not match the cover headline word for word, or the caption claims real model weights the deck did not measure.
- [ ] The matrix strongest cells fall on random pairs because `link` was left from another deck.
- [ ] Body text centered under the centered lead headline. Only the lead headline is centered.
- [ ] Rounded corners, drop shadows or circle icons on cards. Edges are square, borders 2px.
- [ ] Three pillars with equal-length abstract nouns (「革新」「信頼」「成長」) instead of concrete facts with numbers.
- [ ] A chart in several colors. Bars are one blue; ours solid, the rest at .26 opacity.
- [ ] Number and unit at the same size. The number is about 3× the unit.
- [ ] Archivo set on Japanese, or Japanese set with wide tracking like the Latin eyebrow.
- [ ] Blue used as a large fill on content slides. Full blue belongs to gates and the closing slide only; on content slides blue fills are header bars, meters, bars and the base layer.
- [ ] A single-class `p` selector that lost to the base's `line-height: 1.7`, pushing labels a few px off their grid. Check the crumb and footer positions match the reference.
