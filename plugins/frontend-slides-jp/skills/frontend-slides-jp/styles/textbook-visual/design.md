# Textbook Visual design system

A document-only style (`doc-a4`) for textbooks and study materials. All sizes are px at the 1240×1754 page.

## 1. Thesis

One page, one theme, understood through one figure. The upper half is a large figure with numbered markers; the lower half explains the same numbers in short rows. Touching a number lights the marker, the row and the part of the figure together, so the learner never has to search between picture and text. Every lesson page ends in a summary and a quiz the learner answers before seeing the answer.

## 2. Tokens

```css
:root {
    --paper: #FFFDF7;
    --ink: #1E2A32;
    --mute: #56636B;
    --rule: #CDD3D2;
    --green: #22785B;          /* 生物の章色 */
    --green-tint: #E3F1EA;
    --red: #C23A2E;            /* 動脈血：酸素が多い */
    --red-tint: #F8DCD6;
    --blue: #2C55A0;           /* 静脈血：酸素が少ない */
    --blue-tint: #DCE5F5;
    --muscle: #EFD0C5;
    --muscle-line: #A86A5C;
    --marker: #F6CF3F;         /* 蛍光ペン */
    --jp-head: "Noto Sans JP", sans-serif;
    --jp-body: "Zen Maru Gothic", "Noto Sans JP", sans-serif;
    --num: "Jost", "Noto Sans JP", sans-serif;
    --desk-bg: #E4E1D8;
    --page-bg: var(--paper);
}
```

