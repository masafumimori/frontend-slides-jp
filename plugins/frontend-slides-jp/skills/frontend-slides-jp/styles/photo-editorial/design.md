# Photo Editorial design system

## 1. Thesis

An integrated report that lets documentary photographs carry all the color and emotion, while the page stays white, black and one selvedge red. Condensed Latin caps name things, Mincho tells the story, and data is set as calmly as a magazine table.

## 2. Tokens

```css
:root {
  --paper: #FFFFFF;
  --ink: #141414;
  --red: #C8261B;          /* 赤耳 — selvedge red */
  --mute: #8C8A86;         /* captions, rules */
  --rule: rgba(20,20,20,.18);
  --bar: #DAD7D1;           /* chart bars that are not the key bar */

  --f-latin: 'Archivo', sans-serif;      /* used at wdth 62–75 = condensed caps */
  --f-mincho: 'Noto Serif JP', serif;
  --f-gothic: 'Noto Sans JP', sans-serif;

  --m: 128px;              /* outer margin */
  --ease: cubic-bezier(.2,.7,.1,1);
  --stage-bg: #0b0b0b;
  --slide-bg: var(--paper);
}
```

Fixed literals in `reference.html` that are not tokens: the cover background behind the photo `#0d0c0b`, white text on photos at 100%, 82% and 66% (`rgba(255,255,255,.82)`, `.66`), lead text `#3a3a3a`, station notes `#4a4a4a`. Use them only in those roles.

Color roles. Red marks one thing per slide: the cover year, a headline keyword, the hero KPI, the key bar, chapter numbers in the contents, the loop line and photo tags. Mute is for labels, folios and secondary values. Everything else on the page is ink on paper. Fonts load from `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=Noto+Serif+JP:wght@500;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap`; the `wdth` axis is required.

## 3. Type scale

The base CSS sets headings to line-height 1.35 and tracking 0, and `p`/`li`/`td`/`dd` to 1.7 and 0.02em. Because the base block is wrapped in `:where()` and has zero specificity, so any deck rule wins over it, `.caps` keeps its 0.86 line-height and the contents `li` its line-height 1.45 and tracking 0. Keep both values when copying.

| Role | Family | Weight | Size | Line-height | Tracking | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Display caps (cover `h1`) | Archivo, `font-stretch: 62%`, uppercase | 800 | 196px | 0.86 | -0.005em | 3 lines, white on photo |
| Section caps (on photo) | same | 800 | 168px | 0.86 | -0.005em | Contents photo panel |
| Section caps (on paper) | same | 800 | 132px | 0.86 | -0.005em | Red; fold-out and chapter heads |
| h2 headline | Noto Serif JP | 800 | 78px | 1.32 | 0 | 2 lines, one keyword in red |
| Cover sub | Noto Serif JP | 700 | 46px | 1.5 | 0 | White on photo |
| Statement | Noto Serif JP | 700 | 34 to 36px | 1.55 to 1.6 | 0 | Under section caps |
| Contents item | Noto Serif JP | 700 | 32px | 1.3 | 0 | |
| Station title | Noto Serif JP | 700 | 28px | 1.25 | 0 | |
| Lead | Noto Sans JP | 400 | 22px | 1.85 | 0.02em | `#3a3a3a`, 2 lines max |
| KPI label | Noto Sans JP | 500 | 19px | normal | 0.03em | |
| Photo caption | Noto Sans JP | 400 | 16 to 18px | 1.7 | 0.03em | Mute on paper, white on photo |
| Note | Noto Sans JP | 400 | 16px | 1.6 | 0.02em | `#4a4a4a` |
| Label (`.label`) | Archivo, `font-stretch: 75%`, uppercase | 600 | 19px (15 to 18px variants) | normal | 0.16em | Red for section kickers, mute for meta |
| Folio | Archivo 75%, uppercase | 600 | 17px | normal | 0.16em | Mute, brand name in ink 700, `bottom: 52px` |
| Hero number | Archivo 62% | 800 | 128px | 0.8 | -0.01em | Unit in Noto Sans JP 700 34px, gap 8px |
| Small number | Archivo 62% | 800 | 60px | 0.8 | 0 | Contents numbers, station values; unit 18px 700 |
| Inline number | Archivo 62% | 800 | 34px | inherit | 0 | Inside a 19px Japanese label |
| Chart values | Archivo 75% | 600 | 16px (key 22px) | n/a | 1.5 SVG units | Mute above bars, ink below |

