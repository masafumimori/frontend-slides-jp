# Learning Playbook design system

A document-only style (`doc-a4`) for 実務の手引き: a job aid that working adults (会社員・管理職) use while they do the work — a pilot, a roll-out, an application, a set-up. They read page 1 to see the whole job, then come back to one step at the moment they need it. All sizes are px at the 1240×1754 page.

## 1. Thesis

The page is a tool, not a lesson. Page 1 holds the whole procedure on one sheet (who does what, when, producing what); every later page is one step — or two short ones — in the same block: what to do, what to have ready, where people stumble and how to recover, and the finished form to copy. Six thumb-index tabs in shades of one deep blue let a reader find a step on screen or on paper, and generous space keeps a page readable at a glance between meetings.

## 2. Tokens

```css
:root {
    --paper: #FBFAF6;
    --ink: #1B1F23;
    --sub: #50575D;
    --rule: #D3CFC6;
    --tint: #F1EFE8;
    --acc: #1D5873;
    --white: #FFFFFF;
    --t1: color-mix(in srgb, var(--acc) 18%, var(--paper));
    --t2: color-mix(in srgb, var(--acc) 32%, var(--paper));
    --t3: color-mix(in srgb, var(--acc) 48%, var(--paper));
    --t4: color-mix(in srgb, var(--acc) 64%, var(--paper));
    --t5: color-mix(in srgb, var(--acc) 84%, var(--paper));
    --t6: var(--acc);
    --jp-head: "Noto Serif JP", serif;
    --jp-body: "BIZ UDPGothic", sans-serif;
    --num: "IBM Plex Sans", "BIZ UDPGothic", sans-serif;
    --desk-bg: #E4E2DC;
    --page-bg: var(--paper);
}
.t1 { --c: var(--t1); --on: var(--ink); }   /* … t4 the same */
.t5 { --c: var(--t5); --on: var(--white); }  /* t6 the same */
```

The six hex tokens are the palette (`--white` only sits under text in the templates). `--t1`…`--t6` are the step colours: one hue, lightest to darkest in step order, so the series reads as one sequence and the page keeps one accent. Text on `--t1`–`--t4` is ink, on `--t5`–`--t6` white (all ≥ 4.5:1). No other hue, no gradient.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Headline, page 1 (h1) | Noto Serif JP | 600 | 62 | 1.36 | 0 |
| Headline, step pages (h2) | Noto Serif JP | 600 | 52 | 1.4 | 0 |
| Kicker (`Week 1 · Steps 1–2`) | IBM Plex Sans | 500 | 20 | 1.4 | 0.14em caps, accent |
| Lead | BIZ UDPGothic | 400 | 26 | 1.85 | 0.02em |
| Step title | Noto Serif JP | 600 | 34 | 1.3 | 0 |
| Step meta (時期・所要・担当・成果物) | BIZ UDPGothic | 400 / 700 label | 18 | 1.85 | 0 |
| Procedure line | BIZ UDPGothic | 400 | 24 | 1.85 | 0.01em |
| 用意するもの | BIZ UDPGothic | 400 | 21 | 1.85 | 0.02em |
| つまずき (problem / 立て直し) | BIZ UDPGothic | 700 / 400 | 22 / 21 | 1.85 | 0 |
| Block label (手順, つまずきやすい点) | BIZ UDPGothic | 700 | 18 | 1.4 | 0.06em, accent |
| Section head (必ず守る3点) | BIZ UDPGothic | 700 | 24–26 | 1.4 | 0, 18px sub aside |
| Map table: title / description / cells | BIZ UDPGothic | 700 / 400 / 400 | 24 / 18 / 20 | 1.4 / 1.6 / 1.5 | 0 |
| Template body | BIZ UDPGothic | 400 | 19 | 1.85 | 0 |
| Tally table | BIZ UDPGothic + Plex tnum | 400 | 20 | 1.4 | 0 |
| Big number (result line) | IBM Plex Sans | 600 | 52, unit 26 | 1 | 0, accent |
| Tab number / label | Plex 600 / BIZ UDPGothic 700 vertical | | 24 / 19 | 1 | 0.04em |
| Running head, publisher, folio | BIZ UDPGothic 18 / 17, Plex 600 20 | | | | |

Nothing a reader must read is below 18px except the source and publisher lines (17px).

## 4. Signature devices

