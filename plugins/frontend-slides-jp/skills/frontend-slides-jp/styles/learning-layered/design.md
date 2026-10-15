# Learning Layered design system

A document-only style (`doc-a4`) for study books read by working adults (社会人・管理職): a short session gets the whole picture and one conclusion; detail opens only where the reader needs it, and the same book works later as a reference while working. All sizes are px at the 1240×1754 page.

## 1. Thesis

The page shows the whole before the parts and the conclusion before the reasons. The book opens with a map of every topic, each node already carrying its own 30-second conclusion. Every topic then reads in three depths (30秒 / 3分 / 深掘り) that the reader can fold or open with one switch, and the margin of every topic page shows the map again with "you are here" in the one accent. Calm editorial ground: serif headlines, a warm off-white page, generous white space, no boxes where a heading and space will do.

## 2. Tokens

```css
:root {
    --ink: #1D1F22;
    --sub: #575B60;
    --mute: #8B8E91;
    --rule: #D8D3C8;
    --paper: #FBFAF6;
    --tint: #F2EFE7;
    --acc: #B2381F;
    --acc-tint: color-mix(in srgb, var(--acc) 9%, var(--paper));
    --acc-line: color-mix(in srgb, var(--acc) 45%, var(--paper));
    --jp-head: "Noto Serif JP", serif;
    --jp-body: "BIZ UDPGothic", sans-serif;
    --num: "Schibsted Grotesk", sans-serif;
    --desk-bg: #E3E0D8;
    --page-bg: var(--paper);
}
```

`style.json` lists six of these as the palette (`--mute` is a neutral for nodes not in this volume). `--acc-tint` fills the current map node's row, the cross-cutting band and the "first try" zone in charts; `--acc-line` draws the branches from the band. No second hue. Emphasis uses three methods only: the accent, weight and size.

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Map page headline | Noto Serif JP | 700 | 58 | 1.38 | 0 |
| Topic headline (30-second conclusion) | Noto Serif JP | 700 | 54 | 1.38 | 0 |
| Restated conclusion (continuation page) | Noto Serif JP | 700 | 34 | 1.5 | 0, `--sub` |
| Kicker (MAP) / question line (問い …) | BIZ UDPGothic / Schibsted | 700 | 19–20 | 1.4 | 0 (Latin 0.16em), accent |
| Lead | BIZ UDPGothic | 400 | 26 | 1.85 | 0.02em |
| Band label (30秒, 3分) / 深掘り | Schibsted Grotesk / BIZ UDPGothic | 700 | 24 / 22 | 1.4 | 0, with `.dots` |
| Band subtitle and teaser | BIZ UDPGothic | 700 / 400 | 18 | 1.4 | 0, `--sub` |
| Column head (3分) | Noto Serif JP | 700 | 26 | 1.4 | 0 |
| Body (3分 columns) | BIZ UDPGothic | 400 | 23 | 1.85 | 0.02em |
| Deep-dive notes (深掘り) | BIZ UDPGothic | 400 | 18 | 1.8 | 0.02em, heading 19/700 |
| Figure caption | BIZ UDPGothic | 400 | 19 | 1.65 | 0.02em |
| Source line, foot note | BIZ UDPGothic | 400 | 17 | 1.6 | 0.02em, `--sub` |
| Map node name / one-liner | Noto Serif JP 700 / BIZ UDPGothic 400 | | 30 / 21 | 1.3 / 1.6 | 0 |
| Mini-map node | BIZ UDPGothic 700, number Schibsted | | 17 (page ref 15) | 1.3 | 0 |
| KPI number + unit | Schibsted Grotesk 700 / BIZ UDPGothic 700 | | 56 / 20 | 1.1 | 0 |
| Running head, folio | BIZ UDPGothic 18 / Schibsted 600 20 | | | | 0.04em on the folio |

Nothing a reader must read is below 17px; body never below 23px. The deep-dive band is the only body text set small, and it is set small on screen and in print alike, so opening it never reflows the page.

## 4. Signature devices

