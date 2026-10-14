# Recruit Guide preview

A4 recruiting brochure. White pages, documentary photos of people at work, heavy black Japanese gothic, and one sun-yellow name tab that always sticks to an edge. Needs photos of employees (or generated ones, captioned 「生成画像・架空の人物」).

## Palette

- `--sun` #FFC629. The name tab and nothing else: person tabs, chapter tab, the one hanging tab on a number, the entry tab, the marker under one headline word, the key node in a timeline. Never text on white (1.6:1).
- `--ink` #1D2125 all text, rules and the darkest chart shade (10.3:1 on sun). `--mute` #5D636B captions, notes, sources (6.1:1 on white). `--paper` #FFFFFF.
- Chart shades are `color-mix` of ink: 70% (white text), 30% and 16% (ink text).

## Fonts

`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Bricolage+Grotesque:wght@500;600;700;800&display=swap`

Noto Sans JP 900 for headlines, names and the cover copy; 700 for labels. Zen Kaku Gothic New for body and captions (soft, friendly). Bricolage Grotesque 700–800 for numbers, years, times, kickers, folio and the logotype.

## Signature moves

1. Name tab: a flat yellow rectangle, square corners, attached to the bottom edge of a photo, with 所属 (18px 700), 名前 (30–34px 900) and 入社年 (`2021` Bricolage 24px + 年 新卒入社). It is the only yellow on a photo page.
2. Chapter tab: the same yellow, 60×220 on the right page edge, vertical `01 メッセージ`, one step (230px) lower per chapter like a thumb index.
3. Marker: one headline word underlined in yellow at 0.34em thickness behind the glyphs.
4. Giant numerals: Bricolage 700 124px over a 3px ink rule, unit at about 1/3; one number per page may carry a hanging tab (`14人中14人`).
5. Entry tab: a yellow field from the left page edge to the right margin, with a 58px URL. No fake QR code.

## Cover recipe (1240×1754)

- Full-bleed photo 0–1120 (one person absorbed in work, placed right; the calmer side left). Logotype in a white box at top 72, left 96.
- Name tab at left 96 sitting on the photo's bottom edge (its bottom = 1120): 所属, 名前 34px, 入社年.
- Caption 「写真：生成画像・架空の人物」 17px mute, right-aligned at top 1132.
- One line of copy at top 1200: Noto Sans JP 900 92px, two lines, line-height 1.28.
- Meta at bottom 80 over a 2px ink rule: company name and `採用案内 2027 新卒・キャリア採用` 28px left; the fiction notice 「（架空のデータ）」 and issue date 17px mute right.
