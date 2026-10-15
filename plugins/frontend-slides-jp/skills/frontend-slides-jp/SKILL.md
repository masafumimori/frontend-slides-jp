---
name: frontend-slides-jp
description: Create Japanese-first HTML presentations and A4 portrait documents, from scratch or by converting PowerPoint files, in styles drawn from well-regarded Japanese decks and reports or the user's own design system. Use when the user wants to build a presentation, convert a PPT/PPTX to web, create slides for a talk or pitch, or make a document to read such as an integrated report, company brochure (会社案内), government plan, internal report, recruiting brochure, infographic booklet, whitepaper, textbook, workbook or training material. Helps non-designers pick a look by seeing it.
---

# Frontend Slides JP

Create zero-dependency, animation-rich HTML presentations that run entirely in the browser. Slide copy is Japanese and the design targets Japanese audiences unless the user asks otherwise.

## Core Principles

1. **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools.
2. **Show, Don't Tell** — Generate visual previews, not abstract choices. People discover what they want by seeing it.
3. **Distinctive Design** — No generic "AI slop." Every presentation must feel custom-crafted.
4. **Progressive Disclosure** — Read `styles/selection-index.json` first, then only the shortlisted styles' `preview.md`, then the chosen style's `design.md` and `reference.html`.
5. **Fixed Stage (NON-NEGOTIABLE)** — Every output has a fixed canvas from [formats.json](formats.json), scaled as a whole: a 16:9 deck uses 1920×1080 slides, an A4 document (`doc-a4`) uses 1240×1754 pages stacked for scrolling. Do not reflow content to fit the device.

## Design Aesthetics

You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight.

Focus on:

- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:

- Overused font families (Inter, Roboto, Arial, system fonts). Families a style names, including Inter Tight, are deliberate and fine
- Cliched color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!

### Japanese Typography

These defaults apply to custom designs and to anything a style's `design.md` leaves open. Where a style's `design.md` sets a value (tracking, gate treatment, sizes), the style wins.