- **Whole-topic map** (`.bigmap`, page 1 only). After `d-flow-v`: the main line of decisions as rows (`.mrow`, 116px high, 24px apart, x 216–938): a 56px number field, the node name in serif 30px, its 30-second conclusion in one or two lines, and its page range at the right. The current page's node is accent; nodes in this volume are solid ink; nodes not in it are dashed `--mute` with 「本デモ未収録」 (or 続刊). A topic that applies to every later step is not a row but a tall band (`.mband`, x 966–1144) beside those rows, joined to each by a short `--acc-line` branch. A feedback path is a dashed accent loop on the left with a vertical label. Connectors are one SVG; node positions come from the grid, not hand-placed.
- **Depth bands.** `.band[data-level="1|2|3"]`, each opened by `.band-h`: a 2px ink top rule, the depth mark `.dots` (one to three 11px accent squares), the label and its subtitle (結論と図 / 理由と手順 / 例外・条件・出典). Bands are 112px apart. The same mark and label appear on page 1's reading guide, in the toolbar and on every band, so the reader always knows how deep a passage is.
- **Folded band.** A folded band keeps its header and shows `.teaser` (the column heads it holds, joined by ／) and an expander `.exp` (開く ＋ / 閉じる −) at the right. The header never moves when the band opens.
- **Question line and conclusion headline.** Each topic starts with `問い　<the question the reader brings>` in the accent, then the answer as the headline. On the continuation page the same question line carries `p.<n>の結論`, and the headline is restated in 34px `--sub`, so a reader who jumps straight to the detail still has the frame.
- **Mini-map rail** (`.rail`, x 96–266, top 140, topic pages only). The page-1 map in miniature: nodes 124×72 with the number field and page ref, the cross-cutting band as a 34px vertical strip beside them, an ink spine through the nodes. The current chapter's node is filled with the accent on both of its pages. The rail holds nothing else.
- **Figures that carry the decision.** One large figure per 30-second page, at the main width (844–848px) and 560px high: a priority matrix after `d-matrix-2x2` with the first pick filled in the accent and the "first try" zone tinted; a flow after `d-flow-h` with the rules as accent-outlined gates under the steps; a KPI line (number 56px, a bar of the share, the rate). Every figure is followed by a caption that states what to read from it and a source line marked 「（架空のデータ）」 when the numbers are fictional.
- **Next-page pointer.** At the end of a 30-second page, `→ 理由と手順、例外と出典は次の頁（p.n）` in 18px `--sub` (screen only).
- **Chapter tab.** Ink strip 42×230 at the right edge, stepped by chapter like a binder index (top 150 / 400 / 650 …), chapter number upright and the name vertical in 18px paper-colored text.

## 5. Page grammar

Every page: running head with a hairline under it, chapter tab, foot note line and folio. Topic pages add the mini-map rail and set their content in the main column x 300–1144.

1. **Map page (p.1).** Kicker `MAP この冊子の地図`, a two-line headline that states the whole book's line as one sentence, a two-line lead, the whole-topic map, then **この冊子の読み方** 112px below it: three depth items in one row (mark, label, when to read it) and one line on how the switch and print behave.
2. **30-second page.** Band 1 only: header, question line, conclusion headline (two lines broken by hand), 72px of space, one large figure, caption, source, next-page pointer. The lower quarter stays empty on purpose.
3. **Continuation page.** Question line with `p.n の結論`, the restated conclusion, then band 2 (two columns 394px wide with a 56px gutter, a serif head and one paragraph each) and band 3 (two columns of short bulleted notes: 例外と条件 / 出典と注), 112px apart.
4. **A topic is always two pages** (30-second page + continuation). The map's page range for the node is `p.n–n+1`; the continuation keeps the chapter tab and running head of its topic.

Deriving other pages:
- **Contents for a longer book**: the map grammar itself is the contents; past six nodes, split the map into two pages by part, each with its own map.
- **Case or story**: a 30-second page whose figure is a short timeline or before/after (`d-compare-2`), and a continuation whose 3-minute columns are 状況 / 打った手.
- **Checklist before a decision**: band 2 as a numbered list of questions in one column; band 3 for the exceptions.
- **Glossary / sources appendix**: band 3 grammar at full main width, no bands above it, mini-map showing the appendix node.

## 6. Slop signs

- [ ] A topic page without the mini-map, or the mini-map not marking the current node on both pages of a topic.
- [ ] A map node with no conclusion line, a page range that does not match the folios, or a node that links to a missing page.
- [ ] A band without its depth mark and label, or depth marks that differ between the map page, the toolbar and the bands.
- [ ] A headline that names a topic instead of stating the conclusion; a continuation page that does not restate it.
- [ ] Content that only fits when the deep band is folded: lay every page out with all bands open, then fold.
- [ ] The depth switch or anything else fixed over a page; buttons printed; a folded band missing from print.
- [ ] Company numbers typed by hand in more than one place, or disagreeing between pages (see Series facts).
- [ ] Facts from a public document quoted with numbers, or a source you cannot name exactly.
- [ ] Boxes touching, boxed backgrounds where a heading would do, extra rules, gradients, emoji, rounded cards.
- [ ] Body below 23px, notes below 17px, blocks closer than 64px inside a band or bands closer than 112px.
- [ ] A publisher without 「（架空の教材）」 or a fictional company without 「（架空）」.

## 7. Document pages

This style exists only as `doc-a4`; the frame above is the page frame.

- **Running head**: top 60, inset 96, 18px BIZ UDPGothic: the publisher with 「（架空の教材）」 left in `--sub`, chapter number (accent, Schibsted 19px) and name (ink 700) right, a 1px `--rule` hairline 14px under it.
- **Folio**: bottom 56, right 96, Schibsted 600 20px. The foot note line sits at bottom 54 from x 96 to 1040, 17px `--sub`, one line.
- **Chapter tab**: right edge, 42×230, ink, stepped down by chapter (00 at top 150, 02 at 400, 03 at 650, then +250).
- **Margins**: 96 left and right; content from top 140; the topic pages' rail x 96–266 and main column x 300–1144 (844px); content ends by about 1600 with every band open.
- **Cover**: the map page is the first page. A separate cover, when asked for, is the map page's headline and lead with the map reduced to node names and pages.
- **Reading page**: the continuation page. Body 23px in 394px columns holds about 17 字 per line; keep paragraphs to five lines or fewer per column.
- **Figure page**: the 30-second page; the figure takes the main width at about 560px high, with caption and source under it.

