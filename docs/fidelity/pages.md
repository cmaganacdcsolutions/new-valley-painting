# Fidelity review: Service, Free Estimate, City pages (+ chip-language pass)

Reviewer: senior-uiux-design (Dark Factory fidelity gate) · 2026-11-02 · Home is out of scope (other reviewer).
Board = source of truth: `concept-board/project/desktop-02-servicio.dc.html` (D02), `desktop-03-cotizacion.dc.html` (D03), `desktop-04-ciudad.dc.html` (D04), `edit-web-01-cotizacion-formulario.dc.html` (EW01). Spec = `design/design-spec.md`.
Shots folder (abbrev. `out/`): `C:\Users\carlo\AppData\Local\Temp\claude\C--Users-carlo-Documents-Work-Personales-CDC-Software-Solutions-clients-Potential-Clients-new-valley-painting\d0c396e9-b2d4-46c4-9749-0558f3132f53\scratchpad\shots\out\`

> Capture caveat: the viewport slices (`*--NN.png`) and the full-page shots (`*-<w>.png`) disagree at 1366/1440 (see FID-B01). Measurements below come from the full-page shots unless stated. Full-page shots also show the sticky header / mobile action bar at odd positions and lazy images blank (BA slider in `service-areas_raleigh-nc-1366.png`); those are stitching artifacts and are NOT counted (the slider renders fine in `service-areas_raleigh-nc-1366--04.png`).

## 1. Findings

### FID-B00 · Blocker · /free-estimate/ horizontal overflow at 320–412 (Foreman, as diagnosed)
- Shot: `out/free-estimate-390.png` (page is 451 px wide). Artboard: `ios-03-cotizacion.dc.html` (390, no overflow).
- Actual: `div.container.estimate` single grid track ~434 px; `.estimate__form.form-card` `min-width:auto` lets the form's min-content widen the track. Overflow 130/90/61/39 px at 320/360/390/412.
- Visible symptoms in the mobile shots (do not double-count): form card and "Prefer to talk?" card run ~61 px past the right edge at 390 (right border, radius and shadow cut off), while header, hero and footer stay 390 wide; the page pans sideways; the fields look wider than the hero text column.
- Suspected: `src/styles/pages.css:122` `.estimate`.
- Fix: `.estimate { grid-template-columns: minmax(0,1fr); }` (below 1024) and `.estimate > * { min-width:0; }`; `.form-card .input, .form-card select, .form-card textarea { width:100%; max-width:100%; }`. Re-shoot 320/360/390/412 and confirm `scrollWidth === innerWidth`.

### FID-B01 · Blocker (pending verification) · viewport-slice renders differ from full-page renders
- Shots: `out/services_interior-painting-1366--01.png`, `out/services_interior-painting-1440--01.png`, `--03.png` vs `out/services_interior-painting-1366.png`.
- In the slices: H1 renders ~32 px (the clamp minimum / UA default) instead of 51 px; section H2s ~28 px instead of 43 px (yet the FAQ H2 in `--04` is 43 px, so the page re-laid out between slices); the light-hero image spans 100% instead of `width:58%` right; a 3 px navy vertical rule appears between trust cells 2 and 3; process step 4 sits 16 px lower than steps 1–3. In `estimate-error-1440--01.png` and `estimate-success-1440--01.png` the "Skip to main content" link is visible.
- The full-page shots render correctly (H1 ≈51 px, image 58%, no navy rule), so this is either a capture artifact or a real late-CSS / FOUC problem at a 768–900 px tall viewport.
- Action (Foreman, 5 min): open `/services/interior-painting/` in a real Chrome window at 1366×768 and 1440×900 with a hard reload, and tab once on `/free-estimate/` after submitting. If any symptom reproduces → Blocker: check stylesheet order in `src/layouts/Base.astro` (tokens.css must load before global/pages CSS, no `media`/`onload` deferred CSS), `src/styles/sections.css` trust-strip divider rules, and `.skip-link` (must be off-screen unless `:focus-visible`). If not reproducible → close as capture artifact and re-capture slices with the same method as the full-page shot.

### FID-B02 · Major · Estimate form H2 renders at section-H2 size, no subtitle, no spacing
- Shot: `out/free-estimate-1366.png` (form card top), `out/free-estimate-390.png`. Artboard: D03 L71–74.
- Expected: H2 "Request your estimate" Montserrat 700 26px/1.25 #0b1a33 (token `--font-size-h3`, spec §6.7 L438) → subtitle → fields at +24px.
- Actual: H2 at ~43px (global `h2`), "Full name" label touches it, subtitle missing (Foreman copy #6 confirmed).
- Cause: `src/styles/pages.css:130` `.form-card > h2` never matches; the H2 is inside `<div data-form-wrap>` (`src/pages/free-estimate/index.astro:51-52`).
- Fix: change selector to `.form-card [data-form-wrap] > h2 { font-size: var(--font-size-h3); line-height: var(--line-height-h3); margin: 0; }`. Insert after the H2: `<p class="form-intro">All fields are required unless marked (optional).</p>` styled `margin: var(--space-2) 0 0; font-size: var(--font-size-small) /*14px*/; line-height:1.5; color: var(--color-gray-600) /*#4b5563*/;`, and give the form `margin-top: var(--space-6)` (24px). The same selector also fixes the success H2 if it lives in the same wrapper (it currently renders correctly; verify).

### FID-B03 · Major · Radio labels stack under the circles
- Shot: `out/free-estimate-1366.png` ("Preferred contact"). Artboard: D03 L95–101.
- Expected: each option a row: 24px circle + 12px gap + label Inter 400 16px/1.5 #111827, min-height 44px; options in one row, column-gap 32px, margin-top 4px.
- Actual: circle on top, label text below it (block layout), labels 14px/600.
- Cause: `src/styles/pages.css:135` `.field label {display:block; margin-bottom; font-weight:600; font-size:14px}` (0,1,1) overrides `.radio` (0,1,0, L159).
- Fix: `.field .radio { display:inline-flex; align-items:center; gap:var(--space-3); margin-bottom:0; font-weight:400; font-size:16px; line-height:1.5; }` and `.radios { gap: 0 var(--space-8); margin-top: var(--space-1); }`.

### FID-B04 · Major · Free Estimate hero missing board details
- Shot: `out/free-estimate-1366.png` hero. Artboard: D03 L53–62.
- Expected: (a) orange brush stroke under "Free Estimate" (inline SVG `viewBox 0 0 300 24`, path `M4 16C60 8 120 6 180 9s90 5 116-1`, stroke #ea580c, width 10, round caps; positioned `left:-2%; width:104%; bottom:-0.12em; height:0.32em; z-index:-1`, span `white-space:nowrap; isolation:isolate`); (b) trust line under the lead: shield-check 16px stroke #f97316 + "Free, no-obligation estimates · Fully insured" Inter 500 13px/1.45 #d1d5db, margin-top 16px; (c) decorative brush bottom-right: same path, stroke #183156, 560×44, `right:-80px; bottom:36px; rotate(-6deg)`; (d) flat bg #0b1a33, padding 66px top/bottom at 1366.
- Actual: none of (a)–(c); gradient navy background; breadcrumb present (kept, see D-31).
- Suspected: `src/components/PageHero.astro` (dark + `short` variant), `src/styles/pages.css:35-55`.
- Fix: add an `underline` prop (the Home hero already has the brush-underline markup to reuse), a `trustLine` slot/prop, and the deco SVG for `short`; set `.page-hero--dark.page-hero--short { background: var(--color-navy-950); padding-block: var(--space-8) 66px; }` (see FID-B05 for the overlap).

### FID-B05 · Major · Estimate body background, spacing and missing Final CTA band
- Shot: `out/free-estimate-1366.png`. Artboard: D03 L65–66, L138–151.
- Expected: body section bg #f9fafb (`--color-gray-50`), padding 66px top / 108px bottom, no overlap with the hero; then the orange Final CTA band (§5.11, "Ready for a Beautifully Painted Home?") before the footer.
- Actual: body bg #ffffff, card pulled up with `margin-top: calc(-1 * var(--space-16))`, footer follows the form directly (no CTA band).
- Suspected: `src/styles/pages.css:200` `.estimate-section`; `src/pages/free-estimate/index.astro` (no `<FinalCta />`).
- Fix: `.estimate-section { background: var(--color-gray-50); margin-top:0; padding-block: 66px var(--space-section-y, 108px); }`; add `import FinalCta` and `<FinalCta />` before `</Base>`; on this page the band's primary button must point to `#estimate-form` (see D-36).