- Pick Japanese families from [fonts/catalog.json](fonts/catalog.json). Headings use a family whose `role` is `any`; a `vertical-heading` family may set vertical headings only; `body-only` families never set headings, because palt does not tighten them and kana sit full-width.
- Heading tracking is 0 with palt. Body tracking is 0.02em at most. Wide tracking (≥ 0.1em) belongs to Latin caps captions only.
- Break headlines by hand with `<br>` at 文節 boundaries. No line may start with 、。」) or end with 「(, and no line may hold a single character.
- Vertical runs use the `.tate` class from `viewport-base.css`. Two-digit numbers in vertical text use `text-combine-upright: all`.
- Mixed Japanese and Latin: numbers and Latin words take the paired Latin family.

### Design Rules

These come from the Japanese reference decks the styles were built from. Every style already satisfies them; a style's `design.md` may refine them.

- Colors: neutrals plus at most 4 hues per slide. Charts use shades of one hue, with the accent only on the value the headline is about.
- Emphasis: at most 3 methods per deck (for example color, weight, size).
- Every content slide's headline states its conclusion as a sentence, never a topic label.
- Left-align body text. Bullets stay one level deep.
- At most three items sit in one row; four or more become a list, a 2×2 grid or a table.
- In a KPI callout the number is 3-4× the size of its unit. In tables, units stay at caption size or larger.
- Charts are 2D, keep their size and position across slides, and carry a source line.
- Every diagram or chart starts from a pattern in [references/diagrams.md](references/diagrams.md), chosen by the relationship the slide shows, unless the style's `design.md` defines its own slide for that relationship. The pattern gives the structure; the style's `design.md` wins on appearance.
- Never leave a placeholder where an image belongs (grey boxes, empty frames, "photo here"). Without real images, redesign the slide as text, initials or a diagram.
- Section gates look different from content slides (full-bleed color or image unless the style defines another gate). Decks under about 10 slides may skip gates.

## Fixed Stage Rules

These invariants apply to EVERY slide in EVERY presentation. An A4 document follows the same idea with its own base file: see the end of this section.

- Every deck has a viewport wrapper that fills the browser window.
- Every slide is authored inside a fixed 1920×1080 stage.
- The stage scales uniformly to fit the viewport. It may letterbox/pillarbox; it must not re-layout content.
- Do not use responsive breakpoints to rearrange slide content for phones.
- Use fixed internal slide measurements at the 1920×1080 design size.
- Slide visibility must be controlled by `.active` / `.visible` using `visibility`, `opacity`, and `pointer-events` from `viewport-base.css`. Do not use `display: none` / `display: block` for slide switching; later layout classes such as `.slide-content { display: flex; }` can override them and make every slide visible at once.
- Use `clamp()` only for non-slide UI outside the stage, or for small fallback previews where a full stage is impractical.
- Include `prefers-reduced-motion` support
- Never negate CSS functions directly (`-clamp()`, `-min()`, `-max()` are silently ignored) — use `calc(-1 * clamp(...))` instead

**When generating, read `viewport-base.css` and include its full contents in every presentation.**

For a `doc-a4` document, paste [page-base.css](page-base.css) instead. Every page is a `<section class="page">` of exactly 1240×1754 inside `.doc-stage`; pages are stacked and the column is zoomed to the window width. Never reflow or shrink a page's content; split the page. The structure is in [html-template.md](html-template.md) under "A4 Document Structure".

### Content Density Modes

Ask the user whether this is primarily a reading deck or a speaking deck, then design around that answer:

| Density mode | Best for | Design behavior |
| ------------- | -------- | --------------- |
| **Low density / speaker-led** | Public talks, keynote-style sharing, live explanation | One idea per slide, large type, strong visual hierarchy, generous negative space, 1-3 bullets max, more slides if needed |
| **High density / reading-first** | Reports, handouts, async review, detailed internal docs | More self-contained slides, structured grids/tables/annotations, 4-8 bullets or 4-6 cards when readable, tighter but still intentional spacing |

Baseline limits still apply: no scrolling, no overflow, no overlapping panels, and no text below comfortable reading size. If content exceeds the selected density mode, split it into more slides instead of shrinking until it becomes cramped.

---

## Phase 0: Detect Mode

Determine what the user wants:

- **Mode A: New Presentation** — Create from scratch. Go to Phase 1.
- **Mode B: PPT Conversion** — Convert a .pptx file. Go to Phase 4.
- **Mode C: Enhancement** — Improve an existing HTML presentation. Read it, understand it, enhance. **Follow Mode C modification rules below.**

### Mode C: Modification Rules

When enhancing existing presentations, fixed-stage fitting is the biggest risk:

1. **Before adding content:** Count existing elements, check against density limits
2. **Adding images:** Fit them inside the 1920×1080 slide canvas. If slide already has max content, split into two slides
3. **Adding text:** Max 4-6 bullets per slide. Exceeds limits? Split into continuation slides
4. **After ANY modification, verify:** the slide stage remains 16:9, no text overflows its card, no panels overlap, and screenshots look correct at 1280×720 plus one phone viewport
5. **Proactively reorganize:** If modifications will cause overflow, automatically split content and inform the user. Don't wait to be asked

**When adding images to existing slides:** Move image to a new slide or reduce other content first. Never add images without checking if existing content already fills the 1920×1080 slide stage.

---

## Phase 1: Content Discovery (New Presentations)

**Ask ALL questions together** so the user fills everything out at once. If the current environment provides a native structured-question UI, use it; otherwise ask in one concise message with clearly numbered choices:

**Question 0 — Format** (header: "Format"):
Slides to present, or a document to read? Options: 16:9 slides (`slide-16x9`) / A4 portrait document — report, brochure, plan, internal report, recruiting guide, whitepaper (`doc-a4`)

Infer it when the request already says (「統合報告書」「会社案内の冊子」「ホワイトペーパー」 mean `doc-a4`). The format decides the stage, the style shortlist and the page types. For `doc-a4`, read Questions 2 and 4 as pages and density of text per page.

**Question 1 — Purpose** (header: "Purpose"):
What is this presentation for? Options: Pitch deck / Teaching-Tutorial / Conference talk / Internal presentation

**Question 2 — Length** (header: "Length"):
Approximately how many slides? Options: Short 5-10 / Medium 10-20 / Long 20+

**Question 3 — Content** (header: "Content"):
Do you have content ready? Options: All content ready / Rough notes / Topic only

**Question 4 — Density** (header: "Density"):
How dense should the deck feel? Options:

- "Low density / speaker-led" — Big ideas, fewer words, more visual breathing room
- "High density / reading-first" — More self-contained detail for async reading

**Do not ask about inline editing during Phase 1.** Users should not have to choose editing behavior before seeing a draft. Inline editing is a post-draft affordance: include it by default unless the user explicitly asks for a locked/export-only file.

Remember the user's density choice. It affects slide count, typography scale, amount of text per slide, layout density, and whether to favor cinematic presenter slides or self-contained reading slides.

If user has content, ask them to share it.

### Step 1.2: Image Evaluation (if images provided)

If user selected "No images" → skip to Phase 2.

If user provides an image folder:

1. **Scan** — List all image files (.png, .jpg, .svg, .webp, etc.)
2. **Inspect each image** — Use the agent's available image-understanding capability. If image reading is unavailable, use filenames/metadata and ask the user to clarify only when needed
3. **Evaluate** — For each: what it shows, USABLE or NOT USABLE (with reason), what concept it represents, dominant colors
4. **Co-design the outline** — Curated images inform slide structure alongside text. This is NOT "plan slides then add images" — design around both from the start (e.g., 3 screenshots → 3 feature slides, 1 logo → title/closing slide)
5. **Confirm the outline** using the same structured-question mechanism when available: "Does this slide outline and image selection look right?" Options: Looks good / Adjust images / Adjust outline

**Logo in previews:** If a usable logo was identified, embed it (base64) into each style preview in Phase 2 — the user sees their brand styled three different ways.

---

## Phase 2: Style Discovery

**This is the "show, don't tell" phase.** Most people can't articulate design preferences in words.

### Step 2.0: Generate 3 Style Previews Directly

Based on purpose, audience, mood, and content density, generate 3 distinct single-slide HTML previews showing typography, colors, animation, and overall aesthetic.

Do not ask the user whether they want options or a preset picker. The default discovery experience is always visual comparison.

If the user already gave a vibe, use it. If they did not, infer the likely mood from the occasion, audience, content, and stakes. Keep the options diverse enough that the user can react visually instead of needing to articulate taste up front.

If the user names a style and asks only for that style, skip the index: read that style's `preview.md` and go straight to Phase 3. If they name a style as one option among others, honor it as one preview and fill the remaining slots from the index.

If the user brings a company design system, logo, brand guide or URL, follow [references/brand-import.md](references/brand-import.md) first. The resulting brand style is always one of the three previews.

Read [styles/selection-index.json](styles/selection-index.json), and `~/.frontend-slides-jp/brands/selection-index.json` when it exists: the user's imported brands. Offer a brand that matches the user's company first, in the restrained slot. Do not read any `design.md` or `reference.html` yet.

If the user wants to browse every style before choosing, open [styles/gallery.html](styles/gallery.html) for them.

**Preview mix rules:**

- Shortlist only styles whose `formats` include the format from Phase 1. For `doc-a4`, each preview is the document's cover page, built at 1240×1754 with `page-base.css`, and the shortlist may hold fewer than 3 styles; fill the rest with custom wildcards.
- Generate 3 previews: one restrained style (`formality: high`), one expressive style, and one wildcard. With a brand, the brand takes the restrained slot.
- Match purpose and mood against `mood`, `formality`, `density`, `scheme`, `best_for` and `avoid_for`. Treat `best_for` as a soft signal.
- Respect `needs`: offer a style that needs `photos` only when the user has photos or accepts generated ones.
- Keep the three previews genuinely different in ground, typography and signature device.
- The wildcard may be a custom design when the brief has a sharper opportunity than any listed style.
- After shortlisting, read only those styles' `preview.md` from the `preview_md` paths.

**Custom wildcard design rules:**

- Follow Design Aesthetics, Japanese Typography and Design Rules above.
- Make a deliberate visual thesis: a committed palette, a recognizable layout system, and one signature device that does a job.
- The preview must imply a system that expands into section, content, comparison, quote and closing slides.
- Never render "custom", "wildcard", "AI-generated", or design-process labels on the slide itself.

**Preview authenticity rules (NON-NEGOTIABLE):**

- Every style preview must look like a real first slide from the user's deck, not a diagnostic card.
- Never render internal workflow text on a slide: no `preview`, `generated from`, `preview.md`, `template`, `preset`, `style option`, `Option A/B/C`, file names, paths, or source-doc labels.
- Never render template names or slug names on the slide itself. Template/style names belong only in the message to the user.
- Never render user requirement notes as slide content, such as "sharp and provocative", "safe option", "bold option", "for internal sharing", or "audience: ...", unless the user explicitly wants that exact phrase to appear in the deck.
- If the slide needs chrome, use real deck chrome only: the deck title, section title, date, author, company, page number, or a genuine content phrase from the user's material.
- Before opening previews, inspect the visible text and revise if any internal metadata appears.

Save previews to `.frontend-slides-jp/slide-previews/` (style-a.html, style-b.html, style-c.html). Each should be self-contained and compact, showing one animated title slide.

Open each preview automatically for the user.

### Step 2.1: User Picks

Ask (header: "Style"):
Which style preview do you prefer? Options: Style A: [Name] / Style B: [Name] / Style C: [Name] / Mix elements

If "Mix elements", ask for specifics.

---

## Phase 3: Generate Presentation

Generate the full presentation using content from Phase 1 (text, or text + curated images) and style from Phase 2.

If images were provided, the slide outline already incorporates them from Step 1.2. If not, CSS-generated visuals (gradients, shapes, patterns) provide visual interest — this is a fully supported first-class path.

Apply the user's density choice throughout the deck:

- **Low density / speaker-led:** Use more slides with fewer ideas per slide. Favor large headings, short phrases, visual metaphors, section beats, quote/statement slides, and presenter-friendly pacing.
- **High density / reading-first:** Make slides more self-contained. Use structured grids, comparison tables, annotated diagrams, captions, and concise explanatory copy. Keep hierarchy strong so it feels designed, not like a document pasted onto slides.

Before writing HTML, write a slide plan: one line per slide with its conclusion headline and its form, either a pattern id from [references/diagrams.md](references/diagrams.md) or a text form (statement, list, quote, gate). Decide the form with that file's "Does this slide need a diagram?" section. Show the plan to the user together with the outline confirmation when there is one.

If the user's stated needs are mixed, choose the closer of the two modes instead of inventing a middle option: live audience persuasion defaults low-density; async circulation or detailed review defaults high-density.

Never let high density become visual clutter. If a high-density slide starts to overflow, split it or redesign it into a clearer structure.

If the user selected a listed style or a brand, read that one style's `design.md` and the reference for the chosen format (`reference.html` for slides, `reference-a4.html` for `doc-a4`, as `references` in the index lists) before generating. Do not read other styles. For `doc-a4`, also read [references/document-pages.md](references/document-pages.md): the page types, the page frame and the reading rules.

- Preserve its tokens, fonts, type scale, signature devices and slide grammar.
- Copy CSS from `reference.html`; write new copy for the user's content. Never reuse its fictional company, numbers or slogans.
- Build missing slide types from the `design.md` slide-grammar section.
- For each diagram or chart slide in the plan, copy the pattern's CSS, markup and script from `references/diagrams.html` and fit it to the style, as `references/diagrams.md` describes.
- `reference.html` omits inline editing; add it from [html-template.md](html-template.md), including the early return for `e.target.isContentEditable` in the style's keyboard handler.
- When the user gave only a topic, mark invented names, numbers and sources as fictional: one line in the cover meta and a short note in each data slide's source line (for example 「数値は架空」).
- The density choice changes how much goes on each slide and how many slides there are, never the style's type scale.
- Before delivery, screenshot every slide (or every page of a `doc-a4` document) with `node scripts/shoot.mjs <file.html> --out <dir>` and once with `--phone`, then walk the style's slop-signs checklist and the Design Rules against them. For `doc-a4`, also run `node scripts/check-pages.mjs <file.html>` and again with `--phone`, and fix every error: it checks page size, the running head and folio on every page after the cover, text that leaves its page or is clipped, a diagram id on `.page`, and text below note size. Look for overlap by eye: `scrollHeight` and bounding-box checks miss panels that cover each other.

If the user selected a self-generated custom wildcard, treat that preview's CSS and layout as the design recipe:

- Preserve its fonts, palette, decorative vocabulary, spacing rhythm, grid logic, and component grammar.
- Expand the same visual system across the full deck. Do not switch to a listed style after the user has chosen the custom direction.
- Design any missing slide layouts from that system rather than importing patterns from another style.
- Keep the output fixed-stage, single-file, and visually verified like every other deck.

**Before generating, read these supporting files:**

- [html-template.md](html-template.md) — HTML architecture and JS features
- [viewport-base.css](viewport-base.css) — Mandatory CSS (include in full)
- [animation-patterns.md](animation-patterns.md) — Animation reference for the chosen feeling

**Key requirements:**

- Single self-contained HTML file, all CSS/JS inline
- Include the FULL contents of viewport-base.css in the `<style>` block
- Load fonts from Google Fonts with the `css` queries in `fonts/catalog.json` — never system fonts
- Add detailed comments explaining each section
- Every section needs a clear `/* === SECTION NAME === */` comment block

---

## Phase 4: PPT Conversion

When converting PowerPoint files:

1. **Extract content** — Run `python scripts/extract-pptx.py <input.pptx> <output_dir>` (install python-pptx if needed: `pip install python-pptx`)
2. **Confirm with user** — Present extracted slide titles, content summaries, and image counts
3. **Style selection** — Proceed to Phase 2 for style discovery
4. **Generate HTML** — Convert to chosen style, preserving all text, images (from assets/), slide order, and speaker notes (as HTML comments)

---

## Phase 5: Delivery

1. **Clean up** — Delete `.frontend-slides-jp/slide-previews/` if it exists
2. **Open** — Use `open [filename].html` to launch in browser
3. **Summarize** — Tell the user:
   - File location, style name, slide count
   - Navigation: Arrow keys, Space, swipe/tap if enabled
   - How to customize: `:root` CSS variables for colors, font link for typography, `.reveal` class for animations
   - Inline text editing is available: Hover top-left corner or press E to enter edit mode, click any text to edit, Ctrl+S to save
   - Offer the natural post-draft actions: ask for revisions, edit text directly in the browser, or export/share

---

## Phase 6: Share & Export (Optional)

After delivery, **ask the user:** _"Would you like to share this presentation? I can deploy it to a live URL (works on any device including phones) or export it as a PDF."_

Options:

- **Deploy to URL** — Shareable link that works on any device
- **Export to PDF** — Universal file for email, Slack, print
- **Both**
- **No thanks**

If the user declines, stop here. If they choose one or both, proceed below.

### 6A: Deploy to a Live URL (Vercel)

This deploys the presentation to Vercel — a free hosting platform. The link works on any device (phones, tablets, laptops) and stays live until the user takes it down.

**If the user has never deployed before, guide them step by step:**

1. **Check if Vercel CLI is installed** — Run `npx vercel --version`. If not found, install Node.js first (`brew install node` on macOS, or download from https://nodejs.org).

2. **Check if user is logged in** — Run `npx vercel whoami`.
   - If NOT logged in, explain: _"Vercel is a free hosting service. You need an account to deploy. Let me walk you through it:"_
     - Step 1: Ask user to go to https://vercel.com/signup in their browser
     - Step 2: They can sign up with GitHub, Google, email — whatever is easiest
     - Step 3: Once signed up, run `vercel login` and follow the prompts (it opens a browser window to authorize)
     - Step 4: Confirm login with `vercel whoami`
   - Wait for the user to confirm they're logged in before proceeding.

3. **Deploy** — Run the deploy script:

   ```bash
   bash scripts/deploy.sh <path-to-presentation>
   ```

   The script accepts either a folder (with index.html) or a single HTML file.

4. **Share the URL** — Tell the user:
   - The live URL (from the script output)
   - That it works on any device — they can text it, Slack it, email it
   - To take it down later: visit https://vercel.com/dashboard and delete the project
   - The Vercel free tier is generous — they won't be charged

**⚠ Deployment gotchas:**

- **Local images/videos must travel with the HTML.** The deploy script auto-detects files referenced via `src="..."` in the HTML and bundles them. But if the presentation references files via CSS `background-image` or unusual paths, those may be missed. **Before deploying, verify:** open the deployed URL and check that all images load. If any are broken, the safest fix is to put the HTML and all its assets into a single folder and deploy the folder instead of a standalone HTML file.
- **Prefer folder deployments when the presentation has many assets.** If the presentation lives in a folder with images alongside it (e.g., `my-deck/index.html` + `my-deck/logo.png`), deploy the folder directly: `bash scripts/deploy.sh ./my-deck/`. This is more reliable than deploying a single HTML file because the entire folder contents are uploaded as-is.
- **Filenames with spaces work but can cause issues.** The script handles spaces in filenames, but Vercel URLs encode spaces as `%20`. If possible, avoid spaces in image filenames. If the user's images have spaces, the script handles it — but if images still break, renaming files to use hyphens instead of spaces is the fix.
- **Redeploying updates the same URL.** Running the deploy script again on the same presentation overwrites the previous deployment. The URL stays the same — no need to share a new link.

### 6B: Export to PDF

This captures each slide as a screenshot and combines them into a PDF. Perfect for email attachments, embedding in documents, or printing.

**Note:** Animations and interactivity are not preserved — the PDF is a static snapshot. This is normal and expected; mention it to the user so they're not surprised.

1. **Run the export script:**

   ```bash
   bash scripts/export-pdf.sh <path-to-html> [output.pdf]
   ```

   If no output path is given, the PDF is saved next to the HTML file.

2. **What happens behind the scenes** (explain briefly to the user):
   - A headless browser opens the presentation at 1920×1080 (standard widescreen)
   - It screenshots each slide one by one
   - All screenshots are combined into a single PDF
   - A `doc-a4` document is printed directly instead: one vector A4 page per `.page`, with selectable text
   - The script needs Playwright (a browser automation tool) — it will install automatically if missing

3. **If Playwright installation fails:**
   - The most common issue is Chromium not downloading. Run: `npx playwright install chromium`
   - If that fails too, it may be a network/firewall issue. Ask the user to try on a different network.

4. **Deliver the PDF** — The script auto-opens it. Tell the user:
   - The file location and size
   - That it works everywhere — email, Slack, Notion, Google Docs, print
   - Animations are replaced by their final visual state (still looks great, just static)

**⚠ PDF export gotchas:**

- **First run is slow.** The script installs Playwright and downloads a Chromium browser (~150MB) into a temp directory. This happens once per run. Warn the user it may take 30-60 seconds the first time — subsequent exports within the same session are faster.
- **Slides must use `class="slide"`, pages `class="page"`.** The export script finds slides by querying `.slide` elements, and treats a file with `.page` and no `.slide` as an A4 document. If the presentation uses a different class name, the script will report "0 slides found" and fail. All presentations generated by this skill use `.slide`, so this only matters for externally-created HTML.
- **Local images must be loadable via HTTP.** The script starts a local server and loads the HTML through it (so Google Fonts and relative image paths work). If images use absolute filesystem paths (e.g., `src="/Users/name/photo.png"`) instead of relative paths (e.g., `src="photo.png"`), they won't load. Generated presentations always use relative paths, but converted or user-provided decks might not — check and fix if needed.
- **Local images appear in the PDF** as long as they are in the same directory as (or relative to) the HTML file. The export script serves the HTML's parent directory over HTTP, so relative paths like `src="photo.png"` resolve correctly — including filenames with spaces. If images still don't appear, check: (1) the image files actually exist at the referenced path, (2) the paths are relative, not absolute filesystem paths like `/Users/name/photo.png`.
- **Large presentations produce large PDFs.** Each slide is captured as a full 1920×1080 PNG screenshot. An 18-slide deck can produce a ~20MB PDF. If the PDF exceeds 10MB, ask the user: _"The PDF is [size]. Would you like me to compress it? It'll look slightly less sharp but the file will be much smaller."_ If yes, re-run the export with the `--compact` flag:
  ```bash
  bash scripts/export-pdf.sh <path-to-html> [output.pdf] --compact
  ```
  This renders at 1280×720 instead of 1920×1080, typically cutting file size by 50-70% with minimal visual difference.

---

## Supporting Files

| File                                               | Purpose                                                              | When to Read              |
| -------------------------------------------------- | -------------------------------------------------------------------- | ------------------------- |
| [styles/selection-index.json](styles/selection-index.json) | Generated metadata for every style | Phase 2 (style selection) |
| `styles/<slug>/preview.md` | Cover recipe for a shortlisted style | Phase 2 after shortlisting |
| `styles/<slug>/design.md`, `reference.html` | The chosen style's design system and working deck | Phase 3 after selection |
| [styles/README.md](styles/README.md) | Style folder format; run `node scripts/check-styles.mjs` after edits | Adding or editing a style |
| [references/brand-import.md](references/brand-import.md) | Turning a company design system into a style | Phase 2, when the user brings a brand |
| [fonts/catalog.json](fonts/catalog.json) | Japanese and Latin families with measured palt/vpal and css queries | Phase 2 and 3 (fonts) |
| [styles/gallery.html](styles/gallery.html) | Browsable page of every style for the user | Phase 2, when the user wants to browse |
| [references/diagrams.md](references/diagrams.md), [diagrams.html](references/diagrams.html) | 50 diagram and chart patterns: which to pick per relationship, and working code; run `node scripts/check-diagrams.mjs` after edits | Phase 3, for every diagram or chart slide |
| [scripts/shoot.mjs](scripts/shoot.mjs) | Screenshot every slide, at 1920×1080 or `--phone` | Phase 3 verification |
| [scripts/read-site.sh](scripts/read-site.sh) | Run `scripts/extract-site.mjs` in an isolated Docker container: colors, type, radii, logos and screenshots of a website | Brand import, when the user gives a URL |
| [scripts/check-pages.mjs](scripts/check-pages.mjs) | Check the page frame and text sizes of a `doc-a4` document | Phase 3 verification, for documents |
| [viewport-base.css](viewport-base.css)             | Mandatory fixed-stage CSS — copy into every presentation             | Phase 3 (generation)      |
| [page-base.css](page-base.css), [references/document-pages.md](references/document-pages.md) | Mandatory CSS and page rules for `doc-a4` documents | Phase 3, for an A4 document |
| [formats.json](formats.json) | Stage size, base file and reference file per format | Phase 1–3, when the format matters |
| [html-template.md](html-template.md)               | HTML structure, JS features, code quality standards                  | Phase 3 (generation)      |
| [animation-patterns.md](animation-patterns.md)     | CSS/JS animation snippets and effect-to-feeling guide                | Phase 3 (generation)      |
| [scripts/extract-pptx.py](scripts/extract-pptx.py) | Python script for PPT content extraction                             | Phase 4 (conversion)      |
| [scripts/deploy.sh](scripts/deploy.sh)             | Deploy slides to Vercel for instant sharing                          | Phase 6 (sharing)         |
| [scripts/export-pdf.sh](scripts/export-pdf.sh)     | Export slides to PDF                                                 | Phase 6 (sharing)         |
