# Textbook Workbook design system

A document-only style (`doc-a4`) for a write-in workbook built on Cornell notes. All sizes are px at the 1240×1754 page.

## 1. Thesis

The learner learns by answering, not by reading. Every lesson page is a Cornell grid whose left column holds the questions the learner will later answer with the notes covered, and every page leaves lined space to write in. One teal marks structure and the questions; the page stays quiet so the learner's own handwriting is the loudest thing on it.

## 2. Tokens

```css
:root {
    --ink: #1F2427;
    --accent: #1D5F73;
    --accent-tint: #EEF4F6;
    --rule: #D3D8DB;
    --ng: #A8442F;
    --paper: #FFFFFF;

    --ink-2: #4B5459;
    --ink-3: #6D767B;
    --rule-2: #AAB2B7;
    --ok: var(--accent);
    --jp: "IBM Plex Sans JP", "Hiragino Sans", sans-serif;
    --lat: "IBM Plex Sans", "IBM Plex Sans JP", sans-serif;
    --hand: "Klee One", "IBM Plex Sans JP", serif;
    --line-44: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='44'><rect y='43' width='8' height='1' fill='%23c9cfd3'/></svg>");

    --desk-bg: #E6E4DF;
    --page-bg: var(--paper);
}
```

The six hex tokens are the palette. `--accent-tint` is used only for the cue column and input focus. `--ng` appears only on a wrong answer after checking. Greys are fixed derivatives; no other hue.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Unit title (opener h1) | IBM Plex Sans JP | 700 | 60 | 1.36 | 0 |
| Page headline (h1) | IBM Plex Sans JP | 700 | 54 (52 on the practice page) | 1.36 | 0 |
| Kicker | IBM Plex Sans caps | 600 | 20 | 1 | 0.14em, teal |
| Lead | IBM Plex Sans JP | 400 | 26 (24 practice) | 1.7 | 0.02em, `--ink-2` |
| Section head (h2) | IBM Plex Sans JP | 700 | 28 (26 in boxes) | 1.4 | 0 |
| Cue question | IBM Plex Sans JP | 700 | 24 | 1.55 | 0.01em, `Q1` label 18px Plex Sans 600 teal above |
| Note body | IBM Plex Sans JP | 400 | 22 | 1.9 | 0.02em, left-aligned |
| Choice text | IBM Plex Sans JP | 400 | 22 | 1.5 | 0.02em |
| Learner writing, blanks | Klee One | 400 / 600 | 22 / 24 | 44px lines | 0 |
| Model answer | Klee One | 400 | 20 | 1.5 | 0.01em |
| Hints, refs | IBM Plex Sans JP | 400 | 18–19 | 1.6 | `--ink-3` |
| Notes, sources | IBM Plex Sans JP | 400 | 17 | 1.6 | `--ink-3` |
| Running head, folio | IBM Plex Sans JP / Plex Sans 600 | | 18 / 20 | | |

## 4. Signature devices

- **Cornell grid** (the signature). `.cornell` with a 3px teal top rule, a `.c-head` row (問い | ノート + review button), then `.c-row`s: a 340px `.cue` (tinted, 2px teal right rule) holding `.cue-q[data-n]` and a `言えた` tick, and a `.note` holding prose with blanks, a small table or a one-line memo. Job: every piece of content is filed under the question it answers. Lesson pages only; three to five rows.
- **Cue column on the review page.** The same `.cue` / `.cue-q` markup, without the tick, beside writing lines. Job: the question looks the same where it is learned and where it is recalled.
- **Fill-in blank** `.bk > .bn(n) + input.blank[data-answer]`. A 2px underline, the learner's text in teal Klee One. Accepted answers in `data-answer`, `|`-separated, the first is the printed key.
- **Writing lines** `.write.l1`–`.l4` (44, 88, 132, 176px) on the 44px rule image. Placeholder text in `data-ph`, on the first instance of a repeated field only; later instances stay blank so the page is quiet.
- **Model-answer box** `.model` beside the writing column: white, 1px rule, 3px teal left edge, closed with "解答例を見る / 書き終えてから開く". The box is exactly as tall as the writing column.
- **Exercise head** `.ex-head`: 112px solid teal number block (練習 / 40px numeral) beside the vague original phrase (28px 700) and a 19px situation memo.
- **Upside-down key** `.foot .inv`: answers rotated 180° in the foot, so a glance does not spoil them.
- **Commit box** `.commit`: 2px ink outline, "明日の〜で試すこと" with who/when blanks and two lines, plus three after-action ticks.
- **Chapter tab** 52×420 at top 240 on the outer edge, unit number set upright, unit name vertical.

## 5. Page grammar

The reference is one unit of four pages: p.24 opener (even), p.25 lesson note (odd), p.26 practice (even), p.27 one-week review (odd). Every page: running head, chapter tab, kicker at top 140, headline, lead, body, foot slot ending at 1634, folio.

