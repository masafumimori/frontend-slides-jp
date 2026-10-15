# Textbook Drill design system

A document-only style (`doc-a4`) for 参考書 and 問題集 pages in subjects solved by steps (math, physics, chemistry calculations, accounting). All sizes are px at the 1240×1754 page.

## 1. Thesis

The page teaches by doing. Every problem is read in one main column of 682px, and everything that explains it (指針, よくある間違い, 用語, 図, 戻り先) sits beside it in a tinted side-note column, on the same line. The page goes from a full worked example to one with blanks, then to practice the learner checks, and the learner's own record says what to read again. One blue marks 例題 and every control; ink carries the rest.

## 2. Tokens

```css
:root {
    --ink: #1A1D24;
    --sub: #50555F;
    --line: #B8BCC4;
    --accent: #1D4E9E;
    --tint: #EEF1F5;
    --paper: #FFFFFF;
    --accent-10: color-mix(in srgb, var(--accent) 10%, var(--paper));
    --accent-20: color-mix(in srgb, var(--accent) 20%, var(--paper));

    --head: "Noto Sans JP", sans-serif;
    --body: "BIZ UDPMincho", serif;
    --math: "STIX Two Text", "BIZ UDPMincho", serif;

    --desk-bg: #DADDE2;
    --page-bg: var(--paper);
}
```

The six hex tokens are the palette. `--accent-10` fills an opened blank and button hover; `--accent-20` is the domain band in graphs. No other hue. STIX Two Text is loaded for math only and is not in `fonts/catalog.json`, so `style.json` lists no Latin family.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Headline (h1, unit and section pages) | Noto Sans JP | 700 | 50 | 1.38 | 0 |
| Headline (h2, practice and test pages) | Noto Sans JP | 700 | 44 | 1.4 | 0 |
| Kicker (chapter, §) | Noto Sans JP / STIX number | 700 / 600 | 20 / 22 | 1.4 | 0, blue |
| Section head (この単元で…, 前提の確認) | Noto Sans JP | 700 | 26 | 1.4 | 0, 2px ink rule under |
| Lead | BIZ UDPMincho | 400 | 24 | 1.75 | 0.02em |
| Problem and solution body | BIZ UDPMincho | 400 | 22 | 1.8 | 0.02em |
| 例題 / 練習 / 問 label | Noto Sans JP 900 / STIX 600 number | | 22 / 24–26 | | 0 |
| Step label (平方完成 …) | Noto Sans JP | 700 | 18 | 1.5 | 0, blue, 3px blue left rule |
| Side notes, table cells, answer block | BIZ UDPMincho | 400 | 18–20 | 1.45–1.7 | 0.01em |
| Note heading (■ 指針, ◇ よくある間違い) | Noto Sans JP | 700 | 18 | 1.4 | 0 |
| Controls (buttons, radios, chips) | Noto Sans JP | 700 / 400 | 18 (20 for the test gate) | 1.5 | 0 |
| Math `.m` | STIX Two Text | 400 | 1.08em of its line | | 0, italic `var`, true minus |
| Big number (tally, score) | STIX Two Text | 600 | 40 (tally), 64 (score) | 1.1–1.2 | 0 |
| Running head, folio | Noto Sans JP 18 / STIX 600 22 | | | | |

Nothing a learner must read is below 18px.

## 4. Signature devices

- **Side-note band.** `.band` at x 798–1144, top 104, height 1550, `--tint`. Each `.row` is a grid of 682 + 330 with a 36px gap, so a note (`.side .note`) starts on the line of the problem it explains. Note types: `■ 指針` (how to start), `◇ よくある間違い` (a specific wrong answer and how to check it), `用語` (a `dl.terms`), a figure with `図n` caption, `戻り先` (where to read again). Never put body text in the band.
- **基本事項 table.** 2px ink top rule, a black label field `基本事項`, three cases side by side with a mini graph each, and one closing line. One per section.
- **例題 header.** Blue label field `例題 1`, 22px title, 重要度 as three 12px squares at the right, 2px blue rule. Solution steps in a 116px label column; the last line is `答` in an outlined tag over a 1px ink rule.
- **Blanks.** `.blank` boxes of fixed width (set in `em` on the element) with a blue outline and the blank's name (ア, イ, 確認1). Opening one never reflows the line.
- **練習 block.** Outlined blue label `練習 1`, `類題 → 例題1` at the right, the problem, a 140px ruled work box, then a control row: ［解答を見る］ left, 手ごたえ radios right.
- **Graphs from the function.** SVG drawn by `plot()` from a, b, c and the domain: domain band, thin curve outside the domain, thick inside, dots at the max and min, an open circle for a vertex outside the domain. Never hand-place a curve.
- **Chapter tab.** Blue strip 46×250 at the right edge, top 300: chapter number in STIX 26px, chapter name vertical 19px.
- **Record chips.** Fixed-width (6.4em) outlined chips that show a saved state: できた (ink fill), あやしい (blue, half-filled square), できない (dashed ink, diamond), 未記録 (line gray). Same shapes in the legend.

