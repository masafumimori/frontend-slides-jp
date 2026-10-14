# Warm Editorial preview

## Palette
- `#F3EBDD` cream. The paper of every slide.
- `#2E2420` ink. Text, rules, and the line pass of every illustration.
- `#DD5A2B` tomato. The cover circle, the corner tab, the key number, the current item.
- `#EDB33E` squash. The contents circle and the second illustration fill.
- Derived tints only through `color-mix` with cream: ink 68% (sub text), ink 22% (rules), tomato 30% and 55% (chart bars).

## Fonts
`https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,100;1,9..144,300..700,100&family=Noto+Sans+JP:wght@400;500;700;900&display=swap`

Japanese is Noto Sans JP 700 for headlines. Latin is Fraunces with `"SOFT" 100`: italic for the masthead and tab numbers, upright with `lnum` for figures, small caps-style captions at 17px with 0.34em tracking.

## Signature moves
1. One large circle per slide, anchored off an edge, in a fixed position per slide type (cover bottom right, contents left, content top-right corner tab).
2. Two-plate illustrations. Each motif is drawn twice from one `<symbol>`: a flat fill pass, and an ink line pass shifted 9 up-right units (`translate(9px, -7px)` in the 200-unit viewBox).
3. A Fraunces italic masthead with the second half in tomato, set against a bold Japanese catch.
4. Numbers inside Japanese headlines switch to Fraunces 600 at 1.12em.
5. Wide-tracked uppercase Fraunces captions as the only small labels.

## Cover recipe (1920×1080)
- Tomato circle 1120px, `right: -300px; bottom: -420px`.
- Top caption row at `top: 64px`, `left/right: 128px`: brand name left, issue right.
- Masthead at `left: 116px; top: 120px`, Fraunces italic 400, opsz 144, 272px, line-height 0.9, tracking -0.02em. Second word in tomato, upright.
- Catch `h1` at `left: 128px; top: 490px`, Noto Sans JP 700, 96px, line-height 1.32, three short lines ending in a full stop.
- Stamp at `right: 120px; top: 150px`, right-aligned: tomato caption, then 24px 500 text, two lines.
- Illustration cluster on the circle (wrap in `.on-tomato` so fills become squash/cream): pot 640px wide at `right: 150px; bottom: 150px`, steam 230px above it, carrot 230px rotated 28deg at the circle's lower edge.
- Meta at `left: 128px; bottom: 72px`, 22px, ink 68%, two lines.
