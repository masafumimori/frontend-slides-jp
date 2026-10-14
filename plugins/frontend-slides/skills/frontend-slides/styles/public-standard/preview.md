# Public Standard preview

## Palette
- `--slide-bg` #FFFFFF. Every slide.
- `--ink` #1A1A1C. All headings, body and numbers. Also the strong 2px rule.
- `--ink-2` #55555C. Notes, axis labels, running header, secondary values.
- `--rule` #D6D6DB. 1px hairlines between rows.
- `--blue` #0A3BD1. Only the 8px top edge, small labels, chapter numbers, 4px KPI top rules and the current data series.
- `--stage-bg` #E9E9EC behind the stage.

## Fonts
`https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Noto+Sans+JP:wght@400;500;700&display=swap`

Noto Sans JP for all Japanese. IBM Plex Sans with `tnum` and `lnum` for every number (`.num`), so figures line up in columns.

## Signature moves
1. An 8px blue band across the top edge of every slide. The only wide use of blue.
2. Three rule weights: 4px blue (KPI top, agenda), 2px ink (table and list tops, axes), 1px gray (rows).
3. KPI blocks read label (22px bold), number (104px Plex 500), description (20px gray), with the unit about a third of the number.
4. Every content slide carries a running header, a footnote with the source, and `03 / 15` page numbers.
5. No shadows, no fills, no icons, no gradients. Hierarchy comes from size, weight and rules alone.

## Cover recipe (1920×1080)
- 12-column grid, 120px side margins, 24px gutter. No running header or footer on the cover.
- Columns 1 to 7, vertically centered: blue label 22px/700 (meeting and document type), 48px gap, title 108px/700, line-height 1.3, 3 lines broken by hand, then a 32px/500 period line 48px below.
- Columns 9 to 12, vertically centered: a spec list topped by a 2px ink rule. Each row is a 22px gray term and a right-aligned value (44px Plex number plus a 22px unit), rows split by 1px `--rule`.
- Bottom left at 64px: organisation 26px/700 and department 22px gray. Bottom right: a 1px-bordered document number box (`資料 1`, 18px/500) over the date in 18px gray.
- Motion: each block fades up 12px, staggered 80ms.