## 4. Signature devices

### 4.1 Photo panels
`.photo` is an absolutely positioned box with `overflow: hidden` and an `img` at `object-fit: cover`. Tune the crop only with `object-position`. Four panel shapes, and no others:

- **Full bleed** `inset: 0`. Cover and chapter openers. Text sits on the darkest, calmest third of the frame.
- **Two-thirds** `left: 0; top: 0; width: 1176px; height: 1080px`. Contents and statement slides; a white column at `left: 1272px`, 520px wide, holds the text.
- **Strip** `left: 0; top: 0; width: 520px; height: 1080px`. Data slides; a macro or texture photo with a white caption at `left: 48px; top: 104px`, 400px wide. The body starts at `left: 640px`.
- **Inset** `right: 128px; top: 104px; width: 760px; height: 372px`. Diagram slides; a caption sits 12px below at 16px mute, and a tag (red 34px square with a number, plus Archivo 75% 700 16px white label) may sit on the photo's lower left.

Never place a gradient scrim, color overlay, blur, rounded corner, border or shadow on a photo. If the text is not legible on the photo, the crop is wrong; change `object-position` or the photo.

Photos ease in with `transform: scale(1.04)` to `scale(1)` over 2.4s on `--ease`; text uses `.rv` (rise 18px, fade, 0.9s) with 0.12s steps from `.d1` to `.d5`. Reduced motion disables both.

### 4.2 Caps plus Mincho pairing
A condensed Latin caps phrase (2 to 4 words, ends with a period) names the slide. Directly under it, 26 to 30px lower, a Mincho sentence of one or two lines says what it means in Japanese. The caps are not a translation of the Mincho; they are the English motto.

### 4.3 Selvedge red
One red mark per slide. On the cover it is the year and the 20×168px tab at `right: 0; top: 96px`. On body slides it is one keyword in the headline (`<span class="red">`) plus the hero number or key bar that proves it. Chapter numbers in the contents are red because the list is the navigation.

### 4.4 Kicker and folio
Body slides open with a kicker row of Archivo labels, `NN — Chapter` in red and the period in mute, 28px apart. Every slide except the cover has a folio at `bottom: 52px` from the text column's left edge to `right: 128px`: `<b>Brand</b>　Report name` left, page number (or spread `30 — 31`) right.

### 4.5 Data
- KPI row: a three-column grid (`1.15fr 1fr 1fr`), 1px `--rule` dividers with 30px left padding, label, then the number with its Japanese unit, then a mute note. The first KPI is the hero and is red; its note carries the change in red bold.
- Bar chart: 120px bars on a 164px pitch, `--bar` gray, the last bar 168px wide in red with its value inside in white 22px. Values above bars in mute, years below in ink, a 1px ink baseline. Title in 18px 500 with the unit and range in mute after it.
- Ratio bar: a 28px bar across the full measure, red for the short part and ink for the long part, with 3px red ticks for events, labels above both ends, a 16px mute explanation below.
- Station line: a 1px ink line with 13px circle nodes (paper fill, 2px ink border; the current stage filled ink), seven equal columns, each with an Archivo red label, a Mincho title, a 60px number with unit, and a two-line note. A dashed red loop (`6 6`) with an arrowhead shows return flows, labelled in 16px red on a paper background.

### 4.6 Photo direction

The photos are the style. Plan them before writing slides.

#### Shot list for a new deck
Ask the user for real photos first. When there are none, generate them through the host's image tool (for example the `codex-image` skill when it is installed); do not use stock photo sites or images of real people or brands. Save them to the deck's `assets/` folder at 1536×1024 or larger, JPEG, and reference them relatively.

