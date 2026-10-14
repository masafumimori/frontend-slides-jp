# Color Index (章色インデックス) design system

## 1. Thesis

A long multi-business document is navigated by color. Navy and neutrals form the skeleton; each chapter owns one color, and on a chapter slide that color alone drives the top rule, the `■` markers, the chart fills, the emphasized words and the open thumb tab on the right edge. The reader knows where they are before reading a word.

## 2. Tokens

The exact `:root` block from `reference.html`:

```css
:root {
  --stage-bg: #0E151C;
  --slide-bg: #FFFFFF;
  --paper: #F5F4F0;
  --line: #DEDCD5;
  --line-strong: #B9B6AD;
  --mute: #6E7177;
  --ink: #1D232A;
  --base: #1E3348;          /* brand navy: skeleton */
  --ch1: #2B7680;           /* 01 機能材料 teal */
  --ch2: #B0563A;           /* 02 モビリティ terracotta */
  --ch3: #997622;           /* 03 エネルギー ochre */
  --ch4: #5C7646;           /* 04 ライフサイエンス moss */
  --jp: "Noto Sans JP", sans-serif;
  --lat: "Barlow", "Noto Sans JP", sans-serif;
  --num: "Barlow Semi Condensed", "Barlow", sans-serif;
  --edge: 120px;            /* left margin */
  --safe-r: 168px;          /* open tab 88px + 80px gutter: nothing but tabs goes right of this */
}
.slide[data-ch="1"] { --c: var(--ch1); }
.slide[data-ch="2"] { --c: var(--ch2); }
.slide[data-ch="3"] { --c: var(--ch3); }
.slide[data-ch="4"] { --c: var(--ch4); }
.slide { --c-tint: color-mix(in srgb, var(--c, var(--base)) 16%, #fff); --c-mid: color-mix(in srgb, var(--c, var(--base)) 45%, #fff); }
```

Rules for the tokens:

- **`--c` is the only accent a rule may read.** Every component uses `var(--c)`, `--c-tint` (16% on white) and `--c-mid` (45% on white). Never write `var(--ch2)` inside a component; set `data-ch` on the slide instead. Cover and contents set `--c: var(--base)`.
- **Why `style.json` lists only `base`, `ink`, `paper`.** The index allows at most 6 colors and this style has 7 that matter (navy, ink, paper and four chapters). The chapter hues are content, not style: a deck with three or six businesses has three or six of them, picked per deck. So `style.json` carries the fixed skeleton, and the chapter set lives here and in the `CHAPTERS` array of `reference.html`. Merging tokens to fit (for example dropping ink and setting text in navy) would change the look of every slide, so it was rejected.
- **Choosing chapter colors for a new deck.** 3 to 6 chapters. Keep the four reference hues when there are four. For more, add muted hues of similar lightness (L* 45 to 55, chroma moderate), never a pure primary, never a second blue next to navy. Each must reach 4.5:1 against white, because white 17px bold tab names sit on it. The reference ochre `#997622` measures 4.23:1 and passes only for large text; do not darken the other three to match it, and if a deck sets small text in ochre, use 19px bold or larger.
- **Layout constants.** Left margin `--edge` 120px. Right safe edge `--safe-r` 168px from the right (x = 1752). Content, header, footer and tables all end at x = 1752; only `.tabs` and the `.rule` cross it.

## 3. Type scale

Sizes are px at the 1920×1080 stage. The base CSS sets `palt` on `.slide`; `.lat` and `.num` reset to `normal` and `tnum`.

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Cover display | Noto Sans JP | 900 | 124 | 1.12 | 0.01em |
| Cover period (`2027–2029`) | Barlow | 600 | 116 | 1.12 | 0.01em, `tnum` |
| Section title (目次) | Noto Sans JP | 700 | 88 | 1 | 0.02em |
| h1, the slide's conclusion (`.slide .h1`) | Noto Sans JP | 700 | 70 | 1.32 | 0.01em |
| Cover lead | Noto Sans JP | 700 | 38 | 1.55 | 0.01em |
| Contents row name / stage h3 | Noto Sans JP | 700 | 34 / 32 | normal / 1.35 (base) | 0.01em |
| h2 with `■` marker (`.sq`) | Noto Sans JP | 700 | 24 | normal | 0.02em |
| Body (`.body`, slide lead under h1) | Noto Sans JP | 400 | 24 | 1.7 to 1.75 | 0.02em |
| Contents paragraph | Noto Sans JP | 400 | 23 | 1.8 | 0.02em |
| Header (chapter, role, document) | Noto Sans JP | 700 / 500 | 20 | normal | 0.02em |
| Caption, note, column head | Noto Sans JP | 400 / 500 | 16 to 19 | 1.6 to 1.7 | 0.02em |
| Eyebrow | Barlow | 600 | 18 | normal | 0.16em, uppercase |
| Chapter number in header | Barlow | 600 | 22 | normal | 0.04em |
| Page number | Barlow | 600 | 20 | normal | 0.04em |
| Hero number | Barlow Semi Condensed | 600 | 236 | 0.86 | -0.01em |
| Hero unit | Noto Sans JP | 700 | 64 | — | — |
| Total / large figure | Barlow Semi Condensed | 600 | 104 | 1 | 0 |
| Sub-KPI figure + unit | Barlow Semi Condensed 600 / Noto 700 | — | 68 + 24 | 1 | 0 |
| Table / card figure + unit | Barlow Semi Condensed 600 / Noto 500 | — | 40 + 17 to 18 | 1.1 | 0 |
| Chart labels | Barlow | 500 (600 for totals) | 20 (24 for the latest value) | — | — |

