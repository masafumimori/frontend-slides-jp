# Recruit Guide design system

A document-only style (`doc-a4`) for Japanese recruiting brochures: 新卒・中途の採用案内 and the recruiting edition of a company profile. All sizes are px at the 1240×1754 page. It needs photos of employees at work; generated photos are captioned 「生成画像・架空の人物」.

## 1. Thesis

A recruiting brochure is read by someone deciding whether they want to work beside these people, so every page is about a person or what people do. The one signature device is the **name tab**: a flat sun-yellow tab that always sticks to an edge. On a photo it names the person (所属, 名前, 入社年); on the page edge it names the chapter; on a number it says whose number it is; at the end it is the entry. Everything else is white paper, black gothic and documentary photography. It belongs to family F2 (photo-led editorial) with the voice of F4 (warm narrative) from `docs/research/references-portrait.md`.

## 2. Tokens

```css
:root {
    --sun: #FFC629;
    --ink: #1D2125;
    --mute: #5D636B;
    --paper: #FFFFFF;

    --rule: color-mix(in srgb, var(--ink) 16%, var(--paper));
    --ink-70: color-mix(in srgb, var(--ink) 70%, var(--paper));
    --ink-30: color-mix(in srgb, var(--ink) 30%, var(--paper));

    --jp-head: "Noto Sans JP", sans-serif;
    --jp-body: "Zen Kaku Gothic New", sans-serif;
    --num: "Bricolage Grotesque", sans-serif;

    --desk-bg: #E7E4DC;
    --page-bg: var(--paper);
}
```

One accent, `--sun`, whose only role is the tab (and the two tab-derived marks: the headline marker and the key timeline node). Ink carries all text. Contrast: ink on sun 10.3:1, ink on white 16.2:1, mute on white 6.1:1, white on `--ink-70` 6.0:1, ink on `--ink-30` 8.5:1. Sun is never used for text or thin lines on white (1.6:1).

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Cover copy | Noto Sans JP | 900 | 92 | 1.28 | 0.01em |
| Headline (h1) | Noto Sans JP | 900 | 62 | 1.36 | 0.01em |
| Kicker | Bricolage Grotesque caps | 700 | 20 | 1 | 0.14em, 14px yellow square before |
| Lead | Zen Kaku Gothic New | 500 | 27 | 1.75 | 0.02em |
| Interview quote | Noto Sans JP | 900 | 32 | 1.5 | 0 |
| Q (question) | Noto Sans JP / Bricolage `Q.` | 700 / 800 | 21 / 22 | 1.5 | 0 |
| Body | Zen Kaku Gothic New | 400 | 22 | 1.8 | 0.02em |
| Caption, notes, sources | Zen Kaku Gothic New | 400 | 17 | 1.6–1.7 | 0 |
| Tab name | Noto Sans JP | 900 | 34 (cover, sign) / 30 (photo) | 1.2 | 0.04em |
| Tab role, year | Noto Sans JP 700, year Bricolage 700 | | 18, year 24 | 1.2–1.3 | 0 |
| Big number | Bricolage Grotesque | 700 | 124 | 1 | -0.02em |
| Unit | Noto Sans JP | 700 | 36 (about 1/3) | 1 | 0 |
| Timeline time | Bricolage Grotesque | 700 | 30 | 1 | -0.01em |
| Running head, folio | Noto Sans JP 700 / Bricolage 700–800 | | 19 / 20 | | |

## 4. Signature devices

- **Name tab** (the signature). `<div class="tag"><span class="role">品質保証部　検査グループ</span><span class="name">佐野 瑞希</span><span class="year"><span class="en">2021</span>年 新卒入社</span></div>`. Flat `--sun`, square corners, no shadow, ink text, padding 14–18 / 22–26. Rule: **a tab is always attached to an edge**. On a photo its bottom edge sits on the photo's bottom edge (cover) or it straddles the edge by half its height (interview, day page), at the photo's left or right edge. Job: every photographed person has a name, a role and a year joined, which is what a candidate reads first. Never on a photo of a person it does not name; never floating in white space.
- **Chapter tab**: the same tab, 60×220, flush with the right page edge, vertical `01 メッセージ` (Bricolage 800 20px number, Noto 700 19px name). It steps down 230px per chapter (top 200, 430, 660, 890, 1120), so a closed brochure shows a thumb index. Job: where am I.
- **Signature tab**: on the message page a horizontal tab from the left page edge (padding-left 96) with 役職, 名前 34px and 入社年. It replaces a handwritten signature.
- **Hanging tab**: on a numbers page, at most one tab hangs from the 3px rule of the number the headline names, carrying its denominator (`14人中14人`). Job: the accent marks the finding; the tab tells whose number it is.
- **Marker**: one word of the headline underlined in sun, thickness 0.34em, offset -0.2em, skip-ink none, so it reads as a highlighter stroke behind the glyphs. One per headline, on the word that carries the finding.
- **Giant numerals**: Bricolage 700 124px over a 3px ink rule, label above (Noto 700 22px), one-line note below (17–18px mute). Three per row at most.
- **Entry tab**: the tab at full size: a yellow field from the left page edge to the right margin (0–1144), 360px tall, with `ENTRY`, a 44px invitation and the URL in Bricolage 700 58px with an ink triangle. Use a real URL or a printed QR code supplied by the client; never draw a fake code or a box labelled QR.

