# New Valley Painting: Build Spec v1.0 (pitch prototype)

Date: 2026-11-02 · Owner: senior-uiux-design (CDC) · Builder: fe-senior-react (Astro, Vercel) · Motion pass: cinematic-effects-expert
Sources: `docs/brief.md`, `assets/reference-structure.jpeg` (the ONLY structural reference), `assets/current-site/*`.
Tokens: `design/tokens.json` (source of truth) + `design/tokens.css` (1:1 mirror). **Reference tokens by name; never hardcode a value.** Any value you need that is not in this spec or the tokens is a design defect. Ask; do not guess.

Legend: `[confirmar]` = business fact or copy that the client must confirm. It ships in the prototype only where this spec says so, and always visibly labelled. `→` = token.

---

## 0. Global rules (apply everywhere)

| Rule | Value |
|---|---|
| Language | `<html lang="en-US">` |
| Box model | `*, *::before, *::after { box-sizing: border-box }`; flex/grid children that hold text get `min-width: 0` |
| Page | `overflow-x: clip` on `body` (a safety net, not a fix). **No horizontal scroll at 320px.** |
| Body text | → typography `body`, color → `color.text.body` (#374151) on → `color.bg.page` (#ffffff) |
| Headings | H1/H2 → `color.text.strong` (#0b1a33) on light; → `color.text.on-dark` (#ffffff) on dark. `text-wrap: balance` on H1–H3; `text-wrap: pretty` on paragraphs |
| Container | `width: 100%; max-width: → layout.container-max (1280px); margin-inline: auto; padding-inline: → layout.gutter` |
| Section rhythm | `padding-block: → layout.section-y` (56→112px). Strips use → `layout.section-y-tight` |
| Digits | Phone numbers and stats use `font-variant-numeric: tabular-nums lining-nums` |
| Phone link | `href="tel:+19198057952"`, visible text `(919) 805-7952`, `white-space: nowrap` (never breaks) |
| Skip link | First focusable element: "Skip to main content" → `#main`. Hidden until focus; on focus: fixed top-left 8px, bg #0b1a33, text #ffffff, padding 12px 16px, radius → `radius.md`, z → `z.skip-link` |
| Focus | `:focus-visible { outline: → border-width.accent (3px) solid → color.focus.ring (#ea580c); outline-offset: 3px; border-radius: inherit }`. Inside `.on-accent` the ring is #0b1a33. Never `outline: none` without this replacement |
| Touch targets | Every interactive element ≥ 44×44px (→ `layout.touch-min`), including icon buttons, FAQ rows and footer links (footer links get `padding-block: 10px` so each row is ≥44px tall) |
| State ≠ color only | Errors carry an icon + text; the active nav item gets an underline bar + `aria-current="page"`; the selected filter chip gets a check icon + `aria-pressed` |
| Bottom bar offset | `<1024px`: `body { padding-bottom: calc(→ layout.mobile-bar-h + env(safe-area-inset-bottom)) }` so the sticky bar never covers the footer |
| Anchor offset | `html { scroll-padding-top: calc(→ layout.header-h + 16px) }` |
| Viewport meta | `width=device-width, initial-scale=1, viewport-fit=cover` (no `maximum-scale`; zoom must work) |
| Placeholder marker | Any `[confirmar]` content shown in the build gets the **Placeholder chip** (§3.10) or the footnote style. Keep `data-placeholder="true"` on the element so QA can grep for it |

---

## 1. Sitemap, URLs and SEO

### 1.1 Routing
- Astro static output, `trailingSlash: 'always'`, `build.format: 'directory'`. Real routes only, no hash routing.
- `site` = the production Vercel URL until the client's domain is connected. Canonical = `site` + path, absolute, with trailing slash.
- **Indexing flag (D-14):** env `PUBLIC_NOINDEX` (default `true` on the pitch deploy). When `true`, every page emits `<meta name="robots" content="noindex, nofollow">` and `robots.txt` = `Disallow: /`. When `false`: `index, follow` plus `robots.txt` with `Allow: /` and `Sitemap: <site>/sitemap-index.xml`. Run Lighthouse budgets against a `PUBLIC_NOINDEX=false` local `astro preview`.
- `vercel.json` redirects (308): `/contact` and `/contact/` → `/free-estimate/`; `/home` → `/`; `/services/drywall/` → `/services/drywall-finishing/`.
- `@astrojs/sitemap` lists every page except `/404`. Custom `src/pages/404.astro`: H1 "Page not found", links to Home, Services and Free Estimate.

### 1.2 Page table (titles ≤60 chars, descriptions ≤155 chars, both counted)

| Route | `<title>` | Meta description | H1 | Primary kw | Secondary kw |
|---|---|---|---|---|---|
| `/` | Raleigh-Durham Painting & Remodeling \| New Valley Painting | Family-owned painting and remodeling contractor in Raleigh-Durham, NC. Interior, exterior, kitchens, baths and more. Fully insured. Free estimates. | Painting & Remodeling Services in Raleigh-Durham | painting contractor Raleigh Durham | house painters Raleigh NC; home remodeling Raleigh; painters near me |
| `/services/` | Home Painting & Remodeling Services \| New Valley Painting | Interior and exterior painting, cabinet painting, kitchen and bath remodeling, flooring, drywall and decks across Raleigh-Durham, NC. | Painting & Remodeling Services | home painting services Raleigh | remodeling services Durham NC |
| `/services/interior-painting/` | Interior Painting in Raleigh, NC \| New Valley Painting | Interior painting for walls, ceilings, trim and doors in Raleigh-Durham. Careful prep, clean lines, 2-year workmanship warranty. Free estimate. | Interior Painting in Raleigh-Durham, NC | interior painters Raleigh NC | interior house painting Durham; room painting Cary |
| `/services/exterior-painting/` | Exterior Painting in Raleigh, NC \| New Valley Painting | Exterior house painting for siding, brick, trim and doors in Raleigh-Durham. Fully insured, 2-year workmanship warranty. Free estimate. | Exterior House Painting in Raleigh-Durham, NC | exterior painters Raleigh NC | brick painting Raleigh; house painting Durham |
| `/services/cabinet-painting/` `[confirmar]` | Cabinet Painting in Raleigh, NC \| New Valley Painting | Kitchen cabinet painting in Raleigh-Durham: a fresh, durable finish without the cost of new cabinets. Free estimate from a family-owned team. | Cabinet Painting in Raleigh-Durham, NC | cabinet painting Raleigh NC | kitchen cabinet refinishing Durham |
| `/services/kitchen-remodeling/` | Kitchen Remodeling in Raleigh, NC \| New Valley Painting | Kitchen remodeling in Raleigh-Durham, from cabinets and counters to finishes and paint. One family-owned team, fully insured. Free estimate. | Kitchen Remodeling in Raleigh-Durham, NC | kitchen remodeling Raleigh NC | kitchen renovation Durham; kitchen remodel Cary |
| `/services/bathroom-remodeling/` | Bathroom Remodeling in Raleigh, NC \| New Valley Painting | Bathroom remodeling in Raleigh-Durham, from quick refreshes to complete makeovers. Family owned, fully insured. Request a free estimate. | Bathroom Remodeling in Raleigh-Durham, NC | bathroom remodeling Raleigh NC | bathroom renovation Durham |
| `/services/flooring-installation/` | Flooring Installation in Raleigh, NC \| New Valley Painting | Flooring installation in Raleigh-Durham homes, installed level, tight and ready for daily life. Family-owned and fully insured. Free estimate. | Flooring Installation in Raleigh-Durham, NC | flooring installation Raleigh NC | floor installers Durham |
| `/services/drywall-finishing/` | Drywall Repair & Finishing in Raleigh, NC \| New Valley | Drywall repair, patching and finishing in Raleigh-Durham. Smooth, paint-ready walls from a family-owned, fully insured team. Free estimate. | Drywall Repair & Finishing in Raleigh-Durham, NC | drywall repair Raleigh NC | drywall finishing Durham; drywall patch Cary |
| `/services/decks-outdoor-living/` | Decks & Outdoor Living in Raleigh, NC \| New Valley Painting | Deck building, restoration and staining plus outdoor living spaces in Raleigh-Durham. Fully insured, family owned. Request a free estimate. | Decks & Outdoor Living in Raleigh-Durham, NC | deck builders Raleigh NC | deck staining Raleigh; deck repair Durham |
| `/projects/` | Painting & Remodeling Projects, Before & After \| New Valley | See before-and-after painting and remodeling projects by New Valley Painting in Raleigh-Durham, NC. Real homes, real transformations. | Our Projects: Before & After | painting before and after Raleigh | remodeling projects Raleigh NC |
| `/about/` | About New Valley Painting \| Family-Owned, Raleigh-Durham | New Valley Painting is a family-owned and operated painting and remodeling company serving Raleigh-Durham, NC. Fully insured. | About New Valley Painting | family owned painters Raleigh | local painting company Durham |
| `/reviews/` | Reviews \| New Valley Painting, Raleigh-Durham Painters | Read what Raleigh-Durham homeowners say about New Valley Painting's painting and remodeling work, then request your free estimate. | Customer Reviews | New Valley Painting reviews | painters reviews Raleigh NC |
| `/free-estimate/` | Free Painting & Remodeling Estimate \| New Valley Painting | Request a free, no-obligation painting or remodeling estimate in Raleigh-Durham. Call (919) 805-7952 or send the form. | Get Your Free Estimate | free painting estimate Raleigh | painting quote Durham NC |
| `/service-areas/` | Service Areas: Raleigh, Durham, Cary & More \| New Valley | New Valley Painting serves Raleigh, Durham, Cary, Chapel Hill, Apex and Wake Forest, NC with painting and remodeling. Free estimates. | Areas We Serve in the Triangle | painters Triangle NC | painting contractor near me |
| `/service-areas/raleigh-nc/` | Raleigh, NC Painters & Remodelers \| New Valley Painting | Painting and remodeling in Raleigh, NC: interior, exterior, kitchens, baths, floors and decks. Family owned, fully insured. Free estimate. | Painters & Remodelers in Raleigh, NC | painters Raleigh NC | remodeling contractor Raleigh |
| `/service-areas/durham-nc/` | Durham, NC Painters & Remodelers \| New Valley Painting | Painting and remodeling in Durham, NC: interior, exterior, kitchens, baths, floors and decks. Family owned, fully insured. Free estimate. | Painters & Remodelers in Durham, NC | painters Durham NC | remodeling contractor Durham |
| `/service-areas/cary-nc/` | Cary, NC Painters & Remodelers \| New Valley Painting | Painting and remodeling in Cary, NC: interior, exterior, kitchens, baths, floors and decks. Family owned, fully insured. Free estimate. | Painters & Remodelers in Cary, NC | painters Cary NC | house painting Cary |
| `/service-areas/chapel-hill-nc/` | Chapel Hill, NC Painters & Remodelers \| New Valley Painting | Painting and remodeling in Chapel Hill, NC: interior, exterior, kitchens, baths, floors and decks. Family owned, fully insured. Free estimate. | Painters & Remodelers in Chapel Hill, NC | painters Chapel Hill NC | remodeling Chapel Hill |
| `/service-areas/apex-nc/` | Apex, NC Painters & Remodelers \| New Valley Painting | Painting and remodeling in Apex, NC: interior, exterior, kitchens, baths, floors and decks. Family owned, fully insured. Free estimate. | Painters & Remodelers in Apex, NC | painters Apex NC | house painting Apex |
| `/service-areas/wake-forest-nc/` | Wake Forest, NC Painters & Remodelers \| New Valley Painting | Painting and remodeling in Wake Forest, NC: interior, exterior, kitchens, baths, floors and decks. Family owned, fully insured. Free estimate. | Painters & Remodelers in Wake Forest, NC | painters Wake Forest NC | remodeling Wake Forest |
| `/privacy/` | Privacy Policy \| New Valley Painting | How New Valley Painting handles the information you share when you request an estimate. | Privacy Policy | n/a | n/a |

City-page descriptions share a pattern. Their uniqueness comes from the body copy (§6.2). Service areas = all 6 cities (D-08); coverage is `[confirmar]`.

### 1.3 Head tags (every page)
`<title>`, `<meta name="description">`, `<link rel="canonical">`, robots (per D-14), `og:type` (`website` on Home, `article` nowhere), `og:title` (= title), `og:description`, `og:url`, `og:image` (absolute), `og:image:width` 1200, `og:image:height` 630, `og:image:alt`, `og:site_name` "New Valley Painting", `og:locale` en_US, `twitter:card` summary_large_image, `<meta name="theme-color" content="#0b1a33">`, favicons (§8.3), `<link rel="preload">` for the LCP image and one font file (§10).

### 1.4 JSON-LD (one `<script type="application/ld+json">` per page, `@graph`)
Entity IDs: business `"<site>/#business"`, website `"<site>/#website"`.

| Page | Types in `@graph` |
|---|---|
| Home | `WebSite` (name, url, publisher → #business) · `HousePainter` (#business) · `FAQPage` (the 6 Home FAQs) |
| Services hub | `CollectionPage` · `BreadcrumbList` · `ItemList` of the 8 `Service` URLs |
| Service page | `Service` (name, serviceType, description, provider → #business, areaServed = 6 `City`) · `BreadcrumbList` · `FAQPage` (that page's FAQs) |
| Service-area page | `Service` (serviceType "Painting and remodeling", areaServed = that `City` with `containedInPlace` State NC) · `BreadcrumbList` · `FAQPage` |
| Projects | `CollectionPage` · `BreadcrumbList` · `ImageObject` per **real** project photo only |
| About | `AboutPage` (mainEntity → #business) · `BreadcrumbList` |
| Reviews | `WebPage` · `BreadcrumbList`. **`Review`/`AggregateRating` only when real reviews are confirmed** (D-15); in the prototype, omit them. |
| Free estimate | `ContactPage` · `BreadcrumbList` |

`HousePainter` (a subtype of HomeAndConstructionBusiness) fields: `name` "New Valley Painting"; `url`; `logo` (absolute PNG 512×512); `image` (OG default); `telephone` "+1-919-805-7952"; `email` "nvpnting@gmail.com"; `slogan` "The brush of quality, the stroke of excellence"; `sameAs` ["https://www.facebook.com/newvalleypaintingrdu/"]; `areaServed` = 6 × `{"@type":"City","name":"Raleigh","containedInPlace":{"@type":"State","name":"North Carolina"}}`; `address` = `{"@type":"PostalAddress","addressRegion":"NC","addressCountry":"US"}` (street, locality and ZIP `[confirmar]`; never invent them); `priceRange` omitted `[confirmar]`; `openingHoursSpecification` omitted `[confirmar]`; `knowsAbout` = the 8 service names. **No `aggregateRating` until confirmed.**
`BreadcrumbList`: Home → Section → Page, absolute URLs, and it matches the visible breadcrumb exactly.

### 1.5 OG images
- Size 1200×630, JPG, ≤200 KB, file `public/og/default.jpg`, plus `public/og/<service-slug>.jpg` for the 8 services (same template).
- Template: bg #0b1a33; right 46% = photo (`object-fit: cover`) under a left-edge fade to #0b1a33; left column at padding 72px: LogoN at height 56px; 32px gap; headline in Montserrat 800 64px/1.05, #ffffff, max 3 lines (Home: "Painting & Remodeling in Raleigh-Durham"; service: the service name); 24px gap; a 72×6px bar #ea580c, radius 3px; 20px gap; "(919) 805-7952 · Free Estimates" in Inter 600 30px #d1d5db.
- `og:image:alt`: "New Valley Painting: <headline>".

---

## 2. Brand application

### 2.1 Palette (hex · token · role)
| Hex | Token | Role |
|---|---|---|
| #0b1a33 | color.navy.950 | Header, hero overlay, footer, dark bands, primary-button label, strong headings |
| #10233f | color.navy.900 | Drawer, dropdown, dark cards, Call button in the mobile bar |
| #183156 | color.navy.800 | Hover on dark surfaces |
| #2a3d5c | color.navy.700 | Hairlines/dividers on dark (decorative, not a 3:1 UI boundary) |
| #ea580c | color.orange.600 | **Brand orange.** Primary CTA fill, icons, accent bars, brush stroke, focus ring |
| #f97316 | color.orange.500 | Primary CTA hover; accent text, stars and stat numbers on dark |
| #c2410c | color.orange.700 | Accent text and links on light backgrounds (5.18:1) |
| #9a3412 | color.orange.800 | Link hover on light |
| #fff7ed / #ffedd5 | color.orange.50 / 100 | Icon chip fills, soft accent panels |
| #111827 → #ffffff | color.gray.* | Neutrals (Tailwind gray family, kept from the current site) |
| #1e3a8a | color.legacy.blue-800 | Last stop of `gradient.dark-band` only (a nod to the current blue-900) |
| #11698c | color.legacy.teal-700 | Info feedback only |

**Hard rule:** never put white text on orange. Labels on orange are #0b1a33 (4.88:1). See the `contrast` array in tokens.json.

### 2.2 Typography (D-03)
- **Display: Montserrat (variable, 600–800).** The logo wordmark ("PAINTING") is set in Montserrat, so headlines now speak the same geometric voice as the brand mark. It also matches the reference's heading style.
- **Body: Inter (variable, 400–600).** Built for screens, it has tall x-height and true tabular lining figures, so phone numbers and prices align.
- **Raleway and Acme are dropped.** Raleway defaults to old-style numerals, so "(919) 805-7952" renders with descending digits, and its thin weights hurt legibility on mobile. Acme reads as cartoonish and off-brand for premium positioning.
- Delivery: self-host via `@fontsource-variable/montserrat` and `@fontsource-variable/inter` (both are OFL Google Fonts), latin subset only, `font-display: swap`, with the metric-matched fallbacks from tokens (no CLS). Preload only `montserrat-latin-wght-normal.woff2`. No request to fonts.googleapis.com.

### 2.3 Logo (D-04)
- Use **LogoN** (horizontal lockup: white "New Valley", orange "PAINTING" and N mark) on every dark surface: header, drawer, footer and OG. Its white parts make it **unusable on light backgrounds**; every logo placement in this spec is on navy, so no dark version is needed for the prototype.
- Export from `assets/current-site/LogoN.d5100d32.png` (2284×435, ratio 5.25:1) via `astro:assets` at 2× the displayed height. Alt: `New Valley Painting`. Wrap it in `<a href="/" aria-label="New Valley Painting, home">`.
- Displayed height: 32px (<400px) / 36px (400–1023) / 44px (≥1024), i.e. → `layout.logo-h*`, width auto. Clear space ≥ 0.5× height.
- The logo's orange measures ~#ff6b15, brighter than #ea580c. Keep the artwork untouched; recolouring it is out of scope. A vectorised SVG logo and a dark-on-light version are follow-ups `[confirmar]`.
- **LogoF** (stacked N mark + "PAINTING") is used only to derive the favicon (§8.3).

---

## 3. Component inventory (atoms → molecules)

All interactive components list default / hover / focus-visible / active (pressed) / disabled. Transitions use `→ duration.fast` with `→ easing.standard` unless stated otherwise.

### 3.1 Button (atom) `.btn`
Base: `display: inline-flex; align-items: center; justify-content: center; gap: → space.2; min-height: 48px; padding: 0 → space.6; border: → border-width.strong solid; border-radius: → radius.md; font: → typography.btn (Montserrat 700, 16px, lh 1, ls 0.01em); white-space: nowrap; text-decoration: none; cursor: pointer`. Icon 20×20, `flex: none`.
Sizes: `--sm` min-height 44px, padding 0 18px, → `font-size.btn-sm` (15px) · `--md` (default) · `--lg` min-height 56px, padding 0 → `space.8` (32px), → `font-size.btn-lg` (17px). `--block`: `width: 100%`.

| Variant | Default | Hover | Active (pressed) | Disabled |
|---|---|---|---|---|
| `primary` | bg #ea580c, border #ea580c, text #0b1a33, icon #0b1a33, shadow → `shadow.cta` | bg #f97316, border #f97316, `translateY(→ distance.hover-lift)`, shadow → `shadow.cta-hover`, trailing arrow `translateX(→ distance.arrow-nudge)` | bg #ea580c, `translateY(0) scale(→ scale.press)`, shadow → `shadow.xs` | bg #d1d5db, border #d1d5db, text #4b5563, shadow none, `cursor: not-allowed`, `aria-disabled="true"` |
| `outline-light` (on dark) | bg transparent, border #ffffff, text #ffffff, icon #f97316 | bg #ffffff, text #0b1a33, icon #c2410c | `scale(→ scale.press)` | border #9ca3af, text #9ca3af |
| `outline-dark` (on light) | bg transparent, border #0b1a33, text #0b1a33, icon #0b1a33 | bg #0b1a33, text #ffffff, icon #f97316 | `scale(→ scale.press)` | border #d1d5db, text #4b5563 |
| `dark` (on orange band) | bg #0b1a33, border #0b1a33, text #ffffff, icon #f97316 | bg #183156, border #183156, lift as primary | `scale(→ scale.press)` | as primary disabled |

Focus-visible (all): the global outline (3px #ea580c, offset 3px; #0b1a33 inside `.on-accent`). Disabled is not conveyed by color alone: also `cursor: not-allowed`, plus a spinner/label change in the loading state (§6.7).
### 3.2 Text link `.link`
Light: #c2410c, `text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px` → hover #9a3412, thickness 2px. Dark: #f97316 → hover #ffffff.
**Arrow link** `.link-arrow`: Montserrat 700 16px, no underline by default, trailing `arrow-right` 18px; hover: underline + arrow nudges 4px. Min-height 44px (inline-flex, align center).

### 3.3 Kicker + section header (molecule) `.section-head`
- Kicker: a 24×3px bar (bg #ea580c, radius → `radius.xs`) + 12px (`space.3`) gap + text, → typography `kicker` (Montserrat 700, 13px, ls 0.14em, UPPERCASE). Color #c2410c on light / #f97316 on dark.
- H2: → typography `h2`, margin-top → `space.3`.
- Lead (optional): → typography `lead`, color #4b5563 on light / #d1d5db on dark, margin-top → `space.4`, `max-width: 60ch`.
- Alignment: left on all widths (D-11), except the centered variant used by Process, Reviews and the Final CTA (`text-align: center; margin-inline: auto`, bar placed before the text).

### 3.4 Icon chip (atom) `.icon-chip`
48×48px (56×56 at ≥1024), radius → `radius.md`, bg #fff7ed, border 1px solid #ffedd5, icon 24px stroke #ea580c. Dark variant: bg #10233f, border 1px solid #2a3d5c, icon #f97316.

### 3.5 Service card (molecule) `.service-card`
- Wraps `<a href="/services/<slug>/">` around the whole card (one link; the title is the accessible name).
- Card: bg #ffffff, border 1px solid #e5e7eb, radius → `radius.lg` (16px, all 4 corners), shadow → `shadow.sm`, `overflow: hidden`.
- Media: aspect 4:3, `object-fit: cover`, radius 0 (clipped by the card).
- Icon chip overlaps the media bottom-left: `margin-top: -24px; margin-left: → space.5`, plus a 4px solid #ffffff ring (`box-shadow: 0 0 0 4px #ffffff`).
- Body padding: → `space.5` (20px) top 12px; title → `h4` #0b1a33; desc → `small` #4b5563, margin-top `space.2`, clamped to 2 lines (`-webkit-line-clamp: 2`); arrow link "Learn more" (`aria-hidden` arrow) margin-top `space.4`, color #c2410c.
- Hover (pointer devices only, `@media (hover:hover)`): card `translateY(→ distance.card-lift)`, shadow → `shadow.lg`, media `scale(→ scale.card-image-hover)` over → `duration.slow` → `easing.out-expo`, arrow nudge. Focus-visible: outline on the `<a>` with radius 16px. Active: `scale(0.99)`.
- **Compact variant (<480px):** horizontal row with media 96×96 (1:1) on the left, radius → `radius.md` (10px), card padding → `space.3`, gap → `space.4`; icon chip hidden; desc hidden; title → `h4`; a trailing `chevron-right` 20px #c2410c.

### 3.6 Trust item (molecule)
Icon 28px (stroke #ea580c, stroke-width 2) + label in Montserrat 700, 15px (→ `font-size.nav`), lh 1.3, #0b1a33 + optional sub-line → `caption` #4b5563. Not interactive.

### 3.7 Stat (molecule)
Icon 32px #f97316 · number → typography `stat` #ffffff (the suffix "+", "%" or "★" is in #f97316, inside the same span) · label → `small` #d1d5db. The number is final in the HTML (count-up is enhancement only, §9.3).

### 3.8 Review card (molecule)
bg #ffffff, border 1px solid #e5e7eb, radius → `radius.lg`, padding → `space.6`, shadow → `shadow.sm`. Top: 5 stars 18px (filled star SVG, fill #f97316, stroke none), wrapped in `role="img" aria-label="Rated 5 out of 5"`. Quote → `body` #374151 italic none, max 6 lines on mobile (no clamp; full text). Footer: 40×40 initials avatar (bg #0b1a33, text #ffffff, Montserrat 700 15px) + name (→ `label` #0b1a33) + context (→ `caption` #4b5563, e.g. "Interior painting · Raleigh"). Quote icon 32px top-right, stroke #ffedd5.

### 3.9 FAQ item (molecule): native `<details>/<summary>`
- `summary`: `display: flex; justify-content: space-between; align-items: center; gap: → space.4; min-height: 56px; padding: → space.5 0`; text → `h4` #0b1a33; trailing `plus` icon 24px #ea580c in a 36×36 circle (bg #fff7ed). `list-style: none` and `::-webkit-details-marker { display: none }`.
- `[open]`: icon swaps to `minus` (CSS: render both, toggle display), summary text #c2410c.
- Answer: → `body` #374151, padding-bottom → `space.5`, `max-width: 68ch`.
- Divider: `border-bottom: 1px solid #e5e7eb` on each item; the first item also gets `border-top: 1px solid #e5e7eb`.
- Hover: summary text #c2410c. Focus-visible: outline on the summary, offset 2px.

### 3.10 Placeholder chip (atom) `.ph-chip`
Inline-flex, height 22px, padding 0 8px, radius → `radius.pill`, bg #fffbeb, border 1px solid #b45309, text #b45309, → typography `caption` (Inter 500, 13px), text "Placeholder". Used on sample reviews, stock project cards and the stats footnote. `data-placeholder="true"`.

### 3.11 Breadcrumb (molecule)
`<nav aria-label="Breadcrumb"><ol>`; items → `small`; links #d1d5db on dark heroes (#4b5563 on light), separator `chevron-right` 14px #9ca3af `aria-hidden`; current item #ffffff (#0b1a33 on light) with `aria-current="page"`. Wraps onto 2 lines if needed (no truncation).

### 3.12 Form controls: see §6.7.

---

## 4. Header, drawer and mobile action bar

### 4.1 Header (organism) `<header class="site-header">`
- `position: sticky; top: 0; z-index: → z.header; height: → layout.header-h (64 / 80 at ≥1024); bg #0b1a33; border-bottom: 1px solid #2a3d5c`. Shadow: none at the top of the page; → `shadow.header` once scrolled >8px (JS adds `.is-scrolled`; without JS it stays flat).
- Inner: container (max 1280, gutter padding), `display: flex; align-items: center; justify-content: space-between; gap: → space.4`.

| Range | Content (left → right) |
|---|---|
| 320–1023 | Logo · [right group, gap `space.1`]: phone icon button (44×44, icon `phone` 24px #f97316, `aria-label="Call (919) 805-7952"`) · menu button (44×44, icon `menu` 24px #ffffff, `aria-label="Open menu"`, `aria-expanded`, `aria-controls="drawer"`) |
| 1024–1279 | Logo · nav (gap `space.6`) · phone icon button 44×44 · CTA `btn primary --sm` "Free Estimate" + `arrow-right` |
| ≥1280 | Logo · nav (gap `space.8`) · phone link (icon 18px #f97316 + "(919) 805-7952" Montserrat 700 15px #ffffff, min-height 44px) · CTA `btn primary --sm` "Get a Free Estimate" + `arrow-right` |

- Nav items (desktop): **Services ▾ · Service Areas ▾ · Projects · About · Reviews** (D-05: "Contact" is replaced by the persistent CTA plus phone). Text → `typography.nav` (Montserrat 600 15px) #ffffff; each item is 44px tall with padding 0 4px.
  - Hover: text #f97316. Active page: text #ffffff plus a 3px × 100% bar #ea580c at the bottom of the header (`::after`, bottom 0, radius 2px top), `aria-current="page"`. Focus: global outline.
- **Dropdown** (Services, Service Areas): trigger is a `<button aria-expanded aria-controls>` with `chevron-down` 16px that rotates 180° when open (→ `duration.base`). Opens on click (and on hover after a → `duration.fast` intent delay on pointer devices). Panel: `position: absolute; top: 100%; min-width: 280px; bg #10233f; border: 1px solid #2a3d5c; radius → radius.lg; shadow → shadow.lg; padding → space.2; z → z.dropdown`. Items: 44px min-height, padding 0 `space.4`, radius `radius.md`, text Inter 500 15px #ffffff, hover bg #183156 + text #f97316. Services panel lists the 8 services + a divider (1px #2a3d5c) + "All services →" (#f97316). Areas panel lists the 6 cities + "All service areas →". Esc closes and returns focus to the trigger; a click outside closes. Enter animation: opacity 0→1 + translateY(-8px→0), → `duration.base` → `easing.out-expo`.

### 4.2 Mobile drawer (organism) `<div id="drawer" role="dialog" aria-modal="true" aria-label="Menu">`
- Backdrop: fixed inset 0, bg `#0b1a33` at 60% (`#0b1a3399`), z → `z.drawer-backdrop`, click closes.
- Panel: fixed top 0 right 0 bottom 0, `width: min(88vw, 400px)`, bg #10233f, z → `z.drawer`, `overflow-y: auto; overscroll-behavior: contain`, padding `space.4` `space.5` `calc(space.6 + env(safe-area-inset-bottom))`.
- Top row (64px): LogoN 32px + close button 44×44 (`x` 24px #ffffff, `aria-label="Close menu"`).
- Links (each a 52px-tall row, `border-bottom: 1px solid #2a3d5c`, → `font-size.drawer-link` (18px) Montserrat 600 #ffffff, hover/active text #f97316): Home · Services (accordion `<details>`: 8 services, indented 16px, Inter 500 16px #d1d5db, 48px rows) · Service Areas (accordion: 6 cities) · Projects · About · Reviews · Free Estimate.
- Bottom block (margin-top `space.6`, gap `space.3`): `btn primary --lg --block` "Get a Free Estimate" + `arrow-right` · `btn outline-light --lg --block` with `phone` + "Call (919) 805-7952" · a row of `mail` "nvpnting@gmail.com" (→ `small` #d1d5db, link) and `facebook` 44×44 icon link (`aria-label="New Valley Painting on Facebook"`).
- Behavior: opening locks body scroll (`overflow: hidden` on `html`), moves focus to the close button, traps Tab; Esc or the backdrop closes and returns focus to the menu button. Motion: panel `translateX(100%→0)` → `duration.slow` → `easing.out-expo`; backdrop opacity → `duration.base`. Reduced motion: no slide, opacity only (→ `duration.fast`).
- No-JS fallback: the menu button is an `<a href="#site-footer-nav">`, so the footer's full link list serves as the menu.

### 4.3 Sticky mobile action bar (organism) `.action-bar` (<1024px only)
- `position: fixed; left: 0; right: 0; bottom: 0; z-index: → z.mobile-bar; display: grid; grid-template-columns: 1fr 1fr; gap: → space.2; padding: → space.2 → space.2 calc(→ space.2 + env(safe-area-inset-bottom)); bg #0b1a33; border-top: 1px solid #2a3d5c; box-shadow: → shadow.mobile-bar`. Content height 48px (bar 64px + safe area).
- Left: `<a href="tel:+19198057952">`, bg #10233f, border 2px solid #2a3d5c, radius `radius.md`, text #ffffff Montserrat 700 16px, icon `phone` 20px #f97316, label **"Call Now"**, `aria-label="Call New Valley Painting at (919) 805-7952"`. Pressed: bg #183156.
- Right: `btn primary` styled `<a href="/free-estimate/">`, label **"Free Estimate"** + `arrow-right` 18px. On `/free-estimate/` it links to `#estimate-form` and reads **"Start Form"**.
- 320px check: each button is (320 − 16 − 8)/2 = 148px wide; "Free Estimate" at 16px is ~118px + 18px icon + 8px gap = 144px, which fits. If it doesn't, hide the arrow below 340px (`@media (max-width: 339.98px)`).
- Hidden while the drawer is open (`[data-drawer-open] .action-bar { display: none }`). Hidden at ≥1024.
- Motion: on first load it enters `translateY(100%→0)` after 400ms, → `duration.slow` → `easing.out-expo`. Reduced motion: present immediately.

---

## 5. Home page, section by section

Order: Header · **5.1 Hero** · **5.2 Trust strip** · **5.3 Services** · **5.4 Before/After** · **5.5 Stats strip** · **5.6 Process** · **5.7 Protection** · **5.8 Reviews** · **5.9 Service areas** · **5.10 FAQ** · **5.11 Final CTA** · **5.12 Footer** · Action bar.
(D-06: the stats strip comes after the before/after showcase instead of directly after the trust strip. Two 4-up strips back to back read as a repeat, and the numbers land harder right after the proof.)

### 5.1 Hero (D-01: fusion, dark)
**Structure:** reference variant **(b)** (full-bleed photo + navy gradient + kicker + checklist + Estimate CTA + Call button), with variant **(a)**'s keyword-led headline and variant (a)'s trust strip attached below it. Variant (a) (light overlay, kitchen photo, 2 CTAs) becomes the **inner-page hero** for the Services hub and every service page (§6.1).

`<section class="hero" aria-labelledby="hero-title">`: `position: relative; isolation: isolate; overflow: hidden; bg #0b1a33`.
- **Media layer:** `<picture>` absolute inset 0, `object-fit: cover`, image slot **IMG-01** (§8). Overlay `::after`: → `gradient.hero-mobile` below 768px, → `gradient.hero-desktop` at ≥768.
- **Content (z 1), in source order:**
  1. Kicker (dark variant): **"More than painting · Raleigh-Durham, NC"**
  2. H1 `#hero-title` → typography `display`, #ffffff: **"Painting & <span class="brush">Remodeling</span> Services in Raleigh-Durham"**. `.brush` = `position: relative; white-space: nowrap`; its `::after` holds the brush-stroke SVG (§8.4), positioned `left: -2%; right: -2%; bottom: -0.12em; height: 0.32em; z-index: -1`. "Raleigh-Durham" may break after the hyphen at ≤360px; that is allowed.
  3. Lead → typography `lead`, #d1d5db, `max-width: 34rem`: **"From fresh interior and exterior paint to complete kitchen and bath remodels, we deliver quality, value and attention to detail. Family owned, fully insured and backed by a 2-year workmanship warranty."**
  4. Checklist `<ul>` (hidden below 768px; D-07): items with a `check` icon 20px #f97316 (stroke-width 3) + text Inter 500 16px #ffffff: **Interior & Exterior Painting · Kitchen & Bathroom Remodeling · Flooring Installation · Drywall & Finishing · Decks & Outdoor Living · And More**. 1 column at 768–1023; 2 columns at ≥1024 (`grid-template-columns: repeat(2, max-content); column-gap: space.8; row-gap: space.2`).
  5. CTA row: `btn primary --lg` **"Get a Free Estimate"** + `arrow-right` → `/free-estimate/`; `btn outline-light --lg` with leading `phone` **"Call (919) 805-7952"** → `tel:+19198057952`.
  6. Microcopy → `caption` #d1d5db with a `shield-check` 16px #f97316: **"Free, no-obligation estimates · Fully insured"**.

| Width | Layout |
|---|---|
| 360 (320–767) | Padding-top `space.8`, padding-bottom `space.12`. Content full width. Vertical stack, gaps: kicker→H1 `space.3`, H1→lead `space.4`, lead→CTAs `space.6`, CTAs→micro `space.4`. CTAs `--block`, stacked, gap `space.3`. Image `object-position: 70% center`. Above the fold at 360×800 and 375×667 (with the 64px bar): kicker, H1, lead and both CTAs. |
| 768 (768–1023) | Padding `space.16` / `space.20`. Content `max-width: 600px`. CTAs inline (`flex-wrap: wrap; gap: space.3`), not block. Checklist visible, 1 column. |
| 1366 (1024–1535) | `min-height: min(720px, calc(100svh - var(--layout-header-h)))`, so at 1366×768 the hero is 688px and fully in view. Content vertically centered, `max-width: 640px`, padding-bottom `space.24` (room for the overlapping trust strip). Checklist 2 columns. |
| 1920 (≥1536) | `min-height: 760px`. Container stays 1280 (content at left), image full-bleed (srcset up to 2560w). |

Anti-clipping: the H1 wraps freely (balance); the CTA labels never wrap (`nowrap`) and stack to block below 768. At 320 the CTA is 288px wide, and "Call (919) 805-7952" at 17px plus the icon is ~230px, which fits.

### 5.2 Trust strip (from variant a)
`<section aria-label="Why homeowners choose us">`: 4 trust items (§3.6):

| Icon | Label | Sub-line (≥768 only) |
|---|---|---|
| shield-check | Fully Insured | Protected from job-site accidents |
| award | 2-Year Workmanship Warranty | On every project we complete |
| users | Family Owned & Operated | Local to Raleigh-Durham |
| clipboard-check | Free Estimates | No obligation, no pressure |

("Licensed" from the reference is **not** used: licensing is `[confirmar]`. "5-Star Reviews" is replaced by the warranty, a confirmed fact; D-09.)
- Container card: bg #ffffff, border 1px solid #e5e7eb, radius → `radius.xl` (24px), shadow → `shadow.lg`.
- **360:** the card sits in normal flow below the hero with `margin-top: -24px` (overlaps), `margin-inline: gutter`. 2×2 grid; each cell has padding `space.5` and is centered (icon above label, gap `space.2`). Dividers: cell 1 & 3 `border-right: 1px solid #e5e7eb`; cells 1 & 2 `border-bottom: 1px solid #e5e7eb`. Labels wrap onto 2 lines (centered); no truncation.
- **768:** 4 columns, icon above label, sub-line visible; dividers `border-right: 1px solid #e5e7eb` on cells 1–3, no bottom borders. `margin-top: -40px`.
- **1366/1920:** `margin-top: -64px` (overlaps the hero's padding-bottom), container 1280; each cell is a row (icon 28px left, text right, gap `space.4`, `justify-content: center`), padding `space.6`.

### 5.3 Services grid
bg #ffffff. Section head: kicker **"What we do"**, H2 **"Painting & Remodeling Services"**, lead **"One trusted, family-owned team for the inside and outside of your home."**
Cards (§3.5), in order (slug · title · description · image slot):
1. interior-painting · Interior Painting · "Walls, ceilings, trim and doors finished with careful prep and clean lines." · IMG-10
2. exterior-painting · Exterior Painting · "Siding, brick, trim and doors protected and refreshed for North Carolina weather." · IMG-02 (client AFTER photo)
3. cabinet-painting · Cabinet Painting `[confirmar]` · "A fresh, durable finish for your cabinets without the cost of replacing them." · IMG-11
4. kitchen-remodeling · Kitchen Remodeling · "Cabinets, counters, layout and finishes brought together in one project." · IMG-12
5. bathroom-remodeling · Bathroom Remodeling · "From quick refreshes to complete bathroom makeovers." · IMG-13
6. flooring-installation · Flooring Installation · "New floors installed level, tight and ready for everyday life." · IMG-14
7. drywall-finishing · Drywall & Finishing · "Patches, repairs and smooth finishes, ready for paint." · IMG-15
8. decks-outdoor-living · Decks & Outdoor Living · "Decks and outdoor spaces built, restored and stained." · IMG-16

Grid: `display: grid; gap: → space.6`. **320–479:** 1 column, compact cards, gap `space.3`. **480–1023:** 2 columns, full cards. **≥1024:** 4 columns (2 rows). Below the grid, centered, margin-top `space.10`: `btn outline-dark` **"View all services"** → `/services/`.
If the client does not confirm cabinet painting, drop card 3 and the grid becomes 7 cards: the 4-column layout leaves one empty slot, filled by a CTA card (bg #0b1a33, radius 16px, padding `space.6`, H4 #ffffff "Not sure what you need?", small #d1d5db "Tell us about your project and we'll recommend the right approach.", `btn primary --block` "Get a Free Estimate").

### 5.4 Before/After showcase (the proof)
bg #f9fafb. `<section aria-labelledby="ba-title">`.
- Section head: kicker **"Before & after"**, H2 `#ba-title` **"See the Transformation"**, lead **"Same house, new curb appeal. Drag the slider to compare."**
- **Slider component** `.ba-slider` (§9.4 for motion): container aspect **3:2**, radius → `radius.xl`, `overflow: hidden`, shadow → `shadow.lg`, bg #e5e7eb.
  - Layer 1 (bottom): **AFTER** IMG-02. Layer 2 (top): **BEFORE** IMG-03, `clip-path: inset(0 calc(100% - var(--pos)) 0 0)` with `--pos: 50%`. Both are `<img>` with explicit width/height and `object-fit: cover`.
  - Labels: pill top-left **"Before"** / top-right **"After"**: height 32px, padding 0 12px, radius pill, bg `#0b1a33cc`, text #ffffff Montserrat 700 13px uppercase ls 0.14em (→ typography `kicker`). Each label fades to opacity 0 when the handle is within 12% of its side.
  - Divider: a 3px-wide line (→ `border-width.accent`) in #ffffff at `left: var(--pos)`, full height, `transform: translateX(-50%)`.
  - Handle: 48×48 circle (56×56 at ≥1024), bg #ea580c, border 3px solid #ffffff, shadow → `shadow.handle`, icon `chevrons-left-right` 24px stroke #0b1a33, centered on the divider, z → `z.slider-handle`.
  - **Input:** `<input type="range" min="0" max="100" step="1" value="50" aria-label="Compare before and after: drag to reveal">` overlays the full area (opacity 0, `cursor: ew-resize`, height 100%). Keyboard: arrows ±1, PageUp/PageDown ±10, Home/End 0/100. `aria-valuetext="{n}% before"`. Focus-visible: the handle gets the 3px #ffffff outline + a 3px #ea580c outer ring (`box-shadow: 0 0 0 3px #ffffff, 0 0 0 6px #ea580c`).
  - No JS: the slider renders statically at 50% (CSS default), so both halves stay visible.
  - Hover (pointer): handle `scale(1.08)` → `duration.fast` → `easing.spring`. Pressed/dragging: `scale(0.96)`.
- Caption (`<figcaption>`) → `caption` #4b5563, margin-top `space.3`: **"Exterior brick painting · Raleigh-Durham area"** (location `[confirmar]`).
- Side copy (≥1024 only; below that it stacks under the slider): H3 **"Painted brick, crisp black trim"** · body **"A dated tan brick exterior turned bright white with black window trim and fresh white details. That's the kind of change a professional exterior paint job makes."** · arrow link **"View more projects"** → `/projects/` · `btn primary` **"Get a Free Estimate"**.

| Width | Layout |
|---|---|
| 360 | Slider full width (container); handle 48px; side copy stacks below, gap `space.6` |
| 768 | Same as 360, slider max-width 720px centered |
| 1366 / 1920 | 12-col grid: slider spans cols 1–8, copy cols 9–12, `align-items: center`, gap `space.12` |

### 5.5 Stats strip (from variant b) `[confirmar]` every figure
bg → `gradient.dark-band`, padding → `layout.section-y-tight`. `<section aria-label="New Valley Painting in numbers">`. 4 stats (§3.7):

| Icon | Number (final in HTML) | Label |
|---|---|---|
| calendar-check | 10+ | Years of Experience |
| home | 200+ | Completed Projects |
| star | 5.0★ | Customer Rating |
| award | 100% | Client Satisfaction |

- **360:** 2×2 grid, gap `space.8` `space.4`, centered stacks (icon, number, label). **768+:** 4 columns; dividers `border-left: 1px solid #2a3d5c` on columns 2–4. **1366+:** each stat is icon-left (32px) with number and label stacked right, centered in its column.
- Footnote (D-10), required while the figures are unconfirmed, centered, margin-top `space.6`: `.ph-chip` dark variant (bg #10233f, border 1px solid #f97316, text #f97316) + → `caption` #9ca3af: **"Sample figures for this prototype, to be confirmed by New Valley Painting."** Remove the footnote and chip once confirmed.

### 5.6 Process: "How it works"
bg #ffffff. Centered head: kicker **"How it works"**, H2 **"From First Call to Final Walkthrough"**.
4 steps `<ol>`; each step: number badge (40×40 circle, bg #0b1a33, Montserrat 800 16px #ffffff) · icon chip · H3 (→ `h4`) · body → `small` #4b5563:
1. clipboard-check · **Request your free estimate** · "Call, text or send the form and tell us about your project."
2. map-pin · **Walkthrough & quote** · "We visit, look at every surface and give you a clear, detailed quote." `[confirmar]`
3. paint-roller · **Prep & transform** · "We protect your home, prep carefully and get to work."
4. award · **Final walkthrough** · "We review every detail with you, backed by our 2-year workmanship warranty."

**360:** vertical timeline: the badge column is 40px wide with a 2px #ffedd5 line connecting the badges (`left: 19px`); content to the right, gap `space.4`; each step padding-bottom `space.8`; the icon chip is hidden. **768:** 2×2 grid, no connector line. **≥1024:** 4 columns; a horizontal connector (`border-top: 2px dashed #ffedd5`) behind the badges at their vertical center, from badge 1 to badge 4.

### 5.7 Protection block (warranty + insurance)
bg #f9fafb. 2 columns at ≥1024 (image cols 1–6, copy cols 7–12, gap `space.12`); stacked below (image first, aspect 4:3).
- Image IMG-04 (painter at work), aspect 4:5 at ≥1024, radius → `radius.xl`, `object-fit: cover`. Overlay badge bottom-left (inset `space.5`): bg #0b1a33, radius `radius.lg`, padding `space.4` `space.5`, `award` 28px #f97316 + "2-Year" Montserrat 800 24px #ffffff / "Workmanship Warranty" → `caption` #d1d5db.
- Copy: kicker **"Peace of mind"**, H2 **"Protected From Start to Finish"**, then 3 rows (icon chip + H3 (→ `h4`) + body → `body` #374151), gap `space.6`, rows separated by `border-top: 1px solid #e5e7eb; padding-top: space.6`:
  - shield-check **Fully Insured**: "Rest easy: our insurance protects your property from any job-site accidents. Don't take the risk of hiring an uninsured painting contractor."
  - award **2-Year Workmanship Warranty**: "We pride ourselves on every project we complete and strive for perfection. That's why we back our work with a 2-year workmanship warranty."
  - users **Family Owned & Operated**: "We're a local business proud to serve our community, and being family owned lets us give special attention to every project."
- CTA: `btn primary` **"Get a Free Estimate"**, margin-top `space.8`.

### 5.8 Reviews
bg #ffffff. Centered head: kicker **"Reviews"**, H2 **"What Homeowners Say"**. Under the H2: rating summary row: 5 stars 20px + **"5.0 average rating"** (Inter 600 16px #0b1a33) + `.ph-chip` (`[confirmar]`).
3 review cards (§3.8); each shows a `.ph-chip` after the name until real text is supplied (D-15):
1. **Ellen Williams** · "Painting · Raleigh-Durham" · quote: "[Review text pending: copy Ellen Williams's full testimonial from the current site.]" `[confirmar]`
2. **Homeowner name** · "Exterior painting" · "Sample review: the crew was on time, protected everything and the house looks brand new." `[confirmar]`
3. **Homeowner name** · "Kitchen remodel" · "Sample review: clear quote, clean job site and a finish we love." `[confirmar]`

Layout: **360:** horizontal scroll-snap row (`overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline: gutter`), cards `flex: 0 0 85%`, gap `space.4`, the scroller bleeds to the viewport edges (negative margin = gutter); `tabindex="0"`, `role="region"`, `aria-label="Reviews, scroll horizontally"`. Hide the scrollbar visually only on touch devices. **768:** same scroller, cards 46%. **≥1024:** 3-column grid, no scroll. Below: arrow link **"Read all reviews"** → `/reviews/`.

### 5.9 Service areas
bg #0b1a33. 2 columns at ≥1024 (copy cols 1–5, chips cols 6–12); stacked below.
- Kicker (dark) **"Service areas"**, H2 #ffffff **"Proudly Serving the Triangle"**, body #d1d5db: **"We paint and remodel homes across Raleigh-Durham and nearby towns. Don't see yours? Call us, and we'll let you know if we can help."** + `.link` dark "(919) 805-7952".
- City chips: `<ul>` grid, `repeat(2, 1fr)` at 320–767 and `repeat(3, 1fr)` at ≥768, gap `space.3`. Each chip is an `<a>` → `/service-areas/<slug>/`: min-height 56px, padding 0 `space.4`, bg #10233f, border 1px solid #2a3d5c, radius `radius.md`, `map-pin` 20px #f97316 + city name Montserrat 600 16px #ffffff + trailing `chevron-right` 16px #9ca3af (`margin-left: auto`). Hover: bg #183156, border #ea580c, chevron #f97316 with `translateX(→ distance.arrow-nudge)`. Names never truncate (they wrap; the longest is "Chapel Hill" / "Wake Forest").
- Cities: Raleigh, Durham, Cary, Chapel Hill, Apex, Wake Forest `[confirmar coverage]`.

### 5.10 FAQ (Home)
bg #ffffff, container → `layout.container-narrow` (760px). Head: kicker **"FAQ"**, H2 **"Questions, Answered"**. Six `<details>` (§3.9); the JSON-LD `FAQPage` mirrors the text exactly:
1. **Do you offer free estimates?** Yes. Estimates are free and come with no obligation. Call (919) 805-7952 or request one online and we'll get back to you.
2. **Are you insured?** Yes. New Valley Painting is fully insured, so your property is protected from job-site accidents.
3. **Do you offer a warranty?** Yes. We back our work with a 2-year workmanship warranty.
4. **What services do you offer besides painting?** Kitchen and bathroom remodeling, flooring installation, drywall repair and finishing, and decks and outdoor living spaces, plus interior, exterior and cabinet painting.
5. **Which areas do you serve?** Raleigh, Durham, Cary, Chapel Hill, Apex, Wake Forest and nearby communities in the Triangle. `[confirmar]`
6. **How do I get started?** Request your free estimate by phone, text or our online form. We'll schedule a walkthrough, give you a clear quote and plan your project around you.
(If cabinet painting isn't confirmed, remove it from answer 4.)

### 5.11 Final CTA band `.on-accent`
bg #ea580c; a decorative brush-stroke SVG (§8.4) in #c2410c at full opacity, 2 strokes, absolutely positioned behind the content at bottom-right, `aria-hidden`. Centered content, `max-width: 760px`:
- H2 #0b1a33 **"Ready for a Beautifully Painted Home?"**
- Body → `lead` #0b1a33: **"Contact New Valley Painting today to schedule your consultation and start the journey toward a beautifully painted home."**
- Buttons (gap `space.3`; block + stacked at <480, inline at ≥480): `btn dark --lg` **"Get a Free Estimate"** + arrow · `btn outline-dark --lg` + `phone` **"Call (919) 805-7952"** (on orange, the outline-dark hover is bg #0b1a33 / text #ffffff).
- Focus ring is #0b1a33 inside this band.

### 5.12 Footer `<footer id="site-footer">`
bg #0b1a33, border-top 3px solid #ea580c, padding-top `section-y`, padding-bottom `space.8`.
- Grid: **360:** 1 column: brand, then the 4 link groups as plain stacked lists (no accordions, so they stay crawlable and work without JS). **768:** brand spans 2 columns, then 2×2 link groups. **≥1024:** `2fr 1fr 1fr 1fr 1.2fr`.
- Brand: LogoN 44px · tagline → `body` #d1d5db italic: **"The brush of quality, the stroke of excellence."** · `btn primary` "Get a Free Estimate".
- Groups: heading (→ typography `kicker` #f97316) + links (Inter 500 15px #d1d5db, hover #ffffff + underline, each row min 44px):
  - **Services** (`id="site-footer-nav"` on the wrapper): 8 service links.
  - **Company:** Projects · About · Reviews · Service Areas · Free Estimate.
  - **Service Areas:** the 6 cities.
  - **Contact:** `phone` (919) 805-7952 · `mail` nvpnting@gmail.com (`overflow-wrap: anywhere`) · `message-circle` WhatsApp (`https://wa.me/19198057952`, `rel="noopener"`) · `facebook` Facebook. Icons 18px #f97316.
- Bottom bar: `border-top: 1px solid #2a3d5c`, margin-top `space.12`, padding-top `space.6`; → `caption` #9ca3af; flex-wrap, `justify-content: space-between`, gap `space.3`: "© 2026 New Valley Painting. All rights reserved." · "Privacy" link (#d1d5db) · "Prototype by CDC Software Solutions".

---

## 6. Inner page templates

All inner pages: header → page hero with breadcrumb → content → (reused) Final CTA band (§5.11) → footer → action bar. One H1 per page.

### 6.1 Page hero, light (from reference variant a) `.page-hero--light`
bg #ffffff + image on the right half under → `gradient.hero-light`. Breadcrumb (light) · H1 (→ `h1`, #0b1a33) · lead (→ `lead` #374151, max 36rem) · CTA row (`btn primary --lg` "Get a Free Estimate" + `btn outline-dark --lg` "Call (919) 805-7952"). Directly below: the trust strip (§5.2) at `margin-top: -40px`.
**360:** image on top as a 16:9 block (no gradient), text below on #ffffff, padding `space.8`. **768:** same, image 21:9. **≥1024:** image absolute right 0, width 58%, `object-fit: cover`; text column max 560px; min-height 520px. Used by: Services hub, every service page, Projects, Reviews, About.
**Dark variant** `.page-hero--dark` (the Home hero recipe at min-height 420px on desktop, no checklist): used by service-area pages and Free Estimate.

### 6.2 Service page (`/services/<slug>/`)
Sections: 1 Page hero light (image = that service's slot) · 2 Trust strip · 3 Intro: 2 columns ≥1024 (text cols 1–7; "What's included" card cols 8–12: bg #f9fafb, border 1px #e5e7eb, radius 16px, padding `space.6`, H3 + checklist of 5 items with `check` 20px #ea580c) · 4 Gallery: 3 images (1 col at 360, 3 at ≥768, aspect 4:3, radius 16px), exterior-painting uses the Before/After slider instead · 5 Process (§5.6) · 6 FAQ (3 Qs, narrow container) · 7 "Related services" (3 compact service cards) + "Areas we serve" chips (light: bg #ffffff, border 1px #d1d5db, text #0b1a33, `map-pin` #c2410c) · 8 Final CTA.
Intro copy pattern (H2 **"{Service} Done Right"**; 2 paragraphs). The client must confirm the scope list for every service `[confirmar alcance]`:

| Service | Intro p1 | Included (5) |
|---|---|---|
| Interior Painting | "Fresh interior paint changes how a home feels. We prep every surface, protect your floors and furniture and finish with clean, sharp lines." | Walls & ceilings · Trim, doors & baseboards · Surface prep & patching · Color guidance · Clean-up every day |
| Exterior Painting | "Your exterior takes the brunt of North Carolina sun, humidity and storms. We prep, repair and paint so your home looks great and stays protected." | Siding & brick · Trim, fascia & soffits · Doors & shutters · Pressure washing & prep · Caulking & minor repairs |
| Cabinet Painting `[confirmar]` | "Painted cabinets give your kitchen a new look without a full remodel. We clean, sand, prime and finish for a smooth, durable result." | Cabinet boxes & doors · Degreasing & sanding · Primer & durable topcoat · Hardware removal & reinstall · Color guidance |
| Kitchen Remodeling | "From updated finishes to a complete renovation, we plan and build the kitchen that fits how you live, with one team from demo to final coat of paint." | Planning & layout · Cabinets & countertops · Backsplash & finishes · Lighting & fixtures coordination · Paint & trim |
| Bathroom Remodeling | "Whether it's a quick refresh or a complete makeover, we turn dated bathrooms into clean, comfortable spaces." | Vanities & fixtures · Tile & surfaces · Lighting & mirrors · Drywall & paint · Trim & finishing |
| Flooring Installation | "New floors tie a room together. We prepare the subfloor and install level, tight floors built for everyday life." | Subfloor prep · Floor installation · Transitions & thresholds · Baseboards & trim · Clean-up |
| Drywall & Finishing | "Holes, cracks and water damage happen. We repair, patch and finish drywall so walls are smooth and ready for paint." | Patches & holes · Crack & water-damage repair · New drywall sections · Texture matching · Prime & paint |
| Decks & Outdoor Living | "Make the most of North Carolina's outdoor seasons with a deck or outdoor space that's built, restored and finished to last." | Deck building · Repairs & board replacement · Cleaning & staining · Railings & steps · Outdoor living spaces |

Service FAQs (3 each): (1) "How much does {service} cost?" → "Every project is different. We give you a clear, free estimate after seeing the space. Call (919) 805-7952 or request one online." (2) "Do you offer a warranty on {service}?" → "Yes. Our work is backed by a 2-year workmanship warranty." (3) "Which areas do you serve?" → the §5.10 answer 5 text.

### 6.3 Service-area page (`/service-areas/<city>-nc/`)
Sections: 1 Page hero dark (H1 "Painters & Remodelers in {City}, NC", kicker "Serving {City} & nearby", IMG-01 or IMG-02) · 2 Trust strip · 3 Intro (H2 "Painting & Remodeling in {City}", p1 = unique copy below, p2 = "We're family owned and fully insured, and every project is backed by our 2-year workmanship warranty.") · 4 "Our services in {City}": the 8 compact service cards linking to the service pages · 5 Before/After slider · 6 Reviews (3 cards) · 7 FAQ (3: free estimates in {City}? / insured? / "Do you also serve areas near {City}?" → lists the other 5 cities) · 8 Nearby areas chips (the other 5) · 9 Final CTA.
Unique p1 (housing descriptions are general knowledge, not client claims):
- **Raleigh:** "From established neighborhoods inside the Beltline to newer communities across Wake County, Raleigh homes come in every style. We help Raleigh homeowners refresh, protect and remodel the homes they love."
- **Durham:** "Durham mixes historic homes with brand-new builds, and each one needs a different approach. We bring careful prep and quality finishes to homes across Durham."
- **Cary:** "Cary homeowners take pride in well-kept homes and neighborhoods. We help keep yours looking its best inside and out."
- **Chapel Hill:** "Chapel Hill's tree-lined streets and mix of older and newer homes call for painters who sweat the details. That's how we work on every job."
- **Apex:** "Apex keeps growing, and so does the need for quality home updates. We paint and remodel homes across Apex with the same care we'd give our own."
- **Wake Forest:** "From historic downtown homes to newer subdivisions, Wake Forest homeowners trust local pros for lasting results. We're proud to be one of them."
Specific neighborhoods are **not** named until the client confirms where they work `[confirmar]`.

### 6.4 Projects (`/projects/`)
Hero light (H1 "Our Projects: Before & After"). Featured: Before/After slider (§5.4) with the real house. Filter chips (`role="group" aria-label="Filter projects"`): **All · Painting · Remodeling**, each a `<button aria-pressed>`, height 44px, radius pill, padding 0 `space.5`. Default: bg #ffffff, border 1px #d1d5db, text #0b1a33. Selected: bg #0b1a33, text #ffffff, leading `check` 16px #f97316. Hover: border #0b1a33. Without JS, all cards show and the chips are hidden (`.js` class gate).
Grid: 1 col (360) / 2 (768) / 3 (≥1024), gap `space.6`. Card: image 4:3 radius 16px + H3 (→ `h4`) + caption. The real project ("Brick exterior repaint", Painting) shows no chip; the stock cards (IMG-10..16, labelled by service) show `.ph-chip` "Placeholder" over the image top-left (D-12). Images open nothing (no lightbox in the prototype).

### 6.5 About (`/about/`)
Hero light (H1 "About New Valley Painting", lead = the "Family Owned & Operated" brief copy). Sections: Our story (H2 "A Local, Family-Owned Team"; body `[confirmar]`: "[Founding story, owner name and photo pending from the client.]" with `.ph-chip`) · Values (3 icon rows reused from §5.7) · Tagline band (bg #0b1a33, centered Montserrat 800 `h2` #ffffff "The brush of quality, the stroke of excellence." with the brush stroke under "excellence") · Stats strip (§5.5 with footnote) · Final CTA.

### 6.6 Reviews (`/reviews/`)
Hero light (H1 "Customer Reviews"). Rating summary card (bg #f9fafb, radius 16px, padding `space.8`: "5.0" in `stat` style #0b1a33 + 5 stars + "Based on [N] reviews" `[confirmar]` + `.ph-chip`). Reviews grid (1/2/3 cols) with the §5.8 cards. CTA row: `btn outline-dark` with `facebook` "Review us on Facebook" → Facebook URL (`target="_blank" rel="noopener"`, label suffix `<span class="sr-only">(opens in a new tab)</span>`). Final CTA.

### 6.7 Free Estimate (`/free-estimate/`) and the form
Hero dark, short (H1 "Get Your Free Estimate", lead "Tell us about your project. It takes about a minute, and there's no obligation."). Body: 2 columns at ≥1024 (form card cols 1–7, contact aside cols 8–12); at <1024 the form comes first, then the aside.
- Form card: bg #ffffff, border 1px #e5e7eb, radius → `radius.xl`, shadow → `shadow.md`, padding `space.6` (360) / `space.10` (≥768). `id="estimate-form"`. H2 (→ `h3`) "Request your estimate".
- Aside: "Prefer to talk?" H3 + `btn primary --block` `phone` "Call (919) 805-7952" + `btn outline-dark --block` `message-circle` "Text or WhatsApp" (`https://wa.me/19198057952`) + `mail` link nvpnting@gmail.com + the 3 trust rows (insured, warranty, family owned).

**Fields** (single column; 2 columns at ≥768 for Name|Phone and Email|ZIP; gap `space.5`):

| # | Label | Control | Required | Validation (message) |
|---|---|---|---|---|
| 1 | Full name | `input text`, `autocomplete="name"` | yes | 2–80 chars → "Please enter your name." |
| 2 | Phone | `input tel`, `autocomplete="tel"`, `inputmode="tel"`, formatted to (XXX) XXX-XXXX on blur | yes | 10 US digits after stripping non-digits (a leading 1 is allowed) → "Enter a 10-digit phone number." |
| 3 | Email (optional) | `input email`, `autocomplete="email"` | no | if filled, a valid email → "Enter a valid email, like name@example.com." |
| 4 | ZIP code | `input text`, `inputmode="numeric"`, `autocomplete="postal-code"`, maxlength 5 | yes | `^\d{5}$` → "Enter a 5-digit ZIP code." |
| 5 | Service needed | `select` (placeholder "Select a service" disabled): the 8 services + "Other / not sure" | yes | → "Choose a service." |
| 6 | Project details (optional) | `textarea` rows 5, maxlength 1000, live counter "0 / 1000" (→ `caption` #4b5563, `aria-live="polite"` only at ≥900) | no | n/a |
| 7 | Preferred contact | radio group (`fieldset`/`legend`): Call (default) · Text · Email | yes | if Email is chosen and the email is empty → on field 3: "Add your email so we can reply." |
| 8 | Best time to reach you (optional) | `select`: Any time · Morning · Afternoon · Evening | no | n/a |
| hp | `company` honeypot | visually hidden, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden="true"` | n/a | silently "succeeds" if filled |

- Label → typography `label` (Inter 600 14px) #111827, margin-bottom `space.2`; "(optional)" in Inter 400 #4b5563. Helper text → `caption` #4b5563.
- Input: height 52px (textarea min 132px), padding 0 `space.4`, Inter 400 16px #111827 (16px prevents iOS zoom), bg #ffffff, border 1px solid #6b7280, radius `radius.md`. Placeholder #6b7280 (examples only: "(919) 555-0123", "27601"). **Hover** border #374151. **Focus** border 2px #0b1a33 (padding −1px to avoid shift) + the global focus ring. **Error** border 2px #b91c1c, `aria-invalid="true"`, message below: `alert-circle` 16px #b91c1c + text → `small` #b91c1c, linked via `aria-describedby`. **Disabled** (during submit) bg #f3f4f6, text #6b7280, border #d1d5db. Radios: 24px custom circle, border 2px #6b7280, checked = border #ea580c + 10px #ea580c dot; each option row min-height 44px.
- Validation timing: on blur (after the first edit) and on submit. On submit with errors: an error summary box at the top of the form (bg #fef2f2, border-left 4px solid #b91c1c, radius `radius.md`, padding `space.4`, `role="alert"`, heading "Please fix {n} field(s):" + links that focus each field). Focus moves to the summary.
- Consent line under the button → `caption` #4b5563: "By submitting, you agree that New Valley Painting may contact you about your estimate by your preferred method. We never sell your information. See our [Privacy Policy]."
- Submit: `btn primary --lg --block` "Send My Free Estimate Request" + `arrow-right`.
- **Loading:** the button gets `aria-disabled="true"`, its label becomes "Sending…" with a `loader` 20px spinning icon (1 turn per 800ms, linear; reduced motion: no spin, the static icon stays), fields disabled, for → `duration.form-submit-sim` (1200ms).
- **Success:** the form is replaced in place by a panel (`role="status"`, focus moves to its H2 with `tabindex="-1"`): `check-circle` 48px #15803d in a 72px circle bg #f0fdf4 · H2 (→ `h3`) "Thanks, {first name}! Your request is in." · body: "We'll reach out by {preferred method} soon to schedule your free estimate. Need us sooner? Call (919) 805-7952." (no response-time promise until `[confirmar]`) · `btn outline-dark` "Back to home".
- **Error (network):** not reachable in the prototype; spec it for production: a banner (bg #fef2f2, `alert-circle` #b91c1c) reading "Something went wrong and your request wasn't sent. Please try again or call (919) 805-7952." Fields keep their values.
- **Prototype note (D-13):** there is no backend. Submission is handled client-side only; no data leaves the browser and nothing is stored. For production, wire it to a Vercel serverless function + email (or Formspree), with the same states.
- `/privacy/`: a plain text page, narrow container, H1 + 4 short sections (what we collect, how we use it, we never sell it, contact). Copy marked `[confirmar]` (legal review).

---

## 7. Icon library (inline SVG, no icon fonts)

Shared attributes on every icon (D-16): `xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"`. Color comes from the parent's CSS `color` (a token, per component above); size via `width`/`height` (16/18/20/24/28/32/48). Decorative icons stay `aria-hidden`. Icon-only controls carry `aria-label` on the button. Source: Lucide (ISC) and Feather (MIT) geometry; the ones marked *custom* are CDC drawings on the same 24px grid with 2px strokes.

| Name | Inner markup |
|---|---|
| arrow-right | `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>` |
| chevron-down | `<path d="m6 9 6 6 6-6"/>` |
| chevron-right | `<path d="m9 18 6-6-6-6"/>` |
| chevrons-left-right *custom* | `<path d="m9 18-6-6 6-6"/><path d="m15 6 6 6-6 6"/>` |
| menu | `<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>` |
| x | `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>` |
| check | `<path d="M20 6 9 17l-5-5"/>` |
| plus | `<path d="M5 12h14"/><path d="M12 5v14"/>` |
| minus | `<path d="M5 12h14"/>` |
| phone | `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>` |
| mail | `<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>` |
| message-circle | `<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>` |
| facebook | `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>` |
| map-pin | `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>` |
| shield-check | `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>` |
| award | `<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>` |
| users | `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>` |
| clipboard-check | `<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>` |
| calendar-check | `<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>` |
| home | `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>` |
| star (outline) | `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>` |
| star-filled | same path, with `fill="currentColor" stroke="none"` overriding the shared attributes; color #f97316 |
| quote | `<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>` |
| alert-circle | `<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>` |
| check-circle | `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>` |
| loader | `<path d="M21 12a9 9 0 1 1-6.219-8.56"/>` |
| paint-roller (interior) | `<rect x="2" y="2" width="16" height="6" rx="2"/><path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="8" y="16" width="4" height="6" rx="1"/>` |
| house-exterior *custom* | `<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v12h14V9"/><path d="M10 21v-6h4v6"/><path d="M16 5V3h2v3.5"/>` |
| cabinet *custom* | `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18"/><path d="M9 10v4"/><path d="M15 10v4"/>` |
| cooking-pot (kitchen) | `<path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/>` |
| bath | `<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M10 5 8 7"/><path d="M2 12h20"/><path d="M7 19v2"/><path d="M17 19v2"/>` |
| flooring *custom* | `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v6"/><path d="M15 9v6"/><path d="M9 15v6"/>` |
| layers (drywall) | `<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>` |
| fence (decks) *custom* | `<path d="M4 21V7l2-3 2 3v14"/><path d="M10 21V7l2-3 2 3v14"/><path d="M16 21V7l2-3 2 3v14"/><path d="M2 11h20"/><path d="M2 17h20"/>` |

Service → icon map: interior=paint-roller, exterior=house-exterior, cabinet=cabinet, kitchen=cooking-pot, bathroom=bath, flooring=flooring, drywall=layers, decks=fence.

---

## 8. Imagery

### 8.1 Art direction
Bright, natural daylight; clean finished rooms and exteriors; real homes typical of NC (brick, siding, craftsman, new builds), not luxury mansions. Warm neutrals with white trim; no people looking at the camera; no visible brand logos or house numbers. Interior shots are straight-on or at a slight angle, with verticals corrected. Every image gets descriptive alt text (below) and explicit `width`/`height`. Format: AVIF + WebP via `astro:assets` `<Picture>`, quality 60 (AVIF) / 72 (WebP).

### 8.2 Slots
| Slot | Use | Source | Ratio / crop | Widths (srcset) | Alt text |
|---|---|---|---|---|---|
| IMG-01 | Home hero (LCP) | Stock: bright living room with built-ins / fresh paint (like reference b). Unsplash/Pexels search "white living room built-in shelves", "freshly painted living room" | 16:9 desktop, focal point right third (`object-position: 70% 50%`); mobile uses the same file cropped by `object-fit` | 480, 768, 1024, 1366, 1920, 2560 | "Bright living room with freshly painted walls and white built-in shelves" |
| IMG-02 | Before/After AFTER; Exterior service hero/card | **Client** `image0.528f74a7.webp` (white painted brick) | 3:2. Crop x 0–4032, y 0–2688 | 480, 768, 1024, 1600 | "Two-story brick home after exterior painting: white brick with black window trim" |
| IMG-03 | Before/After BEFORE | **Client** `image1.d80b4111.webp` (tan brick) | 3:2. Crop x 0–4032, y 202–2890 (the BEFORE framing sits ~200px lower). Verify by overlaying both at 50% opacity; nudge ≤40px until the arched window lines up | same as IMG-02 | "The same brick home before painting, with original tan brick" |
| IMG-04 | Protection block | Stock: painter at work (roller on a wall, tape, drop cloth), face not prominent | 4:5 (≥1024), 4:3 (mobile) | 480, 768, 1080 | "Painter rolling fresh paint onto an interior wall" |
| IMG-05 | Services hub hero (variant a) | Stock: white kitchen with island and pendant lights (like reference a) | 16:9, focal right | 768, 1366, 1920 | "Remodeled white kitchen with marble island and pendant lights" |
| IMG-10..16 | Service cards and heroes: interior, cabinet, kitchen, bath, flooring, drywall, decks | Stock, one per service; same lighting family | 4:3 (cards), 16:9 (hero) | 400, 800, 1366 | Descriptive per image, e.g. "Freshly painted gray kitchen cabinets with brass pulls" |
| OG | Social share | Composite (§1.5) | 1200×630 | single | n/a |

- **Privacy:** blur or clone out the house number "4906" on the stair riser in both client photos before export `[confirmar homeowner permission to publish]`.
- **Licences:** Unsplash License and Pexels License both allow free commercial use with no attribution required. fe-senior-react records each file's source URL and author in `docs/image-credits.md` anyway, so the client can swap them for their own photos.
- Weight caps: hero ≤ 120 KB at 768w AVIF and ≤ 260 KB at 1920w; cards ≤ 60 KB; client photos ≤ 180 KB at 1600w.

### 8.3 Favicon
Derived from LogoF's N mark: the orange N centered on a #0b1a33 square, radius 22% (for the PNG variants), 12% padding. Export `favicon.svg` (preferred), `favicon-32.png`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` + `site.webmanifest` (`name` "New Valley Painting", `theme_color` #0b1a33, `background_color` #0b1a33).

### 8.4 Brush-stroke motif (SVG)
`<svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 16C60 8 120 6 180 9s90 5 116-1" fill="none" stroke="#ea580c" stroke-width="10" stroke-linecap="round"/></svg>`
Used under the Home H1 word "Remodeling", under "excellence" on About, and (2 strokes, #c2410c, 600px wide, rotated -6°) in the Final CTA band. Never behind body text.

---

## 9. Motion language (implemented by cinematic-effects-expert after the build)

Principles: CSS-first; JS only for IntersectionObserver, count-up and the slider; **no WebGL, no animation library**. LCP never depends on JS: the hero image is **never** animated in opacity and is visible at first paint. All entrance states are gated behind `html.js` (set by an inline 1-line script in `<head>`), so the page is fully visible without JS. One global reduced-motion rule: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; transition-duration: 1ms !important; scroll-behavior: auto !important } }`, plus the per-effect fallbacks below.

| # | Effect | Spec | Reduced-motion fallback |
|---|---|---|---|
| 9.1 | **Hero entrance** (the wow) | t=0: image `scale(→ scale.hero-image-from 1.06 → 1)` over → `duration.hero-image` → `easing.out-expo` (transform only). Text stagger (CSS `@keyframes rise`: `translateY(→ distance.reveal-md) → 0`, opacity 0→1), each → `duration.slower` → `easing.out-expo`: kicker 100ms · H1 180ms · lead 300ms · checklist 380ms · CTAs 460ms · micro 540ms. The brush stroke under "Remodeling" draws at 650ms: `stroke-dasharray: 320; stroke-dashoffset: 320 → 0` over → `duration.cinematic` → `easing.in-out`. At 1400ms, one light sheen sweeps across the primary CTA (`::after` linear-gradient #ffffff at 35% opacity, `translateX(-120% → 120%)`, → `duration.slower`). Pure CSS, no JS. | Everything static at its final state; brush fully drawn; no sheen |
| 9.2 | **Scroll reveals** | Elements with `[data-reveal]` start at opacity 0, `translateY(→ distance.reveal-md)` (only under `html.js`). IntersectionObserver (threshold 0.15, rootMargin `0px 0px -10% 0px`, once) adds `.is-in` → transition → `duration.slower` → `easing.out-expo`. Grids stagger children by → `stagger.step` (80ms), max → `stagger.max-items` (6); the rest appear together. Section-head kicker bars grow `scaleX(0→1)` from the left (→ `duration.slow`). | Visible immediately; no transform |
| 9.3 | **Stats count-up** | When the strip is 50% visible, each number animates from 0 to its final value over → `duration.count-up` with ease-out-cubic via rAF; "5.0" counts with 1 decimal; suffixes are static. The real value is in the HTML; the JS writes into an `aria-hidden` visual span while an `sr-only` span keeps the final text. | Final numbers, no counting |
| 9.4 | **Before/After slider** | On first reveal, a "peek" teaches the interaction: `--pos` animates 50 → 72 → 28 → 50 over → `duration.slider-peek` → `easing.in-out`, then hands control to the user (cancelled on any pointer/key input). Drag updates `--pos` per `input` event (no transition while dragging). Labels fade → `duration.fast`. | No peek; slider starts at 50% |
| 9.5 | **CTA micro-interactions** | Primary: lift −2px + `shadow.cta-hover` + arrow nudge 4px (→ `duration.fast` → `easing.standard`); press `scale(0.98)` (→ `duration.instant`). Phone buttons: on hover the phone icon does one 300ms "ring" wiggle (`rotate` −12°→12°→0, `easing.spring`). Cards: lift −4px + image zoom 1.05 (→ `duration.slow`). | Color changes only; no transform or wiggle |
| 9.6 | **Header / drawer / bar** | Header shadow fades in on scroll (→ `duration.base`). Drawer slides (§4.2). Action bar slides up on load (§4.3). Dropdowns fade + 8px drop. | Opacity-only or instant |
| 9.7 | **Page transitions** (optional, zero JS) | `@view-transition { navigation: auto; }` with a root crossfade of → `duration.base`. Unsupported browsers ignore it. | Disabled inside the reduced-motion query |

JS budget for all of the above plus nav, drawer and form: **≤ 8 KB gzipped**, shipped as Astro `<script>` modules (deferred). No hydration framework islands.

---

## 10. SEO and performance budget

| Metric | Budget (mobile, Lighthouse, Moto G Power throttling) |
|---|---|
| LCP | < 2.5 s (target < 1.8 s). LCP element = IMG-01 at 768w |
| CLS | < 0.1 (target 0) |
| INP / TBT | INP < 200 ms; TBT < 150 ms |
| Lighthouse | Performance ≥ 90 · Accessibility ≥ 95 · Best Practices ≥ 95 · **SEO ≥ 95** (measured with `PUBLIC_NOINDEX=false`, D-14) |
| Page weight | Home ≤ 600 KB transferred at 360px; JS ≤ 8 KB gz; CSS ≤ 25 KB gz (inline critical CSS via `build.inlineStylesheets: 'auto'`) |
| Fonts | 2 variable woff2 latin files, ≤ 90 KB total; 1 preload |

Implementation rules: the LCP image uses `loading="eager" fetchpriority="high" decoding="async"` and a `<link rel="preload" as="image" imagesrcset imagesizes="100vw" type="image/avif">`. Every other image gets `loading="lazy" decoding="async"` with explicit width/height and `sizes` (cards: `(min-width:1024px) 25vw, (min-width:480px) 50vw, 100vw`). No third-party scripts, iframes, map embeds or social widgets. No layout shift from fonts (fallback metrics) or the sticky bar (it is fixed; the body padding reserves its space). Each heading level is used in order, every page has exactly one H1, link text is descriptive (no bare "click here"), images have alt text, `lang` is set, and the visible breadcrumbs match the JSON-LD. Internal linking: Home → all services and cities; every service ↔ every city; every page → `/free-estimate/`.

---

## 11. Extra size tokens (added to tokens.json → `size.*`)
Icon sizes: `size.icon-xs` 14px · `icon-sm` 16px · `icon-md` 18px · `icon` 20px · `icon-lg` 24px · `icon-xl` 28px · `icon-2xl` 32px · `icon-3xl` 48px. Controls: `size.control-sm` 44px · `control-md` 48px · `control-lg` 56px · `input` 52px · `row-drawer` 52px · `row-faq` 56px · `chip` 22px · `chip-lg` 32px · `avatar` 40px · `step-badge` 40px · `faq-icon` 36px · `success-badge` 72px · `radio` 24px.

---

## 12. Decision log
- **D-01** Home hero = fusion: reference (b)'s dark full-bleed structure + checklist + Call button, (a)'s keyword headline "Painting & Remodeling Services in Raleigh-Durham" and (a)'s trust strip. Dark beats light here: orange pops on navy, and the phone CTA stands out. Variant (a) becomes the light inner-page hero (Services hub, service pages, Projects, About, Reviews).
- **D-02** Primary CTA = brand orange #ea580c with a **navy #0b1a33 label** (4.88:1). White on #ea580c is 3.56:1 and fails AA for button text, and darkening the fill to pass would dull the brand color. Hover lightens to #f97316 (6.19:1).
- **D-03** Fonts: Montserrat (display, matches the logo wordmark) + Inter (body, tabular figures). Raleway (old-style numerals) and Acme are dropped. Self-hosted via Fontsource, no Google CDN request.
- **D-04** Logo = LogoN as-is on navy surfaces only; LogoF only for the favicon. A vector logo and a light-background version are follow-ups.
- **D-05** Nav drops "Contact": the persistent "Get a Free Estimate" CTA + phone cover it, and `/contact` redirects to `/free-estimate/`.
- **D-06** Stats strip moved below the before/after showcase (no back-to-back strips; numbers land after the proof).
- **D-07** Hero checklist hidden below 768px so the H1, lead and both CTAs stay above the fold at 360×800 and 375×667.
- **D-08** Service areas = all 6 cities (template-driven, low cost), each with unique intro copy so the pages don't read as duplicates. Coverage is `[confirmar]`.
- **D-09** The trust strip uses only confirmed facts (Insured, 2-Year Warranty, Family Owned, Free Estimates). "Licensed" and "5-Star" from the reference are excluded.
- **D-10** Unconfirmed stats/reviews/projects ship visibly labelled ("Placeholder" chip / footnote) and stay out of JSON-LD. Honest in the pitch, and safe for SEO.
- **D-11** Section heads are left-aligned by default (modern, scannable); centered only for Process, Reviews and the Final CTA.
- **D-12** Stock images on `/projects/` are labelled "Placeholder"; only the client's house is presented as real work.
- **D-13** The estimate form is client-side only in the prototype (simulated 1.2 s submit → success); production needs a serverless/email handler.
- **D-14** `PUBLIC_NOINDEX=true` on the pitch deploy (avoids indexing placeholder content and competing with the client's live site); Lighthouse SEO is measured with the flag off.
- **D-15** No `Review`/`AggregateRating` JSON-LD until real reviews are supplied (Google also ignores self-serving LocalBusiness review markup).
- **D-16** Icons are stroke-based Lucide/Feather geometry + 5 custom glyphs, 24px grid, 2px stroke, `currentColor`, inline SVG.
- **D-17** Cabinet painting is included as a 9th route/8th card, flagged `[confirmar]`; the fallback layout is specified in §5.3.
- **D-18** Free Estimate canonical URL is `/free-estimate/` (keyword in the URL, a single conversion endpoint).
- **D-19** The before/after slider uses a native `<input type="range">` (keyboard and screen-reader support out of the box) over a CSS `clip-path` reveal.

## 13. QA hand-off: verify these first
- **320/360:** hero H1 wrap ("Raleigh-Durham" hyphen break), CTA labels (nowrap, block), action bar labels (148px buttons), trust strip 2×2 labels, compact service cards, the review scroller bleed, footer email (`overflow-wrap: anywhere`), the drawer at 360×640 (internal scroll).
- **1366×768:** hero fits in 688px (H1, lead, 2-col checklist and CTAs), the header at 1024–1279 (icon-only phone), dropdown panels not clipped at the right edge (align the Service Areas panel `right: 0`).
- **All:** no horizontal scroll; every target ≥44px; focus visible on every control, including the slider handle and FAQ summaries; the page works with JS off (reveals visible, slider at 50%, menu falls back to the footer anchor).

## 14. Open `[confirmar]` items
Phone (919) 805-7952 vs 805-7052 · stats (10+, 200+, 5.0, 100%) · all review text, incl. Ellen Williams · licensing · cabinet painting offered? · service scope per service · city coverage + neighborhoods · business address / hours / price range (JSON-LD) · response-time promise · process step 2 ("walkthrough & quote") · owner story / photo · permission to publish the 4906 house photos (blur the number) · relationship to amprco.com · production domain · privacy policy copy.
