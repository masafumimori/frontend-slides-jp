# Textbook Visual preview

A4 textbook pages, one theme per page. A large figure with numbered markers fills the upper half; the numbered explanation rows below share the numbers, and touching either lights both and traces the part with a yellow marker pen. Summary and a quiz close every lesson page.

## Palette

- `--green` #22785B. Chapter color: tab, kicker pill, goal box, markers when lit, summary tint (`--green-tint` #E3F1EA).
- `--red` #C23A2E and `--blue` #2C55A0. Meaning colors only (here 動脈血 / 静脈血), always with a text label too. Tints #F8DCD6, #DCE5F5.
- `--marker` #F6CF3F. The animated trace on the figure, nothing else.
- `--ink` #1E2A32, `--mute` #56636B, `--rule` #CDD3D2, `--paper` #FFFDF7 (warm off-white).

## Fonts

`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;700;800&family=Zen+Maru+Gothic:wght@500;700&family=Jost:wght@500;600;700&display=swap`

Noto Sans JP 800 for headlines, 700 for labels. Zen Maru Gothic 500 for body (soft, readable for 13–15 year olds). Jost 600–700 for marker numbers, lesson numbers and folios.

## Signature moves

1. Numbered figure ⇄ numbered rows: marker ① on the figure and row ① below light together (hover, focus, tap; tap pins).
2. Yellow marker-pen trace (dotted, moving) along the part the number names.
3. 「①から順に」 step button walks the numbers in order.
4. Head = kicker pill `4-1` + headline sentence 50px + 「このページで分かること」 goal box.
5. Quiz cells: dashed 「答えを見る」 on screen, blank line in print with the answers upside down at the page foot; 「できた」 checks saved.

## Cover recipe (1240×1754) = unit opener

- Kicker at top 140, green square 132px with the unit number (Jost 104px) beside the unit title 80px; 「小学6年で学んだこと」 box 440px at right.
- 「単元の問い」 box at top 396: green label column 128px, question 38px 800, ruled note field (saved) under it.
- 学ぶことの地図 figure 1048×420 at top 696 with markers ①–④, one per lesson; rows below give lesson, one line, page.
- 「この教材の使い方」 tint box at bottom 120.