1. **Cover: the gesture.** Hands doing the core craft or work, close, mid-motion, side or three-quarter light, a dark background on the left third for the title. Landscape.
2. **Contents or statement: the place.** The workplace wide, deep perspective, natural light from windows, no people looking at the camera. The left-bottom third must be dark and quiet.
3. **Data strip: the material.** A macro of the product's defining detail, filling the frame diagonally, that holds up as a 520×1080 vertical crop. Ideally it contains the red of the palette naturally.
4. **Diagram inset: the context.** An environmental wide shot of where the work happens (landscape, street, field), readable at 760×372.
5. Per chapter as needed: one more gesture, place or material shot, plus portraits for team or quote slides (environmental, natural light, subject looking off-camera or into the column).

Generation prompts should state: documentary photograph, natural light, the subject and action, the lens feel (35mm or 50mm for places, macro for material), the color temperature, and where the empty dark area must be. Keep one light quality and one grade across the whole set.

#### Avoid
- Stock-photo tropes: handshakes, people pointing at screens, smiling teams facing the camera, skylines, abstract light trails.
- Visible text, logos or brand marks in the photo, and faces of identifiable real people.
- Mixed grades in one deck (one warm, one teal), heavy filters, HDR halos, vignettes added in post.
- Busy frames with no calm area for text, or a subject that sits where the text must go.
- Generated-image tells: extra fingers, melted tools, garbled signage, plastic skin, impossible reflections. Regenerate rather than crop around them.
- Using the same photo twice, or using a photo only as a texture behind text.

## 5. Slide grammar

Outer margin 128px. Body text columns start at 128px on paper slides, 640px next to a strip, 1272px next to a two-thirds photo. Leave at least 40px between the last content and the folio.

### Reference slides
1. **Cover.** Full-bleed photo, masthead row, 196px caps with the red year, Mincho sub, red tab. See preview.md.
2. **Contents.** Two-thirds photo with 168px white caps and a 36px Mincho line at `left: 128px; bottom: 112px`. Right column at `left: 1272px; top: 104px`: red `CONTENTS` label, then a list 48px below on a `92px 1fr 56px` grid with 1px rules above each row and below the last: red 60px number, an 18px mute English name above a 32px Mincho title, and the page number bottom-right.
3. **Conclusion + number.** Strip photo with a caption. Body at `left: 640px; top: 112px`, 1152px wide: kicker, 78px Mincho h2 with one red keyword, 22px lead. KPI row at `top: 548px`, bar chart at `top: 756px`, 210px tall.
4. **Diagram (fold-out spread).** Head at `left: 128px; top: 104px`, 880px wide: red label, 132px red caps, 34px Mincho statement. Inset photo with tag and caption top right. Ratio bar at `top: 560px`, loop line at `top: 698px`, station line at `top: 744px`. Folio shows the spread `30 — 31`.

### Derived slides
- **Chapter opener.** Full-bleed photo like the cover, no masthead or tab. Red Archivo label `NN — Chapter` at `left: 128px; top: 96px`, 168px white caps, 36px white Mincho line. Nothing else.
- **Comparison.** Strip photo of one side's subject on the left, body at 640px. Two columns of 560px with a 1px rule between, each headed by an Archivo label and a 32px Mincho title, then rows separated by 1px `--rule`. The side the story favors carries the single red element (its number or label).
- **Table.** Paper only, or with the strip photo. Header row in Archivo 75% 600 17px uppercase mute with a 1px ink rule below; rows 22px Noto Sans JP with 1px `--rule` separators, no vertical rules, no zebra fills. Numbers right-aligned in Archivo 62% 800 at 34px with Japanese units at 18px 700. One red value at most. Five columns by eight rows maximum.
- **Quote.** Two-thirds photo of the speaker (environmental portrait, looking into the frame toward the column). Column at 1272px: red label `VOICE`, the quote in Noto Serif JP 700 at 40px, line-height 1.6, up to five lines, then name in 22px 700 and role in 17px Archivo mute. No quotation-mark graphics.
- **Timeline.** Use the station line from slide 4 with 4 to 8 equal columns, years as the Archivo red labels, Mincho titles, optional numbers. A strip or inset photo of the earliest artifact may sit above it.
- **Team.** Up to four portraits in a row, each a 384×480px photo box (same `.photo` rules, same light and background across all four), 32px apart, starting at `left: 128px; top: 300px`. Under each: Archivo red label for the role, 28px Mincho name, 16px two-line note. Kicker and 78px headline above at `top: 104px`.
- **Closing.** Full-bleed photo that mirrors the cover (same place, later in the day, or the finished product in use). 168px white caps statement, a 36px Mincho line, and the contact in 18px white at 66% at `left: 128px; bottom: 72px`. Red appears only as the tab at `right: 0; top: 96px`.

