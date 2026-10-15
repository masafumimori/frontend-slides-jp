# Learning Decision design system

A document-only style (`doc-a4`) for 判断ガイド: training material and internal guides for working adults (会社員・管理職) who must decide something, such as which use of a tool to approve first and under what conditions. All sizes are px at the 1240×1754 page.

## 1. Thesis

The reader is busy and returns later to look things up, so every page answers one question, and the answer comes first. The guide moves from the decision (what, who, by when, what we recommend) to the evidence (a scored comparison), to the cues an experienced person would use (a four-question tree), to failures those cues would have caught, and finally to the reader's own case. A warm paper ground, serif headlines and wide space give it the calm of a business journal; one brick red marks only the recommendation and the path it takes.

## 2. Tokens

```css
:root {
    --desk-bg: #e6e3dc;
    --page-bg: #fbfaf7;
    --ink: #1d2027;
    --sub: #575b63;
    --mute: #8a8d93;
    --rule: #dcd8cf;
    --rule-strong: #1d2027;
    --tint: #f1ede5;
    --accent: #a8402b;
    --accent-tint: #f6e8e2;
    --serif: "Noto Serif JP", serif;
    --sans: "IBM Plex Sans JP", sans-serif;
    --lat: "Fraunces", "Noto Serif JP", serif;
    --gap-block: 64px;
    --gap-section: 112px;
}
```

`style.json` lists the six palette tokens (ink, sub, rule, tint, accent, paper = `--page-bg`). `--mute` is only for dashed 見送る borders, disabled controls and placeholders; `--accent-tint` is the pick row and the 「すぐ試す」 terminal. `--rule-strong` is ink, used for the table head rule only. No other hue, no gradients.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Headline (h1 page 1, h2 others) | Noto Serif JP | 600 | 60 | 1.4 | 0 |
| Kicker, Latin | Fraunces | 600 | 22, caps | 1.4 | 0.08em, accent |
| Kicker, Japanese | IBM Plex Sans JP | 400 | 20 | 1.4 | 0.02em, sub |
| Lead | IBM Plex Sans JP | 400 | 26 | 1.8 | 0.02em, max 960 wide |
| Section head (理由, 条件) | Noto Serif JP | 600 | 24–26 | 1.4 | 0 |
| Body | IBM Plex Sans JP | 400 | 23 | 1.85 | 0.02em |
| Case title | Noto Serif JP | 600 | 26 | 1.45 | 0 |
| Table option name | IBM Plex Sans JP | 600 | 24 | 1.4 | 0 |
| Table facts, labels, captions | IBM Plex Sans JP | 400 / 600 | 18 | 1.45–1.6 | 0, sub |
| Tree question | IBM Plex Sans JP | 400 | 23 | 1.5 | 0 |
| Tree outcome | Noto Serif JP | 700 | 26 | 1.3 | 0 |
| Worksheet result | Noto Serif JP | 700 | 46 | 1.3 | 0 |
| Score total | Fraunces | 600 | 36 | 1.1 | 0 |
| Q number, case number | Fraunces | 600 | 22–28 / 40 | 1–1.1 | 0 |
| Notes (注) | IBM Plex Sans JP | 400 | 17 | 1.75 | 0, sub |
| Running head, foot | IBM Plex Sans JP 19 / 18; folio Fraunces 20 | | | | |

Body never goes below 23px and nothing a reader must act on below 18px. When text does not fit, move it to another page; never shrink it.

## 4. Signature devices

- **Decision frame.** `dl.frame`: a 2×2 grid (two columns, 64px gutter) of `dt` 18px sub (112px) and `dd` 23px: 決めること / 決める人 / 期限 / 対象外. 22px row padding and one hairline under each row; no box. Page 1 only.
- **Recommendation pair.** `.why`: two 492px columns with a 64px gutter. Left: why the pick wins, one paragraph with the key numbers. Right: the conditions of approval as ■ items (10px ink square), 20px apart, no rules.
- **Scored table.** `table.cmp` from `d-priority-table`: option column 320px (key letter A–D in Fraunces, name, `who・n人`, and 「分岐図の判定：…」 so the table points at the tree), four criterion columns each with the weight under its header, a 5-square SVG `.pips` (96×16) plus the score and an 18px fact, and a 104px total column (Fraunces 36px, rank). Rows at least 56px tall (24px padding). Only the pick row carries the accent: `--accent-tint` fill, red squares and total, a 5px inset red rule, and a 推奨 tag. The legend and the formula go in the note and the method lines under the table.
- **Decision tree.** `.tree` 1048×636: HTML boxes positioned over an SVG of lines with arrow markers. Questions on a left spine (380×116), a side question for the second branch (330×160), outcome terminals at the right (208 wide) and one at the foot of the spine. Outcomes: 見送る (white, dashed `--mute`, 6px mute left rule), 条件付きで試す (`--tint`, ink rule), すぐ試す (`--accent-tint`, red rule, red title). はい / いいえ labels sit on the line with a page-colored backing. The worked example's path is drawn 5px red with a red arrowhead, and the question boxes on it get a 3px red border. No yes/no pattern exists in `references/diagrams.md`; the tree is this style's own device.
- **Failure case row.** `.case`: 112px column (Fraunces 40px number + the task), a body column (serif title broken by hand, 23px account), and a 340px catch column (`Q<n> …で止まる` + what would have stopped it). 64px between cases, no rules or boxes.
- **Q labels.** `Q1 データ`, `Q2 正確さ`, `Q3 人の確認`, `Q4 費用`: the same number and word in the tree, the cases and the worksheet, so a reader can jump between them.
- **Chapter tab.** An ink strip 46×220 at the right edge with the page number (Fraunces, `text-combine-upright`) and a vertical name. It steps down 230px per page (top 200, 430, 660, 890, 1120, 1350), so the edge of the printed stack works as an index. It is the only thing in the outer margin.