Ratios to keep: a figure is roughly 3 to 4 times its unit (236/64, 68/24, 40/17). The h1 is a full sentence that states the conclusion, at most two lines, with one phrase in `<em>` colored `--c`.

The base CSS defaults `h1, h2, h3` to tracking 0 and line-height 1.35; the base block is wrapped in `:where()` and has zero specificity, so any deck rule wins over it. The deck's `.h1` keeps 0.01em / 1.32 (the `.slide` prefix in `reference.html` is harmless and not required).

## 4. Signature devices

- **Thumb index (`.tabs`, 爪見出し).** Job: show the current chapter and the whole structure at once. Four tabs at `right: 0`, `top: 128 + i × 208px`, each 200px tall. Closed: 40px wide, `--paper` fill, 1px `--line` left border, number in Barlow 600 17px `--line-strong`. Open (`.on`): 88px wide, filled with the chapter color, number 22px white, name vertical (`writing-mode: vertical-rl`, `vpal`) Noto 700 17px white. Appears on every slide. Cover and contents open all four (`data-tabs="all"`); every other slide opens only its chapter. With 5 or 6 chapters, shrink tab height to fit 128px to 952px with 8px gaps; never scroll or wrap them.
- **Top rule (`.rule`).** Job: the color you see from the back of the room. Full width, 10px, `var(--c, var(--base))`. Every slide.
- **Header (`.head`).** Job: breadcrumb. At left 120, right 168, top 52, 20px: chapter number + name in `--c` 700, the chapter's role after a 1px `--line-strong` divider in `--mute`, the document name pushed right in `--mute`. Every chapter slide; not on the cover.
- **Footer (`.foot`).** Job: source note and page. At bottom 48, 17px `--mute` note starting with `※`, page `11 / 32` right-aligned (current in ink 600, total in mute 500). Every slide but the cover.
- **Square marker (`.sq`).** Job: label a figure or chart. An 18px square in `--c`, gap 12px, then 24px bold text in ink. One per data block, never on body text.
- **Hero KPI.** Job: the one number that proves the h1. Label 22px bold with a mute 18px period, then figure 236px in `--c`, then a 1px ink rule and two sub-KPIs (68px) split by a 1px `--line` divider. The delta (`+3.1pt`) is Barlow 600 20px in `--c`. At most one hero per slide.
- **Chart in one hue.** Job: compare without a legend of six colors. Current series in `--c`, the rest in `--c-tint`, plans as a 2px dashed `--c` outline. Values above bars in ink 600, values inside dark bars in white, years in mute with the latest in ink 600. Baseline 1.5px ink. Only `--c` and its mixes; never another chapter's color.
- **Highlighted stage.** Job: show where the money is in a process. Stage cards on `--paper`, the key card on `--c-tint` with a 6px inset top bar in `--c`; chevrons between cards in `--line-strong`, in `--c` after the key card.
- **Segment mix (legend).** Job: tie the color system to real numbers. On the cover, four blocks in a 168px-tall row; on contents, a 28px bar with a 0 to 100% scale. Widths are each chapter's share of sales, drawn from the same `CHAPTERS` array as every other number. Only on the cover and contents.
- **Contents rows.** Job: the color legend. Grid `14px 56px 1fr 236px 150px 72px`, gap 24px, rows 148px with a 1px `--line` bottom: a 14×96 chip, the number in chapter color Barlow 600 30px, name 34px bold with a mute 19px description, role 19px bold in chapter color with a mute 16px note, sales right-aligned, page `p.10` right-aligned. The table spans `left: 680px; right: var(--safe-r)` so its last column ends at the safe edge, clear of the open tabs.

## 5. Slide grammar

Every slide: white ground, top rule, tabs, footer. Content lives between x = 120 and x = 1752. Chapter slides put the header at top 52 and the h1 at top 152; the evidence block starts near top 412 to 456.

