# Diagram library

45 diagram and chart patterns for Japanese business slides, one 1920×1080 slide each, in [diagrams.html](diagrams.html). Open `diagrams.html#d-<id>` to see one; arrow keys step through all of them.

## Using a pattern

1. Name the relationship the slide has to show, then pick the pattern from the table below. Read that pattern's entry: its Avoid line often points to a better fit.
2. From `diagrams.html`, copy three things for that id: the CSS between `/* BEGIN d-<id> */` and `/* END d-<id> */`, the `<section id="d-<id>">` markup, and its `<script>` if it has one.
3. Map the `--d-*` tokens onto the chosen style's tokens in one block, for example `--d-ink: var(--ink); --d-accent: var(--brand);`. Map `--font-jp` and `--font-latin` to the style's families. Patterns use no other colors, so this re-skins them completely. On a dark style, swap `--d-paper`/`--d-ink` and lighten `--d-tint` and `--d-rule`.
4. Replace the frame classes (`.d-frame`, `.d-kicker`, `.d-title`, `.d-lead`, `.d-note`) with the style's own headline, lead and source-line classes, so the slide keeps the style's type scale.
5. Replace the data object (charts) or the copy (diagrams) with the user's content. Keep the headline a conclusion sentence that the diagram proves, and keep the accent on the one element the headline names.
6. Screenshot the slide. Check that connectors meet their boxes, labels clear each other, and every number in the headline appears in the diagram.

Each pattern runs its script in its own scope and reads its size from its own box, so several patterns can sit in one deck.

## Pick by relationship

| The slide shows… | Pattern |
| --- | --- |
| Three peers on one metric | `d-parallel-3` |
| Two states compared item by item | `d-compare-2` |
| A process before and after a change, with time saved | `d-before-after` |
| Steps in order, short text each | `d-flow-h` |
| Steps in order, with deadline, sentence and owner | `d-flow-v` |
| Steps across departments, with branches and send-backs | `d-swimlane` |
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
| Change across a few periods | `d-bar` |
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
- The accent marks one element: the value or item the headline names. Everything else is ink, shades of one hue, or tint. `--d-neg` appears only where a chart needs a sign.
- Data adds up. Tree branches sum to their parent, shares sum to 100 % (or the note says rounding may differ), and bridges end at the stated total.
- Every data slide carries a source line. Invented data says so in that line (「架空のデータ」).
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

All patterns sit in `.d-body` (1680×632 at the default frame). SVG patterns draw into `viewBox="0 0 1680 620"` and read W/H from the viewBox, so a different body size only needs a new viewBox. Accent goes on one element only: the item the headline names (`.is-key` in HTML patterns, `key`/computed minimum in SVG patterns).

### d-parallel-3 · 並列3要素 (Three Parallel Items)
- Relation: three peers of the same kind, compared on the same metric.
- Use when: three measures, pillars or options, each worth a title, a 2–3 line note and one number.
- Avoid when: 4+ items (use a 2×2 like d-swot, or d-priority-table); items happen in order (d-flow-h); items overlap (d-venn).
- Slots: exactly 3 cards, each: number, title (≤ 2 lines, ≤ 8 chars per line), note (≤ 3 lines of ~14 chars), one KPI (number + unit), two fact rows (label, value). Mark one card `.is-key`.
- Adapt: drop `.facts` if there is no second-level data; keep the KPI unit at about 1/3 of the number. Never put 4 cards in this row.

### d-compare-2 · 左右比較 (As-is / To-be)
- Relation: two states of the same thing, compared item by item.
- Use when: current vs target process, our product vs competitor, plan A vs plan B, with 3–5 shared comparison axes.
- Avoid when: the change is a sequence of steps with times (d-before-after); more than 2 options (d-multi-compare).
- Slots: 2 column headers (JP name + Latin tag); 3–5 rows, each: axis label, left cell, right cell (≤ 2 lines of ~16 chars). The last row may be a KPI row (`.kpi`).
- Adapt: the right column is the accent column (`.hd.to`, `.c.to`); for a neutral A/B comparison remove the `to` classes from both. Rows stretch to text; above 5 rows drop to 20px text or split the slide.

### d-before-after · 業務改善のBefore/After (Process Before / After)
- Relation: the same process before and after a change, step by step, with time saved.
- Use when: an improvement removes or shortens steps and the headline is the time or cost saved.
- Avoid when: the two states have no shared steps (d-compare-2); only the total matters (d-bar).
- Slots: 3–6 steps in one row per lane, each: name, minutes (or `.cut` with a ≤ 2-line "how it disappears"); a total per lane; delta text (absolute and %).
- Adapt: steps keep the same column in both lanes; a removed step stays in place as a dashed `.cut` box. For 6 steps change `repeat(5, 1fr)` to `repeat(6, 1fr)`; beyond 6 the names no longer fit at 24px. The thick arrow and the AFTER total carry the accent.

