# Style format

One folder per style: `styles/<slug>/`. A brand imported from a company design system uses the same folder shape under `~/.frontend-slides-jp/brands/<slug>/`.

| File | Read when | Holds |
| --- | --- | --- |
| `style.json` | Indexing only | Selection metadata, fonts, color tokens. Source for `selection-index.json` |
| `preview.md` | Phase 2, for each shortlisted style | Enough to build one cover slide: palette, fonts, signature moves, cover recipe |
| `design.md` | Phase 3, for the chosen style only | The design system: thesis, tokens, type scale, devices, slide grammar, slop signs |
| `reference.html` | Phase 3, for the chosen style only | A working 4-slide deck (cover, gate, conclusion + number, diagram). Copy its CSS, not its copy |

After adding or editing a style:

1. `node scripts/shoot.mjs styles/<slug>/reference.html --out styles/<slug>/thumbs --width 640 --jpg` writes the four thumbnails.
2. `node scripts/check-styles.mjs` validates every folder and rewrites `selection-index.json`.
3. `node scripts/build-gallery.mjs` rewrites `gallery.html`.

## `style.json`

```json
{
  "slug": "corporate-mono",
  "name": "Corporate Mono",
  "name_ja": "コーポレート単色",
  "tagline": "White ground and one corporate color used only on gates, the chapter band and chart shades.",
  "summary_ja": "白地に弁柄1色。全面の扉、左の縦帯の章ナビ、グラフの濃淡の3役にだけ色を使う。",
  "group": "business",
  "mood": ["trustworthy", "calm"],
  "formality": "high",
  "density": "medium",
  "scheme": "light",
  "best_for": "会社紹介、採用ピッチ、サービス資料",
  "avoid_for": "エンタメ、子ども向け",
  "formats": ["slide-16x9"],
  "writing": "horizontal",
  "needs": [],
  "fonts": { "heading": "IBM Plex Sans JP", "body": "IBM Plex Sans JP", "latin": ["Hanken Grotesk"] },
  "colors": { "brand": "#9C3A21", "ink": "#1E1A17", "paper": "#FFFFFF" },
  "refs": ["SmartHR 会社紹介資料", "Nishika 採用ピッチ資料"]
}
```

- `formality`, `density`: `low` | `medium` | `high`. `scheme`: `light` | `dark`. `writing`: `horizontal` | `vertical`. `group` (the gallery section): `business` | `tech` | `stage` | `editorial`.
- `needs`: inputs the style cannot do without, such as `"photos"`.
- Every family in `fonts` must exist in `fonts/catalog.json`. The heading family must have `role: "any"`, or `"vertical-heading"` when `writing` is `vertical`.
- `colors`: the tokens `reference.html` declares on `:root`, at most 6.

## `preview.md`

At most 40 lines: palette with hex, the css2 font query, 3 to 5 signature moves, and the cover recipe (layout, what goes where, sizes in px at 1920×1080).

## `design.md`

Sections, in this order. Sizes are px at the 1920×1080 stage.

1. **Thesis.** One or two sentences: the visual idea every slide serves.
2. **Tokens.** The exact `:root` block from `reference.html`.
3. **Type scale.** Role, family, weight, size, line-height, tracking: display, h1, h2, body, caption, number and unit.
4. **Signature devices.** Each device, the job it does, and where it may appear.
5. **Slide grammar.** The four reference slides, then how to derive comparison, table, quote, timeline, team and closing slides from the same system.
6. **Slop signs.** Observable failures to check before delivery, as a checklist.

## `reference.html`

A self-contained deck that pastes `viewport-base.css` verbatim, loads its fonts from Google Fonts, and passes `node scripts/check-styles.mjs`. Local assets live in `styles/<slug>/assets/` and are referenced relatively. Copy is fictional; no real company names or logos.
