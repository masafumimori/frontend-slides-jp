# Warm Editorial design system

## 1. Thesis

A brand book printed on cream paper with two inks. Every slide has exactly one large circle pushed off an edge, and every drawing is the same symbol printed twice, a flat fill and an ink line slightly out of register, so the deck feels hand-made but never random.

## 2. Tokens

```css
:root {
  --cream: #F3EBDD;
  --ink: #2E2420;
  --tomato: #DD5A2B;
  --squash: #EDB33E;
  --ink-sub: color-mix(in srgb, var(--ink) 68%, var(--cream));
  --ink-rule: color-mix(in srgb, var(--ink) 22%, var(--cream));
  --tomato-30: color-mix(in srgb, var(--tomato) 30%, var(--cream));
  --tomato-55: color-mix(in srgb, var(--tomato) 55%, var(--cream));

  --jp: 'Noto Sans JP', sans-serif;
  --latin: 'Fraunces', serif;

  --m-x: 128px;
  --line: 5px;

  --stage-bg: #1b1512;
  --slide-bg: var(--cream);
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Color roles. Cream is the paper; no slide uses white. Ink is all text, every rule, and the line pass of every illustration. Tomato is the emphasis ink: the cover circle, the corner tab, the one key number per slide, the current item in a list, the key segment in a diagram. Squash appears only as the contents circle, as the second illustration fill, and as a secondary diagram segment. Any further tint is a `color-mix` of tomato or ink with cream; never add a new hue.

Fonts load from `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,100;1,9..144,300..700,100&family=Noto+Sans+JP:wght@400;500;700;900&display=swap`. Fraunces needs the `opsz` and `SOFT` axes from that query; `SOFT` is always 100.

## 3. Type scale

All Japanese is Noto Sans JP. All Latin letters and figures that carry design weight are Fraunces with `font-variation-settings` as listed. The base CSS sets headings to tracking 0 and line-height 1.35, and `p`/`li`/`td`/`dd` to 0.02em and 1.7; the values below are what renders.

| Role | Family | Weight | Size | Line-height | Tracking | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Masthead (cover only) | Fraunces italic, opsz 144, SOFT 100 | 400 | 272px | 0.9 | -0.02em | Second word upright in tomato |
| Display catch (cover `h1`) | Noto Sans JP | 700 | 96px | 1.32 | 0 | 2 to 3 short lines |
| h1 slide headline (`.hl`) | Noto Sans JP | 700 | 80px | 1.35 | 0 | `left: 128px; top: 148px`, max 2 lines, a full sentence |
| Numerals inside headlines (`.nm`) | Fraunces, opsz 144, SOFT 100, `lnum` | 600 | 1.12em | inherit | 0 | margin 0 0.06em |
| h2 section head | Noto Sans JP | 700 | 64px | 1.4 | 0 | Contents, chapter openers |
| List item title | Noto Sans JP | 700 | 40px | 1.7 | 0 | Contents rows |
| h3 card or event title | Noto Sans JP | 700 | 30px | 1.35 | 0 | |
| Label (`.lab`) | Noto Sans JP | 700 | 26px | 1.45 | 0 | Above a big number |
| Lede | Noto Sans JP | 400 | 24px | 1.8 | 0.03em | ink-sub, width 520px |
| Body small | Noto Sans JP | 400 | 20 to 22px | 1.6 to 1.7 | 0.03em | ink-sub |
| Folio and source | Noto Sans JP | 400 | 18px | normal | 0.03em | ink-sub, `bottom: 56px` |
| Caption (`.cap`) | Fraunces, opsz 9, SOFT 100, uppercase | 500 | 17px | normal | 0.34em | Latin only; the only small label |
| Chapter name in chrome | Noto Sans JP | 500 | 20px | normal | 0.03em | |
| Big number | Fraunces, opsz 144, SOFT 100, `lnum` | 400 | 290px | 0.8 | -0.03em | tomato |
| Big number unit | Fraunces | 400 | 96px | 0.8 | 0 | ink, margin-left 10px |
| Secondary number | Fraunces, opsz 72, SOFT 100 | 500 | 52px | 1.1 | 0 | Japanese unit in 22px 700 Noto Sans JP |
| List or tab number | Fraunces, opsz 144, SOFT 100 | 400 | 64px (list), 76px italic (tab) | 1 | 0 | Current item italic tomato |
| Timeline time | Fraunces, opsz 72, SOFT 100, `lnum` | 500 | 44px | 1 | 0 | Unit 20px 700 Noto Sans JP |

Jump ratio is the point: display catch 96px against 20px body, big number 290px against a 26px label.

## 4. Signature devices

### 4.1 The edge circle
One flat circle per slide, never two, no gradient, no shadow, no outline. Its position is fixed by slide type so the circle doubles as navigation.

- Cover: tomato, 1120px, `right: -300px; bottom: -420px`. The illustration cluster sits on it.
- Contents and chapter openers: squash, 1080px, `left: -460px; top: 0`. Illustrations stand on it in a loose vertical column.
- Every content slide: the corner tab, tomato, 380px, `right: -190px; top: -190px`, holding the chapter number in Fraunces italic 400, opsz 144, 76px, cream, at `left: 44px; top: 222px` inside the circle. The chrome row ends at `right: 320px` to clear it.
- A closing or statement slide may reuse the cover circle position; nothing else gets a new position.

### 4.2 Two-plate illustrations (fill + offset line)
Every drawing is one `<symbol>` rendered twice with `<use>`: first the fill plate, then the ink plate shifted up-right, like a two-color print slightly out of register. Rules a new motif must follow to match:

1. Canvas. `viewBox="0 0 200 200"`, subject centered, silhouette roughly 140 to 180 units across, at least 6 units clear of the edges. Place it with `<svg class="ill NAME" viewBox="0 0 200 200">` sized by CSS `width` only.
2. Parts by class. `.o` is a closed shape filled tomato, `.y` a closed shape filled squash, `.c` a closed shape filled cream, `.l` an open line that is never filled. A motif uses one or two of `.o`/`.y`/`.c` (one main body, one secondary part such as a lid or rim) plus `.l` for details.
3. Silhouettes are simple and nearly symmetric. Build them from straight runs and quadratic curves (`Q`), about 4 to 8 nodes, rounded rather than pointy. No gradients, no textures, no hatching, no stroke-only bodies.
4. Details are `.l` strokes: stems, handles, leaves, steam, and short horizontal tick marks (14 to 34 units long, like `M58 132 H92`) that suggest surface. Two to six detail strokes, never shading.
5. The plates. In the fill plate (`use.pf`) the fills are on and the stroke is off. In the line plate (`use.pl`) every part, filled or not, is stroked in ink with fills off, at `--line` 5px, round caps and joins, `vector-effect: non-scaling-stroke`, and the plate has `transform: translate(9px, -7px)`. The offset is in viewBox units, so it scales with the drawing (about 29px right and 22px up at 640px wide) while the stroke stays 5px. The result shows a sliver of fill below-left of each outline and a sliver of paper inside its top-right edge.
6. Color remap on a colored field. Wrap the group in `.on-tomato` (fills become squash, cream, cream) or `.on-squash` (tomato, cream, cream). A fill must never match the field it sits on.
7. Scale and count. One to three motifs per slide, each 150 to 640px wide, may rotate between -30deg and +30deg, may overhang the circle edge, never overlap text. All motifs in a deck come from one subject family (the reference uses kitchen and vegetables); do not mix in stars, sparkles or generic icons.

```html
<symbol id="i-pot" viewBox="0 0 200 200" class="sym">
  <path class="o" d="M32 86 H168 V138 Q168 176 130 176 H70 Q32 176 32 138 Z"/>
  <path class="y" d="M22 86 Q100 38 178 86 Z"/>
  <circle class="c" cx="100" cy="54" r="9"/>
  <path class="l" d="M32 106 H12 M168 106 H188 M58 132 H92"/>