1. **Unit opener.** Unit title, lead, この単元のゴール (three can-do lines, each with the page/question where it is taught), 進め方 (three outlined cells: page and minutes, step name, one-line task), 事前の自己診断 (three questions × three choices in a row, the lesson question reference at the right, a check button that is meant for after the lesson, answer key upside down).
2. **Lesson note.** Headline stating the skill, two-line lead, Cornell grid of four rows, 自分の言葉でまとめる box with three lines, source line.
3. **Practice.** Three exercises (head + S/B/I writing column 1/2/2 lines + model-answer box), commit box, upside-down key for the lesson blanks.
4. **One-week review.** "ノートを閉じて…" headline, four review items (cue column + writing lines + 言えた/あいまい/出てこない grade + a button that jumps to the matching note row), 次の復習 box with a date blank and the rule for the next interval.

Deriving other pages:
- **More lesson content**: a second lesson page with its own Cornell grid; the review page then lists every cue in the unit (split over two pages beyond six cues).
- **Vocabulary / term list**: Cornell grid where the cue is the term's question (「〇〇とは？」) and the note is a one-line definition with one blank.
- **Case study**: an exercise head with a longer memo, writing lines, and the model box below instead of beside it.
- **Unit test**: the review page grammar with points per item and the key on a separate answer page (upside-down key or a printed answer page after the test).
- **Answer page**: two columns of model answers in Klee One with the exercise number blocks; it replaces `print-answers` when the workbook is bound.

## 6. Slop signs

- [ ] A note row whose content does not answer its cue question, or a cue that is a topic label (「SBIについて」) instead of a question.
- [ ] Review-page cue text that differs from the lesson cue text (the reference checks this in its test).
- [ ] Writing space shorter than the expected answer: a two-sentence answer on one 44px line.
- [ ] Placeholders repeated in every instance of the same field; grey prompt text crowding the lines.
- [ ] Model answers visible before the learner writes, or printed by default.
- [ ] An answer key printed upright on the same page as its questions.
- [ ] More than one filled teal block per row (number block, tab and S/B/I letter fills all at once). S/B/I letters are teal text on a rule, not filled squares.
- [ ] `--ng` used for decoration; red is for a wrong answer only.
- [ ] Body or choice text under 22px to make a page fit; cut content or add a page.
- [ ] Rounded cards, shadows or gradients on the page. Outlines, rules and the one tint only.

## 7. Document pages

This style exists only as `doc-a4`; the frame above is the page frame.

- **Running head** at top 64, inset 96, 18px, a 1px rule under it at about top 104. Odd pages: book name (`新任マネージャー研修` in 600) left, unit right. Even pages: unit left, book name right.
- **Folio** at bottom 56 on the outer edge: odd right (`small` unit name, then the number), even left (number, then the unit name). Plex Sans 600 20px.
- **Chapter tab**: 52×420 solid teal at top 240 on the outer edge (odd right, even left), `03` upright then the unit name vertical. The same on every page of a unit.
- **Margins**: content box `.sheet` top 140, left/right 96, bottom 120. The foot slot sits at the bottom of `.sheet` (rule at about 1596 for one line, 1569 for two). Keep at least 14px between the last box and the foot rule.
- **No cover in the reference**: a workbook unit starts at its opener. A book cover, when needed, puts the book name at 72px on white with the teal tab strip at full height and the unit list as the opener's 進め方 cells.
- **Reading page** here is the lesson note: one 1048px Cornell grid (340 + 708) rather than two columns, because each note row is short (2–4 lines of 22px, about 31 字 per line) and is read against its cue.
- **Figure page**: a diagram from `references/diagrams.md` goes inside a Cornell row's note (708px wide, up to about 360px tall) so it stays filed under a question, or full width (1048) under the headline with a cue question as its caption. Map `--d-accent` to `--accent`, tints to `--accent-tint`, rules to `--rule`, labels to IBM Plex Sans JP.

## Learning mechanisms

Each mechanism lists what it is, why it helps (one line, the research name), the markup contract, screen behavior, print behavior and the persistence key. All fields persist in one `localStorage` entry, a JSON object under `<publisher>-<book>:unit<N>:v<schema>` (reference: `minato-mgr-workbook:unit3:v1`); every element with `data-key` is saved on input/change and restored on load; storage errors are caught so the page works when storage is blocked. Bump `v<schema>` when keys change meaning. 記入を消す (with `confirm`) empties every field and the stored object except `__printAns`.

1. **Cue questions + cover-the-notes review** (Cornell note-taking, Pauk; retrieval practice / testing effect, Roediger & Karpicke 2006).
   - Why: answering a question from memory strengthens it more than rereading the note.
   - Markup: `.cornell#cornell > .c-body > .c-row#q<N>[data-q=N]` containing `.cue > .cue-q[data-n=N]` + `label.tick > input[data-key=cue<N>]`, `.note`, `.row-cover.no-print > button.peek`, `button.peek-close.no-print`. Review toggles: `#reviewBtn` in `.c-head` and `#reviewBar` in the toolbar, kept in sync (`aria-pressed`, label ノートを隠して復習 ⇄ ノートを開く).
   - Screen: `.reviewing` on `.cornell` covers every note with a lined sheet; the head text switches to "問いに声で答えてから、行ごとに開いて確かめる". `button.peek` opens one row (`.peek`), `隠す` closes it; toggling review resets all rows.
   - Print: covers never print; notes always print. The learner covers them with a sheet of paper.
   - Keys: `cue1`–`cue4` (booleans).
