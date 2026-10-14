# Office Report design system

A document-only style (`doc-a4`) for internal reports, proposals and the attachments to a 稟議. All sizes are px at the 1240×1754 page.

## 1. Thesis

A busy manager reads page 1 and decides, then comes back to check the numbers. So the answer comes first (the 要旨 band), and every page is a ruled working form whose one signature device is the **margin index**: chapter numbers, 表 and 図 numbers, 要旨 and 注 all hang in the left margin, left of a hairline spine, so the reader finds and cites anything by its number. Ink carries the structure. One deep green marks the answer: the conclusion, the recommended option, the decision date.

## 2. Tokens

```css
:root {
    --ink: #1C1E1D;
    --sub: #575C59;
    --line: #B9BEBA;
    --tint: #F1F3F0;
    --green: #2E5E45;
    --paper: #FFFFFF;

    --rule: color-mix(in srgb, var(--line) 60%, var(--paper));
    --green-tint: color-mix(in srgb, var(--green) 10%, var(--paper));
    --ink-30: color-mix(in srgb, var(--ink) 30%, var(--paper));

    --jp-head: "Noto Sans JP", sans-serif;
    --jp-body: "BIZ UDPMincho", serif;
    --num: "IBM Plex Sans", sans-serif;

    --desk-bg: #DCDDD8;
    --page-bg: var(--paper);
}
```

