# Textbook Case design system

A document-only style (`doc-a4`) for case-method training texts: an adult learner reads a short business case, commits to an answer, and only then sees the commentary. All sizes are px at the 1240×1754 page.

## 1. Thesis

The page is a case book, not a slide: the story is set like a book in serif, and every act the learner performs (answer, note, rate, discuss) is set in sans inside ink outlines. One brick-red accent marks where to look first: the case number, the question number, the losing number and the counterpart the framework picks.

## 2. Tokens

```css
:root {
  --desk-bg: #E7E3DA;
  --page-bg: #FBF9F4;
  --ink: #1E1C19;
  --sub: #5E5950;
  --rule: #CFC8BB;
  --hair: #E2DCD0;
  --accent: #8E2B1E;
  --accent-tint: #F3E4DF;
  --serif: 'Noto Serif JP', serif;
  --latin: 'EB Garamond', 'Noto Serif JP', serif;
  --sans: 'IBM Plex Sans JP', sans-serif;
  /* diagram tokens */
  --d-ink: var(--ink); --d-sub: var(--sub); --d-rule: var(--hair); --d-mid: #A79F92;
  --d-tint: #EDE8DE; --d-accent: var(--accent); --d-accent-tint: var(--accent-tint);
  --font-jp: var(--sans); --font-latin: var(--sans);
}
```

No other hue. `#A79F92` (`--d-mid`) is the only gray outside the tokens, for neutral bubbles and dashed mid-lines. Buttons on accent use `#FBF9F4` text. Pages set `print-color-adjust: exact`.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Opener title (`h1.display`) | Noto Serif JP | 700 | 84 | 1.25 | 0 |
| Case headline (`h1.title`) | Noto Serif JP | 700 | 56 (48 on the discussion page) | 1.32 | 0 |
| Deck under the opener title | Noto Serif JP | 400 | 27 | 1.6 | 0.02em |
| Kicker | EB Garamond caps + Plex 18 sub | 400 | 22 | 1 | 0.16em |
| Case prose (`.case`) | Noto Serif JP | 400 | 22, 2 columns, gap 48 | 1.8 | 0.02em |
| Question (`.qtext`) | IBM Plex Sans JP | 600 | 24 (22 for discussion topics) | 1.6 | 0.02em |
| Question numeral (`.qno`) | EB Garamond / Noto Serif JP | 400 | 40 (30 for 討議) | 1 | 0 |
| Commentary lead (`.ans-lead`) | IBM Plex Sans JP | 700 | 22 | 1.6 | 0.02em |
| Commentary points, steps | IBM Plex Sans JP | 400 | 20 | 1.55–1.6 | 0.01em |
| Framework heading | IBM Plex Sans JP | 700 | 30 | 1.45 | 0 |
| Exhibit table | IBM Plex Sans JP, tnum | 400 | 19 (head 18) | 1.4 | 0 |
| Notes, sources, labels | IBM Plex Sans JP | 400 | 17–18 | 1.5 | 0.02em |
| Running head / folio | Noto Serif JP 600 + Plex / EB Garamond lnum | | 18 / 20 | | |

## 4. Signature devices

- **Serif case, sans learning.** The narrative and exhibits come first in serif; questions, commentary and worksheets switch to sans. Job: the reader always knows whether they are reading the story or working on it.
- **Exhibits** `表1` `表2`: caption 18px 700 over a 2px ink rule, unit at right in sub; rows on hairlines; the total row bold over a 2px rule; the losing number in accent 700. A computed source line (`表1の増加分：…`) under the pair. Only on case pages.
- **Think-first box** and **covered commentary** (see Learning mechanisms). On every question.
- **Pitfall note** (`.ans-note`): accent-tint field with a red `落とし穴` lead. At most one per commentary.
- **Framework** (`.fw`): 2px ink rule, `FRAMEWORK` kicker, a sentence headline, one `d-matrix-2x2` 1048×420 with the first counterpart filled accent and its quadrant tinted. One per case.
- **Ink-headed worksheet** (`.work`): 1.5px ink box, ink header with title, minutes, save status and 消去, rows of 300px label + ruled lines (44px pitch).
- **Chapter tab**: 44×240 accent strip on the outer edge at top 220, vertical case number and short name.
- **Initial squares** (opener only): 100px squares with the person's first kanji; the protagonist filled accent, the others outlined.

## 5. Page grammar

The reference has four pages; the case sits on a spread (verso 2 + recto 3).

