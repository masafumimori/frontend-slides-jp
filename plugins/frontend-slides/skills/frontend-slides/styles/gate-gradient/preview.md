# Gate Gradient (グラデーション扉): preview

Palette: pine `#04302B` (gate ground), shu vermilion `#DE4A16` (the one accent), ink `#141816`, ink-2 `#565C59`, line `#DADDDB`, paper `#FFFFFF`. Gate gradient stops: `#021816 → #04302B → #1B6757 → #9DB698 → #F2A672 → #DE4A16 → #5A1A08 → #0B0C0B`, interpolated `in oklab` at 177deg.

Fonts: `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Bricolage+Grotesque:opsz,wght@12..96,200;12..96,300;12..96,500;12..96,700&display=swap`

Signature moves:
1. The gradient lives only on gates (cover, chapter, statement). It is a near-horizontal band: pine sky, a pale mint-to-peach seam, a vermilion horizon, then near-black ground. Fractal-noise grain at 22% overlay on top.
2. Very thin Latin display (Bricolage Grotesque 200, opsz 96, tracking -0.035em to -0.06em) set huge against bold Japanese (Noto Sans JP 700).
3. Chapter gates carry a 940px chapter numeral bleeding off the top right.
4. Content slides are white: one-line conclusion headline at top left, the key phrase in vermilion, nothing else colored.
5. Numbers are thin Latin in vermilion with a bold Japanese unit beside them.

Cover recipe (1920×1080, class `slide gate cover`):
- Wordmark (circle glyph + name, Bricolage 500, 30px) at left 112, top 96. Date kicker (Bricolage 300, 24px, tracking .14em, 80% opacity) at right 112, top 102.
- English display "Company Deck": Bricolage 200, 212px, line-height 1, tracking -0.035em, left 104, top 196.
- Japanese claim as `h1`: Noto Sans JP 700, 80px, line-height 1.32, two lines broken by hand at the comma, left 112, top 486.
- Meta row at bottom 84: company and document name left, domain right, 22px, 80% opacity.
- Everything white on the gradient; no vermilion text on the cover.
