# Dark Keynote design system

## 1. Thesis

A near-black stage holds one product and one number at a time. The product is rendered, never photographed; specs are spoken in hairline-thin giant numerals; yellow belongs to the product being launched and nothing else.

This style is built for screens and streams. In a bright room on a projector the dark ground washes out; pick a light style there.

## 2. Tokens

```css
:root{
  --bg:#0F1012;
  --panel:#17181B;
  --line:#34363B;
  --fg:#F3F1EC;
  --fg-2:#C9C6BF;
  --fg-3:#B4B1AA;
  --accent:#FFD23F;
  --stage-bg:#0F1012;
  --slide-bg:#0F1012;
  --jp:'Noto Sans JP',sans-serif;
  --num:'Jost','Noto Sans JP',sans-serif;
  --mono:'IBM Plex Mono','Noto Sans JP',monospace;
  --ease:cubic-bezier(.16,1,.3,1);
}
```

Literal values used outside `:root` (reuse them, do not invent neighbours):

| Value | Use |
| --- | --- |
| `radial-gradient(1400px 620px at 70% 118%, #1B1C20 0%, rgba(27,28,32,0) 70%), var(--bg)` | `.slide` background: the floor glow under the product |
| `#222327` | 1px row rules inside charts and tables |
| `#5A5C62` | Bars for everything that is not the current product |
| `#E7E3DB`, `#3A3835` at .72 opacity | Current product body and its perforations |
| `#A9A398` | Legacy product finish (darker, so it recedes) |

Layout constants: side margins 120px. Top chrome baseline row at `top:72px`, foot at `bottom:56px`. Content starts at `top:150px`.

### Contrast rule

Every text run is at least **7:1** against the surface directly behind it. This is measured, not estimated: WCAG 2 relative-luminance ratio of each text node's computed `color` against the nearest opaque ancestor background, plus a worst-case check against the floor glow's brightest stop `#1B1C20`. Measured on `reference.html`:

| Text | on `#0F1012` | on `#17181B` panel | on `#1B1C20` glow peak |
| --- | --- | --- | --- |
| `--fg` `#F3F1EC` | 16.86 | 15.73 | 15.08 |
| `--fg-2` `#C9C6BF` | 11.16 | 10.41 | 9.98 |
| `--fg-3` `#B4B1AA` | 8.89 | 8.29 | 7.95 |
| `--accent` `#FFD23F` | 13.18 | 12.29 | 11.79 |

Consequences for new slides:
- `--fg-3` is the dimmest text color. Never add a darker grey for "subtle" captions; drop the caption instead.
- New surfaces may be no lighter than `#1B1C20`. A card or band lighter than that pushes `--fg-3` under 7:1; re-measure before using one.
- Non-text marks are exempt from 7:1 but not from meaning. `#5A5C62` bars are 2.85:1 and are acceptable only because every bar prints its value. A bar or line that carries data without a printed value uses `#6A6C72` (3.63:1) or lighter.
- `--line` `#34363B` (1.57:1) and `#222327` are dividers only. Nothing that must be read is drawn in them.

## 3. Type scale

Sizes in px at 1920×1080. The base CSS sets heading tracking 0 and `p, li, td, dd` to `letter-spacing:.02em; line-height:1.7`; every role below sets its own values over that.