1. **Case opener** (recto 1). Kicker, 84px title, two-line deck, meta row, 登場人物 (protagonist and colleague, then the counterparts' voices), 会社の状況 (profile list + one waterfall of the problem number), このケースで考える問い (rows with page and minutes) and the time-plan bar.
2. **Case + first question** (verso 2). Kicker with the route `ケース → 問い → 解説 → 枠組み → 職場ワーク → 振り返り`, the hook headline, `学ぶこと` row with three numbered aims, the case in two serif columns, 表1 and 表2, then 問1 with its think-first box and covered commentary.
3. **Second question, framework, worksheet** (recto 3). 問2 with a worked calculation in the commentary, the framework, 自分の職場に当てはめる.
4. **Discussion and reflection** (verso 4). Headline stating the lesson, the group protocol box (timer, five steps, two discussion topics, a one-line group conclusion), the teaching note behind its cover, 学びの記録 (self-rating of the three aims and two ruled rows).

Deriving other pages:
- **Longer case**: continue the two serif columns on the next page with 表3; keep each question on the page where its exhibit is visible or repeat the needed number in the question.
- **More questions**: one `.qblock` each, numbered 問3…; never two questions sharing one cover.
- **Role play**: a `.work` box with two columns (相手役 / 営業役) and a ruled script row per turn.
- **Comparison of two cases**: two exhibit tables side by side (470px + 1fr) under one caption row, then a question that asks for the difference.
- **Answer key for instructors**: the teaching-note grammar (`.qblock.tn`) as a full page; label it 講師用 in the running head.

## 6. Slop signs

- [ ] A number in the case, exhibits, commentary or teaching note that does not follow from the others (recompute every total, %, per-store and per-month figure in a script).
- [ ] Minutes that do not add up: the opener's time plan, the route kicker and the discussion steps must sum to the stated totals.
- [ ] Commentary visible before the learner acts, or a cover that collapses and reflows the page.
- [ ] A question whose answer is not in the commentary, or commentary that only restates the question.
- [ ] More than one framework per case, or a framework that is not used in the worksheet.
- [ ] Accent on more than the case number, question numerals, losing number, the pick and primary buttons.
- [ ] Rounded cards, shadows or gradients inside the page.
- [ ] Placeholders (〇〇, ○○店, IMG) in examples; examples say a concrete thing.
- [ ] Real company names. The publisher and the case company are fictional and say so in the running head.
- [ ] Case prose under 22px or in one 1048px column.

## 7. Document pages

This style exists only as `doc-a4`; the frame above is the page frame.

- **Running head** at top 60, inset 96, 18px, 1px ink rule under it at 12px. Recto: publisher (serif 600) and book name left, `CASE 03` (EB Garamond accent) and the case name right. Verso: mirrored, so the case is always on the outer edge.
- **Folio** at bottom 52 on the outer edge: EB Garamond 20px numeral, then `CASE 03　<page content>` in 17px sub.
- **Chapter tab** 44×240 at top 220 on the outer edge (`.recto .tab { right: 0 }`, `.verso .tab { left: 0 }`).
- **Margins**: body box `top 132, left/right 96, bottom 112`; nothing but the tab enters the margins.
- **Cover**: the case opener is the first page and carries the full frame; a book of several cases puts a plain book cover before it.
- **Reading page**: two 500px serif columns, gap 48, about 22 字 per line.
- **Figure page**: diagrams from `references/diagrams.md` at 1048px wide, mapped to the diagram tokens above; labels in Plex, numbers tnum. The reference uses `d-matrix-2x2` (score axes 1–5, bubble area = sales) and a waterfall built as inline SVG.

## Learning mechanisms

Persistence: every saved value lives in `localStorage` under `case<NN>:<key>` (the reference uses `case03:`). Reads and writes go through a `store` wrapper that catches exceptions, so private mode or blocked storage never breaks the page; the worksheet status then says 「この端末には保存できません」. Print hides every button, clock and save status, and prints typed text transparent, so a printed copy is a blank workbook for handwriting.

1. **Think-first timer and note.**
   - What: a bar 「まず自分で考える」 with a countdown, a start/stop button and 「考えた」, over a ruled note.
   - Why: committing to an answer before feedback improves what is learned from it (pretesting / generation effect).
   - Markup: `.qblock[data-q="q1"] > .think > .think-bar > (.clock[aria-live=polite], button.js-timer[data-sec="180"], button.js-reveal)` + `textarea.ruled[data-key="q1-note"]`. The clock must sit beside its button: the script finds it through `btn.parentElement`.
   - Screen: start → 止める → 再開; at zero the clock reads 「時間です」 in accent and the button 「もう一度」. The timer never opens the commentary by itself.
   - Print: clock and buttons hidden; ruled lines remain.
   - Keys: `q1-note`, `q2-note`…; timers are not saved.
2. **Covered commentary.**
   - What: the commentary is rendered in place, with a dashed cover on top that says it is still closed.
   - Why: retrieval before feedback (testing effect) and no layout jump when it opens.
   - Markup: `.ans { position: relative } > .ans-body` (the commentary, which reserves the space) + `.ans-cover { position: absolute; inset: 0 }`; `.qblock.is-open .ans-cover { display: none }`; `button.js-hide` inside `.ans-tag`.
   - Screen: 「考えた」 opens, 「解説を閉じる」 closes; the state survives reload.
   - Print: covers hidden, so the printed copy contains the commentary.
   - Key: `<data-q>-open` = `"1"` when open, removed when closed.
3. **Worked calculation in the commentary.**
   - What: a `.calc` line that writes the arithmetic out (`500万円 × 5.2％ ＝ 年26万円 …月約2.2万円（21,667円）`) and an `ol.steps` talk order.
   - Why: worked-example effect; learners copy the procedure to their own numbers in the worksheet.
   - Markup: `p.calc` with `b` on the result; `ol.steps` (2 columns × 3 rows, numerals from a CSS counter). Static, prints as is.
4. **One framework.**
   - What: a 2×2 that places the case's counterparts on two named axes.
   - Why: abstracting a schema from the case helps transfer to new cases (analogical encoding).
   - Markup: `section.fw > #d-matrix-2x2 > svg`, data object with `items[{name, sub, x, y, v, pick}]`; redrawn after `document.fonts.ready`. Static on print.
5. **Workplace worksheet.**
   - What: 自分の職場に当てはめる, rows that mirror the framework's steps.
   - Why: transfer of training needs application to the learner's own context.
   - Markup: `section.work > .work-head (h2, span minutes, p.saved[aria-live=polite], button.js-clear)` + `.wrow > label[for] + textarea.ruled[data-key]`.
   - Screen: saves on input, status 「保存しました」; 消去 clears only that `.work` box.
   - Print: text transparent, buttons and status hidden.
   - Keys: `w1`, `w2`, `w3`.
6. **Group discussion protocol.**
   - What: a box with a 30-minute timer, five timed steps, two discussion topics and a one-line group conclusion.
   - Why: explaining and defending an answer to peers deepens understanding (peer instruction).
   - Markup: `section.disc > .disc-head (h2, .clock, button.js-timer[data-sec="1800"])`, `ol.flow > li(.on for the discussion steps)` with `.m` (number, name, minutes) and `.l`, `.topic` rows (`.qno` + `.qtext`), `textarea.ruled[data-key="group"]`. Step minutes must sum to the timer.
   - Print: timer hidden; topics and blank ruled line print.
   - Key: `group`.
7. **Teaching note behind a cover.**
   - What: 講師用の論点 with the expected answers and the numbers to check, closed by default.
   - Why: the facilitator steers the discussion without giving learners the answer first (case-method teaching note).
   - Markup: `section.qblock.tn[data-q="tn"] > .tn-bar (button.primary.js-reveal)` + the same `.ans` / `.ans-body` / `.ans-cover` contract; the cover holds `.scr` (screen text) and `.prt` (print text) lines.
   - Screen: 講師用を開く / 閉じる; the open button hides while open.
   - Print: prints as it is on screen. Closed gives a learner copy (cover with 「講師用の論点は講師版にだけ入ります」); open gives the instructor copy.
   - Key: `tn-open`.
8. **Self-rating of the aims.**
   - What: each 学ぶこと rated 1–4 (まだ / 解説を見ればできる / 一人でできる / 人に説明できる).
   - Why: judging one's own learning (metacognitive monitoring) shows what to review.
   - Markup: `fieldset.scale[data-key="conf-1"] > label > input[type=radio][name="conf-1"][value] + span`, inside a `.work` box. Radios are real inputs, so arrow keys work; focus ring on the span.
   - Screen: the checked square fills accent; saved on change; 消去 unchecks.
   - Print: checked squares print empty, like the rest of the workbook.
   - Keys: `conf-1`, `conf-2`, `conf-3`.
9. **Learning record.**
   - What: いちばんの学び（1文で）and 次に試すこと（いつ・誰に・何を）, three ruled lines each.
   - Why: a written plan with when, whom and what makes follow-through more likely (implementation intentions).
   - Markup: `.work.rec` rows like the worksheet. Keys: `r1`, `r2`.
