# Whitepaper design system

A document-only style (`doc-a4`). All sizes are px at the 1240×1754 page.

## 1. Thesis

A whitepaper is read to be cited. Every page sits in the same fixed frame of top band and bottom band, so the reader always knows the document, the chapter and the next action. Every number carries its provenance next to it: question, n and survey period. Navy holds the structure. One green marks the finding the headline states.

## 2. Tokens

```css
:root {
    --navy: #13294B;
    --em: #00806B;
    --ink: #1B2430;
    --mute: #5B6676;
    --band: #EDF0F4;
    --paper: #FFFFFF;

    --rule: color-mix(in srgb, var(--navy) 20%, var(--paper));
    --em-tint: color-mix(in srgb, var(--em) 12%, var(--paper));
    --navy-70: color-mix(in srgb, var(--navy) 70%, var(--paper));
    --navy-40: color-mix(in srgb, var(--navy) 40%, var(--paper));
    --navy-15: color-mix(in srgb, var(--navy) 15%, var(--paper));

    --jp-head: "IBM Plex Sans JP", sans-serif;
    --jp-body: "BIZ UDPGothic", sans-serif;
    --num: "Barlow Semi Condensed", sans-serif;
    --mono: "IBM Plex Mono", monospace;

    --desk-bg: #D9DDE3;
    --page-bg: var(--paper);
}
```