## 6. Slop signs

- [ ] A gradient scrim, color overlay, blur or rounded corner on any photo, or text placed on a busy part of a photo.
- [ ] Photos with different color grades or light, or any stock-photo trope from 4.6.
- [ ] More than one red element on a body slide (keyword plus hero number counts as one idea; a third red thing does not).
- [ ] Any color beyond paper, ink, red, mute, bar, `--rule` and the documented literals.
- [ ] Condensed caps that do not use `font-stretch: 62%`, or caps set at body sizes; Latin labels without 0.16em tracking.
- [ ] Caps headlines that are clever wordplay unrelated to the Mincho line, or Japanese set in Archivo.
- [ ] Gothic headlines. Headlines and statements are Noto Serif JP; gothic is only for body, units and data labels.
- [ ] Mincho headline that names a topic (「修理について」) instead of stating the finding (「売上より先に、直した数を数えた一年。」).
- [ ] Charts in more than gray plus one red bar, 3D, gridlines, legends, or a missing unit and range.
- [ ] Numbers and units the same size, or units in Archivo instead of Noto Sans JP.
- [ ] Missing folio, or a folio that does not start at the text column.
- [ ] A slide with no photo for more than two slides in a row. The rhythm alternates photo-led and paper-led slides.
- [ ] Line breaks that split a Japanese phrase; break after 、 or 。 with `<br>`.

## 7. Document pages

`reference-a4.html` is a 6-page integrated report (cover, statement, top message, value-creation loop, highlights, data). Sizes are px at the 1240×1754 page. Tokens are the same as section 2, except `--m: 96px` (side margin, text width 1048px) and `--desk-bg: #1a1918` (the dark desk replaces `--stage-bg`). Documents carry no `.rv` motion or photo zoom. Pages are numbered as a printed book: even pages are left-hand pages (`.page.even`), odd pages right-hand (`.page.odd`), and the tab and folio sit on the outer edge.

Frame (every page except the cover, same place on every page):

- **Running head** (`.rh`, top 64px, 96px both sides). Left: `<b>Ayaori</b>　Integrated Report 2026`, the slide folio's brand line, Archivo 75% 600 18px with 0.16em tracking, mute with the brand in ink 700. Right: the chapter number in red, the Latin chapter name in mute, then the Japanese chapter name in Noto Sans JP 500 17px ink.
- **Chapter tab** (`.tab`, top 240px, 40×232px, outer edge). The cover's 20px red tab grows into a red block with the chapter number and Latin name set vertically in white Archivo 75% 700 15px with 0.2em tracking. It is navigation, like the red contents numbers, so it does not count as the page's one red mark. It may sit on a photo band, as the cover tab does.
- **Folio** (`.folio`, bottom 56px, outer edge at 96px). The page number alone in Archivo 75% 700 20px ink, 0.12em tracking. The brand moved up into the running head.
- **Margins**: 140px top to the kicker, 120px bottom to the last line. Photos break the margins only as bands that bleed left and right (or the full cover); the running head, captions and folio always sit on paper.

Page head (reading pages): the kicker row from 4.4 at top 140px (`NN — Chapter` red, the period or subject in mute, 28px apart, 19px), then the Mincho headline at 64px 800, line-height 1.36, 28px below, broken by hand into two lines with one red keyword. That keeps the kicker about a third of the headline. Lead: Noto Sans JP 26px, line-height 1.75, `#3a3a3a`, 30px below, two hand-broken lines.