### FID-B06 · Major · "Prefer to talk?" aside anatomy differs
- Shot: `out/free-estimate-1366.png` right column. Artboard: D03 L122–134, data L215–219.
- Expected: no card around the aside. H2 "Prefer to talk?" Montserrat 700 26px #0b1a33; buttons block, min-height 48px, gap 12px (primary "Call (919) 805-7952", outline-dark "Text or WhatsApp"); email link left-aligned (not centered), margin-top 12px, mail 18px #c2410c + "nvpnting@gmail.com" Inter 500 16px #c2410c underlined; then a separate trust card margin-top 32px: bg #ffffff, border 1px #e5e7eb, radius 16px, shadow `0 2px 6px -1px rgba(11,26,51,0.10)`, padding 24px; rows = icon 28px stroke #ea580c + title Montserrat 700 15px/1.3 #0b1a33 + sub Inter 500 13px/1.45 #4b5563; rows 2–3 have `margin-top:16px; padding-top:16px; border-top:1px solid #e5e7eb`. Copy: "Fully Insured / Protected from job-site accidents", "2-Year Workmanship Warranty / On every project we complete", "Family Owned & Operated / Local to Raleigh-Durham".
- Actual: whole aside in a grey card (`.aside-card`, bg #f9fafb, radius 24); email centered; trust rows 24px icons, sentence case ("Fully insured"), no sub-lines, no dividers.
- Suspected: `src/pages/free-estimate/index.astro:34-38,145-155`; `src/styles/pages.css:191-196`.
- Fix: drop `.aside-card` styling (keep a plain wrapper); `.mail-link { justify-content:flex-start; font-weight:500; }`; replace `asideRows` with the 3 title+sub pairs above, wrapped in a `ul.trust-card` with the values listed (reuse the trust-item markup from `TrustStrip.astro`).

### FID-B07 · Minor · Email field has a placeholder the board does not have
- Artboard D03 L77 (no placeholder); spec §6.7 L456 "examples only: (919) 555-0123, 27601". Build `index.astro:76` `placeholder="name@example.com"`. Fix: remove the attribute.

### FID-B08 · Major · Service hero lead duplicates the intro paragraph
- Shot: `out/services_interior-painting-1366.png` hero. Artboard: D02 L69.
- Expected: "Walls, ceilings, trim and doors finished with careful prep and clean lines. Family owned, fully insured and backed by a 2-year workmanship warranty."
- Actual: hero lead = `s.intro` ("Fresh interior paint changes how a home feels…"), the same text repeats 300 px lower in the intro.
- Suspected: `src/pages/services/[slug].astro:47` `lead={s.intro}`.
- Fix: `` lead={`${s.short} Family owned, fully insured and backed by a 2-year workmanship warranty.`} `` (for Interior this produces the board string exactly; `short` already exists for all 8 services in `content.ts`).

### FID-B09 · Major · Service gallery shows other services' photos, wrong heading, no captions or footnote
- Shot: `out/services_interior-painting-1366.png` (gallery: an exterior house + two kitchens on the Interior page). Artboard: D02 L111–127, data L251–255.
- Expected: kicker "Gallery", H2 "Interior Painting Gallery"; 3 figures 4:3, radius 16, "Placeholder" chip top-left 12/12; figcaption Inter 500 13px/1.45 #4b5563, margin-top 12px: "Walls & ceilings · sample photo", "Trim, doors & baseboards · sample photo", "Color guidance · sample photo"; footnote margin-top 24px, 13px #4b5563.
- Actual: H2 "Interior Painting Inspiration"; images = `next(1..3)` services (exterior painting, cabinet, kitchen); no figcaptions; no footnote.
- Suspected: `src/pages/services/[slug].astro:26,77,85-92`.
- Fix: H2 `` `${s.name} Gallery` ``. Add a `gallery` array per service in `src/data/content.ts`; rule: only photos of the same trade (never `imgAfter`/`img16` exterior shots on interior services, never interior shots on Exterior/Decks), never the page's own hero image. Interior = `[img14 (hallway), img11 (cabinets), img12 (kitchen)]`. Captions = the first 3 `included` items + " · sample photo" (Interior gives the board strings). Wrap each in `<figure>` + `<figcaption class="caption">`. Footnote under the grid: `<p class="caption" data-placeholder="true"><span class="ph-chip">To confirm</span> Stock photos for this prototype. To be replaced with New Valley Painting {service, lower case} projects.</p>` (chip wording per D-30).

### FID-B10 · Major · Service page section backgrounds swapped (FAQ / Related)
- Shot: `out/services_interior-painting-1366.png`. Artboard: D02 L150 (FAQ bg #f9fafb), L164 (Related bg #ffffff).
- Actual: FAQ white, Related #f9fafb, so the intro→gallery→process→FAQ→related rhythm (white/grey/white/grey/white) breaks.
- Suspected: `src/components/Faq.astro` (no tone prop), `[slug].astro:100` `section--subtle`.
- Fix: add `tone?: 'subtle'` to `Faq.astro` (adds `section--subtle`), pass `tone="subtle"` on service pages; remove `section--subtle` from the related section. (City page: D04 FAQ bg is #ffffff L180 area; leave the city FAQ white.)

### FID-B11 · Major · Related-services block: copy, set and card anatomy
- Shot: `out/services_interior-painting-1366.png` lower third. Artboard: D02 L164–180, data L267–271.
- Expected: kicker "Keep exploring", H2 "Related Services"; for Interior the 3 cards are Exterior Painting, Cabinet Painting, Drywall & Finishing; card = `a` flex, gap 16, padding 12, bg #fff, border 1px #e5e7eb, radius 10, shadow `0 2px 6px -1px rgba(11,26,51,0.10)`; media 96×96 radius 6 `object-fit:cover`; title Montserrat 700 20px/1.3 #0b1a33; Cabinet shows a chip under the title; trailing chevron-right 20px #c2410c; grid 3 cols, gap 24, margin-top 32.
- Actual: kicker "Related services", H2 "More From New Valley Painting" (Foreman copy #2 confirmed, kicker and H2 also swapped); cards = Exterior, Cabinet, Kitchen Remodeling; 24px icon chip instead of 96px photo; title ~16px.
- Suspected: `[slug].astro:27,103-115`; `.mini-card` in `src/styles/sections.css`/`pages.css`.
- Fix: copy as expected. Add `related: string[]` (slugs) per service in `content.ts`; Interior = `['exterior-painting','cabinet-painting','drywall-finishing']`; others: the 2 nearest same-trade services + 1 cross-sell. Rebuild `.mini-card` as the media variant above using `<Image src={r.image} width={96} height={96} …>`; show `<span class="ph-chip">To confirm</span>` when `r.confirm`. The same component fixes the city grid (FID-B16).

### FID-B12 · Minor · "Areas We Serve" sub-block
- Artboard: D02 L181–187. Expected: H3 "Areas We Serve" (Title Case, Montserrat 700 23px/1.25); chips min-height 48, padding 0 20, radius 10 (not pill), border 1px #d1d5db, bg #fff, Montserrat 600 16px #0b1a33, map-pin 20px #c2410c; footnote margin-top 12px, 13px #4b5563.
- Actual: "Areas we serve"; chips look pill-shaped in the full-page shot (confirm radius in CSS); no coverage footnote.
- Fix: copy; `.chip { border-radius: var(--radius-md); min-height:48px; padding:0 var(--space-5); }` on the light variant; add `<p class="caption" data-placeholder="true"><span class="ph-chip">To confirm</span> Coverage area to be confirmed by New Valley Painting.</p>`.

### FID-B13 · Major · Service FAQ heading (Foreman copy #1, confirmed)
- Artboard D02 L153 "Interior Painting Questions"; build `[slug].astro:98` "…: Common Questions". Fix: `` title={`${s.name} Questions`} ``.

### FID-B14 · Major · City hero lead (Foreman copy #5, confirmed)
- Artboard D04 L67: "Painting and remodeling for Raleigh homes, inside and out. Family owned, fully insured and backed by a 2-year workmanship warranty." Build `[city].astro:47` generic services list. Fix: `` lead={`Painting and remodeling for ${c.name} homes, inside and out. Family owned, fully insured and backed by a 2-year workmanship warranty.`} ``.

### FID-B15 · Major · City intro layout and content
- Shot: `out/service-areas_raleigh-nc-1366.png` (intro centered, narrow). Artboard: D04 L86–98.
- Expected: 12-col grid, gap 24. Left cols 1–5: kicker "Raleigh, NC" + H2 "Painting & Remodeling in Raleigh". Right cols 7–12, padding-top 28px: p1 Inter 20px/1.6 #374151 (unique city copy), p2 body, then link "Call (919) 805-7952 →" Montserrat 700 16px #c2410c, arrow 18px, min-height 44px, margin-top 16px.
- Actual: single centered narrow column, no kicker, no call link.
- Suspected: `[city].astro:54-62` (`container--narrow`). Fix: reuse the `.intro` 2-col grid with the column spans above; `<p class="kicker">{c.name}, NC</p>`; add the tel link. Also drop `data-placeholder="true"` from p1 (spec §6.3 L417: general knowledge, not a client claim).

### FID-B16 · Minor · City services grid: subtitle and card anatomy
- Artboard D04 L102–121. Missing subtitle under the H2: "One trusted, family-owned team for the inside and outside of your home." (Inter 20px/1.6 #4b5563, max 60ch, margin-top 16). Grid 2 cols, gap 24, margin-top 48; cards = media variant from FID-B11 (Cabinet gets the chip). Build `[city].astro:66-80`. Fix: add the `<p class="section-head__lead">`; the card fix lands with FID-B11.

### FID-B17 · Major · City Before/After: full-width slider, side copy missing
- Shot: `out/service-areas_raleigh-nc-1366--04.png`. Artboard: D04 L124–150.
- Expected: 12-col grid, column-gap 48, `align-items:center`; slider cols 1–8 (aspect 3:2, radius 24, shadow `0 20px 48px -12px rgba(11,26,51,0.28)`); caption "Exterior brick painting · Raleigh-Durham area" + chip; cols 9–12: H3 "Painted brick, crisp black trim" (23px), p "A dated tan brick exterior turned bright white with black window trim and fresh white details. That's the kind of change a professional exterior paint job makes.", link "View more projects →" (→ `/projects/`, Montserrat 700 16 #c2410c), then `btn primary` (md, 48px) "Get a Free Estimate".
- Actual: slider spans the full 1204 px container (~800 px tall, taller than a 1366×768 viewport), no side copy, caption without chip.
- Suspected: `[city].astro:84-96`. Fix: wrap figure + a `<div class="ba__copy">` in a 12-col grid with the spans above (stack below 1024: slider then copy); caption chip `<span class="ph-chip">To confirm</span>` (board "[confirmar] location", D-30). Check the Exterior Painting service page, which reuses this slider, for the same full-width issue.

### FID-B18 · Major · City FAQ heading (Foreman copy #3, confirmed)
- Artboard D04 L183 "Questions from Raleigh Homeowners"; build `[city].astro:108` default "Questions, Answered". Fix: `` <Faq faqs={faqs} title={`Questions from ${c.name} Homeowners`} /> ``.

### FID-B19 · Major · City "Nearby areas" band: wrong tone, layout and copy
- Shot: `out/service-areas_raleigh-nc-1366.png` (white band, light pill chips). Artboard: D04 L194–207.
- Expected: dark band bg #0b1a33, padding 108. 12-col, gap 24, `align-items:center`. Cols 1–5: kicker "Nearby areas" #f97316; H2 #ffffff "Also Serving Towns Near Raleigh"; p #d1d5db "Don't see your town? Call us, and we'll let you know if we can help. " + link "(919) 805-7952" #f97316 underlined (offset 3px, nowrap). Cols 6–12: list grid 3 cols, gap 12; chip = flex, gap 10, min-height 56, padding 0 16, bg #10233f, border 1px #2a3d5c, radius 10, Montserrat 600 16px/1.25 #ffffff, map-pin 20 #f97316 leading, chevron-right 16 #9ca3af trailing (`margin-left:auto`). Footnote under the chips (cols 6–12), 13px #9ca3af, with the dark chip variant (bg #10233f, border #f97316, text #f97316, spec L323).
- Actual: white section, H2 "We Also Serve", no helper line (Foreman copy #4 confirmed), light pill chips in a single row, no footnote.
- Suspected: `[city].astro:110-120`. Fix: values above; footnote copy "Coverage area to be confirmed by New Valley Painting." with chip "To confirm".

### FID-B20 · Minor · Placeholder-chip language and wording (site-wide)
- Spanish chips still render at `src/pages/about/index.astro:30` and `src/pages/privacy/index.astro:22`. Service chips read "Confirm scope" + "Scope list pending client confirmation." ("client" reads oddly in front of the client).
- Fix per **D-30**: chip text only "Placeholder" or "To confirm"; Service note becomes `<span class="ph-chip">To confirm</span> Scope list to be confirmed by New Valley Painting.` (cabinet variant: "Service scope to be confirmed by New Valley Painting."). About/Privacy: replace `[confirmar]` chip text with "To confirm"; keep `data-placeholder="true"`. Then grep `src/` for `confirmar` and `pending client` and expect zero visible hits.

### FID-B21 · Minor · Breadcrumb links underlined at rest
- Shots: service and estimate heroes. Board D02 L63: no underline at rest (underline on hover only), #4b5563. Accepted deviation, see **D-33**; no build change.

### Light consistency pass (pages without an artboard)
Not re-shot by me (budget). Checked by grep only: the 2 Spanish chips (FID-B20). Projects/About/Reviews/Privacy reuse `PageHero`, `FinalCta` and `ph-chip`, so FID-B01 (if real), B20 and the hero fixes cover them. The FE agent should glance at `out/about-1440.png`, `out/projects-1440.png`, `out/reviews-1440.png`, `out/privacy-1440.png` after the fixes, at the full-page level.

## 2. Decisions

- **D-30 · Placeholder chip language = English (site-wide).** The site is English and is shown to an English-speaking client; spec §3.10 already sets the chip text to "Placeholder". Vocabulary: **"Placeholder"** = stock image or sample text (images, sample reviews, gallery); **"To confirm"** = a fact pending the client (scope, coverage, location, figures, founding story, legal copy). The footnote sentences use the board's English wording with the token removed: "Scope list to be confirmed by New Valley Painting.", "Coverage area to be confirmed by New Valley Painting.", "Stock photos for this prototype. To be replaced with New Valley Painting {service} projects." `[confirmar]` stays only in the spec, the board's internal notes and the code (`data-placeholder="true"`), never as visible text. Inline `[confirmar]` tokens in body copy (D02 step 2 body L258, FAQ answer 3 L265) are dropped in the build (already the case). **Board edits:** D02 L104 chip → "To confirm" + "Scope list to be confirmed by New Valley Painting."; L126 → chip "To confirm" + "Stock photos for this prototype. To be replaced with New Valley Painting interior projects."; L175 `[confirmar]` → "To confirm"; L187 → chip + "Coverage area to be confirmed by New Valley Painting."; L258/L265 remove " [confirmar]". D04 L114, L140 ("[confirmar] location" → "To confirm"), L206 likewise. Apply the same to `ios-0*/android-0*` copies (sed).
- **D-31 · Breadcrumb on the Free Estimate hero: spec wins, keep it.** Spec §6 L391 says every inner page hero carries a breadcrumb and the page emits `BreadcrumbList` JSON-LD; D03 omits it. **Board edit:** add the dark breadcrumb (§3.11: links #d1d5db, current #ffffff, chevron 14px #9ca3af) "Home › Free Estimate" above the H1 in D03, `ios-03`, `android-03`, with H1 margin-top 12px.
- **D-32 · Compact service cards with a 96×96 photo on desktop: board wins over spec §3.5.** Spec L171 limits the compact variant to <480 px, but D02 (Related) and D04 (Our services) deliberately use it at 1366 (D04 L102 data-spec: "2 cols at 1366 so titles never clip"). **Spec edit:** §3.5 add "Compact variant is also used at all widths for Related services (§6.2-7) and city 'Our services' (§6.3-4)". The icon-chip mini card in the build is not approved.
- **D-33 · Breadcrumb links underlined at rest: accessibility wins, keep the build.** With #4b5563 links next to #0b1a33 current text, the underline is what tells them apart without relying on colour (WCAG 1.4.1). **Board edit:** D02/D03(after D-31)/D04 and the light/dark breadcrumb in §3.11: `text-decoration: underline; text-underline-offset: 3px` at rest.
- **D-34 · Light-hero CTA row wraps at 1366: accept.** The text column is capped at 560 px and the two `--lg` buttons measure 274 + 12 + 282 = 568 px, so the board itself wraps; the stacked buttons in the build are faithful. No change.
- **D-35 · Section headings: board wins on every heading the build rewrote.** "Interior Painting Questions", kicker "Keep exploring" + H2 "Related Services", "Interior Painting Gallery", "Areas We Serve", "Questions from {City} Homeowners", "Also Serving Towns Near {City}" + helper line. No accepted copy deviations in this slice. Real stock photos instead of the board's dashed IMG slots are accepted (they carry the "Placeholder" chip, D-12).
- **D-36 · Final CTA band on /free-estimate/: board wins, keep it.** D03 includes §5.11. On this page its primary button "Get a Free Estimate" links to `#estimate-form` (as D03's footer button does, L160); the phone button stays `tel:`.

## 3. Verdict

These three pages are close in structure, tokens, colour and component vocabulary. They are not ready to show as they stand. The Free Estimate page is the conversion page, and three things on it look broken in front of a client: the mobile overflow (B00), the oversized form title with no spacing (B02) and the stacked radios (B03). Each is a one-to-five-line CSS fix. The rest of the Major list is board fidelity rather than breakage: copy, section tone, the side copy next to the Before/After slider, the dark nearby band and the photo cards. It amounts to about 2–3 hours of FE work in `[slug].astro`, `[city].astro`, `free-estimate/index.astro`, `PageHero.astro`, `Faq.astro`, the mini-card CSS and `content.ts`. FID-B01 must be verified first in a real browser at 1366×768: if it reproduces, it outranks everything else. Once B00, B01 (verified or closed) and the Major findings are fixed and re-shot at 390 and 1366, these pages are ready for tomorrow's meeting. The Minor items can ship after it.
