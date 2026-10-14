# Diagram library

50 diagram and chart patterns for Japanese business slides, one 1920×1080 slide each, in [diagrams.html](diagrams.html). Open `diagrams.html#d-<id>` to see one; arrow keys step through all of them.

Read this file down to the end of "Slop signs" first. Below that, read only the entries of the patterns you are considering; the full catalogue is long.

A pattern supplies the structure: which relationship it shows, how the parts are laid out, and the function that turns data into marks. The chosen style supplies the appearance. Where the style's `design.md` and a pattern disagree (labels on every value or only some, gridline count, boxes or rules, centred or left-aligned text, line weights, which colors exist), the style wins.

## Does this slide need a diagram?

Decide per slide, from its conclusion headline:

- **The point is a relationship between two or more things, or a set of numbers:** use a diagram or chart. Name the relationship, then pick from the table below.
- **The point is one claim, one number or one quote:** use the style's statement, KPI or quote slide. A diagram around a single fact is decoration.
- **The point is a list of items with no order, rank or overlap:** use a list, or `d-parallel-3` for exactly three peers with one metric each.

Across the deck:

- One diagram per slide. When a slide needs two, it holds two findings: split it.
- Neighbouring slides use different patterns, unless they compare the same thing (then keep the same pattern, size and position).
- Speaker-led decks use fewer, simpler patterns with fewer items: prefer `d-parallel-3`, `d-before-after`, `d-bar`, `d-flow-h`, `d-kpi-cards`. Reading-first decks may use the dense ones (`d-logic-tree`, `d-priority-table`, `d-swimlane`, `d-mekko`).
- When the style's `design.md` defines its own slide for the relationship (a timeline, a comparison, a matrix), use the style's slide, and borrow the pattern's data logic only if the style's slide lacks it.

When the content does not fill a pattern's slots, never invent the missing values:

- If the missing slot carries the comparison (per-step minutes in `d-before-after`, impacts in `d-problem-action`), choose a pattern that does not need it.
- If it is secondary (an adoption share for one plan out of three, a total across mixed units), drop that slot from the slide and, when the reader would look for it, say in the lead or source line what is not known.

## Using a pattern