</symbol>
<svg class="ill pot" viewBox="0 0 200 200"><use href="#i-pot" class="pf"/><use href="#i-pot" class="pl"/></svg>
```

The CSS for the plates is in `reference.html` (`.ill`, `.pf`, `.pl`, `.sym`); copy it as is.

### 4.3 Masthead pairing
Cover only. A one- or two-word Latin brand name in Fraunces italic at 272px, its second half upright and tomato, above a bold Japanese catch. The Latin is the brand's real name in romaji, never a decorative foreign phrase.

### 4.4 Fraunces figures inside Japanese
Any number inside a Japanese headline is wrapped in `.nm` and set in Fraunces 600 at 1.12em with `lnum`. Units and counters (か月, 人, 時間) stay in Noto Sans JP.

### 4.5 Captions and chrome
Content slides carry a chrome row at `top: 64px` (caption left, chapter name right, `right: 320px`) and a folio row at `bottom: 56px` (source or note left, `P.xx` in Fraunces 0.2em right). The `.cap` caption is the only small label style and is Latin-only uppercase.

### 4.6 Charts and diagrams
Flat, ink and tomato only. Bars are tomato-30, the first bar tomato-55, the last or key bar solid tomato. Baseline 3px ink, at most two dashed gridlines (`3 6`, ink-sub, 1px, opacity 0.6) with a right-aligned label. Label only the first and last values (Fraunces 500, 30px), and only a few axis labels (20px Noto Sans JP, ink-sub; the last one end-anchored so it stays inside). Timelines use a 4px round-capped ink axis, 22px butt-capped segments in tomato-30, tomato or squash for durations, cream nodes of radius 9 with a 4px ink ring, a `//` break mark when the scale changes, and events alternating above and below with a 2px ink stem for the lower ones.