- **Procedure map.** A fixed-layout table on page 1, 1048 wide: number chip 48×48 in the step colour, step title (link) + one-line description, a 4-week bar (four equal week cells with 1px dividers; the bar in the step colour at its fractional position, min 3.5% wide, `role="img"` with the 時期 as label), 所要 (bold), 担当, 成果物, page (`p.02`). Columns 60 / 336 / 180 / 76 / 176 / 160 / 60. Rows about 90px. Adapted from `d-flow-v` (steps with owner and timing), turned into a table so the map holds six steps.
- **Thumb-index tabs.** `nav.tabs` at right 0, top 260, six `a.tab` 176px tall with 8px gaps: number (Plex 24) over a vertical label (19px, ≤ 5 字). Every page shows all six in the same place; tabs of the steps on this page are solid and 66px wide, the rest 48px in a 40% tint. Page 1 shows all six solid. A done step shows a check at the tab foot. The only thing in the outer margin.
- **Step block.** `article.step` with a head grid 64 / 1fr / 150: number chip 64×64, serif title + meta line, 終えた box at the right. Then 48px, a body grid 600 / 400 with 48px gutter: 手順 left; 用意するもの and つまずきやすい点 right, 64px apart. A step with a template places it below the body (`.wide`, 64px down, 720 + 280 grid: template left, its note beside it in open space); the two-column variant (template in the 400 column) is for a page that must also hold a second section.
- **Numbered imperative lines.** `ol.proc`, one action per line, ≤ 22 字 so each fits one line at 24px in 600px; a 28px outlined circle with the number.
- **つまずき with 立て直し.** A 4px accent left rule; the problem as a bold sentence; the recovery after a white-on-accent `立て直し` tag. One per step.
- **Worked template.** `.tpl`: 1.5px ink frame on white, a black title bar with the template name, an aside (`A4 1枚`, `灰色は記入例`) and a white コピー button. Body as `pre` (pre-wrap, placeholders in accent) or a ruled form table (label column in `--tint`, example values in sub grey).
- **Worked tally + result line.** A ruled table of before / during / count / fixes / saved, the saved column in accent, a bold total row; the formula as a note beside it; then a result line with the big number. All figures from the build script.
- **Killer items.** `必ず守る3点`: three numbered lines (ink squares with white numbers, not checkboxes) placed on the page where the risky action happens.

## 5. Page grammar

Every page: running head (no rule), tabs, publisher line and folio at the foot. Step pages start lower than page 1 (inner top 180) to leave open space above the headline.

1. **Procedure map (page 1).** Kicker, two-line headline that states the procedure as a sentence (「…は、6つの手順を4週間で進める」), lead (what, scope, how it is measured, where it is reported). 112px. Section head + the map table. 112px. この手引きの使い方: five numbered lines in two columns (how to read, how to jump, copy templates, tick done, read the killer items before the risky step, with its page). Source line at bottom 112.
2. **Step page, two short steps.** Kicker (`Week 1 · Steps 1–2`), one-line headline that says what this part achieves, 88px, step block, 112px, step block. For steps without templates.
3. **Step page with a template.** One step block with the template stacked below and its usage note beside it. Empty lower quarter is expected.
4. **Step page with killer items.** One step in the two-column variant (template in the right column), 112px, `必ず守る3点` across the full width.
5. **Step page with a worked tally.** One step, the tally table stacked below with the formula note beside it, 112px, the result line with the big number.

Deriving other pages:
- **Checklist only (チェックリスト版)**: the map table with the 所要/担当 columns replaced by a 終えた box per row; print it as the one-sheet version.
- **FAQ / トラブル対応**: つまずき blocks only, one per row, grouped under the step they belong to, each with the step's tab colour chip.
- **Template appendix (ひな形集)**: one template per half page at 1048 wide, each with the step it belongs to and a 64px gap.
- **More than six steps**: group them into six phases for the tabs; never more than six tabs.

## 6. Slop signs

- [ ] A step page without its tab solid at the same height as on every other page, or a tab pointing at the wrong page.
- [ ] Procedure lines that wrap to a second line, describe instead of instruct, or hold two actions.
- [ ] A つまずき without a concrete 立て直し.
- [ ] A template that is not complete enough to use as it is, or a copy button that copies something other than what the page shows.
- [ ] Figures on different pages that disagree (hours, counts, team size, dates): they come from one script.
- [ ] Killer items drawn as checkboxes that look clickable but are not.
- [ ] Blocks closer than 64px, sections closer than 112px, a box touching another box; density fixed by shrinking type instead of adding a page.
- [ ] Copy buttons, the toolbar or search printed; a template cut off in print.
- [ ] More than one hue; tabs in unrelated colours; gradients, rounded cards, shadows inside the page, emoji.
- [ ] A fixed control covering page content.
- [ ] A publisher or company name without 「（架空の教材）」 /「（架空）」, fictional numbers without 「（架空のデータ）」.

## 7. Document pages

This style exists only as `doc-a4`; the frame above is the page frame.

