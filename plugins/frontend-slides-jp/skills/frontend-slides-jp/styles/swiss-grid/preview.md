# Swiss Typogrid (スイス・タイポグリッド)

Palette: paper `#F5F4F0` (ground), ink `#0B0B0B` (type, rules, bars; also the stage behind the deck), signal `#E10600` (one red per slide: the cover panel, the current value, the "night" row), mute `#8C8B87` (captions, Latin sub-labels).

Fonts: `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Schibsted+Grotesk:wght@400;500;700;900&display=swap`. Japanese headings Noto Sans JP 900; numbers, labels and the running head in Schibsted Grotesk.

Grid: 12 columns × 6 rows inside x 96–1824, y 120–1008. Column 122, gutter 24, row 128. Column n starts at x = 96 + 146(n−1); row n starts at y = 120 + 152(n−1).

Signature moves:
1. The grid is drawn: 1px column lines at 8% ink (16% white on red) on the same lines the content uses. Text blocks paint their own ground, so a line stops at a text edge and never crosses a glyph.
2. Jump rate: a 272px 900-weight Japanese title or 168px Latin numbers against 17–28px text. Units are about one third of their number.
3. A running head on the column lines (y 44–92, 2px ink rule under it): series in col 1, Japanese name in col 4, section in col 7, page "02 / 04" in col 12.
4. Horizontal rules (3px ink) start every block; no boxes, cards, shadows or rounded corners.
5. Signal red is one thing per slide, never a second accent.

Cover recipe (1920×1080):
- Red panel from x 1264 (col 9 start) to the right bleed, full height. Left area cols 1–8, right area cols 9–12.
- Running head split at the panel: left head cols 1–8 (ink rule) with "第4回" in col 1 and "プログラム発表" in col 7; right head cols 9–12 (white rule) with the date in col 9 and "01 / 04" in col 12.
- Title: Noto Sans JP 900, 272px, line-height 1.0, two lines of three characters ("運河の / 建築祭"), cols 1–8, rows 1–4, top at y 106 (margin-top −14px).
- Bottom row (rows 5–6, bottom-aligned at y 1008): the Latin name once, Schibsted 900 60px uppercase in cols 1–4; lead in cols 5–8 (18px label, then 27px body, 3 lines).
- On red, in white: year "2027" Schibsted 900 218px in cols 9–12 rows 1–2; dates 96px with 34px weekday after a 3px white rule in rows 3–4; two facts (72px number + 26px unit, 20px note) under 2px white rules in rows 5–6.
- Grid lines show in the gaps only: cols 7–8 beside the title, the band between title and bottom row, and on red between the year, dates and facts.