Roles: `--ink` text, rules, chapter tab and margin numbers; `--sub` labels, owners, notes and the running head (6.8:1 on white, 6.1:1 on `--tint`); `--line` hairlines only, never text; `--tint` table heads and meta-block labels; `--green` the answer only (7.5:1 on white, 6.4:1 on `--green-tint`). Gantt bars use `--ink-30`. No other hue: 機密区分 is an ink box, not a red stamp.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Cover title | Noto Sans JP | 700 | 64 | 1.36 | 0 |
| Headline (h1, the page's conclusion) | Noto Sans JP | 700 | 52 | 1.42 | 0 |
| Chapter label (kicker) | Noto Sans JP, Plex number | 700 | 20 | 1 | 0.04em, `--sub` |
| Lead | BIZ UDPMincho | 400 | 26 | 1.75 | 0.02em |
| Chapter heading (h2) | Noto Sans JP | 700 | 30 | 1.4 | 0, 1.5px ink rule under |
| Sub heading (h3, `1.1`) | Noto Sans JP / Plex 600 number | 700 | 23 / 21 | 1.5 | 0 |
| Body | BIZ UDPMincho | 400 | 22 | 1.8 | 0.02em |
| Table cell / table head | BIZ UDPMincho / Noto Sans JP 700 | | 19 / 18 | 1.55 | 0.01em |
| Notes, sources | BIZ UDPMincho | 400 | 17 | 1.6–1.65 | 0 |
| Margin index: chapter / label | IBM Plex Sans 600 / Noto Sans JP 700 | | 44 / 17 (要旨 24) | 1 | 0.04em |
| Key number + unit | IBM Plex Sans 600 + Noto Sans JP 700 | | 66 + 22 (cover), 44 + 18 (表1) | 1.1 | -0.01em |
| Running head, folio | Noto Sans JP 18 / Plex 600 20 | | | | |

The Mincho body is the Word 明朝 voice of the genre; headings stay Gothic so they scan. Numbers and Latin always take IBM Plex Sans (tabular).

## 4. Signature devices

- **Margin index** (the signature). A column x 96–176, right-aligned, left of the spine at x 192; text starts at 216. It holds only numbered or labelled anchors: chapter numbers `1`–`6` (Plex 600 44px ink) beside each h2, `表1` / `図1` beside captions, `要旨` beside the summary band, `注` beside the foot notes, `参考` beside the reference list. Job: find and cite by number, as in a Word outline. Implementation: a `.ix` span inside a `position: relative` block, `left: -120px; width: 80px`. Never decoration: nothing unnumbered hangs there, and level-2 numbers (`2.1`, `(1)`) stay inline.
- **Ruled frame**. Header rule 1.5px ink at y 108 (x 96–1144), footer rule 1px ink at y 1646, spine 1px `--line` from 108 to 1646 joining them. Job: the page reads as a controlled form, the same on every page including the cover.
- **Document meta block** (page 1). 機密区分 box (ink 1.5px outline, 20px 700) and 文書番号 · 版 above the header rule; 宛先 「〇〇 御中」 28px with 写し; 承認欄 of three 100×96 boxes (担当 / 課長 / 部長, 16px heads, 1px ink) at the right, the first may carry a drawn date seal in `--sub`; then a 4-column meta table (labels 132px on `--tint`).
- **要旨 band** (page 1). 3px ink top rule, 1.5px bottom rule, rows 結論 / 効果 / 費用 / 依頼事項 / 期限 in a 128px label column. Only 結論 is green: tint ground, 5px green left bar, Noto 700 24px. Three to five rows, each one line where possible.
- **Chapter tab**. One ink tab 40×200 at the right edge (x 1200–1240) with white vertical text `N 章名`; it steps down by chapter: tops 200, 416, 632, 848, 1064. Job: thumbing a printed copy by chapter, like a binder index.
- **Recommended column**. In a comparison table the recommended option's column gets a green head cell, green-tint cells and 2px green sides; its head says 「（推奨）」.
- **Levels as squares**. Risk levels as ■■■ 大 / ■■□ 中 / ■□□ 小 in ink, with a legend at the caption's right. No traffic-light colors.
- **「以上」**. The last page ends with 「以上」 right-aligned at the bottom of the flow, as Japanese business documents do.

## 5. Page grammar

Every page except the cover: running head, header rule, spine, chapter tab, then one flow column (x 216–1144, from y 156): chapter label, conclusion headline, lead, then sections 52px below the lead and 44px apart; the 注 slot sits above the footer rule; footer with department and folio.

1. **Cover + 要旨.** Meta line, 宛先 and 承認欄, type label and title, meta table, 要旨 band, three key numbers with how each was computed, fiction notice in the 注 slot. This genre combines cover and summary; never add a separate decorative cover.
2. **Reading page (背景と現状).** Two chapters on one page, each an h2 with its number in the margin, two 440px columns (20 字 per line at 22px) with `1.1` / `1.2` sub-headings. A ruled 4-cell number strip (表1) may sit under the second h2, only the headline's number green.
3. **Comparison table (検討内容).** 表2 with options as columns and criteria as rows: overview, initial cost, annual cost, 5-year total, processing time, lead time, then ○ △ × rows with a word after each mark, and 総合評価 (採用 / 見送り with the reason). Two short columns under it explain the trade-off.
4. **Figure page (提案・スケジュール).** Policy as `(1)`–`(3)` hanging list, then 図1 at 928×540, then two short columns reading the figure.
5. **Risk table.** 表3: No. / リスク / 影響 / 可能性 / 対策 / 担当・時期; the risk the headline names gets green tint and a 5px green inset bar. Then 中止の判断基準 and one other point in two columns.
6. **依頼事項 / 次のアクション / 参考資料.** Numbered request rows (green Plex number, Noto 700 name, body sentence), 表4 of dated next actions, a two-column block of 別紙 list and contact, then 「以上」.

Deriving other pages:
- **調査報告 findings**: headline states the finding, a chart from `references/diagrams.md` as 図N with its source line, two columns reading it.
- **議事録 / 報告 of status**: a ruled table of 項目 / 状況 / 次の対応 with a status word, not a color.
- **Appendix (別紙)**: same frame, running head 「別紙2」 on the right, the chapter tab replaced by 「別紙」.
- **Long documents**: when a document passes about 12 pages, add a contents page with chapter numbers in the margin index and page numbers right.

## 6. Slop signs

- [ ] A page without the ruled frame, running head with 機密区分 box, folio or chapter tab.
- [ ] Something unnumbered in the margin index, or a chapter heading whose number is inline instead of in the margin.
- [ ] Green on anything but the answer (more than one fact per page, or on headings and rules).
- [ ] A headline that names a topic (「現状と課題」) instead of stating the finding; the topic belongs in the chapter label and h2.
- [ ] 要旨 longer than five rows, or missing 依頼事項 or 期限.
- [ ] Rounded cards, shadows, gradients, icons, colored status lights. The style uses rules, outlines and flat tint.
- [ ] Body under 22px, or a single column running the full 928px with body text.
- [ ] Tables and figures without 表N / 図N and a source line, or invented data not marked 架空 in the source line and on page 1.
- [ ] Numbers that do not reconcile across pages (要旨, key numbers, comparison table, requests).
- [ ] Placeholders (〇〇, 部署名, 氏名) left in the meta block; empty 承認欄 boxes are correct, empty meta fields are not.

## 7. Document pages

This style exists only as `doc-a4`; sections 4 and 5 already describe the page frame.

- **Running head**: top 58, height 34, inset 96. Left: document title (Noto 18px `--sub`) and 文書番号 · 版 (Plex 17px). Right: chapter number and name (Noto 700 18px ink) and the 機密区分 box (16px). The cover shows 機密区分 and 文書番号 in the same line instead.
- **Folio**: under the footer rule at top 1668, right edge at inset 96: `2 / 6` in Plex 600 20px with the total in `--sub` 18px; department name at the left. The cover carries it too (a Word page 1 does).
- **Chapter tab**: the single stepped ink tab at the right edge, 40×200, from top 200 in 216px steps. Pages that hold two chapters show the first.
- **Margins**: 96 left and right; the margin index x 96–176 is part of the frame, text from 216. Chapter label at 156; the flow ends 24px or more above the 注 slot, whose short 240px separator rule sits about 1560–1590; the footer rule is at 1646.
- **Cover**: no photo and no visual other than the meta block, 承認欄, 要旨 band and three key numbers. That is the genre: the page is the decision.
- **Reading page**: chapter label, 52px headline, 26px lead, then two 440px columns of 22px BIZ UDPMincho (about 20 字 per line) under each h2. Paragraphs are justified; sub-headings start a column.
- **Figure page**: patterns from `references/diagrams.md` at the 928px text width and 520–560px tall, with the caption `図N` in the margin and its title in the column, legend notes at the caption's right, the source in the 注 slot. Map `--d-ink` to `--ink`, `--d-sub` to `--sub`, `--d-rule` to `--line`, `--d-tint` to `--tint`, `--d-mid` to `--ink-30`, `--d-accent` to `--green`; labels in Noto Sans JP, numbers in IBM Plex Sans. Restyle to the frame: square bars (`rx: 0`), flat gate labels. The reference uses `d-gantt` with one extension: a gate may carry `quiet: true`, drawn as a 1.5px ink line with an outlined label, so only the decision the headline names is green.
- **Tables**: 1.5px ink rules at the head and foot, 1px `--line` row rules, `--tint` head ground, left labels in Noto 500 `--sub`; cells break by character (`word-break: normal`), short label cells by phrase (`auto-phrase`). Avoid one-character last lines by editing the copy.
