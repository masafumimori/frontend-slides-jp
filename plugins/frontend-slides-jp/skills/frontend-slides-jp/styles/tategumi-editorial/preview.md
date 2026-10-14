# Tategumi Editorial (縦組みエディトリアル)

Vertical Japanese set like a book page: the slide reads right to left, and only the data sits horizontally.

## Palette

- paper `#F2EEE5`: warm off-white ground
- sumi `#1D1C1A`: all text and hairlines (60% `rgba(29,28,26,.62)` for secondary text, 22% `rgba(29,28,26,.22)` for rules)
- ai `#24466B`: indigo, only for what changes or the one fact to notice
- ai-30 `#BCC6D1`: context bars in charts

## Fonts

`https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Noto+Serif+JP:wght@400;500;600&display=swap`

Noto Serif JP for every Japanese run, vertical and horizontal. EB Garamond only for Latin numerals and small-caps captions.

## Signature moves

1. Vertical runs use `class="tate"` (vertical-rl + `vpal`). `palt` has no effect in vertical text; `vpal` tightens Noto Serif JP by 18%.
2. Numerals in vertical text: 1 digit 漢数字 (四倍), 2 digits 縦中横 (`<span class="tcy">48</span>本`), 3 or more digits 漢数字 (二百年, 二〇二九年).
3. Reading order runs right to left: heading at `right:150px`, then the lead, then a 1px rule, then content.
4. Numbers and charts form one horizontal island on the left (`left:150px`, 900px wide) in EB Garamond lining figures.
5. A vertical 柱 (running head, 19px) at `left:64px; top:120px` and a ノンブル (page number, EB Garamond 22px) at `left:64px; bottom:96px` on every inner slide.

## Cover recipe (1920×1080)

- Title: vertical, `right:150px; top:132px`, Noto Serif JP 600, 124px, line-height 1.42, tracking .02em, three hand-broken lines; the last phrase in ai.
- 1px rule (`--rule`) at `right:712px; top:146px`, 560px tall.
- Lead: vertical, `right:764px; top:140px`, 560px tall, 27px, line-height 2.05, tracking .04em, three lines.
- Left: the year span in EB Garamond 400, 168px, line-height .9 (`1826`, 92px hairline, `2126` in ai), caption 22px tracking .2em uppercase.
- Bottom-left at `left:150px; bottom:104px`: 64px square mark (1.5px ai border, one kanji 36px) + company name 30px 600 + subline 18px sumi-60.
- Bottom-right at `right:150px; bottom:104px`: date in 漢数字, 20px sumi-60.
- No 柱 or ノンブル on the cover.