The four reference slides:

1. **Cover** (`data-tabs="all"`, `--c: base`). Mark top-left, eyebrow + display title + period from top 300, lead at top 692, segment mix lower right (left 1000, top 640), meta at bottom 72. Navy is the only text color; the chapter colors appear only in the tabs and the mix blocks.
2. **Contents as color legend** (`data-tabs="all"`). Left column (left 120, width 460): eyebrow, `目次` 88px, a four-line explanation that says colors mark chapters, then the total under a 2px navy rule. Right (left 680 to the safe edge): `■` label, composition bar, scale, column heads, one row per chapter.
3. **Conclusion + numbers** (`data-ch`). h1 sentence, hero KPI at left 120 top 456 width 520, chart at left 760 top 456 width 992.
4. **Diagram** (`data-ch`). h1 sentence plus a 24px lead, a bracket row naming the phases (one-off vs stock), four stage cards in a 4-column grid with 40px gaps and the key card highlighted, then a two-row 100% bar of the profit mix at top 806.

Deriving the rest from the same system:

- **Chapter divider.** Same frame, only the tab of the new chapter open. Number in Barlow 600 at 236px in `--c`, chapter name 88px bold ink, role and one sentence of the chapter's job in 24px. A 28px bar of that chapter's share (its block in `--c`, the rest in `--line`). Do not flood the slide with the chapter color; the white ground stays.
- **Comparison.** Two columns between 120 and 1752 with a 1px `--line` divider. The chapter's option gets the `--c` marker, a 6px `--c` top bar and `--c-tint` ground; the other stays on `--paper`. Same row labels on both sides so figures line up. Comparing two chapters is a legend case: use contents-style chips in each chapter color and keep the rule navy (`--c: base`, all tabs closed but the two compared).
- **Table.** Header row 16px mute 500 above a 1px ink rule, rows separated by 1px `--line`, figures right-aligned in Barlow Semi Condensed 600 with units 17px. Highlight one row or column with `--c-tint`, never zebra stripes. Last column ends at the safe edge.
- **Quote.** A customer or executive line at 56px bold ink, left-aligned at 120, max 3 lines, the key phrase in `--c`. Attribution 20px mute under a 64px `--c` bar. No quotation-mark glyph art.
- **Timeline.** A horizontal 2px `--line-strong` axis across the content width, years in Barlow 600 20px, milestones as 18px squares on the axis; past in ink, the plan period in `--c` with a dashed `--c` axis segment, mirroring the chart's plan rule.
- **Team.** Up to 4 per row in the stage-card grid: `--paper` card, name 32px bold, role 18px mute, the business they lead as a chip in that chapter's color. Without photos, use initials in Barlow 600 on `--paper`; do not invent avatars.
- **Closing.** Navy rule, all tabs open (it is a legend again). h1 restating the plan in one sentence, then the four chapter roles as a compact contents row (chip, number, name, role) and the targets as figures. Contact or next steps in 19px mute at bottom 72.

## 6. Slop signs

Check before delivery:

- [ ] A chapter slide shows any chapter color other than its own (in a chart, a chip, an icon or an emphasized word). Only cover, contents, closing and chapter-vs-chapter comparisons may show several.
- [ ] Tabs do not match the slide: the open tab is not the slide's `data-ch`, or the header's chapter number disagrees with it.
- [ ] Anything other than `.tabs` and `.rule` extends right of x = 1752 (measure with `getBoundingClientRect`, including SVG strokes).
- [ ] A component hardcodes `var(--chN)` or a hex instead of `var(--c)`.
- [ ] A chart uses several hues for series of one chapter, or a rainbow; a 3D chart; gradients or shadows on bars.
- [ ] Shares, totals or bar widths typed by hand instead of computed from one data array, so the cover mix, contents bar and rows disagree.
- [ ] h1 is a topic label (「事業概要について」) instead of a sentence with the conclusion; more than one `<em>` in it.
- [ ] Figure and unit at the same size, or digits in Noto Sans JP instead of Barlow Semi Condensed; inconsistent units (億円 vs 百万円) across slides.
- [ ] The chapter color floods a background, a whole card or body text. It belongs on rules, markers, figures, one emphasized phrase, the key card's top bar and tint, and tabs.
- [ ] More than three emphasis methods on a slide (the system already uses color, size and the tint card).
- [ ] Cards or stage boxes whose content spills below their fill, or fixed card heights that clip.
- [ ] No `※` source note under a chart or a figure.
- [ ] Icons, emoji, drop shadows, glassmorphism or rounded pill buttons. The style is flat rectangles and 1px rules.
- [ ] Centered body text, or text under 16px.