### d-flow-h · 横フロー (Horizontal Steps)
- Relation: a sequence of 3–6 steps with a short description and one value each.
- Use when: a process or project with short text per step, especially when one step dominates (the bottom bar shows each step's share).
- Avoid when: each step needs 2+ sentences or an owner (d-flow-v); the steps loop back (d-cycle).
- Slots: 3–6 steps, each: STEP number, name (≤ 6 chars), note (≤ 3 lines of ~9 chars), value + unit, share. The bar takes `data-days` (comma list) and `data-key` (index); `drawFlowBar` sizes segments by value.
- Adapt: change `repeat(5, 1fr)` to the step count. Delete `.bar` and `.bar-lb` when the values are not additive. The first chevron has a flat left edge.

### d-flow-v · 縦フロー (Vertical Steps with Text)
- Relation: an ordered procedure where each step carries a deadline, a sentence or two and an owner.
- Use when: manuals, incident response, approval routes, onboarding checklists.
- Avoid when: steps are short labels (d-flow-h); stages grow in level (d-stairs).
- Slots: 3–6 rows, each: timing (≤ 6 chars), number, title (≤ 12 chars), description (≤ 2 lines of ~24 chars), owner.
- Adapt: rows share the height (`grid-auto-rows: 1fr`); with 6 rows keep descriptions to one line. Mark one row's `.when`, `.node` and `.ttl` with `.is-key`. The connector runs through the node centres; `.first`/`.last` trim it.

### d-cycle · サイクル (Cycle)
- Relation: steps that repeat, where the output of the last feeds the first.
- Use when: PDCA-style operations, flywheels, feedback loops, with the loop's result in the centre.
- Avoid when: the process ends (d-flow-h); elements influence each other in all directions (d-hub).
- Slots: 2–6 nodes, each: name (≤ 10 chars), sub (1–2 lines of ~12 chars); centre: label, value, unit, comparison line.
- Adapt: `drawCycle(svg, data)` draws circles for 2–3 nodes and rectangles for 4+ (CONE rule), lays nodes on an ellipse, and trims each arrow to the shape edges by sampling, so arrows always meet the shapes. For 5–6 nodes the rectangles narrow to 340px; keep names to ~9 chars. The centre value is the accent.

### d-pyramid · ピラミッド (Pyramid)
- Relation: a hierarchy where higher levels hold fewer members but more weight.
- Use when: customer tiers, Maslow-type levels, org layers, with 2 numbers per tier.
- Avoid when: the levels are a narrowing process over time (d-funnel-shape); levels are growth stages (d-stairs).
- Slots: 3–5 tiers, top first, each: name (≤ 6 chars), condition (≤ 12 chars), two percentages; 3 header labels; `key` = tier index to accent.
- Adapt: `drawPyramid(svg, data)` makes equal-height tiers of a single triangle (a shape, not proportional), with a leader line from each tier to its table row. Column x positions live in `col`; rename the two value columns via `headers`. Values are rendered with a % unit; change the `'%'` tspan for other units.

### d-funnel-shape · じょうご型 (Funnel)
- Relation: a population narrowed stage by stage, with the conversion between stages.
- Use when: recruiting, sales pipeline, user activation, where the headline is the weakest stage.
- Avoid when: the stages are a hierarchy, not a sequence (d-pyramid); exact proportions matter (d-funnel).
- Slots: 3–6 stages, each: name (≤ 8 chars) and count; `unit`; `rateLabel`.
- Adapt: `drawFunnelShape(svg, data)` computes each stage-to-stage rate, accents the lowest rate and tints the stage it leads into. Band widths taper linearly (a shape, not proportional to counts). With 6 stages each band is ~93px high; keep names short.

### d-stairs · 階段 (Stairs / Staged Growth)
- Relation: stages that build on each other and raise the level each time.
- Use when: roadmaps, maturity models, phased rollouts, with the current or next stage highlighted.
- Avoid when: the order is a procedure with owners (d-flow-v); the stages are dated tasks (d-gantt).
- Slots: 3–5 steps, each: STEP label, year, title (≤ 8 chars), description (≤ 3 lines of ~12 chars), status word.
- Adapt: heights are set per `nth-child` (44/60/76/92%); for 3 steps use 52/72/92%, for 5 steps 36/50/64/78/92% and change `repeat(4, 1fr)`. Keep the lowest step tall enough for its text (≥ 260px).

### d-include · 包含 (Inclusion)
- Relation: A belongs to B belongs to C; inner sets inherit the outer rules.
- Use when: data classification, market definition (as nested scope with rules), org units inside a group.
- Avoid when: the sets only partly overlap (d-venn); the point is relative size (d-mekko or d-bar-rank).
- Slots: 2–4 nested levels, each: JP name + Latin tag, examples (≤ 2 lines), rule (one line, or a 2–4 item list on the innermost level); optional volume line in the innermost box.
- Adapt: nest another `.box` inside the innermost to add a level; past 4 levels the rows crowd. The innermost box carries the accent.

### d-venn · ベン図 (Venn / Overlap)
- Relation: three conditions and the region where all of them hold.
- Use when: choosing a target segment or a strategy as the intersection of strengths, demand and gaps.
- Avoid when: one set sits fully inside another (d-include); only two sets (d-compare-2, or adapt d-venn as described below); sets are scored, not overlapping (d-matrix-2x2).
- Slots: 3 sets, each: name (≤ 8 chars), 2-line sub (~13 chars per line); core: 2 short lines inside the overlap (≤ 5 chars each), a callout name and 2-line description.
- Adapt: `drawVenn(svg, data)` clips the accent fill to the exact triple intersection with nested clip paths, so the highlight always matches the overlap. Circles use `mix-blend-mode: multiply` on `--d-tint`, so overlaps darken without extra colours; on a dark style switch the blend to `screen`. Radius and offsets are fixed for 3 sets; a 2-set version needs new centres and one clip.

### d-hub · ハブ＆スポーク (Hub and Spoke)
- Relation: one central element exchanging with several peripheral ones.
- Use when: a platform connecting partners, a PMO and its teams, a data hub and its systems.
- Avoid when: peripheral elements also link to each other in ways that matter (draw a network instead); the relation is a loop (d-cycle).
- Slots: hub label (≤ 2 lines of ~5 chars) and sub; 4–8 nodes, each: name (≤ 8 chars) and one sub line (≤ 13 chars); `startDeg` for the first node's angle.
- Adapt: `drawHub(svg, data)` places nodes on an ellipse and clips each spoke to the circle and the rectangle edge (8px gap), with arrowheads at both ends for two-way flows; remove `marker-start` for one-way. With 5 nodes use `startDeg: -90`; with 6, `-60` avoids a node directly above the hub. Above 8 nodes the boxes collide at 320px wide.

## Logic patterns · 論理・フレームワーク

### d-matrix-2x2 · 優先度マトリクス (Priority matrix)
- Relation: Positions options on two continuous axes (impact × feasibility); bubble area encodes a third quantity (cost).
- Use when: Choosing which of 4–8 initiatives to start first, and the reason is "high impact and doable".
- Avoid when: The options need exact values compared side by side (use d-priority-table), or there is no real third quantity (drop bubble sizing and use equal dots).
- Slots: Axis labels with low/high ends, quadrant midpoints, 4 quadrant names; 4–8 items, each: name (≤8 chars), x, y, cost, optional `pick`, optional `side: 'l'` to put the label on the left.
- Adapt: `drawMatrix(svg, data)` reads the body size, so it resizes with the frame. y max rounds up from data × 1.15. Bubble area is proportional to cost; legend values come from `legend`. Only picked items and the top-right quadrant use the accent. Beyond 8 items labels start to collide; move labels with `side` or split the chart.

### d-logic-tree · ロジックツリー (Logic tree)
- Relation: MECE decomposition of one result into causes, with each leaf's contribution as a bar.
- Use when: Explaining where a variance (profit drop, cost overrun) comes from, 2–3 levels, 4–8 leaves.
- Avoid when: The children multiply or add to the parent as a formula with KPIs (use d-kpi-tree); causes are sequential rather than parallel (use d-cause-chain).
- Slots: `unit`, 4 column headers, a root `{label, value, children}`; leaves `{label, value, pick?}`. Values are signed numbers.
- Adapt: `drawLogicTree(svg, data)` lays out leaves on equal rows and centers parents on their children. Bars scale to the largest |leaf|; positive leaves render as outlined bars. Column x positions are fixed in `cols` for a 1680px body; widen `cols` if labels exceed about 16 characters. Max about 8 leaves at this height.

### d-kpi-tree · KPIツリー (KPI tree)
- Relation: KGI broken into KPIs as an equation (× or ＋ per level), each node with actual and plan.
- Use when: Showing which KPI caused a KGI miss, and the arithmetic must hold (visitors × CVR × AOV = sales).
- Avoid when: The breakdown is qualitative (use d-logic-tree), or only one KPI matters (a single stat slide).
- Slots: Root `{tag, label, value, unit, plan, op, children}`; each node `{label, value, unit, plan?, op?, dp?, pick?}`. `op` is the operator between that node's children.
- Adapt: `drawKpiTree(svg, data)` computes "計画比" as a pt difference for `%` units and a ratio otherwise. Make the data consistent yourself; the function does not check the arithmetic. 4–8 leaves; 3 levels. Units 円 get thousands separators; set `dp` to keep trailing decimals (8.0%).

### d-cause-chain · 因果の連鎖 (Cause → effect → So What)
- Relation: A linear causal chain ending in the implication or action.
- Use when: 3 links plus a So What, each link backed by one number.
- Avoid when: Causes branch or run in parallel (use d-fishbone or d-logic-tree); more than 5 steps (split into two slides).
- Slots: 3–4 steps plus 1 So What box; each: tag (原因/影響/結果), metric + unit, ≤2-line caption, ≤4-line narrative broken by hand at 文節, one evidence line.
- Adapt: CSS grid `1fr 72px 1fr ...`; the last column is wider and filled with the accent. Add or remove a step by editing the grid template and the arrow cells. Arrow connectors are CSS and always meet the box edges. Connector words (だから/つまり) sit above each arrow.

### d-fishbone · フィッシュボーン (Fishbone / Ishikawa)
- Relation: Many candidate causes grouped by category, pointing at one problem.
- Use when: Root-cause brainstorming with 4–6 categories (4M, 6M), 2 causes each, and one cause flagged as primary.
- Avoid when: You already know the causal sequence (use d-cause-chain), or causes are quantified contributions (use d-logic-tree).
- Slots: `head {label, value, unit, target}`; 4–6 bones `{label, causes: [{text (≤12 chars), pick?, note?}]}`; first half of bones go on top.
- Adapt: `drawFishbone(svg, data)` spaces bones evenly along the spine and places causes at 30% and 66% of each bone. With 3 causes per bone, shorten texts to about 10 characters. Accent marks the bone and the cause that carry `pick`.

### d-problem-action · 課題→施策→効果 (Issue → action → impact)
- Relation: Matched rows: each issue gets one action and a quantified effect, summed at the bottom.
- Use when: Presenting 2–4 initiatives to a decision-maker with a total impact.
- Avoid when: Actions are not one-to-one with issues (use d-logic-tree), or the need is ranking (use d-priority-table).
- Slots: 2–4 rows; each: issue (≤2 lines + 1 sub line), action (≤2 lines + 1 sub line), effect metric (before → after) and yen value; a total and a one-line investment note.
- Adapt: Grid `1fr 64px 1fr 64px 0.9fr` with `repeat(N, 1fr)` rows; change N for the row count. Issue cells use `--d-tint`; only the total uses the accent.

### d-conclusion-3 · 結論＋3つの理由 (Conclusion + 3 reasons)
- Relation: One recommendation supported by three parallel reasons, each with a number.
- Use when: Executive summary or the opening slide of a proposal.
- Avoid when: Reasons are a chain (use d-cause-chain), or there are 5+ points (use d-flow-v or a numbered list).
- Slots: Recommendation (≤3 lines), one support line, one goal metric; 3 reasons: heading (≤14 chars), 2-line evidence, metric + unit + caption.
- Adapt: Left column fixed at 560px; reasons share the remaining width in equal rows. Two or four reasons work by changing `repeat(3, 1fr)`. The accent fills the conclusion block only; reason numbers use the accent as markers.

### d-swot · SWOT (SWOT)
- Relation: 2×2 of internal/external × plus/minus factors, closed by one cross strategy.
- Use when: Strategy review where one S×O (or W×T) move follows from the grid.
- Avoid when: The audience needs the competitor and customer view (use d-3c), or there is no conclusion (a SWOT without the strategy line is a list).
- Slots: 4 quadrants × 3 bullets (≤18 chars each), 1–2 bullets marked `hot`, one strategy line naming the combination.
- Adapt: Grid with a 56px vertical axis column (`.tate`-style vertical labels). External quadrants use `--d-tint`. Keep 3 bullets; 4 fit only at 22px.

### d-3c · 3C分析 (3C analysis)
- Relation: Three parallel views (customer, competitor, company) converging into one key success factor.
- Use when: Deriving a KSF or positioning from market facts.
- Avoid when: Internal and external factors need a sign (use d-swot).
- Slots: 3 cards: Latin kicker, name, ≤3-line finding, one metric + unit + caption; a KSF headline and one support line.
- Adapt: `drawConverge(wrap)` measures the cards and the KSF box and draws the bus connectors, so connectors stay attached when text or grid changes. Works for 2–4 columns if the grid columns change.

### d-pdca · PDCA (PDCA cycle)
- Relation: Four-step loop with the current phase highlighted.
- Use when: Reporting one improvement cycle and what the Check phase found.
- Avoid when: The steps do not loop (use a flow); only 2–3 steps (d-cycle).
- Slots: 4 phases: letter, name, ≤2-line text, metric + unit + caption; the current phase gets class `now`; hub label.
- Adapt: 3×3 grid with arrow cells in the gaps; arrows are CSS and always span the gap from edge to edge. The grid order is P D / A C, so arrows run clockwise. Keep phase text to 2 lines at 24px.

### d-priority-table · 施策の優先順位表 (Priority table)
- Relation: Options compared on several criteria, with the recommended one highlighted.
- Use when: 3–6 options and the decision depends on exact values (effect, duration, investment, payback, risk).
- Avoid when: Only two criteria matter (use d-matrix-2x2).
- Slots: Rows `{name, desc, effect, months, invest, risk: 低|中|高, verdict, pick?}`.
- Adapt: `drawPriorityTable(tbody, rows)` computes payback as invest ÷ effect and scales effect bars to the largest effect (62% of the cell). Row height 118px fits 5 rows; use 92px for 6. Only the `pick` row uses the accent.

## Chart patterns · グラフ

Every chart is drawn by one plain function, `draw<Name>(svg, data)`, that reads the svg's own box (`clientWidth`/`clientHeight`, fallback 1680×620), sets the viewBox and computes every scale from `data`. Swap the data object and the chart redraws correctly. Colors come only from `--d-*` tokens through CSS classes; the accent goes on the one item flagged `accent: true` (or the computed focus). CSS classes override SVG presentation attributes, so text alignment for a class lives in the CSS.

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
- Adapt: the value axis always starts at 0 and the top is a nice step (max / 5). Bar width caps at 150px. Callout needs about 100px above the tallest bar, which the top margin provides.

### d-bar-rank · 横棒ランキング (Horizontal bar ranking)
- Relation: size order among unordered categories.
- Rule: horizontal bars for comparing sizes of categories, sorted largest first, because long Japanese labels read left to right and need room.
- Use when: survey answers, reasons, regions, products; 3–8 items.
- Avoid when: items are periods (use d-bar); parts of a whole that sum to 100% across several groups (use d-stacked-100).
- Slots: `unit`; `items` of `{label (≤ 12 chars), v, accent?}`; `keepOrder: true` to keep the given order (e.g. その他 last); optional `labelWidth`.
- Adapt: sorted descending by default with rank numbers. The label column widens with the longest label. Bars scale to the maximum (no axis), values sit at bar ends.

### d-line-forecast · 実績と予測の折れ線 (Line, actual and forecast)
- Relation: trend over a continuous time axis, actual versus forecast, with a turning point.
- Rule: lines for trends over many periods; actual is a solid line, forecast is a dashed line on a tinted zone; annotate the turning point with its cause.
- Use when: 6–20 time points, a plan or forecast continues from actuals, one event changes the slope.
- Avoid when: few periods where each value counts (use d-bar); more than 3 series (split the slides, or use d-area-stacked for parts of a total).
- Slots: `unit`, `points` of `{t, v}`, `forecastFrom` (last actual `t`), `turn {t, text:[headline, note], y?}`, optional `labelAt` (list of `t` to label), optional `forecastLabel`.
- Adapt: the forecast end value is labelled in the accent automatically. The turning-point note sits above-left of the point; move it with `turn.y` if the line passes there. Right margin holds the end label (about 8 characters).

### d-waterfall · ウォーターフォール (Waterfall / bridge)
- Relation: how a start value becomes an end value through signed contributions.
- Rule: a bridge for explaining a change between two totals; increases in a neutral shade, decreases in `--d-neg`, the end total in the accent.
- Use when: profit or cost bridges, budget versus actual, 3–7 drivers.
- Avoid when: the drivers do not add up to the change (use d-bar-rank of impacts); a time series of totals (use d-bar).
- Slots: `unit`; `start {label, v}`; `steps` of `{label, v}` with negative v for decreases; `end {label, accent?}`. The end value is computed. Labels may use `\n` for a second line.
- Adapt: totals start at 0; dashed connectors run at each running total. Up to about 8 bars at 1680px; for more, merge small drivers into その他.

### d-funnel · ファネル (Funnel)
- Relation: sequential stages where each keeps a share of the previous one.
- Rule: a funnel only for stages that are true subsets in order; show the conversion and the drop-off between every pair and mark the weakest conversion, not the largest stage.
- Use when: sales pipelines, sign-up flows, recruitment; 3–6 stages.
- Avoid when: stages are not subsets of each other (use d-bar-rank); comparing several funnels (use a table or d-stacked-100 of outcomes).
- Slots: `unit`; `stages` of `{label (≤ 8 chars), v}`; optional `focus` (index of the transition to highlight; defaults to the lowest conversion).
- Adapt: bar widths are linear to the first stage (minimum 8px), so very small final stages stay honest and thin. Counts and the share of the first stage sit in fixed columns at the right.

### d-bubble · バブルチャート (Bubble)
- Relation: three variables at once, two positions and a size.
- Rule: bubbles only when the third variable (size) changes the conclusion; size is area-proportional, with a reference circle.
- Use when: business portfolios, product positioning with revenue; 4–8 items.
- Avoid when: size adds nothing (use a plain scatter or d-scatter-path); more than 10 items (labels collide; use a table).
- Slots: `x {label, unit}`, `y {label, unit}`, `size {label, unit, key?}`; `items` of `{label, x, y, s, accent?, pos?}` where `pos` is `r`, `l`, `t` or `b` for the label side.
- Adapt: domains add one step of padding when a value lies near the edge; y starts at 0. Max radius is min(90, plot height / 5) or `maxR`. Set `pos` per item to resolve label collisions.

### d-heatmap · ヒートマップ (Heatmap)
- Relation: density across two categorical dimensions.
- Rule: shades of one color in five bins for density; never a rainbow scale. The peak cell (or `focus`) takes the accent.
- Use when: weekday by hour, region by month, segment by product; up to about 8 rows and 14 columns with values printed.
- Avoid when: one dimension is continuous time and the trend matters (use d-line-forecast); fewer than about 12 cells (use a table).
- Slots: `rows` labels, `cols` labels, `values` (rows × cols matrix), `unit`, `cellUnit`, optional `focus [row, col]`, optional `opacity` (bin shades).
- Adapt: bins are equal-width between min and max. Values print in every cell; past about 14 columns drop the numbers and rely on the key. Cells use `--d-ink` with fill-opacity, so a style's ink color sets the hue.

### d-stacked-100 · 100%積み上げ横棒 (100% stacked bar)
- Relation: composition of a whole, compared across groups.
- Rule: use this instead of pie charts. A pie is allowed only for 5 items or fewer when the question is whether one part is a majority; any comparison of composition across groups, or more than 5 parts, goes here.
- Use when: share by age, region or year; 2–7 rows, 2–5 parts.
- Avoid when: absolute sizes of the groups also matter (use d-mekko); the composition changes over many periods (use d-area-stacked).
- Slots: `series` of `{key, accent?}` in stacking order (put the accent part first so it is left-aligned and comparable); `rows` of `{label, v: [...]}`. Rows are normalized to 100%.
- Adapt: percentages print when a segment is at least 64px wide. Non-accent shades run `--d-sub`, `--d-mid`, `--d-tint`, `--d-rule`, so at most 5 parts.

### d-mekko · マリメッコ (Marimekko)
- Relation: market size by segment and share within each segment, in one picture (area = size × share).
- Rule: use a mekko when both the size of each segment and the share inside it matter; put the total market size under the chart.
- Use when: market maps, share by customer size or region; 3–6 segments, 2–5 players.
- Avoid when: segment sizes are similar (use d-stacked-100); more than 6 segments (narrow columns lose labels).
- Slots: `unit`; `players` of `{key, accent?}` stacked bottom-up (accent first so it sits on the baseline); `segments` of `{label, size, share: [...]}`. Shares are normalized to 100%.
- Adapt: column width is proportional to `size` with 6px gaps. Cell labels print when a cell is at least 64×34px; smaller cells stay unlabelled, so state that value in the headline or lead if it matters.

### d-scatter-path · 散布図の軌跡 (Connected scatter)
- Relation: how two measures move together over time.
- Rule: connect yearly points of two measures when the relationship between them, not either one alone, is the story; mark the turning point and color the path after it in the accent.
- Use when: price versus volume, cost versus quality over 5–12 periods.
- Avoid when: only one measure matters (use d-line-forecast); the audience is unfamiliar with scatter plots and the message is a simple trend (use two small d-bar charts).
- Slots: `x {label, unit}`, `y {label, unit}`; `points` of `{t, x, y, pos?}` in time order; `turn {t, text:[headline, note], dx?, dy?}` with dx/dy the offset of the note from the point (negative dx puts it on the left).
- Adapt: domains are nice steps with padding. Each segment ends in an arrowhead that stops short of the next point. Set `pos` per point to keep year labels off the path.

### d-area-stacked · 積み上げ面グラフ (Stacked area)
- Relation: how a total and its parts change over time.
- Rule: stacked areas for the trend of a total and its parts over many periods; flag the one part the headline is about and label every layer at the right end.
- Use when: revenue by business, energy mix in absolute terms; 5–15 periods, 2–5 series.
- Avoid when: only the shares matter (use d-stacked-100 per period); a single series (use d-line-forecast); many series crossing each other.
- Slots: `unit`, `years`, `series` of `{key, v: [...], accent?}` stacked bottom-up.
- Adapt: right-end labels keep at least 34px apart and slide up when layers are thin. The total prints above the last period. Non-accent shades run `--d-sub`, `--d-mid`, `--d-tint`, `--d-rule`.

## Composite patterns · 複合レイアウト

All charts here are drawn by one function per pattern from an inline `data` object, after `document.fonts.ready` (pill and label widths are measured with `getBBox`). Swap `data` and the scales, positions and connectors follow. Colors come only from `--d-*` tokens through scoped CSS classes.

### d-gantt · ガントチャート (Gantt with decision gates)
- Relation: phases over time, with milestones on the phases and a decision gate that splits the plan.
- Use when: a project plan where one approval or Go/No-Go date controls everything after it.
- Avoid when: several independent streams run in parallel with fuzzy dates (use d-roadmap); only dated events matter, no durations (use d-timeline).
- Slots: `start {y, m}`, `months` (6–18); 3–7 phases, each `name`, `owner`, `s`, `e` in month units (fractions allowed); 0–5 milestones `{label, at, row}`; 1–2 gates `{label, at}`.
- Adapt: rowH 96 fits 5 phases; at 7 phases drop rowH to 72 or remove the lead. Milestone labels sit above the bar and switch anchor near the edges. Only the gate is accent; bars stay `--d-mid`.

### d-swimlane · スイムレーンの承認フロー (Swimlane approval flow)
- Relation: who does which step, in what order, with branches and returns between departments.
- Use when: approval or hand-off flows across 3–5 departments, with conditional branches (amount thresholds) and a send-back.
- Avoid when: one actor only (d-flow-h or d-flow-v); more than 6 steps or 5 lanes (split into two slides).
- Slots: `steps` (3–6 column headers), `lanes` (3–5), nodes `{id, lane, col, text ('\n' for the 文節 break), key?}`, edges `{from, to, label?, key?, back?}`.
- Adapt: routing rules are fixed. Same lane goes straight; forward goes right, down or up in the gap after the source column, then into the target's left side; same column goes vertical; `back` runs along the top of the target lane into its top. Keep the cells a forward edge crosses empty, and keep the source column empty above a `back` edge's source. Same-lane labels must fit the 132px gap (about 6 full-width characters).

### d-roadmap · 並行プロジェクトのロードマップ (Parallel roadmap)
- Relation: several streams side by side over coarse periods, with confirmed and undecided items.
- Use when: a mid-term plan with 3–5 streams and half-year or quarterly periods, where some items are not yet scheduled.
- Avoid when: exact dates and dependencies matter (use d-gantt); one stream only (use d-timeline).
- Slots: `periods` (4–6 labels); 3–5 streams, each `name` and 2–4 items `{s, e, label, key?, tbd?}` in period units.
- Adapt: `tbd` draws a dashed outline with sub-colored text; `key` is the one accent item. An item one period wide holds about 12 characters at 22px. Items in one stream must not overlap (one track per stream).

### d-value-chain · 業界構造マップ (Value chain by player type)
- Relation: industry size per stage of the value chain and per player type, as area.
- Use when: showing where the money sits across stages and which player type dominates a stage.
- Avoid when: exact comparison of values is the point (d-bar-rank or d-priority-table); only one player type (use a single bar chart).
- Slots: `stages` (4–6), `players` (2–4), `values` matrix (players × stages, same unit), `key [row, col]`.
- Adapt: square side is `sqrt(v / max) × maxSide`, so area is proportional across the whole matrix. Squares share a baseline per row. Column totals are computed. At 6 stages the chevron labels need ≤ 7 characters.

### d-zoom · 全体＋拡大 (Overview plus zoom)
- Relation: a long trend on the left and a finer-grained close-up of one window on the right, linked by dashed lines.
- Use when: the finding lives in a short period of a long series (a spike after a price change, a seasonal dip).
- Avoid when: the whole series tells the story (d-line-forecast); the two panels have unrelated data.
- Slots: `full {title, unit, labels (blank to skip), values}` (12–36 points); `window [i0, i1]`; `detail {title, unit, labels, values (6–16), highlight [j0, j1], event {at, label}}`.
- Adapt: both y scales round up to a nice number. The window rectangle and the right frame share top and bottom, so the connectors stay horizontal. Accent covers the window outline, the connectors and the highlighted bars.

### d-cost-actions · コスト内訳と施策 (Cost waterfall with action table)
- Relation: how each action reduces a cost base, the actions themselves, and the total effect.
- Use when: a cost-reduction plan with 3–6 actions whose sizes, owners and start dates must be read together.
- Avoid when: the cost components themselves are the point (use a stacked bar or a breakdown waterfall); actions have no amounts (use a table).
- Slots: `base`, `baseLabel`, `afterLabel`, 3–6 actions `{code, name, value, start, owner}` in one unit.
- Adapt: the y axis starts at `floor((after − 0.6 × cut) / 5) × 5`, so small steps stay visible. White bands mark the broken axis, and the note must say where the axis starts. The table, the totals and the reduction rate are all computed from `data`.

### d-multi-compare · 複数対象の比較 (Stacked comparison with shared header)
- Relation: 3–5 candidates compared on the same 3–5 criteria, each criterion on its own shared scale.
- Use when: vendor or option selection where the reader compares down each column.
- Avoid when: criteria are qualitative (use a table with ○△×); more than 5 candidates (use a sorted bar chart per criterion).
- Slots: criteria `{label, unit, better: 'low' | 'high'}`; items `{name, sub, v[], pick?}`.
- Adapt: each column scales to its own max. `最良` marks the best value per column, using `better`. The picked row gets the accent-tint band and accent bars.

### d-pricing-3 · 料金3プラン (Three-plan pricing)
- Relation: three tiers that build on each other, with one recommended tier.
- Use when: a price list with 3 plans and 3–5 features each.
- Avoid when: plans differ on many line items (use a feature table); 4 or more plans (use a table).
- Slots: per plan `name`, target line, price, unit, 3–5 features (first one may be `.base`, "下位プランの全機能"), adoption share. One plan gets `.pick` and the `.badge`.
- Adapt: the price is 100px against a 28px yen sign and 24px unit, so keep the number 3–4× its unit. The badge sits on the top border. Features over 15 characters wrap and push the share line down.

### d-kpi-cards · KPIカード6枚 (Six KPI cards)
- Relation: six independent headline metrics for one period.
- Use when: an earnings or monthly summary where one metric is the headline and five support it.
- Avoid when: the metrics need trends (add sparklines or use a chart); more than 6 (split, or use a table).
- Slots: 6 cards, each label, number, unit, one comparison line. One card gets `.key`.
- Adapt: number 108px against a 30px unit (3.6×). At 5 or more digits, drop the number to 92px. Grid is 3 × 2. Do not use 4 per row.

### d-case · 導入事例 (Case study)
- Relation: customer profile, measured before and after, the customer's own words, and why it worked.
- Use when: a sales deck needs one customer story backed by two numbers.
- Avoid when: no measured outcome exists (use a quote slide); several customers (use a logo grid with one metric each).
- Slots: client name and profile line; 1–3 metrics `{label, unit, before, after}`; a quote of 2 lines with attribution; exactly 3 reasons, each a title and a 2-line explanation.
- Adapt: each before/after pair scales to its own max, and the change percentage is computed. The quote sits at the bottom of the left column. If you have 3 metrics, shorten the quote to one line.

### d-timeline · 沿革・年表 (History timeline with metric)
- Relation: yearly metric bars above a year axis, with key events hanging below.
- Use when: a company history where the events explain the shape of the growth.
- Avoid when: more than 16 years (bin to 2-year steps or use a line chart); events cluster in adjacent years (use a vertical list).
- Slots: `from`, `to` (8–16 years), `sales {year: value}`, `salesLabel`, `keyYear`, 4–7 events `{year, title, sub, key?}`.
- Adapt: events alternate between two levels. Keep events at least 2 years apart on the same level. Labels near the right edge flip to end-anchored automatically.