## 5. Page grammar

Every page: running head, chapter tab, body block from top 212 (140 + 72px of air above the kicker), a note at the foot of the body, foot line with the publisher and folio. Page head: kicker, two-line headline that states the finding, lead. Between blocks 64px (`.blk`), between sections 112px (`.sec`). The text block covers about 60–70% of the page; the rest is left empty on purpose.

1. **Decision brief (論点と推奨).** Headline = the recommendation. Lead with the deciding number. Decision frame. Recommendation pair. A pointer line to the comparison, the tree and the worksheet pages. The lower quarter stays empty.
2. **Comparison (候補の比較).** Headline = what the scores show (for example the most effective option is not the overall winner). Scored table. Two method paragraphs: how the total is computed and how the time is estimated, with a page reference to the tree. Note: scale and 架空のデータ.
3. **Decision tree (判定の分岐図).** Headline = what the questions decide. Lead names the order of the questions and why. Tree, then a caption with the key for the red path. Note with the public guideline used as reference.
4. **Failure cases (失敗例).** Headline = the claim the cases prove. Three case rows.
5. **Worksheet (自分の状況で決める).** Task input, four question rows with はい / いいえ, the result block (outcome + conditions).
6. **Checklist (始める前の確認).** Headline names the count. Progress at the right, eight numbered items in one column.

Deriving other pages:
- **More options**: up to six rows in the scored table; beyond that, split by group onto two pages with the same columns.
- **A different decision**: keep four questions, ordered from the risk that cannot be mitigated to the one that can; keep three outcomes. A fifth question goes on the spine and the tree grows to 816px tall on its own page.
- **Roll-out plan**: use `d-gantt` or `d-flow-v` inside the body width, with the gate that the decision opens drawn in the accent.
- **Summary / one-pager**: the decision brief alone, with the table as a 3-row excerpt.

## 6. Slop signs

- [ ] A headline that names a topic instead of stating the recommendation or finding.
- [ ] The accent on anything other than the pick, its path and the 「すぐ試す」 result.
- [ ] Scores, totals, hours or costs typed by hand instead of computed in the series script; a total that does not match its formula.
- [ ] The tree, the cases and the worksheet using different wording or numbers for the same question.
- [ ] A worksheet that lets the reader answer a question the tree skips, or gives an outcome the tree would not.
- [ ] Two ideas on one page, blocks closer than 64px, a box touching another box, or the text block filling more than about 70% of the page.
- [ ] Body under 23px, or text shrunk to fit.
- [ ] Rounded cards, shadows, gradients, emoji, boxed backgrounds where a heading and space would do.
- [ ] Buttons or filled answers printed; the worksheet must print blank.
- [ ] Content near the foot at phone zoom: leave about 5% of the flow height as slack.
- [ ] Fictional company or publisher without 「（架空）」 / 「（架空の教材）」, or figures without 「架空のデータ」.

## 7. Document pages

This style exists only as `doc-a4`; the frame above is the page frame.

- **Running head**: top 64, inset 96, 19px. Left: a Fraunces series letter, the guide title (ink 600) and 判断ガイド (sub). Right: page number and page name (sub). No rule.
- **Folio**: bottom 56, outer edge, Fraunces 20px `01 / 06`; the publisher with 「（架空の教材）」 at the left in 18px sub.
- **Chapter tab**: right edge, 46×220, ink, stepping down 230px per page; number and vertical name of the page.
- **Margins**: 96 left and right; body from 140 with 72px padding, so the kicker sits at 212; content ends by 1634. The note sits at the foot of the body above a hairline.
- **Cover**: the decision brief is the cover; a book of several guides puts a contents page before it with page number, title and the one-line finding of each page.
- **Reading page**: body 23px in two 492px columns (about 21 字 per line), or one column up to 960px for a lead.
- **Figure page**: the figure takes the full 1048px width with its caption 24px below, as the tree page does.

## Learning mechanisms

