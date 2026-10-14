# Color Index (章色インデックス) preview

Navy skeleton on white. Each business chapter owns one color, and a chapter slide shows only its own.

## Palette
- Base navy `#1E3348` (skeleton, cover title), ink `#1D232A` (text), mute `#6E7177`
- Slide `#FFFFFF`, paper `#F5F4F0` (closed tabs, panels), line `#DEDCD5`, line-strong `#B9B6AD`
- Chapters: 01 teal `#2B7680`, 02 terracotta `#B0563A`, 03 ochre `#997622`, 04 moss `#5C7646`

## Fonts
`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Barlow:wght@500;600;700&family=Barlow+Semi+Condensed:wght@500;600&display=swap`
Noto Sans JP for all Japanese. Barlow for Latin labels and chapter numbers. Barlow Semi Condensed for figures (`tnum`).

## Signature moves
1. Thumb index (爪見出し) on the right edge: four 40×200px paper tabs at `top: 128 + i×208`. The current chapter's tab opens to 88px in its color with the number and vertical name in white.
2. A 10px top rule across the full width in the current chapter color (navy on cover and contents).
3. `■` square markers (18px) and chart fills in the chapter color; everything else is neutral.
4. Cover and contents are the legend: all four tabs open, all four colors visible, tied to the real sales mix.
5. Big figures in Barlow Semi Condensed 600 with a small Japanese unit (`486` 236px + `億円` 64px).

## Cover recipe (1920×1080)
- Navy 10px rule at top. All four tabs open on the right edge.
- Mark at left 120, top 96: 44px four-square glyph, `IZUMIRA` Barlow 700 30px tracking 0.22em, then the Japanese company name 18px mute after a 1px divider.
- Title block at left 120, top 300: eyebrow Barlow 600 18px uppercase tracking 0.16em mute; `中期経営計画` Noto 900 124px/1.12 navy; the period `2027–2029` Barlow 600 116px below it.
- Lead at left 120, top 692: Noto 700 38px/1.55 ink, two lines, the plan in one sentence.
- Segment mix at left 1000, right 168, top 640: `■ 事業別の売上構成比` 24px with a mute 18px note, then a 168px-tall row of four blocks (gap 3px), widths = share of sales, each in its chapter color with the number (Barlow 600 20px) top-left and the share (Barlow Semi Condensed 600 56px + `%` 22px) bottom-left, all white.
- Meta at left 120, bottom 72: date, audience, presenter in 19px mute, gap 48px.