### 4.7 Motion
`.reveal` elements rise 24px and fade over 0.8s on `--ease`, staggered by 0.12s (`.d1` to `.d4`). Nothing else moves. Reduced motion shows everything at once.

## 5. Slide grammar

Margins are 128px left and right. Headline at `top: 148px`. Content starts around `top: 420px` to 450px. Keep at least 64px between the last content block and the folio.

### Reference slides
1. **Cover** (`.s-cover`). Tomato circle bottom right with the illustration cluster in `.on-tomato`, caption row, masthead, catch, stamp top right, meta bottom left. See preview.md for coordinates.
2. **Contents / chapter gate** (`.s-toc`). Squash circle left with three motifs in `.on-squash`. Head at `left: 800px; top: 150px`: caption then 64px h2. List at `left: 800px; top: 420px`, 3px ink top rule, rows on a 150px / 1fr / 300px grid with 2px ink-rule separators and 26/28px padding: Fraunces number, 40px title, 22px two-line note. The current chapter's number is italic tomato. Reuse this slide as each chapter's opener with `li.now` moved.
3. **Conclusion + number** (`.s-kpi`). Corner tab, chrome, a two-line headline that states the finding with `.nm` figures. Left column at `top: 448px`, 640px wide: label with a small source line, the 290px tomato number with a 96px ink unit, a 3px ink rule, then two secondary numbers 72px apart. Right column at `left: 900px`, 892px wide: caption and the bar chart. Source in the folio.
4. **Diagram** (`.s-flow`). Corner tab, chrome, headline left, a 520px lede at `right: 128px; top: 210px`. A full-width timeline on an axis at y 652, upper events end 40px above the axis, lower events start 104px below it with stems from +34 to +90. One motif (the bowl, 300px) bottom right.