The six hex tokens are the palette. Rules, tints and chart shades are `color-mix` derivatives of navy and green; no other hue appears except the failure mark (#A23B3B, on ✕ only).

## 3. Type scale

| Role | Family | Weight | Size | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Cover title | IBM Plex Sans JP | 700 | 92 | 1.24 | 0 |
| Headline (h1) | IBM Plex Sans JP | 700 | 58 | 1.38 | 0 |
| Kicker | Barlow Semi Condensed caps | 600 | 20 | 1 | 0.16em, green, 48px rule after |
| Lead | BIZ UDPGothic | 400 | 26 | 1.75 | 0.02em |
| Numbered heading | IBM Plex Sans JP / Plex Mono number | 700 / 600 | 30 / 22 | 1.45 | 0 |
| Body | BIZ UDPGothic | 400 | 22 | 1.8 | 0.02em |
| Notes, sources | BIZ UDPGothic | 400 | 17 | 1.7 | 0 |
| Big number | Barlow Semi Condensed | 600 | 128 (highlights), 76 (case), 64 (pull) | 1 | -0.01em |
| Unit beside big number | IBM Plex Sans JP | 700 | 34 / 20 / 22 (about 1/3–1/4 of the number) | 1 | 0 |
| Spec strip | IBM Plex Mono | 400–600 | 17 (15 inside cards) | 1 | 0 |
| Running head, folio | BIZ UDPGothic 700 / Barlow Semi Condensed 600 | | 19 / 20 | | |

## 4. Signature devices

- **Spec strip** (the signature). `<span class="spec"><span class="q">Q03</span><span>n=412</span><span>2026.07.07–07.18</span><span class="jp">単一回答</span><span class="fx jp">架空データ</span></span>`. Navy 1.5px outline, navy-filled question cell, mono cells split by hairlines. Job: no number is read apart from its question, sample and period, and invented data says so at the number. Appears under every big number (highlights, pull boxes), at the right of every chart caption, and in full as the survey outline on the cover. Never decorative: a strip without a number above it is wrong.
- **Top band** 0–120, `--band`, 8px navy top border. Running head at top 60: green category label (`調査レポート`, 16px white on green) plus document name on the left; chapter number (Barlow 22px green) and name on the right. Job: where am I.
- **Bottom band** 1634–1754, `--band`. Logo left, CTA link centre (19px 700 navy, 2px green underline, offset 6), folio right (`04 / 06`, 20px, at bottom 50). Job: the next action is on every page, as in 才流's template.
- **Chapter ladder** on the right edge: four segments 44×236, gap 6, from top 200. Idle segments `--band` with mute vertical text; the current one navy with white text and a light-green number. Job: position in the whole document, like the side tabs of 中外 and 大成.
- **Numbered headings** `1-1`, `3-2`: green mono number, 30px navy heading, 2px navy rule under. Job: cross-reference sections in sales follow-ups.
- **BEFORE → AFTER bands**: a 220px label column (navy for 課題, green for 効果) beside an outlined body, joined by a pale navy triangle. The AFTER body holds up to three numbers with `8 → 4 BD` in mono under each.
- **✕ failure boxes**: band-gray boxes, 30px red-brown square with white ✕ before a two-line title.
- **Business-day ledger** (cover only): ten BD cells, filled to the average, dashed at the target. For data that is not a count of days, keep the ten cells as tenths of the respondents (each cell = 10%), fill to the share the cover sentence names, and relabel the scale; drop the target line when there is none.

## 5. Page grammar

Every page except the cover: top band, chapter ladder, page head (kicker at top 168, headline, lead), body from about top 560–640, foot slot at bottom 150, bottom band.

1. **Cover.** Navy field 0–1130 with title, finding sentence and the BD ledger; white lower part with the survey outline table and fiction notice.
2. **Introduction + contents.** Conclusion headline, lead, three FINDING blocks (6px navy top rule, number, two-line description, spec strip; only the finding the headline names in green), then the contents list (Barlow 40px chapter number, 28px title with 19px subtitle, page number right).
3. **Reading page.** Two columns of 500px with 48px gutter, numbered headings, one green-tint pull box with a number and its spec strip.
4. **Figure page.** Chart caption (24px navy) with the spec strip at the right, chart 1048×560, then two short columns that read the chart, then the source in the foot slot.
5. **Case page.** 3-1 case: profile strip (company, size, period), BEFORE band, AFTER band with three numbers. 3-2: three ✕ failures.
6. **Back page.** Navy CTA block (label, 44px offer name, three steps, white URL bar), then two data tables with thin rules: survey outline and publisher.

Deriving other pages:
- **Highlights**: up to three FINDING blocks per row, each with its own strip; a fourth becomes a second row.
- **Table**: navy header rule 2px, row rules `--rule`, left labels in Plex 500 mute; accent only on the row the headline names.
- **Market environment** (才流's 市場環境): numbered heading and body on the left half, chart on the right half, alternating sides on the next page.
- **Service introduction**: navy CTA block grammar with a check list in place of steps.
- **Q&A / interview**: numbered heading per question, answer in body, quote in a green-tint pull box.

## 6. Slop signs

- [ ] A number, chart or percentage without a spec strip, or a strip without n or period.
- [ ] A spec strip field filled with an invented value. When the source has no question number, leave the `q` cell out; when n is derived from shares, mark it 「試算」.
- [ ] Invented data not marked 架空 in the strip, the source line and the cover.
- [ ] Bands or running heads that shift between pages (top 60, bottom 50 on every page).
- [ ] Green on more than the one finding per page (keyword, accent series, AFTER band count as the finding).
- [ ] Rounded cards, shadows or gradients. The style uses rules, outlines and flat fields.
- [ ] Placeholders left in (〇〇, IMG, ロゴ枠).
- [ ] A page with no CTA link in the bottom band, or a document with no CTA page.
- [ ] Headline that names a topic (「市場環境」) instead of stating the finding.
- [ ] Body under 22px or one column running across the full 1048px.

## 7. Document pages

This style exists only as `doc-a4`; the frame above is the page frame.

- **Running head**: inside the top band at top 60, inset 96. Left: green category label plus document name (19px 700 navy). Right: chapter number and name. The cover has none.
- **Folio**: bottom band, right edge at inset 96, bottom 50, `NN / total` in Barlow Semi Condensed 600 20px with the total in mute 18px. Same place on every page; the CTA link sits centred on the same line.
- **Chapter tab**: the chapter ladder on the right outer edge (x 1196–1240), top 200 to 1162. It shows all chapters, so it also serves as a mini contents. The introduction page shows the ladder with no segment lit.
- **Margins**: 96 left and right; kicker at 168 (below the 120 band); content ends above the foot slot, whose rule sits at about 1560; the bottom band starts at 1634.
- **Cover**: navy field with one line of copy (the finding), the BD ledger as the only visual, survey outline below. No photo needed; with photos, the navy field may carry a duotone image under 20% opacity, kept behind the ledger.
- **Reading page**: kicker, headline 58px, lead 26px, then two 500px columns of 22px body (about 23 字 per line in BIZ UDPGothic). Numbered headings start columns; a pull box may close a column.
- **Figure page**: diagrams from `references/diagrams.md` at 1048px wide and 520–620px tall. Map `--d-accent` to `--em`, `--d-accent-tint` to `--em-tint`, `--d-sub` to `--navy`, `--d-mid` and `--d-tint` to navy at 40% and 15%, `--d-rule` to `--rule`, labels to IBM Plex Sans JP and numbers to Barlow Semi Condensed. Put n per row in Plex Mono in the total column. The spec strip goes at the right of the chart caption, not under the chart. The reference uses `d-stacked-100` with a navy rule under the 全体 row.
- **Whitepaper order** (才流's template): cover, introduction with findings and contents, background (reading), findings (figure, table, highlights), case (BEFORE → AFTER, ✕ failures), CTA back page with survey outline.