Photos: use the shot list in 4.6 by role, each photo once. Every photo carries a caption on paper, 12–16px under the photo: an Archivo 75% 600 15px ink label (the subject in English) and a 17px mute sentence. Never put a caption or any text on the photo except on the cover, where all type sits on the calm sky or dark area chosen with `object-position`.

Page types:

- **Cover.** The context photo (4.6 no. 4) full bleed, cropped so the top 40% is calm sky (`object-position: 62% 50%`). Ink type on the sky: masthead labels at top 96px, 150px caps in three lines at top 176px with the red year, the 44px Mincho sub at 586px. The caption and the meta (period, fictional-data line) at left 700px, top 772px, 17px, on the sky. The 20×168px red tab at `right: 0; top: 96px`. On a photo whose calm area is dark, set the same type in white as on the slide cover. No frame.
- **Statement.** Paper above, the place (4.6 no. 2) below as a bleed band 1240×560px at top 1000px. The head is indented to 160px for air: red label, 168px red caps in two lines, 44px Mincho statement in three lines (line-height 1.62), then 23px body at 800px wide (about 34 字 a line). Caption at top 1576px.
- **Message.** The gesture (4.6 no. 1) as a bleed band 1240×500px at top 120px, under the running head, standing in for a portrait; the caption says whose hands they are. Kicker at 728px, Mincho headline 60px with the red keyword, then two columns from top 1000px (`column-count: 2`, 48px gap, 560px tall, `column-fill: auto`): body 22px, line-height 1.8, justified with a 1字 indent; section heads in Noto Serif JP 700 25px. The signature closes the page right-aligned at top 1572px: date and role 18px, the name in Mincho 700 30px with 0.12em tracking. No quote-mark graphics.
- **Figure.** Paper only. Head, then the figure box at top 536px under a 1px ink rule, 1048×680px, its source line under it, then a row of three facts (the capitals behind the loop) on a 1px ink rule: Archivo mute label, 25px Mincho name, 64px number with a 20px unit, a two-line 17px note. The reference fits `d-cycle` to the station line of 4.5: square rectangles with a 1.5px ink stroke on paper, the current stage filled ink with white text, step labels `01 COTTON` in red Archivo 75% 700 17px, names in Mincho 28px, the ring and arrowheads 1.5px ink, and the closing arc (last step back to the first) dashed red `6 6` like the loop line. The centre value is the red hero number (Archivo 62% 800 150px, unit 42px). The SVG reads its size from `data-w`/`data-h`.
- **Highlights.** Head, then from top 548px a 584px left column: the hero KPI on a 1px ink rule (22px label, Archivo 62% 800 210px red number, 56px unit, mute note with the change in red bold), then three KPI rows (label with a 17px mute note under it, 60px ink number right-aligned, 1px `--rule` between). On the right a material photo (4.6 no. 3) inset at 416×600px inside the margin, its caption under it. The bar chart from 4.5 spans the text width at top 1262px: 104px bars on a 148px pitch, the last bar 160px in red, then its source line.
- **Data.** Paper only. Head, then the five-year table, built like the Table slide of section 5, over the full width: Archivo 75% 600 17px uppercase header over a 1px ink rule, group rows (`FINANCIAL 財務`) over a 1px ink rule, 21px labels with the unit in 16px mute, Archivo 62% 800 32px numbers right-aligned, past years in `#4a4a4a` and the latest in ink, one red value. Source line under it, then the company profile: red label, two 500px columns of 120px label / value pairs at 19px under 1px rules. The editorial note (`ABOUT THIS REPORT`) sits in the notes slot at top 1556px.

Document slop signs (in addition to section 6):

- [ ] A running head, caption or folio set on a photo, or a photo band that leaves the running head nowhere to sit.
- [ ] A photo without a caption, or the same photo on two pages.
- [ ] Condensed caps used as the headline on reading pages. Caps name the cover and the statement page; reading pages lead with the Mincho headline.
- [ ] The tab or folio on the inner edge, or moving between pages.
- [ ] Two columns ragged with `auto-phrase`, or body text below 22px.
