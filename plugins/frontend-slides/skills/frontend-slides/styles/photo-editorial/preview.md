# Photo Editorial preview

Needs photos. Without four or more on-brief photographs this style collapses; pick another.

## Palette
- `#FFFFFF` paper. Every non-photo area.
- `#141414` ink. Text, the one rule weight, the wear bar.
- `#C8261B` red (selvedge red). The year on the cover, the cover tab, chapter numbers, the one key figure, the key bar.
- `#8C8A86` mute. Labels, folios, captions, secondary values.
- `#DAD7D1` bar. Non-key chart bars only. Rules are `rgba(20,20,20,.18)`.
- The photos supply every other color. No overlays, no tints on top of them.

## Fonts
`https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=Noto+Serif+JP:wght@500;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap`

Archivo at `font-stretch: 62%` weight 800 uppercase is the brand voice (names, mastheads, big figures). Archivo at 75% weight 600 with 0.16em tracking is every small label. Noto Serif JP 700/800 tells the story. Noto Sans JP 400 to 700 is body, units and data labels.

## Signature moves
1. Full-bleed or hard-cropped photo panels with no gradient scrim; text sits only on a dark, calm part of the frame.
2. Condensed Latin caps at 132 to 196px, line-height 0.86, paired with a Mincho line under them.
3. One red per slide: a word in the headline, the year, or the key figure, never all at once on body slides.
4. Data set like a magazine: thin rules, huge condensed figures with small Japanese units, gray bars with the last bar red.
5. A 20×168px red tab bleeding off the right edge of the cover, like a selvedge mark.

## Cover recipe (1920×1080)
- Photo `inset: 0`, `object-fit: cover`, `object-position: 60% 40%`; the subject (hands, material) sits right of center and the left third is dark.
- Masthead row at `left: 128px; top: 96px`, gap 40px: two Archivo labels at 18px and the period in 17px Noto Sans JP, white at 82% and 66%.
- `h1` at `left: 128px; top: 236px`, Archivo 62% 800 uppercase, 196px, line-height 0.86, three lines, white, the year in red.
- Mincho sub at `left: 128px; top: 760px`, Noto Serif JP 700, 46px, line-height 1.5, two lines, white.
- Red tab `right: 0; top: 96px; width: 20px; height: 168px`.
