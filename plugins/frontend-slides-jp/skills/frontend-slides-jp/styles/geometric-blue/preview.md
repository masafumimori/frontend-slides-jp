# Geometric Blue preview

## Palette
- `--blue` #1534D6. Headline highlight, gate background, chart bar for "us", every matrix cell.
- `--ink` #0A1A5E. All text on white. Also the stage background.
- `--tint` #E9EDFD. The lightest layer fill. Lighter steps are `color-mix(in srgb, #1534D6 N%, #FFFFFF)`.
- `--white` #FFFFFF. Slide ground.

## Fonts
`https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@400;500;700&family=Archivo:wdth,wght@100..125,500..800&family=IBM+Plex+Mono:wght@400;500&display=swap`

IBM Plex Sans JP for all Japanese. Archivo (expanded with `font-stretch` 112 to 125%) for Latin labels and numbers. IBM Plex Mono for the matrix caption only. Keep the `wdth` axis in the query, or the expanded Archivo falls back to normal width.

## Signature moves
1. The motif is data. Square cells in four opacity steps of one blue, never scattered decoration.
2. The cover grid is the causal attention matrix of the cover headline's own tokens, drawn by JS, with a 6px dot in each future cell.
3. The logo is the same motif: a 3×3 lower triangle of blue squares.
4. Section gates are full-bleed blue with a 420px expanded Archivo number and a square-bullet table of contents.
5. Square corners and 2px blue borders everywhere. No radius, no shadow, no gradient.

## Cover recipe (1920×1080)
- Left column at x=120. Eyebrow at top 120: Archivo 26px/700, tracking .22em, blue, preceded by a 14px blue square.
- Headline at top 300: IBM Plex Sans JP 100px/700, line-height 1.32, tracking .02em, ink, 4 lines broken by hand. One phrase in blue (`.hl`).
- Organisation at bottom 120: name 34px/700, then a 24px subline at 70% ink.
- Right: `svg#attn` at left 1086, top 84, 720×740. 52px cells, 6px gaps, row labels to the right and vertical column labels on top, both 20px/500 ink.
- Caption at left 1086, bottom 112, width 620: IBM Plex Mono 17px, line-height 1.7, 62% ink, with a four-step legend square row above it.
- Motion: text reveals rise 24px with a 90ms stagger; matrix cells fade row by row (70ms per row, 12ms per column).
