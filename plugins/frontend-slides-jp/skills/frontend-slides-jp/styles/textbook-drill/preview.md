# Textbook Drill preview

A4 study-guide page (参考書) for subjects solved by steps. A white main column of 682px beside a pale tinted side-note column, one blue for 例題 numbering and controls, ink for everything else. The page teaches in the order example → faded example → practice → record.

## Palette

- `--accent` #1D4E9E. 例題 label fields, step labels, blank outlines, reveal buttons, chapter tab, domain bands in graphs.
- `--ink` #1A1D24 text, rules, 問 labels, the 「できた」 state. `--sub` #50555F captions, running head, page refs.
- `--line` #B8BCC4 hairlines, work-box rules, idle controls. `--tint` #EEF1F5 the side-note band. `--paper` #FFFFFF.

## Fonts

`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=BIZ+UDPMincho:wght@400;700&family=STIX+Two+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap`

Noto Sans JP 700/900 for headlines, labels and controls. BIZ UDPMincho 22px for body and problems (UD mincho reads like a printed textbook). STIX Two Text for math (`.m`: italic variables, true minus, lining figures) and page numbers. STIX is not in `fonts/catalog.json`, so `style.json` does not list it.

## Signature moves

1. Side-note band: a #EEF1F5 strip x 798–1144, top 104–1654. Notes (■ 指針, ◇ よくある間違い, 用語, 戻り先) sit beside the line they explain.
2. 例題 header: a blue label field `例題 1` + title + 重要度 squares over a 2px blue rule; the solution in a 116px step-label column (平方完成 / 軸の位置 / 両端の値 / 比べる) closed by an `答` line.
3. Faded example: 例題2 keeps the steps but leaves fixed-width blanks ア・イ with ［ア を見る］ buttons; the graph stays empty until ア opens.
4. 練習 with a ruled work box, ［解答を見る］ and a 手ごたえ radio (できた / あやしい / できない) that fills the 学習の記録 tally and the review list.
5. Chapter tab: blue strip 46×250 at the right edge, top 300, chapter number and vertical name.

## Cover recipe (1240×1754): the unit opener

- Running head top 56, 2px ink rule at 104, band and tab as on every page.
- Kicker `第2章 二次関数 §5 この単元で学ぶこと` 20px blue at top 136; headline 50px two lines stating how the unit is solved; lead 24px.
- Problem list (table, 682 wide) at about top 450: type cell with a 120px mini graph, one problem per row with its 例題/練習/問 chip, page, and a record chip filled from the learner's saved checks.
- 前提の確認 at about top 980: three items with blanks and できた/戻る; the side column holds a 戻り先 note per item.
- Foot at top 1420: 次に読むところ on screen, the prerequisite answers in print.
