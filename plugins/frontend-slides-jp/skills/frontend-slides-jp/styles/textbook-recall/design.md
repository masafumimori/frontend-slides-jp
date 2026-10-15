# Textbook Recall design system

A document-only style (`doc-a4`) for study books that are read, then covered with a red sheet and recited. All sizes are px at the 1240×1754 page.

## 1. Thesis

Everything the learner must recall is printed in one vermilion that a red sheet erases, and nothing else is. The page is ink on white so that, under the sheet, the prose, the questions and the frame stay legible while the terms become blanks. On screen the same red becomes tap-to-open blanks, so the book works with or without a sheet.

## 2. Tokens

```css
:root {
    --ink: #1E1B19;
    --sub: #55504B;
    --red: #F04A2C;
    --tint: color-mix(in srgb, var(--red) 9%, #fff);
    --rule: color-mix(in srgb, var(--ink) 28%, #fff);
    --paper: #FFFFFF;

    --jp-head: "Noto Sans JP", sans-serif;
    --jp-body: "BIZ UDPMincho", serif;
    --num: "IBM Plex Sans", sans-serif;

    --desk-bg: #DEDBD5;
    --page-bg: var(--paper);
}
```

Why the red is #F04A2C: a red sheet passes long wavelengths, so a colour survives only by how dark it is in the red channel. Crimson and brick reds (#C00, #B22) stay readable as grey through the sheet; an orange-red with R 240 and some green vanishes while still reading as 赤 on paper. `--tint` is the same red at 9% and vanishes too, so tinted bands never fight the hidden terms. Do not use the red for headings, decoration or emphasis that is not to be memorised; use ink gothic (`.b`) for that.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Headline (h1) | Noto Sans JP | 700 | 50 | 1.38 | 0 |
| Kicker | Noto Sans JP + IBM Plex Sans unit number | 700 | 20 | 1 | 0 |
| Lead | BIZ UDPMincho | 400 | 24 | 1.75 | 0.02em |
| Section head (h2 band) | Noto Sans JP | 700 | 25 (number 23 Plex) | 1.4 | 0 |
| Body | BIZ UDPMincho | 400 | 22 | 1.8 | 0.02em |
| Key term `.kw` | Noto Sans JP | 700 | inherits | inherits | inherits |
| Question (一問一答, test) | BIZ UDPMincho | 400 | 21 | 1.6 | 0.01em |
| Answer `.ans` | Noto Sans JP | 700 | 23 | 1.4 | 0 |
| 書き下し / 原文 | BIZ UDPMincho | 400 | 20 (割注 17) | 1.75 | 0.01em |
| 現代語訳 | BIZ UDPMincho | 400 | 21 | 1.75 | 0.02em |
| Year (年表), question number | IBM Plex Sans | 600–700 | 21 | 1.45–1.6 | tnum |
| Labels, captions, page refs | Noto Sans JP | 400–700 | 17–18 | 1.35–1.7 | 0 |
| Running head, folio | Noto Sans JP 18 / IBM Plex Sans 600 22 | | | | |

## 4. Signature devices

- **Red-sheet ink** (`.kw`, `.ans`): the signature. Only terms to be recalled. Appears in body, figures, 年表, 穴埋め and every answer column.
- **一問一答 rows** (`ol.qa`): grid 50px number / question / 236px answer behind a 1.5px ink rule; 1px `--rule` between rows; a 1.5px ink rule closes the list. Up to 10 rows per block.
- **Review record** (`.rev`): ink header cell 「復習 記録」 and three 132px cells, each a checkbox, 「n回目」 and the date. Top right of the unit's first page only.
- **Fore-edge tab** (`.tab`): ink strip 44×240 at top 220 on the outer edge, vertical period name with the chapter number upright. `.page.alt` moves it to the left edge.
- **h2 tint band**: 6px ink left bar, tint ground, Plex number then gothic title.
- **Note box** (`.note`): 1.5px ink frame with an ink label chip, for debates (成立年の説) and cautions.
- **機構図** (`.org`): outlined boxes and ink arrows; the top office (将軍) ink-filled. Red only on the offices that are key terms.
- **年表** (`.nen`): Plex year column 70px, a 36px mark column (`説` chip for contested dates), event text with red terms.
- **前の単元から** (`.prev`): 2px ink frame with an ink header bar; three questions from the previous unit.
- **史料 block** (`.sr`): ink chip 史料n + article title; 452px tinted 書き下し box with a 4px ink left bar beside the 現代語訳 holding numbered blanks.
- **Score box** (`.score`): same frame as the review record; holds the self-marked score and its date.

## 5. Page grammar

Every page: running head (top 56), 2px rule at 104, fore-edge tab, flow from top 132 to 1634, 1px rule at 1650, page foot with unit name and folio at 1666. Facing pages mirror: `.alt` puts the tab and folio on the left and swaps the running head.