| Role | Family | Weight | Size | Line-height | Tracking | Color |
| --- | --- | --- | --- | --- | --- | --- |
| Display: product name (cover) | Jost | 200, second word 400 | 196 | .9 | -.01em | `--fg` |
| Display: chapter number (gate) | Jost | 200 | 240 | .82 | -.02em | `--fg` |
| Number: KPI hero | Jost | 200 | 380 | .86 | -.03em, `margin-left:-18px` | `--fg` |
| Unit beside KPI hero | Jost | 300 | 112 | inherit | 0 | `--accent` |
| h1: cover promise | Noto Sans JP | 700 | 72 | 1.32 | .01em | `--fg` |
| h2: gate title | Noto Sans JP | 700 | 88 | 1.2 | .01em | `--fg` |
| h2: comparison lead | Noto Sans JP | 700 | 72 | 1.3 | .01em | `--fg` |
| h2: conclusion (two lines) | Noto Sans JP | 700 | 68 | 1.36 | .01em | `--fg` |
| Body: lead paragraph | Noto Sans JP | 400, keywords 700 `--fg` | 27 | 1.8 | .02em | `--fg-2` |
| Body: gate sub | Noto Sans JP | 400 | 28 | 1.7 | .02em | `--fg-2` |
| Number: secondary stat | Jost | 300 | 64 | 1 | 0 | `--fg` |
| Number: spec value | Jost | 300 | 52 | 1 | 0 | `--fg` |
| Number: table / bar value | Jost | 300 | 34 | inherit | 0 | `--fg` (current product's value 400 `--accent`) |
| Japanese unit after a number | Noto Sans JP | 500 | 24 (52–64 numbers), 21 (34 numbers) | inherit | 0 | `--fg-2` |
| Product name label | Jost | 300 | 38 | inherit | 0 | `--fg` (legacy `--fg-2`) |
| Label (row header, spec `dt`, chart key) | Noto Sans JP | 500 | 22–24 | 1.3–1.5 | .02em | `--fg-2` |
| Caption: chrome | IBM Plex Mono | 500 | 20 | inherit | .16em, uppercase | `--fg-3`, chapter number `--accent` |
| Caption: Japanese chapter name in chrome | Noto Sans JP | 500 | 21 | inherit | .02em | `--fg-3` |
| Note (※ footnote) | Noto Sans JP | 400 | 20 | inherit | .02em | `--fg-3` |
| Axis tick | Jost | 400 | 18 | inherit | 0 | `--fg-3`, `white-space:nowrap` |

Rules:
- Jost 200 only at 196px and above; Jost 300 from 34px up. Below 34px numbers use Jost 400 or Noto.
- Numbers always use `font-feature-settings:"tnum","lnum"` (`.num`).
- A Japanese unit (`分`, `畳まで`, `年ごと`) is always Noto 500 at roughly 40–60% of the numeral size. Only the hero KPI's Latin unit (`dB`) is Jost 300, in `--accent`, at about 30% of the numeral.
- Line breaks in headlines are hand-placed with `<br>` at phrase boundaries (`部屋の空気を、<br>音もなく入れ替える。`).

## 4. Signature devices

### Rendered product (SVG function)

Job: the product is the hero of the cover, the texture of the gate and the column head of the comparison. One function draws it everywhere, so it looks like the same object at every size.

Where: cover hero (with floor), gate macro crop (bleeds off the right edge), comparison column heads (small, no floor). At most one large render per slide.

Call shape. Each `<svg>` names a preset with a data attribute; a preset table maps names to options; one line renders them all:

```js
const T={ cover:{...}, macro:{...}, one:{...}, max:{...} };
document.querySelectorAll('svg[data-tower]').forEach(s=>tower(s,T[s.dataset.tower]));
const B={ kaze:{...} };
document.querySelectorAll('svg[data-box]').forEach(s=>box(s,B[s.dataset.box]));
```

`tower(svg, o)` draws a revolved product (a cylinder seen slightly from above). Inputs, in viewBox units unless noted:

| Option | Meaning | Reference values |
| --- | --- | --- |
| `w` | Body diameter | 300 cover/macro, 84 One, 100 Max |
| `h` | Body height (sets proportion: 52cm vs 68cm became 166 vs 217 at similar `w`) | 620, 760, 166, 217 |
| `tilt` | Ellipse ry as a fraction of `w`; the eye height | .13 everywhere; keep one value per deck |
| `pitch` | Perforation spacing as a fraction of `w` | .03–.034 large, .05–.055 small (holes stay visible when small) |
| `holeTop` | Where perforation starts, fraction of `h` | .2 large, .22 small |
| `led` | Height of the yellow LED arc, fraction of `h` | .115–.12 |
| `floor` | `true` adds a blurred contact shadow and a mirrored reflection that fades over 35% | cover only |
| `px` | Rendered width in CSS px | 360, 920, 84, 100 |
| `view` | Optional viewBox override for a crop; sets height 1080 and `xMinYMin slice` | macro: `'-40 22 279 327'` |

Layer order, which every renderer keeps:
1. Base body fill (`#E7E3DB`).
2. Surface texture clipped to the body: perforations `#3A3835` at .72, projected so they foreshorten toward the edges, plus one seam line.
3. Shading overlays as black/white gradients over the body, never new hues: a horizontal falloff for the curved surface, a vertical gradient (white .06 at top, black .22 at the bottom).
4. The single accent detail (`#FFD23F` LED arc) on the current product only.
5. Top face: light rim ellipse, dark grille, concentric rings `#45464B`, hub.
6. Optional floor: shadow ellipse, then the reflection.
Every `<defs>` id is prefixed with a random id so several renders coexist on one page.

`box(svg, o)` draws a prism product (a squarish cabinet seen from the front-left and slightly above). It is how the legacy KAZE 2 is drawn, and it is the template for any boxy product:

| Option | Meaning | KAZE 2 |
| --- | --- | --- |
| `w` | Front face width | 118 |
| `d` | Side face depth as projected (horizontal run) | 36 |
| `t` | Top face rise (vertical run of the depth) | 22 |
| `h` | Front face height | 180 |
| `louvres` | Outlet slats on the top face | 6 |
| `slotCols`, `slotRows` | Intake slot grid on the side face | 5, 9 |
| `holeCols` | Perforation columns in the front intake panel | 20 |
| `finish` | Body color; all faces derive from it | `#A9A398` |
| `px` | Rendered width in CSS px | 154 |

It keeps the same layer order: faces in `finish`, side darkened with black .42, top lightened with white .08, front shaded by a horizontal and a vertical gradient, then details (top grille and louvres, dark control strip with three buttons and a display window, inset front panel seam, perforated intake, side slots, a handle recess, a dark plinth), then a white .35 highlight on the front-top edge.

What makes it read as an air purifier rather than a heater or a cabinet: the outlet louvres on the top, the control strip at the top of the front, a perforated intake on the front and slots on the side. Horizontal lines across the whole front read as a panel heater; do not draw them.

Adapting to a different product silhouette:
1. Choose the primitive by how the object is made: turned/round products start from `tower`, boxy ones from `box`. For anything else (a wedge speaker, a handheld, an earbud case) write a new function with the same contract: `(svg, o)`, set the viewBox from `o`'s dimensions, set `width` from `o.px`, prefix defs ids, and keep the six-step layer order.
2. Keep one light and one camera per deck: lit from the front-left above, `tilt` .13 for revolved bodies and the matching `t/d` ratio (about .6) for prisms.
3. Shade with black and white overlays on one `finish` color. A new product color changes `finish` (or the base fill) only.
4. Keep scale truthful across a comparison row: about 3.7 rendered px per cm of real height at the column-head size (One 52cm → 193px, Max 68cm → 249px, KAZE 2 56cm → about 208px).
5. The current product is the brightest object on the slide and the only one with the yellow detail. Legacy or competitor products use a darker `finish` and no accent.
6. A dark product on this dark stage needs a rim: raise the edge highlight to white .35–.5 along the silhouette so it separates from `--bg`.

### Hairline giant numeral

Job: the spec is the headline. Jost 200 at 196–380px with a small accent or Noto unit. Where: cover product name, gate chapter number, the conclusion slide's KPI. One per slide.

### Single accent

Job: point at the product being launched. `--accent` appears on its LED, the 3px top rule and `--panel` background of its table column, its bar, its value, and the chapter number in the chrome. Nothing decorative is yellow; no yellow text blocks.

### Mono chrome and foot

Job: keynote broadcast framing. Top: `.cap` mono uppercase, left `<b>03</b>` + Japanese chapter name, right product name. Foot: left `※` measurement note at 20px, right `NN / NN` page count in mono. Present on every slide; the gate replaces the left label with `NAGI One / Keynote`.

### Agenda rail

Job: show where the gate sits in the talk. Four columns at the bottom of the gate, 2px `--line` top rule, Jost 26 number, Noto 500 22 two-line title; the current item has an `--accent` rule and number and `--fg` text.

### Motion

One reveal per slide. `.rv` rises 24px and fades in over .9s on `--ease`, staggered .15s by `.d1`–`.d5`. `.prod` rises 40px over 1.4–1.6s. Bars grow with `scaleX` over 1.1s, staggered .1s. Everything is disabled under `prefers-reduced-motion`.

## 5. Slide grammar

### Reference slides

1. **Cover.** Chrome; product name display at x120 / top 236; promise h1 72px below; three-spec row at bottom 132 (dt label / dd Jost 300 52 + unit), divided by 1px `--line` with 56px padding; tower with floor in a 620px column at x1080, 330px wide from top 104; foot.
2. **Chapter gate.** Macro crop of the product bleeding off the right (920px column from x1000); left block at x120 / top 150: `Chapter` cap, 240px number, 88px title, 28px sub; agenda rail at bottom 80, 860px wide.
3. **Conclusion + number.** Two-line conclusion h2 68px at top 150 (the claim and its comparison). KPI block at top 400: label 24px, then 380px numeral with 112px accent unit. Three secondary stats at top 808, 250px each with left hairlines. Right: a labelled bar chart at x1000 / top 400, 800px wide, rows 86px, columns 270 / 1fr / 96, the current product's bar and value in accent, axis ticks below, unit at the chart title's right.
4. **Comparison.** Lead block x120 / top 150 / width 560 (h2 72 + 27px paragraph that tells the reader how to choose). Table at x760 / top 160 / width 1040: product renders as column heads in a 250px-high, bottom-aligned picture row, name in Jost 38, use-case in Noto 20; current product column on `--panel` with a 3px accent top rule; rows 70px, `#222327` rules; legacy column in `--fg-2`.

### Derived slides

- **Comparison without products** (plans, versions, competitors): slide 4 without the picture row. Column heads become Jost 38 names with a Noto 20 line under them. Still one highlighted column. At most 4 value columns and 7 rows.
- **Table** (specs, pricing): slide 4's table across the full content width (x120 to x1800), row header column 250–320px, values Jost 300 34 + Noto unit 21. Highlight the one row or column the slide's headline talks about with `--panel`; otherwise no fills. More than 8 rows means split the slide.
- **Quote** (a reviewer or user): left block at x120 / top 236, the quote in Noto 700 72px, line-height 1.32, wrapped in 「」, 2–3 hand-broken lines. Attribution below in `.cap` mono (name uppercase in Latin, or the Japanese `.jp` variant). Right half: the product at cover size without floor, or empty floor glow. No quotation-mark ornaments.
- **Timeline** (launch schedule, roadmap): the agenda rail scaled to the full width: N columns from x120 to x1800 at top ~600, 2px rule, date in Jost 300 52 (`11.18`), Noto 500 24 event title, `--fg-3` past items, accent rule and date on today's or the launch step. Title h2 68px at top 150 above it.
- **Team** (designers, engineers): a 4-column grid under an h2 at top 150, each cell with a 2px `--line` top rule, name in Noto 700 40, role in `.cap` mono, one line of `--fg-2` 22px about what they built. No portraits by default; if photos are supplied, crop square to 320px, convert to grayscale and darken so the brightest pixel sits below `--fg`.
- **Closing** (launch date and call to action): mirror the cover. Product with floor on the right, left block with the date as a Jost 200 196px display (`11.18`) and a one-line Noto 700 72 promise, then the spec row replaced by price, pre-order start and URL (URL in mono 28px `--fg`). Foot unchanged. No "ありがとうございました" slide.
- **Spec stat slide** (one feature): slide 3 without the chart: the KPI numeral centred on the left half, the product macro crop on the right.

## 6. Slop signs

- [ ] Any text color darker than `--fg-3`, or a new surface lighter than `#1B1C20`. Re-run the 7:1 measurement after any color change.
- [ ] Yellow used for decoration, for headings, for a legacy product, or on more than one product per slide.
- [ ] A product shown as a photo, stock render, emoji or flat line icon next to the SVG renders, or two products drawn with different lighting, eye height or scale.
- [ ] A legacy or competitor product brighter or larger than its real size relative to the current product.
- [ ] Horizontal stripes across a whole product face (reads as a heater or radiator).
- [ ] Jost 200 used below 196px, or Jost 300 below 34px.
- [ ] A number without its unit, a Japanese unit set in Jost, or a unit at the same size as the number.
- [ ] Headline is a topic name (`静音性について`) instead of the claim (`眠っている間は、19dB。`).
- [ ] Every slide is "heading + three bullets"; bullets nested two levels or more.
- [ ] Icons or decorative shapes added to fill empty dark space. Empty space is the style.
- [ ] Pure `#000` ground, pure `#FFF` text, neon glows, gradient text or drop shadows on type.
- [ ] Measured claims (dB, minutes, watts) without a `※` note on the measurement condition in the foot.
- [ ] Missing chrome or page count on a content slide, or chrome labels not in mono uppercase.
- [ ] More than one large render or more than one giant numeral on a slide.
- [ ] A headline that wraps on its own instead of breaking at a hand-placed `<br>`, or axis labels and numbers that wrap (`5` / `0`); set `white-space:nowrap` on them.
- [ ] Motion beyond the single reveal: per-word animation, looping product spin, parallax.