- **Running head**: top 64, inset 96, 18px sub; left: company (ink 700) + book title, right: phase and steps (`第1週　手順1–2`). No rule under it.
- **Folio**: bottom 56, right 96, Plex 600 20px, two digits. Publisher line with 「（架空の教材）」 bottom 58, left 96, 17px sub.
- **Chapter tab**: the thumb-index tabs (section 4). The step colour is the chapter colour: it fills the number chip on the step page, the map row chip and the week bar.
- **Margins**: 96 left and right; page 1 content from top 140, step pages from 180; content ends by 1640 at the latest; source line in its own slot at bottom 112.
- **Cover**: the procedure map is the first page; a book cover, when asked for, is the map's header with the six steps as a large numbered list in the tab shades.
- **Reading page**: the step page. Procedure lines in the 600px column hold about 22 字 at 24px.
- **Figure page**: the map table (1048 wide) and the tally (720 wide with a note column). A diagram from `references/diagrams.md` takes the 1048 width with a source line under it.

## Learning mechanisms

State: one array of finished step numbers in `localStorage` under `learning-playbook:` + `location.pathname`, read and written inside `try/catch`, so blocked storage only loses persistence. `#resetBtn` clears it.

1. **Procedure map.** The whole job on page 1: steps, timing, owner, output, page. Why: seeing the structure first gives each later step a place (advance organizer, Ausubel) and is the core of a job aid (job aids / performance support, Rossett & Schafer). Markup: `table.ov` rows `tr[data-step="n"]`, title `a.ov-ttl[href="#step-n"]`, bar `span.wk-bar.tn[role=img][aria-label]`, done mark `span.ov-check`. Screen: links jump to the step; a finished step greys its title and shows a check. Print: the table prints with current checks. Persistence: reads the done array.
2. **Thumb-index tabs.** Six tabs at the outer edge, the current steps solid. Why: a reader returning mid-task must find the step in one move (performance support: information at the moment of need). Markup: `nav.tabs > a.tab.tn[href="#step-n"][data-step="n"]` with `.tab-no`, `.tab-l`, `.tab-done`; `.is-here` on the steps of the page; `.is-done` set by script. Screen: click scrolls to the step and flashes it. Print: tabs print bleeding off the right edge (`print-color-adjust: exact`). Persistence: shows the done array.
3. **Checklist steps with a pause point.** Four imperative lines per step and a 終えた box at its head. Why: short read-do lists with a pause point at the end of each step prevent skipped actions (checklists, Gawande). Markup: `ol.proc > li`; `label.done > input[type=checkbox][data-step="n"] + span.done-box + span.done-l`. Screen: ticking updates the tabs, the map and `#prog` (`終えた手順 n/6`). Print: the box prints (ticked or empty) for ticking on paper. Persistence: the done array.
4. **つまずき and 立て直し.** One likely error per step with how to recover. Why: naming errors and their recovery in advance makes people handle them instead of stopping (error management training, Keith & Frese 2008). Markup: `p.lbl` + `div.trip > p.q + p.fix > b`(立て直し). Screen and print: the same. Persistence: none.
5. **Worked templates with copy.** The finished artefact of the step (prompt, record sheet, report) to copy and fill. Why: a complete example of the output lowers load and shows the standard (worked-example effect, Sweller). Markup: `div.tpl#tpl-x[data-copy="text|sheet"] > .tpl-h > h4 + button.copy` and `pre.tpl-b` (text) or `table.sheet` (sheet: copies the `th` labels as one tab-separated row for a spreadsheet). Screen: `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`, then to selecting the text; the button reads コピーしました for 2.2 s. Print: buttons hidden, templates print in full (no clipping, no scroll). Persistence: none.
6. **Quick-jump search.** A search box in the toolbar (outside `.page`, in the document flow, never fixed) that filters steps and templates. Why: lookup while working is search, not reading (performance support). Markup: `input#q[role=combobox]` + `ul#qres[role=listbox]` of `button[role=option]`; the index (`INDEX` in the script, from the build) holds kind, id, step, title, page and keywords, and the target's own text is added at load. Screen: focus shows all entries; typing filters (all terms must match, NFKC, case-folded); ↑↓ select, Enter jumps, Esc clears; `/` focuses the box. Print: the toolbar is hidden. Persistence: none.
7. **Killer items.** `必ず守る3点` on the page of the risky action, referenced from page 1. Why: a few critical checks confirmed every time (DO-CONFIRM, Gawande). Markup: `section.must-sec > ul.must > li`. Screen and print: the same. Persistence: none.

## Series facts

A book in this style is one of a series (here with the decision guide and the overview that share the fictional company, the approved task and the meeting date). Keep every fact and figure in the build script, never typed into the page:

- Constants at the top of `build.py`: company, team, team size, the approved task, the dates, and the series figures shared with the other books (here 30 minutes saved per person per week, from the decision guide's estimate).
- The step table (`STEPS`: number, tab label, title, timing, duration, owner, output, bar start/end in weeks, page) generates the tabs, the procedure map, the step heads and the search index; moving a step to another page is one edit.
- The fictional data (`TASKS`: before, during, count, fixes) is computed once (saved minutes, percentages, totals, hours) and injected into the tally, its note and the result line; an `assert` checks it against the series figure, so a change that breaks agreement stops the build.
- The page is a template with `@@TOKENS@@`; the build fails if any token is left unfilled.