1. **Unit page (本文).** Kicker + review record, headline stating what happened, lead on how to use the sheet, two 500px columns of body with h2 bands and red terms, a note box, then one full-width figure (機構図, map or chart) with a caption rule.
2. **Check page (一問一答・年表).** Kicker, headline, 10-row 一問一答, then a 560/440 split: 年表 left, 「前の単元から」 right.
3. **Source page (史料).** Kicker, headline stating what the sources show, one-line lead, three 史料 blocks (書き下し left, 現代語訳 with numbered blanks right), a three-column 「読み解きのポイント」 tying the sources back to the unit page, source line.
4. **Mixed test page (総まとめテスト).** Kicker + score box, headline, lead, column header, 12 rows of `ol.test`: number, unit chip + format + 戻り先 page, question, answer, ○ self-mark.

Deriving other pages:
- **Chapter opener**: fore-edge tab, period name 72px, unit list with page numbers and a review-record cell per unit; no red.
- **Map page**: replace the figure with a map at 1048×640; red only on place names to memorise.
- **Comparison table** (e.g. 守護と地頭): ink header row, left labels gothic, red only in cells that are recall items.
- **Answer key** (for a printed-only book): the test rows without question text, answers in ink so they survive the sheet.
- **Glossary / 用語チェック**: three columns of term rows, the term red, a 1-line definition in mincho.

## 6. Slop signs

