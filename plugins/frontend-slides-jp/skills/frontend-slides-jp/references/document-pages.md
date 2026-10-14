# Document pages (doc-a4)

How to build an A4 portrait document: an integrated report, a company brochure, a whitepaper or a research report, read on screen by scrolling and printed as A4. Pages are 1240×1754 px (A4 at 150 dpi); every size below is px at that page.

The rules come from eight Japanese portrait documents studied for this skill (`docs/research/references-portrait.md` in the repository).

## Slides and documents differ

- A slide is shown; a page is read. A page may hold two columns of body text that a slide never would.
- A page stacks from top to bottom: kicker → headline → lead → figure → body → notes. A slide places the headline beside its figure.
- A page tells the reader where they are: a running head, a folio and a chapter tab on every page except the cover.
- One finding per page still holds. The headline states it as a sentence, as on slides.

## Page frame

Every page except the cover carries these, in the same place on every page. The positions below are defaults; where the style's `design.md` section 7 gives its own, the style wins:

- **Running head** at top 64, inset 96 left and right: the organization or document name on the left, chapter number and name on the right, 18–20px.
- **Folio** (page number) at bottom 56, outer edge, 18–20px Latin numerals.
- **Chapter tab** on the outer edge: a vertical strip with the chapter name, in the chapter's color when the style has chapter colors.
- **Margins**: 96 left and right, 140 top to the kicker, 120 bottom to the last line. Content never enters the margins except full-bleed images and color fields.

## Reading rules

- Body text 22–24px, line-height 1.8, which prints at about 10.5–11.5pt. Notes and sources 17–18px.
- Two columns of 500px with a 48px gutter, which holds about 22 字 per line at 22px and 20 字 at 24px. One wide column only for statements, messages and short pages.
- Headlines 52–72px; the Latin kicker above them is about a third of the headline size.
- A lead of 2–3 lines sits under the headline, in the body family at 26–28px.
- Figures take the full text width (1048px) and 560–760px of height, followed by their source line.
- Notes, sources and n-counts have their own slot at the foot of the page, above the folio.
- When text would overflow, move it to the next page or cut it. Never shrink the body size to fit.

## Page types

Build the document from these. A 16-page brochure needs about cover, statement, message, overview, three business pages, highlights, story, network and data.

| Page type | Holds | Seen in |
| --- | --- | --- |
| `cover` | One line of copy and one visual. Year and document type small. | 大成, FR, 双葉, 味の素 |
| `statement` | A mission or a long quote, with much white space. | FR, 大成, 日本ライフライン |
| `contents` | Chapter number, name and page, in the chapter colors. | 中外, 大成, FR, 味の素 |
| `message` | Portrait photo, quoted headline, two columns, signature. | all eight |
| `chapter-gate` | Full-bleed photo or a color field, Latin chapter name, the chapter's contents. | 中外, FR, イオンモール |
| `overview` | One diagram of the whole: value creation, business overview. | 日本ライフライン, 中外, 味の素 |
| `business` | A photo band, ■ headings and a grid of products or services. | 双葉, 日本ライフライン |
| `highlights` | Large numbers with short labels, three or four per row at most. | 中外, FR, 日本ライフライン |
| `story` | A person, a case or a Q&A, with numbered steps or quotes. | 大成, FR, イオンモール |
| `table` | A dense table with row colors or left labels. | 日本ライフライン, 大成, 味の素 |
| `network` | Locations as a dot map or a tile map, with a list. | 双葉, FR |
| `data` | Company profile or data appendix: a two-column table with thin rules. | 双葉, the appendices of every report |
| `back-cover` | Contact, URL or QR, and the call to action. | 才流, 双葉 |

Leave out `contents` in documents under about 12 pages; a short document reads straight through. For a `network` page there is no dot-map pattern: use `d-tile-map-jp` when the data is per prefecture, otherwise a list of locations grouped by region. For history, use the style's own timeline when its `design.md` gives an A4 version, otherwise `d-timeline`.

A whitepaper uses: cover, introduction (`statement`), contents, then `table`/`highlights`/`overview` pages for findings, a `story` page for cases, and a `back-cover` with the call to action.

## Diagrams in documents

- Use the patterns in [diagrams.md](diagrams.md) inside the text width (1048px wide). Each entry's `Portrait:` line says whether it fits a page and at what height.
- A pattern marked `landscape only` needs a wide page. This version of the skill has no landscape pages: choose another pattern or split the content.
- A diagram on a page keeps the page's frame: kicker and headline above it, the source line under it, body text below.
- Put the pattern's `id="d-<id>"` on a wrapper around the figure, never on the `.page`. Pattern rules are scoped by that id, and on the page they would reach the running head, folio and chapter tab, which share class names such as `.no`.
- A pattern reads its size from its own box. The page zoom does not change that size, so no fixed size is needed.

## Slop signs

- Pages without a running head, folio or chapter tab.
- The same layout on every page: headline, three rounded cards, footer.
- Body text in one wide column that runs 45 字 or more per line.
- Body text shrunk below 22px to make a page fit.
- A Latin kicker almost as large as the Japanese headline. In the references the headline is about three times larger.
- Chapter colors used only on headings and never carried into figures and tables.
- Placeholder boxes where a photo belongs. Without photos, design the page with type, color fields and diagrams.
- Survey data without n and period. A whitepaper without a call to action.
