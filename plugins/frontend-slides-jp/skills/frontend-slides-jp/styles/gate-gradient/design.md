# Gate Gradient (グラデーション扉): design system

## 1. Thesis

The deck opens and turns its chapters through a pine-dark sky with a vermilion horizon; everything between those gates is a white page with ink and a single vermilion accent. The tension comes from hairline Latin numerals set huge beside bold Japanese.

## 2. Tokens

```css
:root {
  --ink: #141816;
  --ink-2: #565C59;
  --line: #DADDDB;
  --paper: #FFFFFF;
  --shu: #DE4A16;
  --pine: #04302B;
  --font-jp: 'Noto Sans JP', sans-serif;
  --font-lat: 'Bricolage Grotesque', 'Noto Sans JP', sans-serif;
  --pad-x: 112px;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --stage-bg: #0b0d0c;
}
```

Fixed values used outside the tokens (copy them, do not invent new ones):

- Gate gradient, `.gate`: `linear-gradient(in oklab 177deg, #021816 0%, #04302B 44%, #1B6757 63%, #9DB698 71.5%, #F2A672 74.5%, var(--shu) 77%, #5A1A08 85%, #0B0C0B 100%)`.
- Alternate gate, `.gate.alt`: same stops shifted up (42%, 60%, 68.5%, 71.5%, 74%, 82%) at 183.5deg, so the horizon tilts the other way. Alternate the two on consecutive gates.
- Grain: `.gate::after` with the inline SVG `feTurbulence` (baseFrequency .9, 2 octaves), `opacity: .22`, `mix-blend-mode: overlay`. Children of `.gate` get `position: relative; z-index: 1`.
- Chart bars: inactive `#C9CDCB`, current period `#DE4A16`. Axis line `#141816` at 2px.
- On gates: white text; secondary text at 80 to 88% opacity; TOC rule `rgba(255,255,255,.3)`, inactive TOC items 55% opacity.
- On the dark engine panel: rules `rgba(255,255,255,.18)`, secondary text `rgba(255,255,255,.7)`, index numbers `rgba(255,255,255,.55)`.
- Stage margins: left/right `--pad-x` (112). Content headline block top 92. Footer bottom 52. Note bottom 100.

## 3. Type scale

`viewport-base.css` sets `h1–h3` to tracking 0 and line-height 1.35, and `p, li, td, dd` to tracking .02em and line-height 1.7. The deck CSS overrides where listed.

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Chapter numeral | Bricolage Grotesque, opsz 96 | 200 | 940 | 1 | -0.06em |
| Display (cover English) | Bricolage Grotesque, opsz 96 | 200 | 212 | 1 | -0.035em |
| KPI number | Bricolage Grotesque, opsz 96 | 300 | 300 | .95 | -0.05em |
| Chapter title (h2 on gate) | Noto Sans JP | 700 | 128 | 1.12 | 0 |
| Cover claim (h1) | Noto Sans JP | 700 | 80 | 1.32 | 0 |
| KPI unit | Noto Sans JP | 700 | 80 | inherit | 0 |
| Content headline (h2) | Noto Sans JP | 700 | 62 | 1.3 | 0 |
| Sub number | Bricolage Grotesque | 500 | 76 | 1 | -0.03em |
| Panel value | Bricolage Grotesque | 500 | 44 | inherit | -0.02em |
| Chapter English line | Bricolage Grotesque | 300 | 40 | inherit | .02em |
| Column head (h3) | Noto Sans JP | 700 | 34 | 1.35 | 0 |
| Wordmark | Bricolage Grotesque | 500 | 30 | inherit | -0.01em |
| Gate lead | Noto Sans JP | 400 | 28 | 1.7 | .03em |
| Panel item | Noto Sans JP | 700 | 28 | 1.7 | 0 |
| Lead (content) | Noto Sans JP | 500 | 26 | 1.75 | .03em |
| Sub-number unit | Noto Sans JP | 700 | 26 | 1 | 0 |
| List item title | Noto Sans JP | 700 | 25 | 1.7 | 0 |
| KPI label | Noto Sans JP | 500 | 24 | inherit | .03em |
| Kicker / crumb on gate | Bricolage Grotesque | 300 | 24 | inherit | .14em / .16em |
| Chart caption | Noto Sans JP | 500 | 22 | inherit | .03em |
| Gate meta / TOC | Noto Sans JP | 400 | 22 | 1.7 | .03em |
| Caption (body under numbers) | Noto Sans JP | 400 | 20 | 1.6 | .03em |
| Crumb (content) | Noto Sans JP, number in Bricolage 500 shu | 400 | 20 | inherit | .03em |
| Item description | Noto Sans JP | 400 | 19 | 1.55 | .03em |
| Axis label | Bricolage Grotesque | 400 | 19 (period 17) | n/a | 0 |
| Note, footer, chart unit | Noto Sans JP | 400 | 18 | 1.7 | .03em |

Latin set in `.lat` gets `font-feature-settings: "tnum", "lnum"`. Units sit next to their number in Japanese bold, never in Latin.

## 4. Signature devices