1. Pick the pattern from the table below and read its entry: its Avoid line often points to a better fit.
2. Check the style's `design.md` for a device that already shows this relationship (swiss-grid's area squares for a frequency table, tategumi-editorial's vertical matrix for stages). If one exists, draw with it and keep the pattern's data logic.
3. From `diagrams.html`, copy the CSS between `/* BEGIN d-<id> */` and `/* END d-<id> */`, the `.num` rule from the shared frame, the `<section id="d-<id>">` markup, and its `<script>` if it has one.
4. Map the `--d-*` tokens onto the style's tokens in one block, for example `--d-ink: var(--ink); --d-accent: var(--brand);`, and map `--font-jp` and `--font-latin` to the style's families. On a dark style, swap `--d-paper`/`--d-ink` and lighten `--d-tint` and `--d-rule`. When the style forbids extra colors, map `--d-accent-tint` and `--d-tint` to colors the style already has (a paper shade, the accent at the style's own tint) or replace the fill with an outline.
5. Replace the frame classes (`.d-frame`, `.d-kicker`, `.d-title`, `.d-lead`, `.d-note`) with the style's headline, lead and source-line classes, and size `.d-body` to the style's content area. HTML patterns state their row and column sizes in the Adapt line; rescale those to the new body. SVG patterns read their own box.
6. Restyle the pattern in its own CSS block to the style's values: line weights, corner radii, fills, label weights, alignment and number font. For a variable Latin font, set the axes and weights the style uses, not only the family.
7. Check class names. Pattern rules are scoped under `#d-<id>`, but the style's own rules (`.lab`, `.grid`, `.num`, `.row`) still reach pattern elements inside the slide. When a style class name matches a pattern class, scope the style rule or rename the pattern class.
8. Replace the data object (charts) or the copy (diagrams) with the user's content. Keep the headline a conclusion that the diagram proves.
9. Screenshot the slide next to the style's reference slides. It should read as part of that deck, not as a pasted consulting chart. Check that connectors meet their boxes, labels clear each other, and every number in the headline appears on the slide.

Each pattern runs its script in its own scope, so several patterns can sit in one deck.

### Vertical-writing styles

Diagrams and charts stay horizontal. Set them in one horizontal block (the style's data island) beside the vertical headline and lead, and keep that block's position and size the same on every diagram slide. Only patterns whose slots are sentences (`d-stairs`, `d-flow-v`, `d-compare-2`) may be rebuilt in the style's vertical grammar. Time then runs right to left, oldest on the right, as the style's own timeline does.

## Pick by relationship

| The slide shows… | Pattern |
| --- | --- |
| Three peers on one metric | `d-parallel-3` |
| Two states compared item by item | `d-compare-2` |
| A process before and after a change, with time saved | `d-before-after` |
| Steps in order, short text each | `d-flow-h` |
| Steps in order, with deadline, sentence and owner | `d-flow-v` |
| Steps across departments, with branches and send-backs | `d-swimlane` |
| Who pays whom, and where goods and information flow | `d-business-model` |
| Who reports to whom in a project or organization | `d-org-chart` |
| A loop whose output feeds its start | `d-cycle`, `d-pdca` (one improvement cycle) |
| Tiers: fewer members, more weight | `d-pyramid` |
| A population narrowed stage by stage | `d-funnel-shape` (shape), `d-funnel` (proportional) |
| Stages that raise the level | `d-stairs` |
| A inside B inside C | `d-include` |
| The overlap of three conditions | `d-venn` |
| One center linked to many | `d-hub` |
| Options placed on two axes | `d-matrix-2x2` |
| One result split into causes, with contributions | `d-logic-tree` |
| A KGI as a formula of KPIs | `d-kpi-tree` |
| A chain of causes ending in an action | `d-cause-chain` |
| Candidate causes grouped by category | `d-fishbone` |
| Issues matched to actions and effects | `d-problem-action` |
| A recommendation and three reasons | `d-conclusion-3` |
| Internal and external factors with a sign | `d-swot` |
| Customer, competitor, company into one KSF | `d-3c` |
| Options compared on exact values | `d-priority-table`, `d-multi-compare` (one scale per criterion) |
| Options compared on supported / not supported | `d-feature-matrix` |
| Change across a few periods | `d-bar` |
| An amount and a rate over the same periods | `d-combo-bar-line` |
| Differences between prefectures | `d-tile-map-jp` |
| Size order among categories | `d-bar-rank` |
| A trend with a forecast | `d-line-forecast` |
| A long trend and a close-up of one window | `d-zoom` |
| How a start total becomes an end total | `d-waterfall`, `d-cost-actions` (with the action table) |
| Three variables at once | `d-bubble` |
| Density across two categories | `d-heatmap` |
| Composition compared across groups | `d-stacked-100` |
| Segment sizes and the shares inside them | `d-mekko` |
| Two measures moving together over time | `d-scatter-path` |
| A total and its parts over time | `d-area-stacked` |
| Where the money sits across a value chain | `d-value-chain` |
| Phases with dates and a decision gate | `d-gantt` |
| Several streams over coarse periods | `d-roadmap` |
| Events that explain a growth curve | `d-timeline` |
| Six headline metrics for one period | `d-kpi-cards` |
| Three plans that build on each other | `d-pricing-3` |
| One customer story with measured results | `d-case` |

## Rules every pattern follows

- The headline is the finding, and the diagram proves it. Every number in the headline appears on the slide.
- The accent marks one fact: the value, item or series the headline names (a series across rows counts as one fact). Everything else is ink, shades of one hue, or tint. A slide whose finding is a distribution, not one item, may carry no accent. `--d-neg` appears only where a chart needs a sign.
- Data adds up. Tree branches sum to their parent, shares sum to 100 % (or the note says rounding may differ), and bridges end at the stated total.
- Every data slide carries a source line. Invented data says so in that line, as SKILL.md describes (the library's examples use 「架空のデータ」).
- Pie charts only for 5 parts or fewer, and only to show whether one part is a majority. Otherwise use `d-stacked-100`.
- Text stays at 18px or larger, diagram labels 20–28px. Japanese lines break by hand at 文節.

## Slop signs

- A headline that names a topic (「市場環境」) instead of stating a finding.
- Accent on several elements, or on decoration instead of the value the headline is about.
- Arrows that stop short of their boxes or cross them; labels that touch borders or each other.
- A diagram type chosen for looks: a cycle for a process that ends, a pyramid for a sequence, a Venn for nested sets.
- Shapes sized for looks in a chart where size is supposed to encode a value.
- Numbers that do not add up, or a headline number that the diagram does not show.
- Rainbow palettes, gradients, shadows, 3D, emoji or icon fonts inside a diagram.

## Relation patterns · 関係図

All patterns sit in `.d-body` (1680×632 at the default frame). SVG patterns read their size from their own box and set the viewBox to it. Accent goes on one element only: the item the headline names (`.is-key` in HTML patterns, `key`/computed minimum in SVG patterns).

### d-parallel-3 · 並列3要素 (Three Parallel Items)
- Relation: three peers of the same kind, compared on the same metric.
- Use when: three measures, pillars or options, each worth a title, a 2–3 line note and one number.
- Avoid when: 4+ items (use a 2×2 like d-swot, or d-priority-table); items happen in order (d-flow-h); items overlap (d-venn).
- Slots: exactly 3 cards, each: number, title (≤ 2 lines, ≤ 8 chars per line), note (≤ 3 lines of ~14 chars), one KPI (number + unit), two fact rows (label, value). Mark one card `.is-key`.
- Adapt: drop `.facts` if there is no second-level data; keep the KPI unit at about 1/3 of the number. Never put 4 cards in this row.
- Portrait: ok at 1048×680; at 560 the fact rows run 24px over.

### d-compare-2 · 左右比較 (As-is / To-be)
- Relation: two states of the same thing, compared item by item.
- Use when: current vs target process, our product vs competitor, plan A vs plan B, with 3–5 shared comparison axes.
- Avoid when: the change is a sequence of steps with times (d-before-after); more than 2 options (d-multi-compare or d-feature-matrix).
- Slots: 2 column headers (JP name + Latin tag); 3–5 rows, each: axis label, left cell, right cell (≤ 2 lines of ~16 chars). The last row may be a KPI row (`.kpi`).
- Adapt: the right column is the accent column (`.hd.to`, `.c.to`); for a neutral A/B comparison remove the `to` classes from both. Rows stretch to text; above 5 rows drop to 20px text or split the slide.
- Portrait: ok at 1048×680 with 4 rows; the table is about 575px tall, so 560 runs 14px over and taller bodies leave blank space under it.

### d-before-after · 業務改善のBefore/After (Process Before / After)
- Relation: the same process before and after a change, step by step, with time saved.
- Use when: an improvement removes or shortens steps and the headline is the time or cost saved.
- Avoid when: the two states have no shared steps (d-compare-2); only the total matters (d-bar).
- Slots: 3–6 steps in one row per lane, each: name, minutes (or `.cut` with a ≤ 2-line "how it disappears"); a total per lane; delta text (absolute and %).
- Adapt: steps keep the same column in both lanes; a removed step stays in place as a dashed `.cut` box. For 6 steps change `repeat(5, 1fr)` to `repeat(6, 1fr)`; beyond 6 the names no longer fit at 24px. Only the delta and the AFTER total carry the accent; the AFTER boxes, label and the thick arrow stay ink/mid like BEFORE.
- Portrait: landscape only; 5 steps run 298px past the text width and 3 steps still 223px. Use d-compare-2 with one row per step and the minutes in the cells.

### d-flow-h · 横フロー (Horizontal Steps)
- Relation: a sequence of 3–6 steps with a short description and one value each.
- Use when: a process or project with short text per step, especially when one step dominates (the bottom bar shows each step's share).
- Avoid when: each step needs 2+ sentences or an owner (d-flow-v); the steps loop back (d-cycle).
- Slots: 3–6 steps, each: STEP number, name (≤ 6 chars), note (≤ 3 lines of ~9 chars), value + unit, share. The bar takes `data-days` (comma list) and `data-key` (index); `drawFlowBar` sizes segments by value.
- Adapt: change `repeat(5, 1fr)` to the step count. Delete `.bar` and `.bar-lb` when the values are not additive. The first chevron has a flat left edge.
- Portrait: ok with limits: ≤4 steps at 1048×560; 5 steps run 90px past the text width.

### d-flow-v · 縦フロー (Vertical Steps with Text)
- Relation: an ordered procedure where each step carries a deadline, a sentence or two and an owner.
- Use when: manuals, incident response, approval routes, onboarding checklists.
- Avoid when: steps are short labels (d-flow-h); stages grow in level (d-stairs).
- Slots: 3–6 rows, each: timing (≤ 6 chars), number, title (≤ 12 chars), description (≤ 2 lines of ~24 chars), owner.
- Adapt: rows share the height (`grid-auto-rows: 1fr`); with 6 rows keep descriptions to one line. Mark one row's `.when`, `.node` and `.ttl` with `.is-key`. The connector runs through the node centres; `.first`/`.last` trim it.
- Portrait: ok at 1048×680 with 5 steps; 560 runs 122px over.

### d-cycle · サイクル (Cycle)
- Relation: steps that repeat, where the output of the last feeds the first.
- Use when: PDCA-style operations, flywheels, feedback loops, with the loop's result in the centre.
- Avoid when: the process ends (d-flow-h); elements influence each other in all directions (d-hub).
- Slots: 2–6 nodes, each: name (≤ 10 chars), sub (1–2 lines of ~12 chars); centre: label, value, unit, comparison line.
- Adapt: `drawCycle(svg, data)` draws circles for 2–3 nodes and rectangles for 4+ (CONE rule), lays nodes on an ellipse, and trims each arrow to the shape edges by sampling, so arrows always meet the shapes. Sizing: reads its box (`clientWidth/Height`) and redraws after webfonts load. Rectangles are sized from the measured text plus 32px/20px padding, widened to a quarter of the box width (a fifth for 5–6 nodes); circles take the text's half-diagonal plus 12px. The ellipse fills the box and also keeps the ring inside it. If nodes would overlap, the rectangles narrow back to the text width; past that it warns `d-cycle:` in the console. 4 nodes hold up at 960×600. The centre value is the accent.
- Portrait: ok at 1048×680; at 560 the top box crowds the centre metric.

### d-pyramid · ピラミッド (Pyramid)
- Relation: a hierarchy where higher levels hold fewer members but more weight.
- Use when: customer tiers, Maslow-type levels, org layers, with 2 numbers per tier.
- Avoid when: the levels are a narrowing process over time (d-funnel-shape); levels are growth stages (d-stairs).
- Slots: 3–5 tiers, top first, each: name (≤ 6 chars), condition (≤ 12 chars), two percentages; 3 header labels; `key` = tier index to accent.
- Adapt: `drawPyramid(svg, data)` makes equal-height tiers of a single triangle (a shape, not proportional), with a leader line from each tier to its table row. Sizing: reads its box and redraws after webfonts load. The pyramid takes 45% of the width unless the table needs more; the table columns are placed from the measured name, condition and value widths (32px minimum gaps, spare space split across them). If the pyramid would fall under 160px wide it warns `d-pyramid:`. Holds up at 960×600 with 5 tiers. Rename the two value columns via `headers`. Values are rendered with a % unit; change the `'%'` tspan for other units.
- Portrait: ok at 1048×560.

### d-funnel-shape · じょうご型 (Funnel)
- Relation: a population narrowed stage by stage, with the conversion between stages.
- Use when: recruiting, sales pipeline, user activation, where the headline is the weakest stage.
- Avoid when: the stages are a hierarchy, not a sequence (d-pyramid); exact proportions matter (d-funnel).
- Slots: 3–6 stages, each: name (≤ 8 chars) and count; `unit`; `rateLabel`.
- Adapt: `drawFunnelShape(svg, data)` computes each stage-to-stage rate, accents the lowest rate and tints the stage it leads into. Band widths taper linearly (a shape, not proportional to counts). Sizing: reads its box and redraws after webfonts load. The funnel mouth is 62% of the width, less if the rate column (measured) needs room; the rate column sits midway in the space that is left. The bottom width is a third of the mouth, widened when a stage label (measured, plus 24px each side) would not fit its band; if a label is wider than the mouth it warns `d-funnel-shape:`. Band height is the box height split by the stage count; 7 stages hold up at 960×600.
- Portrait: ok at 1048×560 with 5 stages.

### d-stairs · 階段 (Stairs / Staged Growth)
- Relation: stages that build on each other and raise the level each time.
- Use when: roadmaps, maturity models, phased rollouts, with the current or next stage highlighted.
- Avoid when: the order is a procedure with owners (d-flow-v); the stages are dated tasks (d-gantt).
- Slots: 3–5 steps, each: STEP label, year, title (≤ 8 chars), description (≤ 3 lines of ~12 chars), status word.
- Adapt: heights are set per `nth-child` (44/60/76/92%); for 3 steps use 52/72/92%, for 5 steps 36/50/64/78/92% and change `repeat(4, 1fr)`. Keep the lowest step tall enough for its text (≥ 260px).
- Portrait: ok at 1048×760; at 680 STEP 1's status line runs 6px under the base.

### d-include · 包含 (Inclusion)
- Relation: A belongs to B belongs to C; inner sets inherit the outer rules.
- Use when: data classification, market definition (as nested scope with rules), org units inside a group.
- Avoid when: the sets only partly overlap (d-venn); the point is relative size (d-mekko or d-bar-rank).
- Slots: 2–4 nested levels, each: JP name + Latin tag, examples (≤ 2 lines), rule (one line, or a 2–4 item list on the innermost level); optional volume line in the innermost box.
- Adapt: nest another `.box` inside the innermost to add a level; past 4 levels the rows crowd. The innermost box carries the accent.
- Portrait: ok at 1048×760; 680 runs 64px over.

### d-venn · ベン図 (Venn / Overlap)
- Relation: three conditions and the region where all of them hold.
- Use when: choosing a target segment or a strategy as the intersection of strengths, demand and gaps.
- Avoid when: one set sits fully inside another (d-include); only two sets (d-compare-2, or adapt d-venn as described below); sets are scored, not overlapping (d-matrix-2x2).
- Slots: 3 sets, each: name (≤ 8 chars), 2-line sub (~13 chars per line); core: 2 short lines inside the overlap (≤ 5 chars each), a callout name and 2-line description.
- Adapt: `drawVenn(svg, data)` clips the accent fill to the exact triple intersection with nested clip paths, so the highlight always matches the overlap. Circles use `mix-blend-mode: multiply` on `--d-tint`, so overlaps darken without extra colours; on a dark style switch the blend to `screen`. Sizing: reads its box and redraws after webfonts load. The radius comes from the box height (centre offsets are fixed fractions of it). When the measured set labels and callout fit beside the circles, they sit left and right (side layout); otherwise the radius is not shrunk below what the core text needs, and the layout switches to a column: set names move inside their own crescents and the descriptions and callout stack in one column on the right (this happens at 960×600). If even that leaves the core text outside the triple overlap it warns `d-venn:`. A 2-set version needs new centres and one clip.
- Portrait: ok at 1048×560.

### d-hub · ハブ＆スポーク (Hub and Spoke)
- Relation: one central element exchanging with several peripheral ones.
- Use when: a platform connecting partners, a PMO and its teams, a data hub and its systems.
- Avoid when: peripheral elements also link to each other in ways that matter (draw a network instead); the relation is a loop (d-cycle).
- Slots: hub label (≤ 2 lines of ~5 chars) and sub; 4–8 nodes, each: name (≤ 8 chars) and one sub line (≤ 13 chars); `startDeg` for the first node's angle.
- Adapt: `drawHub(svg, data)` places nodes on an ellipse and clips each spoke to the circle and the rectangle edge (8px gap), with arrowheads at both ends for two-way flows; remove `marker-start` for one-way. With 5 nodes use `startDeg: -90`; with 6, `-60` avoids a node directly above the hub. Sizing: reads its box and redraws after webfonts load. Boxes are sized from the measured name and sub plus 40px/18px padding; the hub radius is 20% of the shorter side, at least the hub text width plus 24px. When boxes would overlap each other or crowd the hub, the side padding shrinks to 16px and then the hub radius to its text minimum; if that still collides it warns `d-hub:`. 6 nodes hold up at 960×600; 8 nodes need about 1680×632.
- Portrait: ok at 1048×560 with 6 partners; taller bodies only shorten the side arrows.

### d-business-model · 商流図 (Business model flow / ピクト図解)
- Relation: who exchanges what with whom: goods or services, money and information between 4–6 actors around the company.
- Use when: explaining how a business earns money (who pays, who delivers, which partner gets a fee), or comparing the margin between a buy-side and a sell-side flow.
- Avoid when: the exchanges happen in a fixed order over time (d-flow-h or d-swimlane); one center trades the same thing with many peers (d-hub); the point is where profit sits along an industry (d-value-chain).
- Slots: `kinds` (legend labels for `goods`, `money`, `info`); 4–6 actors `{id, name (≤ 8 chars), sub (≤ 13 chars), col, row, self?}`; flows `{from, to, kind, label (≤ 12 chars, amount included), key?}`. Exactly one flow carries `key`: the one the headline names.
- Adapt: `drawBusinessModel(svg, data)` reads its svg's box (CSS `width:100%;height:100%`) and spreads the actors over a grid of up to 3 columns × 3 rows, outer columns flush with the edges, drawing straight lines from box edge to box edge, so two actors joined by a flow must share a row or a column (it throws otherwise). Box width is the widest name or sub plus a 20px inset; the column gap must hold the widest horizontal label plus 16px each side. When the box is too narrow it first drops the inset to 16px, then puts the widest sub or horizontal label on two lines at a 文節 break (after kana, 、・ or before ＋), one at a time, and in a short box tightens the legend row; it redraws after webfonts load. Tested clean at 960 × 600, 1680 × 632 and 1728 × 584; narrower than about 940px with this content it warns `d-business-model: …` and labels touch the boxes. At most two flows per pair; two flows are offset ±18px and labelled on their outer side, vertical labels slide along their line to clear horizontal labels that hang into the row gap. Line style carries the kind (solid goods, dashed money, dotted info), so the diagram still reads in mono styles. Vertical labels sit beside the line and need about 200px clear on each side of the center column. Box corner radius is CSS (`#d-business-model .actor { rx }`).
- Portrait: ok at 1048×680; at 560 the flow labels crowd the arrows.

### d-org-chart · 体制図 (Project / organization chart)
- Relation: reporting lines across three levels, plus staff and advisory roles beside the top.
- Use when: a project or new organization is introduced and the slide's point is one box: the new PMO, a new team, or who owns a decision.
- Avoid when: the point is the hand-offs between roles (d-swimlane); more than 3 levels or more than 6 boxes on the bottom row (split by branch); one center coordinates peers with no hierarchy (d-hub).
- Slots: a tree `{role (≤ 10 chars), who (name/department, ≤ 14 chars), resp? (≤ 14 chars), key?, children?}`; `side` on the root: 0–2 boxes `{at: 'left'|'right', ext?}` for a PMO or staff (solid link) and an external advisor (`ext`, dashed box and link). 5–9 boxes in all.
- Adapt: `drawOrgChart(svg, root)` reads its svg's box (CSS `width:100%;height:100%`), gives each bottom-row box an equal slot, centers each parent over its children and draws orthogonal bus connectors from bottom edge to top edge; row gaps share what the rows leave of the height. All boxes take one width, the widest line plus a 40px inset, capped by the tightest room (leaf slot − 40, a parent's span − 24, side boxes kept inside the svg). When a line does not fit that width with a 16px inset, each row takes its own room and long `who`/`resp` lines go onto two lines at a 文節 break; a row grows 30px per extra line. It redraws after webfonts load. Tested clean at 960 × 600 (leaves wrap), 1680 × 632 and 1728 × 584; it warns `d-org-chart: …` when a box still overflows or rows leave under 32px between them. Side boxes sit `max(slot, width + 100)` from the root, pulled in to stay inside the svg. A parent without children takes a slot on its own level. Box corner radius is CSS (`#d-org-chart .box { rx }`). The root takes `--d-tint`; only the `key` box takes the accent. State in the note what the dashed line means.
- Portrait: ok at 1048×560 with 4 teams on the bottom row.

## Logic patterns · 論理・フレームワーク

### d-matrix-2x2 · 優先度マトリクス (Priority matrix)
- Relation: Positions options on two continuous axes (impact × feasibility); bubble area encodes a third quantity (cost).
- Use when: Choosing which of 4–8 initiatives to start first, and the reason is "high impact and doable".
- Avoid when: The options need exact values compared side by side (use d-priority-table), or there is no real third quantity (drop bubble sizing and use equal dots).
- Slots: Axis labels with low/high ends, quadrant midpoints, 4 quadrant names; 4–8 items, each: name (≤8 chars), x, y, cost, optional `pick`, optional `side: 'l'` to try the label on the left first.
- Adapt: `drawMatrix(svg, data)` reads the svg's box (`clientWidth`/`clientHeight`) and redraws after webfonts load. The legend column width comes from its measured text; when the plot would be narrower than 900px the legend moves to one row under the x axis (held up at 960×600). Bubble radius is capped by plot height ÷ 9 and plot width ÷ 20, area proportional to cost. Each label tries `side` first, then the other side, then above, then below, skipping spots that hit another label, a bubble or the plot edge; if none is free it keeps the first and logs `console.warn`. y max rounds up from data × 1.15. Only picked items and the top-right quadrant use the accent. Beyond 8 items, split the chart.
- Portrait: ok at 1048×680; at 560 the labels near the centre lines crowd each other.

### d-logic-tree · ロジックツリー (Logic tree)
- Relation: MECE decomposition of one result into causes, with each leaf's contribution as a bar.
- Use when: Explaining where a variance (profit drop, cost overrun) comes from, 2–3 levels, 4–8 leaves.
- Avoid when: The children multiply or add to the parent as a formula with KPIs (use d-kpi-tree); causes are sequential rather than parallel (use d-cause-chain).
- Slots: `unit`, 4 column headers, a root `{label, value, children}`; leaves `{label, value, pick?}`. Values are signed numbers.
- Adapt: `drawLogicTree(svg, data)` reads the svg's box and redraws after webfonts load. Leaves sit on equal rows; parents center on their children. Column widths start at the 1680px proportions and grow to fit the measured labels; when the width runs out, columns shrink to their labels, then the gaps shrink, and the bar area gets the rest (below 120px it logs `console.warn`; at 960 wide the default data still draws, with short bars). Bars scale to the largest |leaf|; positive leaves render as outlined bars. Max about 8 leaves at 600px height.
- Portrait: ok at 1048×560 with 6 leaves.

### d-kpi-tree · KPIツリー (KPI tree)
- Relation: KGI broken into KPIs as an equation (× or ＋ per level), each node with actual and plan.
- Use when: Showing which KPI caused a KGI miss, and the arithmetic must hold (visitors × CVR × AOV = sales).
- Avoid when: The breakdown is qualitative (use d-logic-tree), or only one KPI matters (a single stat slide).
- Slots: Root `{tag, label, value, unit, plan, op, children}`; each node `{label, value, unit, plan?, op?, dp?, pick?}`. `op` is the operator between that node's children.
- Adapt: `drawKpiTree(svg, data)` reads the svg's box and redraws after webfonts load. Column widths start at the 1680px proportions, never go below the measured node texts, and the leaf column takes the rest; when it is too narrow the first two columns and then the operator gaps (down to 56px) give way, else it logs `console.warn`. Holds the default data at 960×600. It computes "計画比" as a pt difference for `%` units and a ratio otherwise. Make the data consistent yourself; the function does not check the arithmetic. 4–8 leaves; 3 levels. Units 円 get thousands separators; set `dp` to keep trailing decimals (8.0%).
- Portrait: ok at 1048×560 with 7 leaves.

### d-cause-chain · 因果の連鎖 (Cause → effect → So What)
- Relation: A linear causal chain ending in the implication or action.
- Use when: 3 links plus a So What, each link backed by one number.
- Avoid when: Causes branch or run in parallel (use d-fishbone or d-logic-tree); more than 5 steps (split into two slides).
- Slots: 3–4 steps plus 1 So What box; each: tag (原因/影響/結果), metric + unit, ≤2-line caption, ≤4-line narrative broken by hand at 文節, one evidence line.
- Adapt: CSS grid `1fr 72px 1fr ...`; the last column is wider and filled with the accent. Add or remove a step by editing the grid template and the arrow cells. Arrow connectors are CSS and always meet the box edges. Connector words (だから/つまり) sit above each arrow.
- Portrait: landscape only; 4 columns run 107px past the text width and the metrics break (80社/人). Use d-flow-v with one link per step and the metric in its note.

### d-fishbone · フィッシュボーン (Fishbone / Ishikawa)
- Relation: Many candidate causes grouped by category, pointing at one problem.
- Use when: Root-cause brainstorming with 4–6 categories (4M, 6M), 2 causes each, and one cause flagged as primary.
- Avoid when: You already know the causal sequence (use d-cause-chain), or causes are quantified contributions (use d-logic-tree).
- Slots: `head {label, value, unit, target}`; 4–6 bones `{label, dim?, causes: [{text (≤12 chars, `\n` for a manual break), pick?, dim?, note?}]}`; first half of bones go on top. `pick` is optional: with none, nothing uses the accent. `dim: true` on a cause draws its line and text in `--d-mid` (ruled-out causes); on a bone it dims the bone label and all its causes. A cause with `pick` is never dimmed, and a bone holding a picked cause is never dimmed.
- Adapt: `drawFishbone(svg, data)` reads the svg's box and redraws after webfonts load. The head box is at least 340/1680 of the width and wide enough for its measured text; bones space evenly along the rest, with slant proportional to the bone spacing. When the longest cause does not fit between two bones, every cause wraps to two lines after a particle (a hiragana → non-hiragana boundary, else a word boundary); held up at 960×600. Causes sit at 30% and 66% of a bone (1 cause at 48%, 3+ spread from 18% to 78%); if they cannot fit it logs `console.warn`. Accent marks the bone, the cause line, its text and its `note` only for a cause with `pick`; a `note` without `pick` is `--d-sub`.
- Portrait: ok at 1048×680; at 560 the accent callout overlaps a bone label.

### d-problem-action · 課題→施策→効果 (Issue → action → impact)
- Relation: Matched rows: each issue gets one action and a quantified effect, summed at the bottom.
- Use when: Presenting 2–4 initiatives to a decision-maker with a total impact.
- Avoid when: Actions are not one-to-one with issues (use d-logic-tree), or the need is ranking (use d-priority-table).
- Slots: 2–4 rows; each: issue (≤2 lines + 1 sub line), action (≤2 lines + 1 sub line), effect metric (before → after) and yen value; a total and a one-line investment note.
- Adapt: Grid `1fr 64px 1fr 64px 0.9fr` with `repeat(N, 1fr)` rows; change N for the row count. Issue cells use `--d-tint`; only the total uses the accent.
- Portrait: ok at 1048×760 with 3 rows; 680 runs 65px over.

### d-conclusion-3 · 結論＋3つの理由 (Conclusion + 3 reasons)
- Relation: One recommendation supported by three parallel reasons, each with a number.
- Use when: Executive summary or the opening slide of a proposal.
- Avoid when: Reasons are a chain (use d-cause-chain), or there are 5+ points (use d-flow-v or a numbered list).
- Slots: Recommendation (≤3 lines), one support line, one goal metric; 3 reasons: heading (≤14 chars), 2-line evidence, metric + unit + caption.
- Adapt: Left column fixed at 560px; reasons share the remaining width in equal rows. Two or four reasons work by changing `repeat(3, 1fr)`. The accent fills the conclusion block only; reason numbers use the accent as markers.
- Portrait: landscape only; the 560px conclusion panel pushes the reasons 156px past the text width. Put the conclusion in the page headline and the reasons in d-parallel-3.

### d-swot · SWOT (SWOT)
- Relation: 2×2 of internal/external × plus/minus factors, closed by one cross strategy.
- Use when: Strategy review where one S×O (or W×T) move follows from the grid.
- Avoid when: The audience needs the competitor and customer view (use d-3c), or there is no conclusion (a SWOT without the strategy line is a list).
- Slots: 4 quadrants × 3 bullets (≤18 chars each), 1–2 bullets marked `hot`, one strategy line naming the combination.
- Adapt: Grid with a 56px vertical axis column (`.tate`-style vertical labels). External quadrants use `--d-tint`. Keep 3 bullets; 4 fit only at 22px.
- Portrait: ok with limits: ≤2 bullets per quadrant at 1048×680; 3 bullets run 96px over even at 760.

### d-3c · 3C分析 (3C analysis)
- Relation: Three parallel views (customer, competitor, company) converging into one key success factor.
- Use when: Deriving a KSF or positioning from market facts.
- Avoid when: Internal and external factors need a sign (use d-swot).
- Slots: 3 cards: Latin kicker, name, ≤3-line finding, one metric + unit + caption; a KSF headline and one support line.
- Adapt: `drawConverge(wrap)` sets the overlay svg's viewBox from its own box, measures the cards and the KSF box, and draws the bus connectors (redrawn after webfonts load), so connectors stay attached when text, size or grid changes. Works for 2–4 columns if the grid columns change. The cards themselves are an HTML grid with hand-broken text: below about 1400px wide the lines rewrap and the KSF block can push past a 600px-tall body. Needs a body at least about 1300px wide and 600px tall; narrower, card text rewraps and the KSF block overflows, so cut each finding to two lines or use d-conclusion-3.
- Portrait: ok at 1048×680.

### d-pdca · PDCA (PDCA cycle)
- Relation: Four-step loop with the current phase highlighted.
- Use when: Reporting one improvement cycle and what the Check phase found.
- Avoid when: The steps do not loop (use a flow); only 2–3 steps (d-cycle).
- Slots: 4 phases: letter, name, ≤2-line text, metric + unit + caption; the current phase gets class `now`; hub label.
- Adapt: 3×3 grid with arrow cells in the gaps; arrows are CSS and always span the gap from edge to edge. The grid order is P D / A C, so arrows run clockwise. Keep phase text to 2 lines at 24px.
- Portrait: ok with limits at 1048×680: notes wrap at about 6 字, so break them by hand into short 文節 lines.

### d-priority-table · 施策の優先順位表 (Priority table)
- Relation: Options compared on several criteria, with the recommended one highlighted.
- Use when: 3–6 options and the decision depends on exact values (effect, duration, investment, payback, risk).
- Avoid when: Only two criteria matter (use d-matrix-2x2).
- Slots: Rows `{name, desc, effect, months, invest, risk: 低|中|高, verdict, pick?}`.
- Adapt: `drawPriorityTable(tbody, rows)` computes payback as invest ÷ effect and scales effect bars to the largest effect (62% of the cell; each bar is a small svg whose `width` attribute is that percentage, colored from CSS). The table fills the body height and rows share it, so 5–6 rows fit at 632px without changes. Column widths live in CSS (`col:nth-child`). Only the `pick` row uses the accent. It is laid out for a full-width body; at 960px the names and units wrap. Needs about 1300px of width for 7 columns; narrower, drop the 期間 or リスク column.
- Portrait: ok with limits: ≤5 columns at 1048×680 (drop 期間 and 回収年数); with 7 the units wrap (億/円) and 推奨 clips 9px.

### d-feature-matrix · ○△×比較表 (Qualitative feature comparison)
- Relation: several products judged on the same criteria in coarse grades, with the recommended one highlighted.
- Use when: a tool or vendor selection where support is yes / partly / no rather than a number, and the headline names the criteria only the pick satisfies.
- Avoid when: the criteria have exact values to compare (d-priority-table or d-multi-compare); only two products (d-compare-2); only two criteria decide (d-matrix-2x2).
- Slots: `labelHead`; 3–5 products `{name (≤ 10 chars), sub (≤ 10 chars), pick?}`; 6–9 criteria `{name (≤ 13 chars), marks: one of ◎ ○ △ × ✓ – per product}`; `summary` (label plus one verdict per product, ≤ 9 chars); `legend` pairs.
- Adapt: `drawFeatureMatrix(table, data)` draws each mark as a 32px SVG shape rather than a font glyph, so marks read the same in every typeface; ◎ and ○ in ink, △ and × in `--d-sub`, every mark in the pick column in the accent. Row height 50px fits 8 criteria in the default body (measured 10px to spare); for 9 criteria or a two-line lead, set it to 44px. The label column width is CSS (`#d-feature-matrix col.lab { width: 30% }`); with 5 products set it to 26–30%. The 32px mark svgs keep their own 32 × 32 viewBox and scale as icons. Use either the ◎○△× set or the ✓– set on one slide, not both.
- Portrait: ok at 1048×680 with 8 rows × 4 products; at 560 the legend runs into the source line.

## Chart patterns · グラフ

Every chart is drawn by one plain function, `draw<Name>(svg, data)`, that reads the svg's own box (`clientWidth`/`clientHeight`, fallback 1680×620), sets the viewBox to that box and computes every scale from `data`. Type stays at its CSS size; margins for tick labels, label columns and legends come from measured text, so the call site redraws once webfonts load (`draw(); document.fonts.ready.then(draw)`). Every chart holds up from a 960×600 box to 1728×584; when content cannot fit it degrades (thins axis labels, wraps legends, drops cell numbers) and logs `console.warn('d-<id>: …')`. Swap the data object and the chart redraws correctly. Colors come only from `--d-*` tokens through CSS classes; the accent goes on the one item flagged `accent: true` (or the computed focus). CSS classes override SVG presentation attributes, so text alignment for a class lives in the CSS.

Chart-choice rules that apply to the whole group:
- Pie charts only for 5 items or fewer, and only to check whether one part is a majority. Otherwise use d-stacked-100.
- One hue in shades, plus the accent on the value the headline is about. `--d-neg` only where the chart needs a sign.
- 2D only. Label values directly; gridlines in `--d-rule`; every chart carries a source line.

### d-bar · 縦棒グラフ (Vertical bar)
- Relation: change of one quantity across ordered periods (growth, increase or decrease).
- Rule: vertical bars for growth over time when there are few periods (≤ 8) and each value matters; flag only the period the headline is about.
- Use when: annual or quarterly results, 3–8 periods, the point is a jump or the latest value.
- Avoid when: more than about 10 periods or the shape of the trend matters more than each value (use d-line-forecast); comparing unordered categories (use d-bar-rank).
- Slots: `unit`, optional `digits`; `items` 3–8 of `{label, v, accent?, callout?}`. The accent bar gets a callout, defaulting to `前年比 N倍` computed from the previous bar.
- Adapt: the value axis always starts at 0 and the top is a nice step (max / 5). The left margin is the widest tick or unit label. Bar width is 56% of each band, capped at 150px. Callout needs about 100px above the tallest bar, which the top margin provides. Warns when the widest period label is wider than its band (about 8 bars in a 960px box).
- Portrait: ok at 1048×560.

### d-bar-rank · 横棒ランキング (Horizontal bar ranking)
- Relation: size order among unordered categories.
- Rule: horizontal bars for comparing sizes of categories, sorted largest first, because long Japanese labels read left to right and need room.
- Use when: survey answers, reasons, regions, products; 3–8 items.
- Avoid when: items are periods (use d-bar); parts of a whole that sum to 100% across several groups (use d-stacked-100).
- Slots: `unit`; `items` of `{label (≤ 12 chars), v, accent?}`; `keepOrder: true` to keep the given order (e.g. その他 last); optional `labelWidth`.
- Adapt: sorted descending by default with rank numbers. The rank and label columns are measured from the text (`labelWidth` overrides the left column); the right margin is the widest value label (at least 7.7% of the width). Bars scale to the maximum (no axis), values sit at bar ends. Warns when labels leave under a quarter of the width for bars.
- Portrait: ok at 1048×560.

### d-line-forecast · 実績と予測の折れ線 (Line, actual and forecast)
- Relation: trend over a continuous time axis, actual versus forecast, with a turning point.
- Rule: lines for trends over many periods; actual is a solid line, forecast is a dashed line on a tinted zone; annotate the turning point with its cause.
- Use when: 6–20 time points, a plan or forecast continues from actuals, one event changes the slope.
- Avoid when: few periods where each value counts (use d-bar); more than 3 series (split the slides, or use d-area-stacked for parts of a total).
- Slots: `unit`, `points` of `{t, v}`, `forecastFrom` (last actual `t`), `turn {t, text:[headline, note], y?}`, optional `labelAt` (list of `t` to label), optional `forecastLabel`.
- Adapt: the forecast end value is labelled in the accent automatically, and the right margin is measured from it (at least 10.7% of the width). The turning-point note sits above-left of the point and flips to the right when there is no room on the left; move it with `turn.y` if the line passes there. Year labels thin out (every 2nd, 3rd…) when the box is too narrow to print them all.
- Portrait: ok at 1048×560.

### d-waterfall · ウォーターフォール (Waterfall / bridge)
- Relation: how a start value becomes an end value through signed contributions.
- Rule: a bridge for explaining a change between two totals; increases in a neutral shade, decreases in `--d-neg`, the end total in the accent.
- Use when: profit or cost bridges, budget versus actual, 3–7 drivers.
- Avoid when: the drivers do not add up to the change (use d-bar-rank of impacts); a time series of totals (use d-bar).
- Slots: `unit`; `start {label, v}`; `steps` of `{label, v}` with negative v for decreases; `end {label, accent?}`. The end value is computed. Labels may use `\n` for a second line.
- Adapt: totals start at 0; dashed connectors run at each running total. The left margin is measured from the ticks and the bottom margin grows with the number of label lines. Up to about 8 bars at 1680px and 7 at 960px with 4-character lines; past that it warns, so merge small drivers into その他.
- Portrait: ok at 1048×560.

### d-funnel · ファネル (Funnel)
- Relation: sequential stages where each keeps a share of the previous one.
- Rule: a funnel only for stages that are true subsets in order; show the conversion and the drop-off between every pair and mark the weakest conversion, not the largest stage.
- Use when: sales pipelines, sign-up flows, recruitment; 3–6 stages.
- Avoid when: stages are not subsets of each other (use d-bar-rank); comparing several funnels (use a table or d-stacked-100 of outcomes).
- Slots: `unit`; `stages` of `{label (≤ 8 chars), v}`; optional `focus` (index of the transition to highlight; defaults to the lowest conversion).
- Adapt: bar widths are linear to the first stage (minimum 8px), so very small final stages stay honest and thin. The label column and the count and share columns at the right are measured from the text; the funnel takes the rest, at most 58% of the width, and the group is centered. Warns when the funnel would get under 20% of the width.
- Portrait: ok at 1048×560.

### d-bubble · バブルチャート (Bubble)
- Relation: three variables at once, two positions and a size.
- Rule: bubbles only when the third variable (size) changes the conclusion; size is area-proportional, with a reference circle.
- Use when: business portfolios, product positioning with revenue; 4–8 items.
- Avoid when: size adds nothing (use a plain scatter or d-scatter-path); more than 10 items (labels collide; use a table).
- Slots: `x {label, unit, zero?, min?, max?}`, `y {label, unit, zero?, min?, max?}`, `size {label, unit, key?}`; `items` of `{label, x, y, s, accent?, pos?}` where `pos` is `r`, `l`, `t` or `b` for the preferred label side. `zero` keeps 0 in the domain (default: true for y, false for x); `min`/`max` pin a bound exactly, e.g. `y: { label: '満足度', unit: '点', min: 1, max: 5 }` for a 1–5 scale.
- Adapt: ticks are nice steps (range / 5) inside the domain. An unpinned bound adds one step of padding when a value lies near the edge; with `zero: false` the axis starts where the data starts. Max radius is min(90, plot height / 5, width / 14) or `maxR`. The size key sits in a measured right margin (at least 15.5% of the width). Labels try `pos` first, then the other sides, avoiding other labels, other bubbles, the key and the axes; it warns if no side is free.
- Portrait: ok at 1048×560.

### d-heatmap · ヒートマップ (Heatmap)
- Relation: density across two categorical dimensions.
- Rule: shades of one color in five bins for density; never a rainbow scale. The peak cell (or `focus`) takes the accent.
- Use when: weekday by hour, region by month, segment by product; up to about 8 rows and 14 columns with values printed.
- Avoid when: one dimension is continuous time and the trend matters (use d-line-forecast); fewer than about 12 cells (use a table).
- Slots: `rows` labels, `cols` labels, `values` (rows × cols matrix; `null` for a cell with no data), `unit`, `cellUnit`, optional `focus [row, col]`, optional `emptyLabel` (printed in null cells, default 「–」, e.g. 「休」 for closed hours).
- Adapt: five equal-width bins between the min and max of the non-null cells; null cells are left out of the range and the bins and draw as paper with a `--d-rule` outline. Bin shades are the `.b0`–`.b4` fill-opacity rules in the CSS, on `--d-ink`, so a style's ink color sets the hue. The row-label column is measured. Values print while a cell is wider than the widest number; otherwise the chart warns and shows shades only. Column labels thin out when they do not fit.
- Portrait: ok at 1048×560 with 7×12 cells.

### d-stacked-100 · 100%積み上げ横棒 (100% stacked bar)
- Relation: composition of a whole, compared across groups.
- Rule: use this instead of pie charts. A pie is allowed only for 5 items or fewer when the question is whether one part is a majority; any comparison of composition across groups, or more than 5 parts, goes here.
- Use when: share by age, region or year; 2–7 rows, 2–5 parts.
- Avoid when: absolute sizes of the groups also matter (use d-mekko); the composition changes over many periods (use d-area-stacked).
- Slots: `series` of `{key, accent?}` in stacking order (put the accent part first so it is left-aligned and comparable); `rows` of `{label, v: [...], total?}`. Rows are normalized to 100%. `total` (number, formatted with separators, or a string such as `'n=310'`) prints at the right end of its row, under the column header `totalLabel`; rows without it print nothing.
- Adapt: percentages print when a segment is wider than its label plus 16px. The row-label column, the legend and the total column are measured; with no totals the right margin stays 40px. The legend wraps to a second line when it is wider than the plot. Non-accent shades run `--d-sub`, `--d-mid`, `--d-tint`, `--d-rule`, so at most 5 parts.
- Portrait: ok at 1048×560.

### d-mekko · マリメッコ (Marimekko)
- Relation: market size by segment and share within each segment, in one picture (area = size × share).
- Rule: use a mekko when both the size of each segment and the share inside it matter; put the total market size under the chart.
- Use when: market maps, share by customer size or region; 3–6 segments, 2–5 players.
- Avoid when: segment sizes are similar (use d-stacked-100); more than 6 segments (narrow columns lose labels).
- Slots: `unit`; `players` of `{key, accent?}` stacked bottom-up (accent first so it sits on the baseline); `segments` of `{label, size, share: [...]}`. Shares are normalized to 100%.
- Adapt: column width is proportional to `size` with 6px gaps. Cell labels print when a cell is at least 34px tall and wider than its label plus 16px; smaller cells stay unlabelled, so state that value in the headline or lead if it matters. The legend is measured and wraps; it warns when a column is narrower than its label.
- Portrait: ok at 1048×560.

### d-scatter-path · 散布図の軌跡 (Connected scatter)
- Relation: how two measures move together over time.
- Rule: connect yearly points of two measures when the relationship between them, not either one alone, is the story; mark the turning point and color the path after it in the accent.
- Use when: price versus volume, cost versus quality over 5–12 periods.
- Avoid when: only one measure matters (use d-line-forecast); the audience is unfamiliar with scatter plots and the message is a simple trend (use two small d-bar charts).
- Slots: `x {label, unit}`, `y {label, unit}`; `points` of `{t, x, y, pos?}` in time order; `turn {t, text:[headline, note], dx?, dy?}` with dx/dy the offset of the note from the point (negative dx puts it on the left).
- Adapt: domains are nice steps with padding; the left margin is measured from the y ticks and x ticks thin out in narrow boxes. Each segment ends in an arrowhead that stops short of the next point. Set `pos` per point to keep year labels off the path. The turning-point note is clamped inside the box, so a large `dx`/`dy` shortens instead of clipping.
- Portrait: ok at 1048×560 only; at 680 and 760 the callout lands on the 2018 label.

### d-area-stacked · 積み上げ面グラフ (Stacked area)
- Relation: how a total and its parts change over time.
- Rule: stacked areas for the trend of a total and its parts over many periods; flag the one part the headline is about and label every layer at the right end.
- Use when: revenue by business, energy mix in absolute terms; 5–15 periods, 2–5 series.
- Avoid when: only the shares matter (use d-stacked-100 per period); a single series (use d-line-forecast); many series crossing each other.
- Slots: `unit`, `years`, `series` of `{key, v: [...], accent?}` stacked bottom-up.
- Adapt: right-end labels keep at least 34px apart and slide up when layers are thin; the right margin is the widest of them (at least 14.9% of the width) and the left margin is measured from the ticks. Year labels thin out in narrow boxes. The total prints above the last period. Non-accent shades run `--d-sub`, `--d-mid`, `--d-tint`, `--d-rule`.
- Portrait: ok at 1048×560.

### d-combo-bar-line · 棒＋折れ線の2軸グラフ (Bar and line, dual axis)
- Relation: an amount and a rate for the same periods, read together (売上高と営業利益率, 出荷数と単価, 来店客数と客単価).
- Rule: bars for the amount on the left axis, a line for the rate on the right axis; both axes start at 0 and share the gridlines; each axis title carries its series swatch and its side (左軸 / 右軸), so the legend is the axis titles; flag only the period the headline is about.
- Use when: 5–8 fiscal years or quarters, and the point is how the rate moved while the amount grew or fell (e.g. FY25 で利益率が回復し、売上高とともに過去最高).
- Avoid when: the two series have no reason to be compared point by point, or the audience will read the crossing of the line and the bars as meaning something. A dual axis misleads whenever its two scales are chosen freely: the crossing points, the relative slopes and "the line overtakes the bars" are artefacts of the scale choice, not of the data, and a truncated right axis can make a 1-point change look like a collapse. Then use two stacked charts that share the x axis (a d-bar on top for the amount, a d-line-forecast-style line below for the rate, same period columns). Also avoid for more than one rate (split slides) or more than about 10 periods (use d-line-forecast).
- Slots: `bar {label, unit, digits?}`, `line {label, unit, digits?, suffix?}`, `items` 3–8 of `{label, bar, line, accent?}`, optional `ticks` (default 5).
- Adapt: each axis gets its own nice step and the same number of steps from 0, so gridlines line up for both. Bar values sit inside the foot of each bar (paper color) and move above the bar when it is shorter than 56px; rate values sit above each point with a paper-colored outline so they stay legible over a bar. A rate close to 0 puts its label on the bar value; give that period a callout in the lead instead. Bar width caps at 130px. The chart reads its svg's box (CSS `width:100%;height:100%`); side margins are at least 90px and grow to fit the measured tick labels, and it redraws after webfonts load. Tested clean at 960 × 600, 1680 × 632 and 1728 × 584; it warns `d-combo-bar-line: …` when the two axis titles cannot share the top row. The accent goes on the bar, the point (larger) and the period label together. Right-axis ticks are in `--d-ink` like the line; left-axis ticks in `--d-sub`.
- Portrait: ok at 1048×560.

### d-tile-map-jp · 都道府県タイルマップ (Japan prefecture tile map)
- Relation: one value per prefecture, where the regional pattern is the story (九州南部が高い, 大都市圏が低い).
- Rule: a tile map instead of a real map, because every prefecture gets the same area, so 東京 and 鳥取 weigh the same; five bins of one hue, the prefecture(s) the headline is about in the accent, a top-5 list beside the map so the exact leaders are read as numbers, not shades.
- Use when: all 47 prefectures have a value, and the message is a regional cluster or a leader; 普及率, 1人あたり金額, 伸び率 such as rates and per-capita values.
- Avoid when: values are totals that mostly track population (normalize per household or per capita first, or use d-bar-rank of the top 10); only a few prefectures matter (use d-bar-rank); the point is a change over time (use d-line-forecast for a few prefectures).
- Slots: `values` keyed by short name (東京, 大阪, 北海道, 神奈川 …) for all 47; `unit`, `digits`; optional `focus` (list of short names for the accent), `avg` (shown under the ranking), `breaks` (4 cut points; default equal width between min and max), `top` (default 5), `tiles` (to replace the layout), `inset` (tiles that get the inset rule, default 沖縄). The bin shades are CSS, not data: `#d-tile-map-jp .b0`–`.b4 { fill-opacity }`; more than 4 breaks needs more `.bN` rules (it warns).
- Adapt: the layout is the `JP_TILES` table of `[short name, col, row]` on a grid of about 14 × 9 (北海道 top right, 沖縄 bottom left, set apart by a fractional column and an L-shaped inset rule). It reads its svg's box (CSS `width:100%;height:100%`): the tile pitch is min((W − panel − gap) / cols, H / rows), where the panel width is measured from the ranking and legend text and the gap is about 7% of W (≤ 120px): a 69px pitch, 65px tiles at 1680 × 629. A tile must be 4px wider than the longest name (3-character names at 18px need about 58px). When the panel beside the map would shrink tiles below that, the map takes the full width and the ranking and legend move into the empty top-left corner of the grid (side by side or stacked, ranking rows 40–54px); if no corner fits it warns `d-tile-map-jp: …`. Tiles under 50px drop the value and keep the name. The ranking rows compress (54 → 40px) so the ranking and legend fit the map height. It redraws after webfonts load. Tested clean at 960 × 600 (corner panel), 1680 × 632 and 1728 × 584. Full names in the panel come from the short name (東京→東京都, 京都・大阪→府, 北海道 as is, others →県). Tiles use `--d-ink` with the bin's fill-opacity, so a style's ink sets the hue; values on bins 4–5 switch to `--d-paper`. `check-tiles.mjs` asserts that all 47 appear exactly once, no tiles overlap, every tile has a value and stays inside the viewBox; rerun it after editing the table.
- Portrait: ok at 1048×560.

## Composite patterns · 複合レイアウト

All charts here are drawn by one function per pattern from an inline `data` object. Each SVG reads its own box (`clientWidth`/`clientHeight`) and sets `viewBox` to it, so it never scales: type stays at its CSS size and the layout reflows to the box. The box comes from CSS (`width:100%;height:100%` of `.d-body`, or the layout cell for d-cost-actions and d-case). Label columns and widths are measured from the text, and the draw runs once at load and again after `document.fonts.ready`. When content cannot fit the box, the pattern draws anyway and logs `console.warn('d-<id>: …')` (only after webfonts have loaded). Radii, strokes and fills all live in the scoped CSS. Swap `data` and the scales, positions and connectors follow. Colors come only from `--d-*` tokens through scoped CSS classes.

### d-gantt · ガントチャート (Gantt with decision gates)
- Relation: phases over time, with milestones on the phases and a decision gate that splits the plan.
- Use when: a project plan where one approval or Go/No-Go date controls everything after it.
- Avoid when: several independent streams run in parallel with fuzzy dates (use d-roadmap); only dated events matter, no durations (use d-timeline).
- Slots: `start {y, m}`, `months` (6–18); 3–7 phases, each `name`, `owner`, `s`, `e` in month units (fractions allowed); 0–5 milestones `{label, at, row}`; 1–2 gates `{label, at}`.
- Adapt: reads its box. Rows share the height left after the 72px month header and 72px gate footer, and the label column is the widest phase name + 40px (at least 19% of the width). Month labels thin out (every 2nd, 3rd…) when a month is narrower than its label. Below 76px per row it warns. 5 phases hold at 960×600. Milestone labels sit above the bar and switch anchor near the edges. Only the gate is accent; bars stay `--d-mid`.
- Portrait: ok at 1048×560 with 5 rows × 12 months.

### d-swimlane · スイムレーンの承認フロー (Swimlane approval flow)
- Relation: who does which step, in what order, with branches and returns between departments.
- Use when: approval or hand-off flows across 3–5 departments, with conditional branches (amount thresholds) and a send-back.
- Avoid when: one actor only (d-flow-h or d-flow-v); more than 6 steps or 5 lanes (split into two slides).
- Slots: `steps` (3–6 column headers), `lanes` (3–5), nodes `{id, lane, col, text ('\n' for the 文節 break), key?}`, edges `{from, to, label?, key?, back?}`.
- Adapt: reads its box. Lanes share the height under the 56px step header, the lane column is the widest lane name + 52px, and nodes are the widest node line + 32px (168px max). 5 steps × 4 lanes need about 1400px of width. Narrower, the same-lane gaps close and it warns that a label does not fit. Routing rules are fixed. Same lane goes straight; forward goes right, down or up in the gap after the source column, then into the target's left side; same column goes vertical; `back` runs along the top of the target lane into its top. Keep the cells a forward edge crosses empty, and keep the source column empty above a `back` edge's source. Same-lane labels must fit the gap between nodes (132px at 1680 wide, about 6 full-width characters). Needs about 1300px of width for 5 columns; at 960px same-lane labels no longer fit, so use 4 columns or put the labels on the vertical segments.
- Portrait: ok at 1048×560 with 4 lanes × 5 columns.

### d-roadmap · 並行プロジェクトのロードマップ (Parallel roadmap)
- Relation: several streams side by side over coarse periods, with confirmed and undecided items.
- Use when: a mid-term plan with 3–5 streams and half-year or quarterly periods, where some items are not yet scheduled.
- Avoid when: exact dates and dependencies matter (use d-gantt); one stream only (use d-timeline).
- Slots: `periods` (4–6 labels); 3–5 streams, each `name` and 2–4 items `{s, e, label, key?, tbd?}` in period units.
- Adapt: reads its box. Rows share the height between the period header and the legend, and items are up to 72px tall. A label wider than its item breaks into two lines after の・、 or before （, and it warns if even that does not fit. `tbd` draws a dashed outline with sub-colored text; `key` is the one accent item. At 1680 wide an item one period wide holds about 12 characters at 22px. Items in one stream must not overlap (one track per stream).
- Portrait: ok at 1048×560; the last column fits about 6 字 per line.

### d-value-chain · 業界構造マップ (Value chain by player type)
- Relation: industry size per stage of the value chain and per player type, as area.
- Use when: showing where the money sits across stages and which player type dominates a stage.
- Avoid when: exact comparison of values is the point (d-bar-rank or d-priority-table); only one player type (use a single bar chart).
- Slots: `stages` (4–6), `players` (2–4), `values` matrix (players × stages, same unit), `key [row, col]`.
- Adapt: reads its box. Square side is `sqrt(v / max) × maxSide`, so area is proportional across the whole matrix. `maxSide` is the smaller of the row height − 54px and 62% of the column width. Squares share a baseline per row. Column totals are computed. A stage label wider than its chevron breaks into two lines at ・ and the chevron row grows. Below a 40px max side it warns.
- Portrait: ok at 1048×560.

### d-zoom · 全体＋拡大 (Overview plus zoom)
- Relation: a long trend on the left and a finer-grained close-up of one window on the right, linked by dashed lines.
- Use when: the finding lives in a short period of a long series (a spike after a price change, a seasonal dip).
- Avoid when: the whole series tells the story (d-line-forecast); the two panels have unrelated data.
- Slots: `full {title, unit, labels (blank to skip), values}` (12–36 points); `window [i0, i1]`; `detail {title, unit, labels, values (6–16), highlight [j0, j1], event {at, label}}`.
- Adapt: reads its box. The left panel takes the first 49% of the width and the right panel the last 40%. Axis labels and non-highlighted bar values that would collide are dropped (highlighted values and the event label are kept). Both y scales round up to a nice number. The window rectangle and the right frame share top and bottom, so the connectors stay horizontal. Accent covers the window outline, the connectors and the highlighted bars.
- Portrait: ok at 1048×560.

### d-cost-actions · コスト内訳と施策 (Cost waterfall with action table)
- Relation: how each action reduces a cost base, the actions themselves, and the total effect.
- Use when: a cost-reduction plan with 3–6 actions whose sizes, owners and start dates must be read together.
- Avoid when: the cost components themselves are the point (use a stacked bar or a breakdown waterfall); actions have no amounts (use a table).
- Slots: `base`, `baseLabel`, `afterLabel`, 3–6 actions `{code, name, value, start, owner}` in one unit.
- Adapt: the grid gives the chart about 51% of the width and the table the rest, with a 480px floor so the table never overflows. The chart then reads its cell. The y axis starts at `floor((after − 0.6 × cut) / 5) × 5`, so small steps stay visible. White bands mark the broken axis, and the note must say where the axis starts. The table, the totals and the reduction rate are all computed from `data`.
- Portrait: ok at 1048×680; 560 runs 43px over.

### d-multi-compare · 複数対象の比較 (Stacked comparison with shared header)
- Relation: 3–5 candidates compared on the same 3–5 criteria, each criterion on its own shared scale.
- Use when: vendor or option selection where the reader compares down each column.
- Avoid when: criteria are qualitative (d-feature-matrix); more than 5 candidates (use a sorted bar chart per criterion).
- Slots: criteria `{label, unit, better: 'low' | 'high'}`; items `{name, sub, v[], pick?}`.
- Adapt: reads its box. Rows share the height under the 78px header (it warns below 96px a row). The name column is the widest name + 48px, and the value column is the widest value + 30px. At 960 wide the bars get about 70px. Each column scales to its own max. `最良` marks the best value per column, using `better`. The picked row gets the accent-tint band and accent bars.
- Portrait: ok at 1048×560 with 4 options × 4 criteria.

### d-pricing-3 · 料金3プラン (Three-plan pricing)
- Relation: three tiers that build on each other, with one recommended tier.
- Use when: a price list with 3 plans and 3–5 features each.
- Avoid when: plans differ on many line items (use a feature table); 4 or more plans (use a table).
- Slots: per plan `name`, target line, price, unit, 3–5 features (first one may be `.base`, "下位プランの全機能"), adoption share. One plan gets `.pick` and the `.badge`.
- Adapt: the price is 100px against a 28px yen sign and 24px unit, so keep the number 3–4× its unit. The badge sits on the top border. Features over 15 characters wrap and push the share line down.
- Portrait: landscape only; the cards run 79px past the text width and the unit (／人・月) stacks one character per line. Use d-feature-matrix with the plans as columns and the price as the first row.

### d-kpi-cards · KPIカード6枚 (Six KPI cards)
- Relation: six independent headline metrics for one period.
- Use when: an earnings or monthly summary where one metric is the headline and five support it.
- Avoid when: the metrics need trends (add sparklines or use a chart); more than 6 (split, or use a table).
- Slots: 6 cards, each label, number, unit, one comparison line. One card gets `.key`.
- Adapt: number 108px against a 30px unit (3.6×). At 5 or more digits, drop the number to 92px. Grid is 3 × 2. Do not use 4 per row.
- Portrait: ok with limits at 1048×560: values no wider than 48.6億円; 2,340社 runs 79px past the edge, and 2 columns × 3 rows does not fit even at 760.

### d-case · 導入事例 (Case study)
- Relation: customer profile, measured before and after, the customer's own words, and why it worked.
- Use when: a sales deck needs one customer story backed by two numbers.
- Avoid when: no measured outcome exists (use a quote slide); several customers (use a logo grid with one metric each).
- Slots: client name and profile line; 1–3 metrics `{label, unit, before, after}`; a quote of 2 lines with attribution; exactly 3 reasons, each a title and a 2-line explanation.
- Adapt: the grid splits 56/44, and the bar chart fills what is left of the left column between the client line and the quote. Blocks are up to 160px each, top-aligned, and bars thin out to fit a shorter box (it warns below 18px bars). Each before/after pair scales to its own max, and the change percentage is computed. The quote sits at the bottom of the left column. If you have 3 metrics, shorten the quote to one line. In a short body (under about 620px) keep the quote to two lines, or the bars get squeezed.
- Portrait: ok at 1048×560.

### d-timeline · 沿革・年表 (History timeline with metric)
- Relation: yearly metric bars above a year axis, with key events hanging below.
- Use when: a company history where the events explain the shape of the growth.
- Avoid when: more than 16 years (bin to 2-year steps or use a line chart); 4 or more events fall within 2–3 years (use a vertical list).
- Slots: `sales {year: value}`, `salesLabel`, `keyYear`, 4–7 events `{year, title, sub, key?}`; optional `from`/`to` (extra axis years), `eventsLabel` (default 主な出来事), `scale: 'even' | 'proportional'`. The axis years are every year in `sales` and `events` plus `from`/`to`.
- Adapt: reads its box. `scale: 'even'` (default) gives each axis year an equal slot. `'proportional'` places years by value, so 2012, 2013, 2019, 2024 sit at their true distances; events stay on their year. Event labels sit in levels below the axis: the layout searches for the fewest levels in which no label overlaps another on its level and no stem crosses a label on a level above it, preferring the old alternation (so 6 well-spaced events alternate over two levels). A crowded cluster becomes a stair (left events deeper). More levels lower the axis and shorten the bars. Up to about 5 levels fit in 600px. If no assignment exists (two events in one year, or labels that cover each other's stems), it draws anyway and warns. Labels near the right edge flip to end-anchored. Year and bar-value labels that would collide are dropped, keeping the key year.
- Portrait: ok at 1048×560 with 12 years.
