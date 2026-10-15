# Textbook Recall preview

A4 study book for memorising terms. Ink plus one vermilion that disappears under a red sheet. Every term to be learned is set in that red: key terms in the body, answers of the one-question-one-answer list, blanks in source passages, answers of the mixed test. On screen a 赤シート switch hides them all; a tap opens one.

## Palette

- `--ink` #1E1B19. Body, rules, frame, the subject tab, label chips (white on ink).
- `--red` #F04A2C. Only the things to memorise. An orange-red, not crimson: it reads as 赤 on white and vanishes under a red sheet.
- `--tint` = red at 9% on white (#FEEFEC). h2 bands, 書き下し boxes, hidden-term blanks. Also vanishes under the sheet.
- `--sub` #55504B captions, labels, page references. `--paper` #FFFFFF. Desk #DEDBD5.

## Fonts

`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=BIZ+UDPMincho:wght@400;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap`

Noto Sans JP 700 for headlines, labels and every red term (the gothic marks the term inside mincho prose). BIZ UDPMincho 400 for body and questions. IBM Plex Sans 600–700 for years, question numbers and folios.

## Signature moves

1. Red-sheet ink: `.kw` terms and `.ans` answers in #F04A2C gothic 700; screen mode turns them into same-width tinted blanks with an ink underline.
2. 一問一答 rows: number 50px, question, then a 236px answer column behind a 1.5px ink rule.
3. Review record box (復習 記録, three rounds with dates) at the top right of the unit page; the score box takes the same place on the test page.
4. Ink fore-edge tab (44×240, vertical 05 中世) alternating right and left with the facing page.
5. Ink-framed "前の単元から" box and the mixed test, both tagged with unit and return page.

## Cover recipe (1240×1754, the unit's first page)

- Running head top 56 (book name bold, publisher sub / unit chip `5-1` and unit name), 2px ink rule at 104.
- Kicker 20px at 132 left, review record box top right. Headline 50px two lines stating what happened. Lead 24px telling the learner how to use the sheet.
- Two 500px columns of 22px mincho with h2 tint bands and red terms; a framed note; the 機構図 across 1048px; folio 22px at 1666.
