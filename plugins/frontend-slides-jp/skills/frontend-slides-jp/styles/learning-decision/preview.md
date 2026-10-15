# Learning Decision preview

A4 decision guide (判断ガイド) for working adults who must approve or choose. Warm paper ground, ink type, one brick red for the recommendation and the path it takes. One idea per page, wide space, the answer before the reasons.

## Palette

- `--accent` #A8402B. The kicker, the recommended row of the table, the recommended path in the tree, the 「すぐ試す」 result. Nowhere else.
- `--ink` #1D2027 text, question boxes, chapter tab. `--sub` #575B63 labels, running head, notes.
- `--rule` #DCD8CF hairlines. `--tint` #F1EDE5 outcome terminals in the tree. `--paper` #FBFAF7 page. `--accent-tint` #F6E8E2 is the pick row and the 「すぐ試す」 terminal.

## Fonts

`https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;600;700&family=IBM+Plex+Sans+JP:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400..700&display=swap`

Noto Serif JP 600 for headlines (editorial, 日経・HBR register). IBM Plex Sans JP 23px for body, tables and controls. Fraunces for the Latin kicker, Q numbers, scores and folios.

## Signature moves

1. Decision brief: headline states the recommendation; a 2×2 frame of 決めること / 決める人 / 期限 / 対象外; then 理由 and 承認につける条件 side by side.
2. Scored table: five 16px squares per criterion (SVG), weight under each header, the pick row in `--accent-tint` with a 5px red inner rule, total in Fraunces 36px.
3. Decision tree: Q1–Q4 boxes on a left spine, outcome terminals on the right (見送る dashed, 条件付き tint, すぐ試す red); the recommended path drawn 5px red.
4. Q labels shared by tree, failure cases and worksheet; the worksheet greys out questions the tree skips and states why.
5. Chapter tab: 46×220 ink strip at the right edge that steps 230px down per page.

## Cover recipe (1240×1754): the decision brief

- Running head top 64; body from top 212 (140 + 72 air).
- Kicker `DECISION BRIEF` 22px red + organisation 20px; headline 60px two lines; lead 26px, max 960 wide.
- 112px, then the 2×2 frame (rows 22px padding, hairlines under each).
- 112px, then two 492px columns: 理由 (paragraph) and 条件 (three ■ items).
- 64px, a 20px pointer line to the later pages; the lower quarter stays empty.