- [ ] Red used on anything that is not a recall item (headings, labels, borders, decoration). Under the sheet it would vanish for no reason.
- [ ] A crimson or brick red (#C00, #B22, #D33) in place of #F04A2C: it does not disappear under a red sheet.
- [ ] Answers or blanks whose red does not print: the print rules must force `.kw` and `.ans` to `--red` whatever the screen state.
- [ ] A hidden term that changes width when hidden or opened (layout jumps; the gap gives the answer length away inconsistently).
- [ ] A test that lists one unit and one format in order. Mix units and formats, and give every row a return page.
- [ ] Questions that the page never taught. Every answer must appear as a red term on an earlier page.
- [ ] Toolbar or toggle lying over a page in a screenshot or on scroll.
- [ ] Facts unchecked: every year, office and article number verified against a textbook.
- [ ] Body under 22px, or one column running 1048px.
- [ ] A row-heavy page (一問一答, 年表, test) filled to the flow bottom at 1240px. At phone zoom (about 0.26) Chrome rounds each row up and lists grow 7–12%, so the last rows run into the foot rule. Leave at least 100px under row lists and check the `--phone` shot.
- [ ] Running head, tab or folio shifting between pages.

## 7. Document pages

This style exists only as `doc-a4`; the frame above is the page frame.

- **Running head**: top 56, inset 96, 18px gothic. Recto: book name (bold ink) + publisher (sub) left, unit chip and unit name right. Verso (`.alt`): mirrored.
- **Folio**: top 1666, IBM Plex Sans 600 22px on the outer edge, unit name and page role in 18px sub on the other side, under a 1px ink rule at 1650.
- **Chapter tab**: the fore-edge tab, 44×240 at top 220, outer edge.
- **Margins**: 96 left and right, flow from 132 to 1634.
- **Cover**: a study book has no designed cover in this reference; the unit page carries the kicker, review record and headline. A book cover would be an ink field with the title in Noto Sans JP 900 and one red word that the sheet hides.
- **Reading page**: two 500px columns, 48px gutter, 22px mincho (about 22 字 per line), red gothic terms, h2 tint bands.
- **Figure page**: diagrams from `references/diagrams.md` at 1048px. Map `--d-accent` to `--red` only for recall items, everything else to `--ink`, `--d-tint` to `--tint`, `--d-rule` to `--rule`; labels Noto Sans JP, numbers IBM Plex Sans.

## Learning mechanisms

Every mechanism keeps working on paper (red sheet) and on screen (taps). Screen controls sit outside `.page` and never print.

### 赤シート (red-sheet terms)

- **What**: every recall term is `<span class="kw">源頼朝</span>`; the 赤シート button hides all of them at once, a tap opens one.
- **Why**: covering and reciting is retrieval practice (testing effect, Roediger & Karpicke 2006): recalling a term strengthens memory more than rereading it.
- **Contract**: `.kw` anywhere inside `.page`. Ink-gothic emphasis that is not a recall item is `.b`, never `.kw`. `#sheetBtn` (and `#sheetFab`) toggle `body.sheet`.
- **Screen**: `body.sheet .kw` → `color: transparent`, tint ground, 2px ink underline, same width; JS adds `role="button"`, `tabindex="0"`, `aria-label` only while the sheet is on. Click, Enter or Space toggles `.open` (red text, red underline). Turning the sheet off clears every `.open`.
- **Print**: `.kw` always prints in `--red`, no ground or underline, so a physical red sheet does the hiding.
- **Persistence**: none (the sheet starts off on every load).

### 一問一答 and test answers

- **What**: the answer cell is `<button class="ans" type="button" aria-expanded="false">侍所</button>`; blank with a sub 「答」 until tapped. `#ansBtn` reveals or hides every `.ans` on all pages and relabels itself.
- **Why**: retrieval practice with immediate feedback (Butler & Roediger 2008): checking right after answering corrects errors before they set.
- **Contract**: rows `ol.qa > li` = `.qn` + `.qt` + `.qr > .ans`; the test uses `ol.test > li` = `.qn` + `.tg` + `.qt` + `.qr > .ans` + `label.ok > input[type=checkbox]`.
- **Screen**: `aria-expanded` toggles per tap; `[aria-expanded="true"]` shows the red text and drops the 「答」 mark.
- **Print**: every `.ans` prints red with no ground, whatever the screen state; the row reads as question left, answer right, to be covered with the sheet.
- **Persistence**: none.

### 史料の穴埋め (numbered blanks)

- **What**: in the 現代語訳, `<span class="blank"><span class="bn">1</span><span class="kw">源頼朝</span></span>`: an ink-framed bracket with an ink number chip around a red term.
- **Why**: producing the missing word from the source text is the generation effect (Slamecka & Graf 1978), and it links the term to its primary source.
- **Contract**: inside `.sr .yk p`; number the blanks 1… across the page; the term inside is an ordinary `.kw`, so the 赤シート mechanism hides and opens it.
- **Screen / print**: as `.kw`; the frame and number stay visible under the sheet and on paper.
- **Persistence**: none.

### 前の単元から and 総まとめテスト (interleaving)

- **What**: three questions from the previous unit on the check page; on the test page 12 questions alternating units (4-3, 5-1) and formats (一問一答, 正誤, 年代整序, 史料), each tagged with unit chip, format and 戻り先 page.
- **Why**: interleaved practice (Rohrer & Taylor 2007) makes the learner choose which knowledge applies, and returning to old units spaces their review.
- **Contract**: `.prev` box with `ol.qa`; `.tg` = `<b>5-1</b><br>形式<br>戻り先 p.NN`. Never two adjacent rows from the same unit and format.
- **Screen / print**: answers follow the `.ans` rules.

### 復習記録 (spaced review record)

- **What**: three checkboxes 1回目/2回目/3回目 in `.rev`; checking one stamps today's date, unchecking clears it.
- **Why**: the spacing effect (Cepeda et al. 2006): the lead tells the learner to review on the day, the next day and a week later, and the dates show when.
- **Contract**: `<div class="rev" id="rev" data-unit="5-1">` with `label.rd > input[data-r="1|2|3"]` and `.rd-d[data-d="1|2|3"]`. One per unit, on the unit's first page.
- **Screen**: dates render as `10月15日` in ink; empty rounds show 「　月　日」.
- **Print**: prints as it is on screen (empty boxes and 「月　日」 for handwriting when unused).
- **Persistence**: `localStorage["tbr-review-<book>-<unit>"]` = `{"1":"YYYY-MM-DD", …}`, `<book>` from `main.doc-stage[data-book]`. All storage calls are wrapped in try/catch; with storage blocked the boxes still work for the session.

### 自己採点 (self-marked score)

- **What**: a ○ checkbox per test row; the score box shows the count of ○ out of `data-total` and the date it was last changed.
- **Why**: marking right and wrong is feedback that tells the learner which 戻り先 pages to reread (metacognitive monitoring).
- **Contract**: `<div class="score" id="score" data-unit="5-1" data-total="12">` with `#scoreN` and `#scoreD`; checkboxes are `#test .ok input` in row order.
- **Print**: the ○ marks print empty and the score number and date print blank, so the paper test is marked by hand.
- **Persistence**: `localStorage["tbr-test-<book>-<unit>"]` = `{"ok":[row indexes], "date":"YYYY-MM-DD"}`.

### Screen controls and fit

- **Toolbar** `#toolbar.doc-controls.tb`: first child of `.doc-stage`, above page 1, outside every `.page`. Static, not sticky: it scrolls away and never lies over a page. Counter-zoomed (`zoom: 1/z`, width `1240·z`) so the buttons stay 44px tall on phones; below a 420px column the 「学習モード」 label drops so both buttons fit one line.
- **Gutter toggle** `#fab.doc-controls.fab > #sheetFab`: a 36px vertical 「赤シート」 button fixed at the bottom-left, outside `main`. It shows only when the toolbar is out of view (IntersectionObserver) and the free space left of the page column is at least 52px; otherwise it stays hidden, so it can never cover page content. It mirrors `aria-pressed` with `#sheetBtn`.
- **Fit**: `w = min(innerWidth, visualViewport.width × scale)`; below 1272px the fit reserves a 40px left gutter (`body.paddingLeft`) for the toggle: `z = min(1, (w − 32 − reserve) / 1240)`. At 1272px and wider there is no reserve, so check-pages and shoot render at zoom 1. Between 1272 and about 1344px the gutter is too narrow and the toggle stays hidden; scroll to the top toolbar instead.