### Derived slides
- **Comparison.** Headline as usual. Two columns at `left: 128px` and `left: 1000px`, each 792px wide, starting at `top: 448px`. Each column opens with a `.cap` caption and an h3, then 3 to 4 rows separated by 2px ink-rule lines. The recommended side gets the tomato number or a 22px tomato segment under its h3; the other side stays ink. No boxes, no VS badge.
- **Table.** Up to 5 columns by 6 rows under the headline, starting at `top: 448px`. 3px ink rule above the header row, 2px ink-rule between rows, no vertical lines, no fills except one highlighted row in tomato-30. Header cells are `.cap` captions or 20px 700 Noto Sans JP; numbers right-aligned in Fraunces 500 with `lnum`; body text 22px. If it needs more rows, split the slide.
- **Quote.** The squash or tomato circle in the cover position, with one motif on it. The quote as an h2 at 64px 700, at most three lines, `left: 128px; top: 300px`, preceded by a tomato Fraunces italic opening mark at 160px. Speaker as a `.cap` line plus a 22px name and role.
- **Timeline.** Use the reference diagram. Up to 6 events, alternating up and down, one key event in tomato. Change scale only with the `//` break and say so in the folio.
- **Team.** Up to 4 people in a row at `top: 448px`, each column 360px wide. Each person is a 240px cream circle with a two-plate portrait motif (simple head-and-shoulders silhouette built under the 4.2 rules, `.o` or `.y` body and `.l` features) or a real photo clipped to a circle, then a 30px h3 name, a `.cap` role in Latin, and two lines of 20px body. Same motif rules for all four.
- **Closing.** Mirror the cover: tomato circle bottom right with the cluster, a 96px two- or three-line catch at `left: 128px; top: 360px`, and contact or next step as 24px text with a tomato `.cap` above it. No "Thank you" alone; the catch states what happens next.

## 6. Slop signs

- [ ] More than one circle on a slide, or a circle in a position other than the four in 4.1, or circles that change color within one slide type.
- [ ] Any color that is not cream, ink, tomato, squash, or a `color-mix` of them with cream. No white paper, no gradients, no drop shadows, no glassy cards.
- [ ] An illustration with a single plate (line only or fill only), an offset other than 9/-7 up-right, a stroke other than 5px ink, or a fill matching the field it sits on.
- [ ] Motifs from different families (a carrot next to a rocket), clip-art icons, stars, sparkles, or confetti scattered for decoration.
- [ ] Decorative Latin or faux-French phrases. The masthead is the brand's real name; captions describe the slide.
- [ ] Mincho or rounded gothic mixed into the Japanese, or Japanese set in Fraunces.
- [ ] Headlines that name a topic (「継続率について」) instead of stating the finding (「10人に8人が続けている。」).
- [ ] Figures in a headline left in Noto Sans JP instead of `.nm` Fraunces, or a big number in ink instead of tomato.
- [ ] More than one tomato emphasis per slide competing with the key number.
- [ ] Rainbow chart series, 3D, every bar labelled, or a missing source line in the folio.
- [ ] Content touching the folio (less than 64px gap) or the chrome row running under the corner tab.
- [ ] Line breaks in Japanese headlines that split a word; break after 、 or at a phrase boundary with `<br>`.
- [ ] Everything centered. The layout is asymmetric: text left, circle and motifs on the opposite edge.

## 7. Document pages

`reference-a4.html` is a 6-page brand book for a fictional miso brewery: cover, statement, business page with a product grid, a story page on `d-flow-v`, a numbers page, and a back cover with shops and contact. Sizes are px at the 1240×1754 page. The tokens are the same as in section 2, except `--m-x: 96px`, and the document sets `--desk-bg: #1b1512` and `--page-bg: var(--cream)` for `page-base.css`. Fonts use the query in section 2, because the catalog's Fraunces query has no `opsz` or `SOFT` axis.