## 5. Page grammar

Every page: running head, 2px ink rule at 104, side-note band, chapter tab, 1px rule at 1654, foot line with folio. Page head: kicker at top 136, headline, lead, with the first side note beside it.

1. **Unit opener (単元の扉).** Headline that says how the unit is solved, lead, the flow of the unit as a numbered list in the side column with page numbers. Then **この単元で解けるようになる問題**: a table grouped by problem type (type cell: name + 120×56 mini graph with ● max and ■ min), one problem per row with its source chip (`例題` filled, `練習` outlined blue, `問` outlined ink), page, and a record chip. Then **前提の確認**: three short items from earlier sections, each with a blank, a reveal button and できた / 戻る; a `戻り先` note per item in the side column. Foot at top 1420: 次に読むところ (screen) / the answers (print).
2. **Explanation + examples.** 基本事項, 例題1 with every step and its graph, 例題2 faded (two blanks, empty graph frame until ア opens).
3. **Practice.** Three 練習, each a 類題 of a named 例題, with work box, reveal and 手ごたえ; a side note per problem; foot at top 1292: 学習の記録 (tally + review list) on screen, the answer block in print.
4. **Chapter test (章末テスト).** Kicker with the range (§2〜§6), one-line headline, test conditions (time, points, pass mark) as `dl.terms` in the side column. Six `問` blocks: black label, section chip, points, 採点 ○/× radios at the right; problem; a 52px 解答 box. A `戻り先` note beside each. Foot at top 1366: one answer block for all six answers behind a gate; the score (STIX 64px of 100, 採点 n/6) in the side column.

Deriving other pages:
- **Summary / まとめ**: 基本事項 grammar at full main width, one row per rule, with a side note per row.
- **Answer pages (別冊解答)**: the 例題 step grammar for each 練習 and 問, headed by the problem number; no controls.
- **Mixed review (総合演習)**: the test grammar without points; 戻り先 in the side column.
- **Other subjects**: keep the step labels as the subject's own procedure (物理: 図を描く / 式を立てる / 解く / 単位), and the graph device only where the figure is computed from the data.

## 6. Slop signs

- [ ] An answer, value or graph not computed and checked by script (verify vertex, end values, max/min by a dense scan).
- [ ] A 練習 with no named 例題 (`類題 → 例題n`) or a 問 with no 戻り先.
- [ ] A side note that is not beside the line it explains, or body text set in the band.
- [ ] A blank, chip or answer box whose width changes when it opens or fills.
- [ ] Answers visible on screen before the learner asks, or hidden in print with no printed answer block.
- [ ] Buttons or radios printed. Record states that print as dark filled boxes.
- [ ] Text under 18px for anything a learner must read; body under 22px.
- [ ] More than one accent hue; blue on running text instead of labels and controls.
- [ ] Rounded cards, shadows, gradients, emoji.
- [ ] Content running into the foot block at the phone zoom: leave about 5% of the flow height as slack, since line boxes round up at small zoom.
- [ ] A publisher name without 「（架空の教材）」.

## 7. Document pages

This style exists only as `doc-a4`; the frame above is the page frame.

- **Running head**: top 56, inset 96, 18px Noto Sans JP. Left: book title (ink 700) and publisher with 「（架空の教材）」. Right: section (sub) then chapter (ink 700). A 2px ink rule at top 104.
- **Folio**: foot line at top 1672 under a 1px line-gray rule at 1654; the section name left in 18px sub, the page number right in STIX 600 22px. Same place on every page.
- **Chapter tab**: right edge x 1194–1240, top 300–550, blue. The chapter number and the vertical name; the same on every page of the chapter.
- **Margins**: 96 left; body at top 136; main column x 96–778, side column x 812–1142 inside the band; content ends by about 1600 (or above the foot block where one exists).
- **Cover**: this style has no cover; the unit opener is the first page of every unit. A book cover, when asked for, uses the opener's header and a full-width unit list (unit number, title, page) in the table grammar.
- **Reading page**: the explanation page (基本事項 + 例題). Body 22px in the 682px column holds about 30 字 per line; keep the problem and the steps in this column only.
- **Figure page**: figures sit in the side column at 316px wide, or in the main column at 682px for a large one, with a `図n` caption in 18px.

## Learning mechanisms