All state lives in one object in `localStorage` under `learning-decision:` + `location.pathname`, read and written inside `try/catch` so blocked storage leaves the page working without saving. Shape: `{ task: string, a: { q1…q4: "yes" | "no" }, c: { c1…c8: boolean } }`. The toolbar outside the pages holds 「回答とチェックを消す」 (`#btnReset`, removes the key) and 「印刷する（記入用）」 (`#btnPrint`). The toolbar is in normal flow above the stage; nothing fixed covers a page.

1. **Decision first (decision brief).** Page 1 states what is decided, by whom, by when, the recommendation and its conditions before any evidence. Why: managers decide from a framed problem and a proposed course of action, and seeing the conclusion first lets them read the detail selectively (decision support; advance organizer, Ausubel). Markup: `dl.frame` with four `div > dt + dd`; `.why` with two columns. Screen and print: static. Persistence: none.
2. **Scored comparison with a marked pick.** Options × weighted criteria, one recommended row. Why: explicit criteria and weights make a choice auditable and show the trade-off the reader would otherwise carry in their head (multi-attribute decision analysis). Markup: `table.cmp` with `colgroup` (`col.c-opt`, `col.c-tot`); rows generated by the series script; `tr.pick` for the recommendation; `svg.pips > rect(.on)` for scores. Screen and print: static. Persistence: none.
3. **Cue questions as a tree.** Four yes/no questions that end in three outcomes, ordered from the risk that cannot be mitigated to the one that can. Why: experts decide by recognising a few cues and checking one workable action, not by weighing everything (recognition-primed decision, Klein 1998); the tree hands those cues to a novice. Markup: `.tree` with `svg` lines (`.ln`, `.ln.hot` for the worked path, markers `#ah` / `#ahh`), `.q` boxes (`.q.hot` on the path), `.end` terminals (`.go`, `.stop`), `.yn` labels; `role="img"` and an `aria-label` that reads the whole tree in words. Screen and print: static, the red path prints. Persistence: none.
4. **Worked failure cases.** Three short, realistic failures, each tied to the question that would have stopped it. Why: concrete errors and how they could have been caught make the cue memorable and show what a "yes" looks like (learning from errors; error management training, Keith & Frese 2008). Markup: `.case > .cn + div(.ct + p) + .catch(.cq > .qn)`. Screen and print: static. Persistence: none.
5. **Worksheet that walks the tree.** The reader names a task and answers Q1–Q4; the page shows the outcome and the conditions to attach. Why: applying the cues to one's own case is what transfers them to work (generation effect; transfer of learning). Markup: `#taskName`; `.wq[data-q="q1"]` rows with `.qt`, `.skipnote` and `.seg` radio groups (`input[name="q1"][value="yes|no"]`); `#result` with `#rv`, `#rw`, `ol#conds`, `#condsEmpty`, and `.print-only` blocks. Script: `judge(a)` walks the tree and returns `{ r: "go" | "cond" | "stop" | null, via, path, skip }`; `explain(j)` returns the reason and the conditions for that path. Rows off the path get `.skipped`, are disabled, and say why (「Q2が「いいえ」なので…」) or 「前の問いに答えると開く」; changing an answer drops answers below it that left the path. Screen: the result updates on every change (`aria-live="polite"`); `#result[data-r="go"]` turns the result red. Print: the input prints as an empty line, all radios print as empty circles, the result prints three empty boxes (すぐ試す / 条件付きで試す / 見送る) and ruled lines for conditions, and the lead tells the reader to follow the tree page. Persistence: `task`, `a.q1…q4`.
6. **Pre-launch checklist.** Eight numbered items that must be done before asking for approval. Why: a short checklist of critical steps catches omissions that experienced people make under time pressure (checklists, Gawande, The Checklist Manifesto, 2009). Markup: `ul#chkList > li > label > input[type=checkbox][data-k="c1"] + .box + .no + .tx`; `#progN` counts the checked items. Screen: checked items turn the text sub and the box ink with a white tick. Print: boxes print empty, the progress count is hidden. Persistence: `c.c1…c8`.

## Series facts

A guide in this style is usually one of a series (for example three guides on one theme for the same fictional company), so every number lives in one Python script and the HTML is generated from a template with `{{TOKENS}}`:

- `OPTIONS`: one record per option with `users`, `mins` (minutes saved per user per week), `cost` (added cost per year), the four criterion scores, the tree outcome, and the short facts shown in the table. `WEIGHTS` and `WEEKS` sit beside it.
- The script computes `hours = users × mins / 60 × WEEKS` and `total = Σ weight × score`, ranks the options, asserts that the expected option wins (so the headline cannot go stale), and fills every token: the table rows, the pick's total, users, minutes and hours in the lead and the reasons, the runner-up in the method line, the weights in the headers and the formula, and the name of the most effective option in the comparison headline.
- The script fails on any unfilled `{{TOKEN}}`, so the pages cannot ship with a number missing.
- Other guides in the series import or copy the same `OPTIONS` block unchanged; only their own tokens differ. Change a fact in one place and rebuild every guide.
- The tree's outcome for each option (`verdict`) is stated in `OPTIONS` and shown in the table; check it against `judge()` with the option's answers whenever the questions change.