## 5. Page grammar

Every page except the cover: running head, chapter tab, page head (kicker at top 150, headline 62px two lines, lead 27px two lines, ending about top 500), body from about top 540, foot slot above bottom 120, folio at bottom 56.

1. **Cover.** Full-bleed photo 0–1120 with a name tab on its bottom edge, the caption under it, one line of copy at 92px, meta over a 2px rule at the foot.
2. **Message.** Quoted headline with the marker, lead, a photo band 1048×440 with caption, two columns of body, the signature tab from the left edge.
3. **数字で見る.** Headline states one number as a sentence (「育休を取った14人は、全員が職場に戻ってきた。」); six giant numerals in a 3×2 grid of rules, one with the hanging tab; then 職種別の人数 and 男女比 as 100% bars in ink shades (white text on ink and ink-70, ink text on ink-30 and rule), job descriptions under the first bar.
4. **社員インタビュー.** Two columns of 500px: photo 500×340 with the person's tab straddling its bottom-left edge, a 32px quote, then 2 Q&As (rule above each Q, answer in 22px body).
5. **1日の流れ.** Photo band 1048×340 with the tab at bottom-right, then `d-flow-v` fitted (see section 7), source in the foot slot.
6. **募集要項・エントリー.** Headline and lead, a two-column requirements table with a 3px ink top rule and `--rule` row lines, then the entry tab and the contact line.

Deriving other pages:
- **職種紹介**: one photo band per job with its tab carrying the job name and headcount in place of a person's name; under it three labelled rows with thin rules: 仕事内容, 使う道具, 1年目にやること.
- **キャリアパス**: `d-stairs` with the steps as years since joining (1年目, 3年目, 7年目, 12年目); the step the headline names takes a tab hanging from its top edge with a real employee's name and year.
- **制度・福利厚生**: a table like 募集要項, with a giant numeral for the one figure that matters (取得者数, 補助額).
- **座談会**: one wide photo with three tabs on its bottom edge, then quotes attributed by name.
- **Chapter gate**: full-bleed photo with only the chapter tab and the chapter number in Bricolage 800 200px on white below.

## 6. Slop signs

- [ ] A photo of a person without a name tab, or a tab naming someone not in the photo.
- [ ] A tab floating in white space, with rounded corners, a shadow or a gradient, or yellow used for anything except tabs, the marker and the key node.
- [ ] Yellow text, or thin yellow lines on white.
- [ ] Stock-like posed smiles, people looking at the camera, a dark overlay laid on every photo.
- [ ] Generated photos without 「生成画像・架空の人物」 in the caption, or invented data without 「（架空のデータ）」 in the source line and on the cover.
- [ ] Placeholder boxes where a photo belongs, or a box labelled QR.
- [ ] A headline that names a topic (「数字で見る」) instead of a sentence with a finding.
- [ ] Three rounded cards with icons for 制度 or 職種.
- [ ] A number without its denominator or period (育休復職率 without the number of people, 定着率 without the cohort).
- [ ] Body under 22px, or one column across the full 1048px.
- [ ] Running head, folio or chapter tab missing or shifted on any page.

## 7. Document pages

This style exists only as `doc-a4`; the frame above is the page frame.

- **Running head**: top 64, inset 96, 19px. Left: the logotype (yellow 18px square + Bricolage 800 22px) and the document name; right: chapter number (Bricolage 700 20px) and chapter name. A 1px `--rule` line 14px under it. The cover has none.
- **Folio**: bottom 56, right inset 96, Bricolage 700 20px with a 28×3 ink dash before it. Same place on every page.
- **Chapter tab**: the yellow chapter tab on the right page edge (x 1180–1240), 220px tall, at top 200 + 230 × (chapter − 1). With more than 5 chapters, shorten the tabs to 180 and the step to 190.
- **Margins**: 96 left and right; kicker at 150; the foot slot rule sits about 1590 (bottom 120); the content above it.
- **Cover**: a photo, a name tab on its edge, one line of copy. With no photos available the style does not apply: choose another style.
- **Reading page** (message, interview): two 500px columns with a 48px gutter, 22px body, about 22 字 per line in Zen Kaku Gothic New. Interview answers set `word-break: normal` and justify, as body paragraphs do.
- **Figure page** (1日の流れ): `d-flow-v` from `references/diagrams.md` at 1048×570, 6 rows. Columns 116 (time in Bricolage 700 30px) / 60 (node) / 230 (title, Noto 700 24px) / 1fr (description, 19px) / 210 (with whom, `一緒に` label). Nodes are 22px ink-outlined squares; the key row's node is a 34px sun square and its title takes the marker. Map `--d-accent` to `--sun`, `--d-ink` to `--ink`, `--d-sub` to `--mute`, `--d-mid` to `--ink-30`, `--d-rule` to `--rule`. For a career path use `d-stairs`; for a company history `d-timeline` with bars in ink shades and the key year in sun.
- **Recruiting order**: cover, message, 数字で見る, 職種紹介, 社員インタビュー (one or two pages), 1日の流れ, キャリアパス, 制度・福利厚生, 募集要項・エントリー.
