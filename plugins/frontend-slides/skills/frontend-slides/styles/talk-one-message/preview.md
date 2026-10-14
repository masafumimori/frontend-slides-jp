# One-Message Talk (1枚1メッセージの登壇)

## Palette
- Ground `#F0F2F5` (light gray-blue, also `--stage-bg` and `--slide-bg`)
- Ink `#0D2A4A` (navy, all headings and body)
- Sub ink `#5E6E82` (captions, scales, the folio title)
- Accent `#E2621B` (orange, the one word or number that carries the message)
- Ghost outline `rgba(13,42,74,.34)` (minute cells not spent)

## Fonts
`https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;700;900&family=Noto+Sans+JP:wght@500;700;900&display=swap`

Stack `"Inter Tight", "Noto Sans JP", sans-serif`, so Latin and figures set in Inter Tight and kana and kanji in Noto Sans JP. Headings 900 with `palt` and tracking 0.

## Signature moves
1. One conclusion per slide, set navy 900 at the top left, broken by hand into 2 or 3 lines at phrase boundaries.
2. Minute cells. Every duration is a row of equal cells, 1 cell = 1 minute. Spent minutes are filled, unspent ones are outlined.
3. The talk clock replaces page numbers. A row of 25 small cells at the bottom right shows where the speaker is in the slot.
4. One accent per slide, orange, on the word or number the audience should leave with.
5. Nothing decorative. No icons, no photos, no boxes around text.

## Cover recipe (1920×1080)
- Meta row at top 128px, left 160px and right 160px. Event and track on the left, slot time on the right. 26px, 700, sub ink.
- Title at left 160px, top 196px. 200px, 900, line-height 1.14, two lines broken by hand. Figures in Inter Tight at 1.04em. The "after" number and its unit in accent.
- Minute meter at top 712px, full width between the 160px margins, 76px tall. Total cells = the "before" minutes; the "after" minutes are filled accent, the rest are ghost outlines. Scale labels 26px under it, the after value in accent under its last cell, the total at the right edge.
- Speaker at left 160px, bottom 96px. Name 48px 900, organization 30px 500 sub ink, baseline aligned, 36px apart.
- The cover has no talk clock.
