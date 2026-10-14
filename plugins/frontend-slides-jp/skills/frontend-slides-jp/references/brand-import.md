# Brand import

Turn whatever the user brings (logo, brand guide PDF, design-token file, website URL, an existing deck) into a style folder, then treat it like any listed style.

## Where it lives

`~/.frontend-slides-jp/brands/<slug>/`, with the same four files as `styles/<slug>/` ([styles/README.md](../styles/README.md)). Brands never go inside this skill folder: the skill may sit in a public repository.

If `~/.frontend-slides-jp/brands/` already holds a folder for this brand, reuse it and skip to step 5.

## Steps

1. **Extract the facts.** From the material, record: primary and secondary colors (hex), the Japanese and Latin typefaces the brand names, logo files and clear-space rules, tone words, and any layout rules (grids, margins, photo treatment). Mark each fact with its source (page, file, URL). Leave unknowns empty; never guess a brand color.
2. **Map fonts to the catalog.** If the brand's fonts are on Google Fonts and in [fonts/catalog.json](../fonts/catalog.json), use them. Otherwise pick the closest catalog family by class and mood, and note the substitution in `design.md`. Japanese headings still need `role: "any"`; if the brand's Japanese face cannot be used for headings, say so to the user.
3. **Pick a base style.** Choose the listed style whose structure fits the brand best (for most corporate brands: `corporate-mono`, `color-index` or `public-standard`). Read its `design.md` and `reference.html`.
4. **Write the brand folder.** Start from the base style's files and replace tokens, fonts, logo and signature devices with the brand's. Write `style.json` (slug = brand slug), `preview.md`, `design.md` (add a "Source facts" section listing step 1 with sources) and `reference.html` (the base deck re-skinned with the brand). Copy logo files into `assets/`.
5. **Validate.** Run `node scripts/check-styles.mjs ~/.frontend-slides-jp/brands`. Fix every error.
6. **Preview.** The brand fills the restrained slot of Phase 2. Tell the user which facts came from their material and which were substitutions.
