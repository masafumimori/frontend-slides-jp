# Corporate Mono preview

White content slides and one corporate color (bengara red). The color appears in three roles only: full-bleed cover and gate panels, the 88px chapter band on the left of content slides, and the shades of a chart.

## Palette

- `--brand` #9C3A21. Cover ground, gate panel, chapter band, key bar, hero number.
- `--ink` #1E1A17. Text and structural rules on white.
- `--ink-2` #6B635D. Labels, notes, page numbers.
- `--paper` #FFFFFF. Content ground. `--rule` #DCD5CF for minor rules.
- `--chart-1` #E8D2C8 and `--chart-2` #C98A73. Baseline and secondary bars.

## Fonts

`https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@400;500;700&family=Hanken+Grotesk:wght@300;400;500;600&display=swap`

IBM Plex Sans JP for all Japanese. Hanken Grotesk (class `.en`) for English display lines, numbers, chapter numbers and page numbers.

## Signature moves

1. Two layers. Brand-color full bleed for cover and chapter gates, white for everything else.
2. Left chapter band on content slides: logo mark, chapter number, vertical chapter name in white.
3. Boxed breadcrumb top left (`02 | 事業と実績 | 導入効果`), company name top right, `10 | 24` bottom right.
4. Light Hanken Grotesk 300 at huge sizes (156px cover, 340px gate number, 248px KPI) paired with a bold 60 to 66px Japanese line.
5. Charts in shades of the one brand color; only the bar the headline is about is full `--brand`.

## Cover recipe (1920×1080)

- Ground `--brand`, all text white.
- Logo mark 44px plus wordmark (Hanken 600 34px) and Japanese company name (17px, left rule) at left 120px, top 96px.
- English display at left 120px, top 318px: Hanken 300, 156px, line-height 1.0, tracking -0.01em, two lines with a manual break.
- Japanese copy 56px below: Plex 700, 60px, line-height 1.45, two lines with a manual break.
- Right block from left 1196px to right 104px, top 318px: a content-specific visual in white lines only (the reference uses a progress ledger of 7 rows, 66px each).
- Meta row at bottom 104px: deck type, version, audience, 20px, separated by 50% white rules.
- Page number `01 | 24` at bottom 44px, right 104px.