- **Gradient gate.** Signals "a new part starts here". Only on the cover, chapter gates, a one-sentence statement or vision slide, and the closing slide. Never on a content slide, never behind a chart, never as text fill.
- **Hairline giant numeral.** The chapter number at 940px, right 64, top -96, so it bleeds off the top edge. Only on chapter gates. One numeral, no leading zero.
- **Gate TOC strip.** Four-column grid at bottom 84 with a 1px white rule; the current chapter gets full opacity and a 3px vermilion inset bar on top. Only on chapter gates; keep the same chapter list on every gate.
- **Conclusion headline.** Content slides open with crumb (`02` in vermilion + chapter name), then a one-line h2 that states the finding. Exactly one phrase inside `<em>` turns vermilion. The headline is a sentence ending in `。`.
- **Vermilion number.** The single most important number on a slide is thin Bricolage in `--shu` with a bold Japanese unit. At most one per slide; supporting numbers stay ink.
- **Ink rule over sub-metrics.** A 2px ink rule opens a two-column row of supporting figures, divided by a 1px `--line` rule.
- **Dark engine panel.** A solid `--ink` block (not the gradient) for the one step the company owns in a flow. Values inside it are vermilion. One per slide.
- **Note and footer.** Every content slide has a `注：` note (source, period, sample) at bottom 100 and the footer `07　｜　章名` left / `© 社名` right at bottom 52.
- **Motion.** `.reveal` rises 24px and fades over .9s with `--ease`, staggered `d1`–`d5` (.08s to .58s). Bars grow from the baseline over 1s. Reduced motion shows everything at rest.

## 5. Slide grammar

Reference slides:

1. **Cover** (`gate cover`): wordmark top left, date top right, English display at top 196, Japanese claim h1 at top 486, meta row at bottom 84.
2. **Chapter gate** (`gate alt section`): `CHAPTER` crumb top left, giant numeral top right, title block anchored at bottom 390 (English line 40px, h2 128px, two-line lead 28px), TOC strip at bottom 84.
3. **Conclusion + number** (`content`): head block at top 92. Two columns from top 316 to bottom 876: KPI column 640 wide at left (label, 300px number with unit, 2px rule, two sub-metrics) and chart 940 wide at right (caption row with unit at right, SVG 940×504, axis at y 440, period labels at 474 and 500). Both columns end at 876; the caption tops align at 316 and the sub-metric captions start on the chart's axis line (812). Note at bottom 100.
4. **Diagram** (`content`): flow grid at top 372, height 504, columns `1fr 120px 1.35fr 120px 1fr`: input list, arrow, dark engine panel, arrow, outcome list. Each list row is 120px with a 1px `--line` rule; h3 heads have a 2px ink rule. The flow ends at 876, the same bottom as slide 3.

Content slides share one vertical frame: headline block 92–227, body 316 (or 372 for diagrams that need air) to 876, note at 949, footer at 1002. Keep the body bottom at 876 on every content slide.

Deriving other slides:

- **Comparison.** Two columns of equal width (`1fr 1fr`, gap 64) from top 316. Each column: h3 34px with the 2px ink rule, then 120px rows with 1px `--line` rules, mirroring slide 4. The recommended side may become the dark engine panel; the other stays white. Never two dark panels. Differences that matter go in vermilion bold inside the row description, one per column at most.
- **Table.** Full width between the pads. Header row: 20px Noto Sans JP 700, ink, with a 2px ink rule below. Body rows: 22px, 88 to 96px tall, 1px `--line` rules, no zebra, no vertical rules. Numbers right-aligned in Bricolage 500 with `tnum`; the one cell that carries the conclusion is vermilion. Units in the header, not in every cell.
- **Quote / statement.** Use the gate surface (`gate` or `gate.alt`). Quote in Noto Sans JP 700 at 80px, line-height 1.32, white, left at `--pad-x`, top near 400, broken by hand into at most three lines. Attribution 22px at 80% opacity below. No quotation-mark ornament larger than the text.
- **Timeline.** A 2px ink horizontal rule across the body at about y 620. Milestones as Bricolage 500 years (44px) above the rule and 19–20px descriptions below, on equal intervals. The current or target milestone is vermilion and gets a 3px vermilion tick; past ones stay ink.
- **Team.** Up to four people per slide in a 4-column grid from top 316. Each: a square photo or a `--line` placeholder block (no circles, no shadows), name 25px 700, role in Latin caps 20px Bricolage 500 tracking .12em `--ink-2`, two-line bio 19px. Lead with the headline stating why this team, not "メンバー紹介".
- **Closing.** Back to the gate surface. Wordmark top left as on the cover, a one-line Japanese close (80px 700) or an English display line (212px 200), contact or URL in the meta row at bottom 84. Use the gradient variant the cover did not use if the deck ends on a chapter.
- **TOC slide.** The gate TOC strip enlarged on a gate: four rows with Bricolage 200 numerals at 160px and chapter names at 48px 700, white.

## 6. Slop signs

- [ ] The gradient appears on any content slide, behind a chart, in a card, or as text fill.
- [ ] The gradient drifts to purple-to-pink or blue-violet, or loses the pale seam between pine and vermilion.
- [ ] The grain overlay is missing (banding shows) or is so strong that text edges get noisy.
- [ ] Glass cards, blur, glow orbs, drop shadows, rounded pill labels, or icons in circles.
- [ ] More than one vermilion phrase in a headline, or vermilion used for decoration rather than the finding.
- [ ] More than one vermilion hero number on a slide, or a hero number set in bold Latin instead of thin.
- [ ] The chapter numeral is small, has a leading zero, or sits fully inside the slide instead of bleeding off the top.
- [ ] The TOC strip changes order or labels between gates, or the current chapter is not marked.
- [ ] A content headline is a topic label ("事業について") instead of a sentence with a conclusion.
- [ ] Units set in Latin or detached from the number; inconsistent thousands separators or units across slides.
- [ ] A chart with rainbow series, 3D, gridlines, or more than one highlighted bar.
- [ ] The two columns of a number slide end at different heights, or the body stops well above 876 and leaves a dead band above the note.
- [ ] A content slide without a `注：` note or without the page/chapter footer.
- [ ] Hand-broken lines that break inside a word, or a one-character last line in a headline.
- [ ] Japanese set in the Latin family, or Latin numerals set in Noto Sans JP on display sizes.