- `--green` is the chapter color. A textbook with several fields gives each field its own chapter color (生物 green, 化学 e.g. #2C6E9E, 物理 e.g. #B5562A, 地学 e.g. #6B5BA6) and swaps only `--green` and `--green-tint`.
- `--red` / `--blue` are meaning colors for the subject (here 動脈血 / 静脈血). For another subject, rename them to the pair the content needs (酸性 / アルカリ性, 暖流 / 寒流). Never use them as decoration. Every colored thing also carries a text label, so the page works in grayscale and for color-blind readers.
- `--muscle`, `--muscle-line` are figure materials. Add material colors per subject (`#FBF1C9` for blood plasma here), but keep them pale so the markers and the trace stay on top.
- `--marker` appears only in the trace.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Unit title (opener) | Noto Sans JP | 800 | 80 | 1.2 | 0 |
| Unit number (opener) | Jost | 700 | 104, white in a 132px green square | 1 | 0 |
| Headline (h1) | Noto Sans JP | 800 | 50 | 1.36 | 0, two lines, a full sentence |
| Kicker | Noto Sans JP | 700 | 22, green; lesson pill Jost 22 white on green | 1.4 | 0 |
| Goal box items | Zen Maru Gothic | 500 | 22 | 1.55 | 0.01em |
| Figure labels | Noto Sans JP / Zen Maru Gothic | 700 / 500 | 23–24 / 19 | | |
| Row heading | Noto Sans JP | 700 | 22 | 1.5 | 0, nowrap |
| Row text, body | Zen Maru Gothic | 500 | 22 | 1.5–1.65 | 0.01em |
| Box heading (まとめ, 確認問題) | Noto Sans JP | 800 | 24 | 1.4 | 0 |
| Marker and row numbers | Jost | 700 | 24 in a 42px circle / 22 in a 38px circle | 1 | 0 |
| Caption, hints | Zen Maru Gothic | 500 | 18 | 1.4 | 0 |
| Running head, folio | Zen Maru Gothic 500 / Jost 600 | | 19 / 20 | | |

Zen Maru Gothic is body-only: headings stay in Noto Sans JP so `palt` tightens them.

## 4. Signature devices

- **Numbered figure** (the signature). A full-width SVG (1048px, 420–560px tall) with white numbered marker circles (r 21, 2.5px ink stroke) placed beside the part they name, never on top of a label. Lit: green fill, white number, r 25.
- **Numbered rows**. A list under the figure, 2px ink rule on top, 1px `--rule` between rows, min-height 52: number circle, bold 「A → B」 heading, one-sentence explanation. Lit: green tint, green number, a 6px green bar outside the left edge.
- **Marker-pen trace**. A 13px dotted yellow stroke drawn along the path the number names, moving in the direction of flow. Hidden until lit.
- **Step button** 「①から順に」. Pill at the right of the caption; each press lights the next number, then 「はじめにもどる」.
- **Goal box** 「このページで分かること」: 400px, 2px green outline, three check-square items. The opener uses 「小学6年で学んだこと」 in a gray outline instead; the test page uses 「このページでできること」.
- **よくある間違い**. Red label column 128px, a crossed-out wrong belief, then a two-column dl that separates the confused terms.
- **Band: まとめ + 確認問題** at bottom 120. Green-tint summary 430px with three dot items; quiz with three questions, each with a dashed 「答えを見る」 cell 250×44 and a 「できた」 check.
- **Foot answer slot** at bottom 54 on the side opposite the folio: a screen hint, and in print the page's answers upside down.
- **Page frame**: running head, side chapter tab, folio (see section 7).

## 5. Page grammar

The reference has four pages of one unit (中学2年 理科「4 血液の循環」, fictional みどり理科):

1. **Unit opener** (p.45). Unit number square and title, prior-knowledge box, 「単元の問い」 box with a saved note field, 学ぶことの地図 figure with one marker per lesson, rows that list lesson, one line and page (the last row, まとめ・確認テスト, is a static row with a dashed ✓), 「この教材の使い方」 box.
2. **Lesson page, structure** (p.46). Head, figure 1048×560 with six markers, six rows, band.
3. **Lesson page, process** (p.47). Head, figure 1048×520 with four markers, four rows with a group tag (肺 / 体), よくある間違い box, band.
4. **Unit test** (p.50). Head, 大問1 figure without names (markers A–D) and rows whose answer cells sit inside the row, 大問2 and 大問3 in two columns, 「単元の問いにもどろう」 box that shows the opener's note beside a long revealable model answer.

Deriving other pages:
- **Experiment page**: figure of the apparatus with markers for each part; rows become numbered procedure steps (操作 → 結果); replace よくある間違い with 「安全のために」 in the same box grammar, colored `--red`.
- **Comparison page** (e.g. 植物の細胞 と 動物の細胞): two figures side by side 509px each sharing one number sequence; rows get a group tag per side.
- **Table page**: rows are already a table; add a header row with the same 2px ink rule. Keep at most 7 rows per page.
- **Answer page**: the unit test layout with every `.ans` open, the `.ans-btn` removed and a one-line 「考え方」 under each answer in `--mute` 19px.
- **Glossary / 用語のまとめ**: rows without a figure, heading column 300px, grouped under small green headings.

## 6. Slop signs

- [ ] A marker without a matching row, a row without a marker, or a number that lights a different part than the row names.
- [ ] A trace that runs against the direction of flow, or one hidden under an opaque shape.
- [ ] Red/blue or any color carrying meaning with no text label.
- [ ] A headline that names a topic (「心臓のつくり」) instead of a sentence that states what to understand.
- [ ] More than seven numbers on one figure, or rows that wrap to two lines.
- [ ] A fact, answer or calculation not checked. Compute numbers in a script; keep content at the learner's grade.
- [ ] Answers visible on screen before the learner taps, or visible in print outside the upside-down foot slot.
- [ ] A test page that prints its answer next to its question, or figure labels on a figure whose names are the question.
- [ ] Interactive controls (step button, 答えを見る, tally) printing.
- [ ] Body under 22px, or text shrunk to fit.
- [ ] Rounded cards and shadows used as decoration. Boxes exist only for goals, mistakes, summaries and questions.

## 7. Document pages

- **Running head**: top 64, inset 96, 19px mute, 2px green rule under it at about top 108. Left page: publisher and grade (green bold) on the left, unit on the right. Right page: chapter on the left, section (green bold) on the right.
- **Folio**: bottom 56 at the outer edge, Jost 600 20px with a 14px green square on the inside. Left pages even, right pages odd.
- **Chapter tab**: 52×330 green strip at top 240 on the outer edge, vertical 「生物」 with the unit number in a white circle. Same on every page, opener included.
- **Margins**: 96 left and right; head at top 140 (kicker), figure from about top 330, band ending at bottom 120.
- **Cover**: the unit opener is the cover of a unit. For a whole book, keep the opener grammar: the book title in place of the unit title, the 学ぶことの地図 showing the units, no note field.
- **Reading page**: textbooks rarely have running prose. When a lesson needs it, put two 500px columns of 22px Zen Maru Gothic between the rows and the band, at most 8 lines per column; otherwise cut the text into rows.
- **Figure page**: every lesson page is a figure page. Diagrams from `references/diagrams.md` fit the 1048px figure slot when the content is a chart or flow, not a drawing: map `--d-accent` to `--green`, `--d-accent-tint` to `--green-tint`, labels to Noto Sans JP, numbers to Jost, and add numbered markers by hand.

## Learning mechanisms

Each mechanism needs only the markup below and the script block in `reference-a4.html`. Keys follow `<page id>-<n>`: `data-fig="p1"` on `.page`, then `data-key="p1-1"`, `p1-2`… on the matching marker, trace and row. The page id must be unique per page.

1. **Number link (figure ⇄ rows).**
   - Why: putting words next to the part they describe removes searching between picture and text (split-attention effect; spatial contiguity principle, Mayer).
   - Markup: `<section class="page" data-fig="p1">`; in the SVG `<g class="mk" data-key="p1-3" tabindex="0" role="button" aria-label="3 …"><circle …/><text …>3</text></g>`; rows `<ol class="segs"><li class="seg" data-key="p1-3" tabindex="0"><span class="no">3</span><b>…</b><span class="t">…</span></li>`. A row with no `data-key` (class `seg static`) is skipped.
   - Screen: hover or focus lights every `.mk`, `.seg` and `.trace` with that key on the page; tap or Enter pins it, a second tap unpins. Clicks on `.ans` or `.done` inside a row do not pin.
   - Print: all lit states are reset to the plain look.
   - Persistence: none.
2. **Marker-pen trace.**
   - Why: a moving cue points at the exact path and direction (signaling principle).
   - Markup: `<path class="trace" data-key="p1-3" d="…"/>` drawn after the figure shapes and before the markers, following the flow direction.
   - Screen: opacity 0 → 1 with a dotted dash animation; reduced motion stops the animation.
   - Print: hidden.
   - Persistence: none.
3. **Step-through button.**
   - Why: learner-paced segments keep a long sequence manageable (segmenting principle).
   - Markup: `<button class="stepbtn screen-only" type="button">①から順に</button>` inside the figure caption. Order follows the rows. The label uses ①… for digits and the row's own label (A, B…) otherwise.
   - Screen: each press pins the next key, then shows 「はじめにもどる」.
   - Print: hidden.
   - Persistence: none.
4. **Unit question and prediction note.**
   - Why: writing an answer before the lesson primes what to look for, and the map gives the whole before the parts (pretesting / prediction effect; advance organizer, Ausubel).
   - Markup: `<textarea class="note" data-store-text="u4-idea">` on the opener; `<div class="echo empty" data-echo="u4-idea">placeholder</div>` on the test page. Same name on both.
   - Screen: typing saves at once and updates every echo.
   - Print: the ruled lines print with whatever was written; the placeholder does not print.
   - Persistence: stored as `text:<name>` in the document key.
5. **Tap-to-reveal answers.**
   - Why: answering from memory before seeing the answer strengthens recall (retrieval practice / testing effect, Roediger & Karpicke).
   - Markup: `<div class="ans"><button class="ans-btn" type="button" aria-expanded="false">答えを見る</button><span class="ans-text">右心房</span><span class="ans-blank">答え</span></div>`. Add `long` to the `.ans` for a multi-line model answer.
   - Screen: the button hides the answer; tapping it reveals, tapping the answer hides it again.
   - Print: buttons and answers are hidden, `.ans-blank` prints a write-in line (ruled lines for `long`), and `.foot-ans .print-only` prints the page's answers upside down at the foot.
   - Persistence: none, so each visit starts as a fresh test.
6. **「できた」 check and tally.**
   - Why: marking what one could answer makes learners judge their own knowledge and choose what to review (metacognitive monitoring, judgments of learning).
   - Markup: `<label class="done"><input type="checkbox" data-store="p50-a">できた</label>`; optional `<span class="tally screen-only" data-tally>できた <b>0</b> / 8</span>`, which counts the checks on its own page.
   - Screen: checks and the count update at once.
   - Print: the checkbox prints as an empty box to tick by hand; the tally is hidden.
   - Persistence: `saved[data-store] = true|false`.
7. **よくある間違い (refutation box).**
   - Why: stating the misconception and then refuting it changes beliefs better than giving only the correct fact (refutation text).
   - Markup: `.miss` with `.mh` label, `.wrong` with the wrong belief in `<s>`, and a `dl` that defines the confused terms side by side.
   - Screen and print: static.
   - Persistence: none.
8. **Unit test (cumulative retrieval).**
   - Why: mixing questions from every lesson of the unit, including a figure without labels and a calculation, makes the learner choose the idea themselves (interleaving).
   - Markup: rows `.segs.qa` with an `.ans` and `.done` inside each `.seg`; figure markers use letters; the figure carries no names that are answers.
   - Screen: number link, reveal and checks together. Print: blanks plus the upside-down foot.

**Storage key.** One `localStorage` key per document: `tbv-<publisher>-<grade>-<unit>-v<n>` (the reference uses `tbv-midori2-u4-circulation-v1`), holding one JSON object of check flags and `text:` notes. Bump `v<n>` when question ids change. Reading and writing are wrapped in try/catch so a private window still works without saving.

**Mobile fit.** The fit uses the visual viewport: `Math.min(innerWidth, visualViewport.width * visualViewport.scale)`, because mobile Chrome first widens the layout viewport to the 1240px column, which left the zoom near 0.97 and made taps miss.