### 7.1 Page frame
- **Running head** (`.rh`): `top: 64px; left: 96px; right: 200px`. The left side is a `.cap` with the document name in ink-sub. The right side is the chapter, a Fraunces tomato number plus a 20px 500 name. It ends at `right: 200px` on every page, including pages that have no corner circle, so it sits in the same place on each page.
- **Corner tab** (the chapter tab's number): the 4.1 corner circle, scaled to 300px at `right: -150px; top: -150px`. It holds the chapter number in Fraunces italic 60px cream at `left: 34px; top: 170px`. It appears on content pages only. A page that carries a big circle (statement, back cover) drops it, because a page never shows two circles.
- **Chapter name strip** (`.tab`): on every page except the cover, `right: 36px; top: 214px; width: 28px`. It is a 4×44px tomato bar above the chapter name, set vertically (`.tate`) at 20px 500 with 0.12em tracking. Fix its width, or the column drifts sideways with the length of the name.
- **Folio**: `P.0n` at `right: 96px; bottom: 56px`, Fraunces opsz 9, 18px, 0.2em, ink-sub. It is ink on the back cover, where it sits on the tomato circle.
- **Note slot** (`.note`): `left: 96px; bottom: 102px; right: 260px`, 17px, line-height 1.6, ink-sub. Sources and n, with 「架空」 when the data is invented. Content ends by about y 1580, so it clears the slot.

### 7.2 Reading type
Kicker `.cap` at `top: 140px`, 20px, 0.3em tracking, tomato, about a third of the headline size. Headline `.hl` at `top: 184px`, 60px (66px on statement and back cover), 700, line-height 1.4, two or three lines broken by hand, with `.nm` figures. Lead at 26px/1.8 in ink-sub, two lines across 1048px. Body is set in two columns of 500px with a 48px gutter, 23px/1.8, justified. Figures in running text use `.nm` at weight 400 and 1.06em, never the headline's 600/1.12em. ■ headings are 22–26px 700 with an 18px tomato square. They sit on a 3px ink rule and carry a Latin `.cap` at the right in ink-sub.

### 7.3 Circles and motifs by page type
One circle per page, as in 4.1. Positions are fixed by page type:
- **Cover**: tomato, 1200px, `right: -360px; bottom: -340px`. It holds a three-motif cluster in `.on-tomato`: a 560px barrel, beans and a negi that may bleed off the right edge. The masthead is Fraunces italic 236px at `left: 82px; top: 180px`, with its second half upright and tomato. The catch is 80px 700 at `top: 470px`, in three lines. The stamp sits top right. The meta block sits bottom left at `bottom: 96px` and says the content is fictional.
- **Statement**: squash, 1000px, `left: -500px; top: 820px`, with three ingredient motifs in `.on-squash` stacked down it. The headline is top left. Body (one column, 584px, about 25 字 per line), signature and a three-row promise list sit at `left: 560px`. The promise list uses 48px Fraunces numbers, and only the first is italic tomato.
- **Content pages** (business, story, numbers): the corner tab only, plus at most one free motif of 150–300px, placed where the text leaves room (the ladle beside the quote, the bag beside the lead).
- **Back cover**: tomato in the cover position, 1100px, `right: -330px; bottom: -300px`, with a shop curtain, a bowl and steam. The catch says what to do next. Shops are listed by region in two 500px columns (■ region heading, 26px name, a tomato 17px tag such as 蔵見学あり, and a 19px address and hours line). Contact sits bottom left, clear of the circle.

### 7.4 Product grid (business page)
Three items per row, columns of 1fr with a 40px gap. Each item is a 124px two-plate motif, then a 24px 700 name, two 18px ink-sub lines, and a Fraunces 30px price with a 18px 円 and a 17px ink-sub unit. Give each item its own motif from the same kitchen family. Never use a placeholder box. No item is tomato unless the headline names it.

### 7.5 Figure pages
The figure takes the full 1048px at `top: 520px`, 560–760px tall, and opens with a 3px ink rule. Its source line follows at 17px. Restyle `diagrams.html` patterns to section 4.6: ink connectors 4px, cream nodes with a 4px ink ring and Fraunces numbers, 2px ink-rule row lines, and tomato only on the one key row. The reference fits `d-flow-v` with columns `138px 64px 248px 1fr 168px`. Under the figure, a story page adds a person: a Fraunces italic tomato “ at 140px, a 32px 700 quote, and a `.cap` plus name. A numbers page uses the 4.6 bar chart at 504×420 beside a 260px tomato number, then a row of three 64px secondary numbers on a 3px ink rule.

### 7.6 Document slop signs
- [ ] A corner circle on a page that already has the cover or contents circle.
- [ ] The chapter strip or running head shifting between pages (measure the boxes).
- [ ] Body figures set in `.nm` 600, which reads as bold emphasis in running text.
- [ ] Product cells with text squeezed beside the motif (under about 14 字 per line). Stack the motif above the text instead.
- [ ] A gridline label crossing a value label. Start the line after the first bar.