All state lives in one object in `localStorage` under `textbook-drill:` + `location.pathname`, read and written inside `try/catch` so private mode or blocked storage leaves the page working without saving. Keys: `sc1…` (練習の手ごたえ), `pre1…` (前提の確認), `t1…` (章末テストの採点). A `button[data-reset="<prefix>"]` clears only the keys with that prefix.

1. **Worked example, then a faded one.** 例題1 shows every step; 例題2 keeps the steps and blanks out two of them. Why: studying a full example and then completing a partial one lowers load and builds the procedure (worked-example effect and fading, Sweller; Renkl & Atkinson). Markup: `<span class="blank" id="bA" style="width:7.4em"><span class="bt">ア</span><span class="bf">answer</span></span><button class="rv" data-blank="bA" aria-controls="bA" aria-expanded="false">ア を見る</button>`; the button text must start with the blank's name and a space. Screen: the click toggles `.open`, the name moves above the box, the button reads 「ア を隠す」; a graph tied to the blank (`#g2` / `#g2b`) swaps with it. Print: blanks print empty with their names; answers go to the answer block. Persistence: none (a reveal is not a record).
2. **Answer reveal after an attempt.** Each 練習 has a work box and ［解答を見る］. Why: trying to recall before seeing the answer strengthens memory more than rereading (retrieval practice / testing effect, Roediger & Karpicke). Markup: `<div class="work">…<div class="wa" id="a1" hidden>…</div></div><button class="rv" data-answer="a1" aria-controls="a1" aria-expanded="false">解答を見る</button>`. Screen: the answer covers the work box; the button reads 解答を隠す. Print: `.wa` hidden, answers in `.ansblock`. Persistence: none.
3. **Self-check with a review list.** 手ごたえ できた / あやしい / できない per 練習. Why: judging one's own understanding and acting on it is what makes practice targeted (metacognitive monitoring, judgments of learning). Markup: `<fieldset class="selfchk" data-key="sc1"><legend>手ごたえ</legend><label class="sc-opt"><input type="radio" name="sc1" value="ok"><span>できた</span></label>…</fieldset>`; values `ok`, `unsure`, `ng`. Screen: the 学習の記録 tally (`#t-ok`, `#t-unsure`, `#t-ng`, `#t-none`) and the list `#todo` name the 例題 or note to reread for each weak item (`REVIEW[key]` in the script). Print: the record is replaced by the answer block; checked options print as outlined boxes with a filled square. Persistence: `sc<n>`.
4. **Unit problem list (progress map).** The opener lists every problem of the unit by type, with where it is and the learner's record. Why: seeing the goals and their structure before studying gives the new material a frame (advance organizer, Ausubel), and the record turns it into a map of what is done. Markup: `<span class="chip" data-rec="sc1">未記録</span>` in the record cell; any saved key works (`sc…` shows できた/あやしい/できない, `t…` shows 正解/不正解). Mini graphs: `plot(svg, bare(a, p))` with ● max, ■ min. Screen: chips update on every change, on any page. Print: chips print their current state; a fresh document prints 未記録. Persistence: reads the other keys, writes none.
5. **Prerequisite check with return paths.** Three short items from earlier sections. Why: learning that builds on missing prerequisites fails; checking them first and sending the learner back is the corrective step of mastery learning (Bloom). Markup: a `.pre-i` with a blank (mechanism 1) and `<fieldset class="selfchk" data-key="pre1">` with `ok` / `ng` (できた / 戻る); a side note `<div class="note ret" id="ret-pre1">` holds the return page. Screen: 戻る lights the matching `ret-` note (`.miss`, blue left rule) and `#todo1` lists where to read; all できた sends the learner to the first 例題. Print: radios hidden; answers in the foot `.ansblock`. Persistence: `pre<n>`.
6. **Chapter test with one answer block and self-scoring.** Six problems across the chapter; all answers behind one gate below them. Why: a mixed, delayed test is retrieval across sections (testing effect; interleaved practice, Rohrer), and holding the answers until all six are written keeps it a test; scoring with return paths is mastery-learning feedback. Markup: each `問` has `<fieldset class="selfchk" data-key="t1">` with `ok` / `ng`, points in `POINTS` in the script, a `.note.ret` with `id="ret-t1"`; the answers in `<div class="ansblock" id="tAns" hidden>` behind `#gate` with `button#openTest` (and `#closeTest` inside the block). Screen: the gate opens the block and moves focus to 解答を閉じる; ○/× updates `#tScore` (sum of points) and `#tDone`, and × lights the 戻り先 note. Print: gate and radios hidden, the answer block always printed, each 問 shows an empty `得点 ／15` box and the score block an empty `得点 ／100点` line. Persistence: `t<n>`; the open state of the gate is not saved.
