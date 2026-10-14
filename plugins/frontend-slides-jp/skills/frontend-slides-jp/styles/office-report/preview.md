# Office Report preview

A4 internal report or proposal, the document otherwise written in Word. White page framed by rules: a header rule at y 108, a footer rule at y 1646 and an index spine at x 192 joining them. Everything numbered hangs in the margin left of the spine. Ink for structure, one deep green for the answer.

## Palette

- `--ink` #1C1E1D text, rules, chapter tab, 機密区分 box, margin numbers.
- `--sub` #575C59 labels, owners, notes, running head (6.8:1 on white, 6.1:1 on tint).
- `--line` #B9BEBA hairlines, spine, table row rules (never text).
- `--tint` #F1F3F0 table header and meta-block label cells.
- `--green` #2E5E45 the answer only: 結論 row, the recommended column, the headline's number, the decision gate.
- `--paper` #FFFFFF.

## Fonts

`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=BIZ+UDPMincho:wght@400;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap`

Noto Sans JP 700 for headlines, headings, labels and tables' heads. BIZ UDPMincho for body, leads and table cells: the Word 明朝 voice, made for reading. IBM Plex Sans 600 for section numbers, document numbers, folios and figures.

## Signature moves

1. Margin index (the signature): chapter numbers at 44px, 表1 / 図1 / 要旨 / 注 at 17–24px, right-aligned in x 96–176, left of the spine.
2. Ruled frame: header rule 1.5px, footer rule 1px, spine 1px; running head above, folio `2 / 6` below.
3. Page 1 meta: 機密区分 box, 宛先, 承認欄 (担当 / 課長 / 部長, 100×96 boxes), a 4-column meta table.
4. 要旨 band: 3px ink top rule, label rows 結論 / 効果 / 費用 / 依頼事項 / 期限; only 結論 is green-tinted.
5. One stepped chapter tab (ink, 40×200) moving down the right edge by chapter; the last page ends with 「以上」.

## Cover recipe (1240×1754)

- y 58: 「社外秘」 box 20px and handling note left; 文書番号 and 版 right. Header rule at 108.
- y 150: 宛先 「経営会議 御中」 28px and 写し left; 承認欄 three boxes right (x 844–1144).
- y ~340: type label 「提案書」 (ink field) + 稟議 number; title Noto 700 64px two lines; subtitle 26px Mincho two lines.
- y ~730: meta table 132 | 1fr | 132 | 1fr: 文書番号, 版, 作成日, 機密区分, 作成部署, 作成者, 宛先, 関連文書.
- y ~955: 要旨 band, label 「要旨」 24px hanging in the margin; 5 rows, 結論 in Noto 700 24px on green tint.
- y ~1350: three numbers (Plex 600 66px, unit 22px), only the headline's one green, with how each was computed.
- 注 slot with the fiction notice above the footer rule; footer: department left, `1 / 6` right.
