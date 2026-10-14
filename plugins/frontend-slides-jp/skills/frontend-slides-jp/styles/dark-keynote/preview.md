# Dark Keynote preview

## Palette
- `#0F1012` stage, with a floor glow `#1B1C20` rising from below the right half
- `#F3F1EC` primary text and giant numerals
- `#C9C6BF` secondary text, `#B4B1AA` captions (7.9:1 at worst, measured)
- `#FFD23F` accent: the current product's LED, its column rule, one number per slide
- `#17181B` panel behind the current product's column, `#34363B` hairlines

## Fonts
`https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&family=Noto+Sans+JP:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500&display=swap`
Japanese in Noto Sans JP 700. Product names and numerals in Jost 200/300. Chrome labels in IBM Plex Mono 500 uppercase, tracked .16em.

## Signature moves
1. One product, rendered in SVG by a JS function (matte ceramic, perforations, a short yellow LED arc). No photos, no icons.
2. Specs as hairline Jost 200 numerals with a small Noto 500 Japanese unit beside them.
3. Yellow appears only on the current product: its LED, its table column rule, its bar, its headline number.
4. Mono chrome on every slide: top 72px, bottom 56px, 120px side margins.
5. A slow single reveal per slide: text rises 24px over .9s, the product rises 40px over 1.6s.

## Cover recipe (1920×1080)
- Top chrome at y 72: left `NAGI LABS / Product Event 2026`, right date and city, mono 20px `#B4B1AA`.
- Left column x 120, top 236, width 960:
  - product name Jost 200 196px, line-height .9, second word in Jost 400;
  - 72px below it, the promise in Noto Sans JP 700 72px, line-height 1.32, two lines.
- Spec row at bottom 132: three `dt` / `dd` pairs, label Noto 500 22px `#C9C6BF`, value Jost 300 52px, Japanese unit 24px; 1px `#34363B` dividers, 56px gaps.
- Product hero: column at x 1080, width 620; tower rendered 330px wide from top 104 with floor shadow and a fading reflection.
- Foot at bottom 56: company name note 20px left, `01 / 04` mono right.