2. **Fill-in blanks with checking** (generation effect, Slamecka & Graf 1978; corrective feedback, Butler & Roediger 2008).
   - Why: producing the key word while reading is remembered better than reading it, and immediate feedback fixes errors.
   - Markup: `.bk > span.bn (n) + input.blank[data-key=b<N>][data-answer="正答|別解…"]`; the script adds `span.mark.no-print` after each.
   - Screen: 穴埋めの答え合わせ normalizes (NFKC, strips spaces and 「」（）。、) and marks 正解 or 答え：<first answer>; the toolbar score shows `穴埋め 6問中 n問 正解`. Typing in a blank clears its mark.
   - Print: marks hidden; a wrong entry prints in teal like any other; the key is the upside-down `.foot .inv` on the next page.
   - Keys: `b1`–`b6` (strings); free memo lines `m1`, `m3`.
3. **Pretest on the unit opener** (pretesting effect, Richland, Kornell & Kao 2009).
   - Why: trying to answer before the lesson, even wrongly, makes the later answer stick.
   - Markup: `.pre#pre > .pre-item[data-correct=a|b|c]` with `p.pq > span + span.res + span.ref` and `.opts > label.opt > input[type=radio][name=pre<N>][data-key=pre<N>][value] + span.k + span.t`; `#preBtn`, `#preScore`.
   - Screen: choices persist. The button (labelled for after the lesson) marks the right choice teal and underlined, a wrong pick in `--ng`, writes `正解` or `答え c（選んだのは a）` into `.res`, and scores 3問中 n問. Changing a choice clears the result.
   - Print: chosen circles print filled; results hidden; key upside-down in the foot.
   - Keys: `pre1`–`pre3` (`"a"|"b"|"c"`).
4. **Summary in one's own words** (summarization / self-explanation, Chi et al. 1994).
   - Why: restating the whole without the notes exposes gaps.
   - Markup: `.summary > .write.l3[data-key=sum]`. Screen: contenteditable, paste as plain text. Print: lines print empty or with the saved text. Key: `sum`.
5. **Write first, then open the model answer** (generation before feedback; worked-example comparison).
   - Why: comparing one's own attempt to a model shows the difference that matters; opening first replaces thinking with copying.
   - Markup: `.rw` (labels + `.write.l1/.l2[data-key=e<N>s|b|i]`) beside `.model#model<N>` with `.shut.no-print > button.reveal[aria-controls]`, `.ans#ans<N> > dl`, `button.hide-ans`, `.print-note > h3 + .lines`.
   - Screen: 解答例を見る opens (`.open`, `aria-expanded`), 隠す closes.
   - Print: by default the box prints as a lined "解答例と比べて気づいたこと" space; with the toolbar's 解答例も印刷 (`body.print-answers`) it prints the answers.
   - Keys: `e1s`…`e3i` (strings), `__printAns` (boolean).
6. **Commit to a next action** (implementation intentions, Gollwitzer 1999).
   - Why: naming who, when and the exact sentence makes trying it far more likely.
   - Markup: `.commit` with `input.blank[data-key=c-who|c-when]`, `.write.l2[data-key=c-line]`, ticks `k1`–`k3`. Screen and print: plain fields. Keys: `c-who`, `c-when`, `c-line`, `k1`–`k3`.
7. **One-week review of the cues alone** (spacing effect / distributed practice, Cepeda et al. 2006; retrieval practice).
   - Why: recalling after a gap, then checking, is the strongest way to keep it; the cues alone force recall.
   - Markup: `.rv#rv > .rv-item[data-q=N]` with `.cue > .cue-q[data-n=N]` (text identical to the lesson cue), `.rv-ans` with writing lines (`r<N>`, or `r2s/r2b/r2i` for a structured answer), `.rv-foot > .grade > label.opt > input[type=radio][name=g<N>][data-key=g<N>][value=o|d|x]`, `button.goto.no-print[data-goto=N]`, `span.src` (照合 p.25 QN). `.next` holds `input.blank[data-key=next-date]` and `#tally`.
   - Screen: p.25 のノートで確かめる scrolls to `#q<N>`, opens that row if the notes are covered, and flashes it; the tally reads `言えた n　あいまい n　出てこない n　もう一度：Q2・Q3`.
   - Print: buttons hidden, `照合 p.25 QN` printed in their place; grades print as circles.
   - Keys: `rv-date`, `r1`, `r2s`, `r2b`, `r2i`, `r3`, `r4`, `g1`–`g4` (`"o"|"d"|"x"`), `next-date`.

Toolbar: `.desk-bar[role=toolbar]` sits outside `.doc-stage`, so it is never zoomed and stays tappable on a phone (40px controls, wraps). The page fit uses `visualViewport.width × scale`, capped by `innerWidth`.