## Learning mechanisms

State is one value in `localStorage` under `learning-layered:depth` (`"1"`, `"2"`, `"3"`), read and written inside `try/catch`, so private mode or blocked storage still switches depth without saving. Folded or opened single bands are not saved. Default depth is `"2"` (3分まで).

1. **Whole-topic map first.** Page 1 shows every decision of the book and how they connect, each with its one-line conclusion and page. Why: a higher-level frame given before the detail gives every later page a place to attach to (advance organizer, Ausubel). Markup: `.bigmap > svg.mlinks` + `.mgrid` holding `a.mrow[data-goto="p<n>"]` (or `div.mrow.is-here` / `.is-missing`) with `.mno`, `.mname`, `.mline`, `.pg`, and `a.mband[data-goto]` for the cross-cutting topic. Screen: rows in this volume are links that scroll to their page. Print: the map prints as drawn; links have no visible marker. Persistence: none.
2. **Three depths with one switch.** Each topic is split into 30秒 / 3分 / 深掘り; the reader chooses how deep to go for the whole book at once and can open single bands. Why: showing the essential first and the rest on request keeps a short session on the main line and lets detail come in only when needed (progressive disclosure, Nielsen). Markup: `section.band[data-level="1|2|3"]` with `header.band-h` (`.dots`, `.band-lb`, `.band-sub`, `.teaser`, `button.exp[aria-expanded]` with `.exp-t`) and `.band-body`; the switch is `button[data-depth="1|2|3"]` with `aria-pressed` in `.doc-toolbar` outside the `.doc-stage`; `body[data-depth]` holds the state. Screen: a band is open when its level ≤ depth, or it has `.open`; `.shut` folds a band the depth would show; changing depth clears both. The toolbar is in the document flow above page 1, never fixed. Print: every band prints open (`.band-body { display: grid !important }`), teasers, expanders and the toolbar are hidden, and page 1's reading guide prints its print line instead of the screen line. Persistence: `learning-layered:depth`.
3. **Same marks for the same depth.** Every band, the toolbar and the reading guide use the same one-to-three accent squares and the same labels; the question line and the conclusion headline sit in the same place on every topic. Why: consistent cues for structure tell the reader how deep and what kind a passage is before reading it, cutting search (signaling principle, Mayer). Markup: `b.dots > i × level`, `.q`, `.hl`, `.recall`. Screen and print: identical. Persistence: none.
4. **Mini-map "you are here".** The page-1 map in miniature in the margin of every topic page, the current chapter in the accent; every node jumps to its page. Why: seeing one's position in the whole keeps the frame active while reading the detail and makes the book usable for lookup (advance organizer, kept in view; navigation aids against disorientation). Markup: `nav.mini > .mm` holding `button.mm-node[data-goto="p<n>"]` (`.is-cur` on the current chapter, `span.mm-node.is-missing` for nodes not in the volume) and `button.mm-band[data-goto]`; `section.page[data-node]` names the chapter. Screen: click scrolls the target `.page` to the top (`behavior: auto` under reduced motion). Print: the mini-map prints as a static position marker. Persistence: none.
5. **Conclusion restated before the detail.** The continuation page repeats the question and the conclusion (`p.n の結論`) above the 3-minute and deep bands. Why: a reader who returns to look something up meets the frame before the detail (advance organizer at the point of use; signaling). Markup: `.recall > p.q > span.q-k` + `h2.recall-h`. Screen and print: identical. Persistence: none.

## Series facts

A book in this style keeps every company figure in one script, and the pages print what it computes, so no number is typed twice.

- One `facts.py` holds the fictional company (name with 「（架空）」, publisher with 「（架空の教材）」, the decision and its date), the candidate tasks with their inputs (users, minutes saved per week, the three yes/no risk questions), thresholds, and any trial or check results (documents made, corrected, factual errors).
- Derived values are computed there: annual hours = users × minutes ÷ 60 × working weeks; risk score = number of 「はい」; eligibility = risk ≤ threshold and hours ≥ threshold; the first pick = the largest eligible; rates = corrected ÷ made, rounded once with one function. `assert` lines pin facts other books in the series state (for example the first approved use and its hours), so a changed input fails the build instead of disagreeing silently.
- `build.py` imports `facts.py` and fills the map lines, figure coordinates, captions, KPI numbers and notes from it; chart geometry (points, zones, bar widths) comes from the same values.
- When several books share a company, one of them is the master; the others copy its inputs and formula and add only facts the master does not have, marked as their own in a comment.
- Public sources are cited by exact title and date only when certain (for example 総務省・経済産業省「AI事業者ガイドライン（第1.0版）」（2024年4月）), without quoting numbers from them; the book's own frameworks are labelled as the book's, not the source's.
