# Design fidelity review: Home + responsive

Gate: Dark Factory design fidelity (Carlos rule: 100% to the approved board). Reviewer: senior-uiux-design. Date: 2026-11-02.
Scope: Home only (Service, Estimate and City pages belong to the second reviewer).
Board: `concept-board/project/desktop-01-inicio*.dc.html`, `ios-01-inicio.dc.html`, `resp-04-inicio-768.dc.html`, `resp-05/06`. Spec: `design/design-spec.md` §5 (L234–388).
Build shots: `scratchpad/shots/out/home-<w>--NN.png`, captured at reducedMotion=reduce. Already verified there: zero horizontal overflow and zero console errors at every width.

Shots reviewed: 1366 slices 01–10, 390 slices 01, 02 and 06, 768 slice 01, 1920 slice 01. Not viewed (budget): 360, 320 and 412 slices, 390 slices 03–05 and 07–12, mobile menu, 404.

What matches the board (no action needed): header layout and nav spacing; hero copy, kicker, brush stroke, checklist 2-col, CTA styles; trust strip card at 1366/1920 (1204px, radius 24, shadow-lg, row cells, dividers); services 4-col cards with icon chip and line-clamped description, and the compact cards at 390; before/after slider (3:2, pills, divider, handle, side copy); stats band (gradient, 32px icons, orange suffix, dividers, footnote); reviews 3-col; city chips (bg #10233f, border #2a3d5c, pin and chevron); FAQ (760 narrow, plus-in-circle #fff7ed, dividers); final CTA band (dark and outline-dark buttons, #c2410c brush strokes); footer grid 2fr 1fr 1fr 1fr 1.2fr; 1920 hero (68px H1, min-height 760); 390 hero (37px H1, block CTAs, checklist hidden).

---

## 1. Findings

### FID-A01: Major. 1366 hero H1 is 66px, not 58px, so the CTAs are clipped at the 1366×768 fold
- Shot: `home-1366--01.png`. The CTA row starts at y≈722 and is cut off by the bottom of the viewport. The microcopy and the trust strip fall into `--02`. The measured hero height is about 828px.
- Board: `desktop-01-inicio.dc.html` L56 and `resp-05-inicio-1366.dc.html` L56 both set the H1 to `font-size:58px`. Spec §5.1 L256 says the hero is 688px "fully in view" at 1366×768.
- Actual: `--font-size-display` = `clamp(2.25rem, 1.583rem + 2.963vw, 4.25rem)`, which is about 65.8px at 1366. The H1 wraps to 4 lines of 69px each.
- Source: `src/styles/sections.css` L10–13 (`.hero h1`) and L32–37 (the 1024 media query).
- Fix (see D-20):
  - Add token `--font-size-display-laptop: 3.625rem; /* 58px */` to `design/tokens.css`, `src/styles/tokens.css` and `tokens.json`.
  - Then add: `@media (min-width:1024px) and (max-width:1535px){ .hero h1{ font-size: var(--font-size-display-laptop); } }`.
  - Result: CTA bottom ≈ 674px, inside the 688px viewport.

### FID-A02: Major. The header phone icon renders at about 9px instead of 18px
- Shots: `home-1366--01.png` and `home-1920--01.png`. The glyph before "(919) 805-7952" is roughly half size.
- Board: `desktop-01-inicio.dc.html` L40 specifies a phone svg 18×18, stroke #f97316, width 2, gap 8px.
- Actual: `layout.css` L54 sets 18px, but the svg shrinks inside the crowded flex row because it has no `flex: none`.
- Source: `src/styles/layout.css` L50–54 (`.site-header__phone-link svg`) and `src/layouts/Base.astro` L118–119.
- Fix: `.site-header__phone-link{gap:8px;white-space:nowrap} .site-header__phone-link svg{flex:none;width:18px;height:18px}`. This header ships on every page, so it fixes all of them.

### FID-A03: Major. Process steps 2–4 sit 13px lower than step 1
- Shots: `home-1366--05.png` and `--06`. Step 1's icon chip is at y≈687; steps 2–4 are at y≈700. Their H3s and bodies are offset by the same amount.
- Board: `desktop-01-inicio.dc.html` L161–165. Every step stacks badge → chip (`margin-top:16px`) → H3 (16px) → body (8px), all top-aligned.
- Cause: the `<li>`s stretch to the tallest step, whose H3 wraps to 2 lines. The `.step` grid then shares the spare height across its auto rows, which pushes the body of the shorter steps down.
- Source: `src/styles/sections.css` L115 (`.step` at ≥768).
- Fix: add `align-content: start;` to `.step` inside `@media (min-width:768px)`, or `align-items: start` on `.steps`.

### FID-A04: Major. The process connector starts and ends in the wrong place
- Shot: `home-1366--05.png`. The dashed line starts at x≈220 (the middle of column 1, about 100px right of badge 1) and runs to x≈1145, past badge 4.
- Board: `desktop-01-inicio.dc.html` L159 sets `top:19px; left:20px; right:calc(25% - 4px); border-top:2px dashed #ffedd5`, i.e. from badge 1's center to badge 4. Spec §5.6 L333 says "from badge 1 to badge 4".
- Source: `src/styles/sections.css` L121–122 (`.steps::before`). The `(100% - 3g)/8` term assumes the badges are centered, but they are left-aligned.
- Fix: `.steps::before{ left:20px; right:calc((100% - 3 * var(--g)) / 4 - 20px); }`. Also set `--g: var(--space-6)` to match the board's 24px gap (L158; see D-24).

### FID-A05: Major. A dark vertical rule appears in the trust strip at 768
- Shot: `home-768--01.png`. Between cells 2 and 3 there is a dark navy line about 3px wide, running the full card height. The other dividers are 1px light grey.
- Expected: spec §5.2 L274 and `resp-04-inicio-768` call for `border-right:1px solid #e5e7eb` on cells 1–3 only, with no bottom borders.
- Source: `src/styles/sections.css` L42–53 and `src/components/TrustStrip.astro` L7–13. The CSS reads correctly, so check the computed styles in DevTools at 768. Suspects:
  - A sub-pixel gap in the 4-col grid letting the hero or `::after` show through. `.trust__card` has `overflow:hidden`, but the bg comes from the `<ul>`, not the cells.
  - A `[data-reveal]` transform on the card.
- Fix: whatever the cause, cells 1–3 should end up with exactly `border-right:1px solid var(--color-gray-200)`. Try `.trust__card{background:var(--color-gray-0)}` plus `.trust-item{background:var(--color-gray-0)}`, then re-shoot at 768 and 820.

### FID-A06: Major. Placeholder chips for unconfirmed data are missing (D-10/D-12)
The board shows a visible chip on every unconfirmed claim. In the build the chip exists only as a `data-placeholder` attribute, so nothing shows. In front of the client, unconfirmed facts would read as confirmed.

| Where | Board | Build |
|---|---|---|
| Services card 3, "Cabinet Painting" | `desktop-01` L97 + L327 (`ph:true`); `ios-01` L93: chip after the title | No chip. `src/components/ServiceGrid.astro` L9 only sets `data-placeholder` on the `<li>`; `content.ts` L27 has `confirm:true` |
| Process step 2 body | `desktop-01` L342: "…detailed quote. [confirmar]" | No chip. `content.ts` L92 has `confirm:true` but it is not rendered |
| Before/after figcaption | `desktop-01` L126: chip "[confirmar] location" | No chip. `index.astro` L114 has the attribute only |
| Service-areas coverage note | `desktop-01` L233: "Coverage [confirmar] with New Valley Painting." (13px #9ca3af, under the chips, margin-top 12px) | Missing entirely (`index.astro` areas block, ~L195+) |

- Fix: render `<span class="ph-chip" data-placeholder="true">…</span>` (global.css L236 style: height 22px, padding 0 8px, pill, bg #fffbeb, border 1px #b45309, text #b45309, 13px/500):
  - in the H3 of `.service-card__title` when `s.confirm`, inside a flex row with gap 8px;
  - after the step-2 body when `step.confirm`;
  - after the figcaption text;
  - and add the coverage note `<p>`.
- Chip wording follows the other reviewer's chip-language decision; the stats and reviews already use "Placeholder".

### FID-A07: Minor. Extra divider above the first Protection row
- Shots: `home-1366--06.png` (line at y≈471, under the H2) and `home-390--06.png`.
- Board: `desktop-01` L347. The first row is `bt:'none', pt:'0'`; only rows 2 and 3 get `border-top:1px solid #e5e7eb; padding-top:24px` (spec §5.7 L338: "rows separated by").
- Source: `src/styles/home.css` L29 (`.protect__row`).
- Fix: `.protect__row:first-of-type{border-top:0;padding-top:0}`. Keep the 24px margin from the H2.

### FID-A08: Minor. The service-areas phone link sits on its own line
- Shot: `home-1366--08.png`. The phone link is a separate block below the paragraph.
- Board: `desktop-01` L226. The link `(919) 805-7952` is inline at the end of the body paragraph, `color:#f97316; underline; text-underline-offset:3px; white-space:nowrap`.
- Source: `src/pages/index.astro`, `.areas__copy` (~L197–205).
- Fix: move the `<a>` inside the `<p>`, preceded by a space.

### FID-A09: Minor. Footer service-area labels add ", NC"
- Shot: `home-1366--10.png` ("Raleigh, NC", "Durham, NC" …).
- Board: `desktop-01` L368 lists `Raleigh · Durham · Cary · Chapel Hill · Apex · Wake Forest`. Spec §5.12 L383 says "the 6 cities".
- Source: the footer in `src/layouts/Base.astro` or the footer component (city label map in `content.ts`).
- Fix: use the bare city names (see D-25).

### FID-A10: Minor (verify). The 768 hero padding looks like the mobile values
- Shot: `home-768--01.png`. The kicker sits about 33px below the header, and the trust card overlaps the hero by only ~24px.
- Expected: `resp-04-inicio-768` L42–43 and spec §5.1 L255 give padding 64/80; §5.2 L274 gives `margin-top:-40px`.
- The CSS is correct (`sections.css` L23 and L48, tokens 64/80). Check the computed `padding-block` on `.hero` at 768. If it computes correctly, this is a capture artefact and can be closed.

### FID-A11: Minor (verify). Capture anomaly in `home-1366--07.png`
- That slice shows the reviews/areas/FAQ with a wider container (60→1306px) and a ~30px H2. Slice `--08` shows the same content correctly (82→1284px, 43px H2).
- Most likely the capture script resized the viewport mid-run. Re-shoot 1366 once after the fixes to confirm there is no breakpoint flicker.

---

## 2. Decisions (from D-20 up)

| ID | Contradiction | Ruling | Edits |
|---|---|---|---|
| **D-20** | `desktop-01` / `resp-05` draw the H1 at 58px at 1366, but the `display` token gives ~66px. Spec §5.1 also says the hero is "688px, fully in view". The content can't fit 688px at either size (~805px at 58, ~838px at 66). | **Board wins at 1024–1535: 58px**, via new token `typography.display-laptop` = 3.625rem. That keeps kicker → CTAs above the fold at 1366×768; 66px clips the CTAs. Amend §5.1 L256 to: "at 1366×768 the kicker, H1, lead, checklist and both CTAs are above the fold; microcopy and trust strip may sit below." | Build: FID-A01. Tokens: add `display-laptop` to `tokens.json`, `tokens.css` and board `spec-01-tokens`. Board artboards: none. |
| **D-21** | `resp-03-inicio-360` differs from spec §5 and `ios-01` on stat color, icon size, FAQ icon color and city font size. | **Spec §5 and `ios-01-inicio` win.** `resp-03` is a responsive sketch and must not introduce values of its own. The build already follows the spec. | Board: in `resp-03-inicio-360`, copy the matching element values from `ios-01-inicio`: stat number #ffffff with #f97316 suffix; stat icon per §5.5; FAQ plus #ea580c on #fff7ed; city name Montserrat 600 16px #ffffff. Build: none. |
| **D-22** | The 768 hero uses `gradient.hero-desktop`. At 768 the 600px content column reaches 78% of the width, where the overlay is only ~47% navy, so white text over a bright photo can fail AA. | **New token `gradient.hero-tablet`** for 768–1023: `linear-gradient(90deg,#0b1a33f2 0%,#0b1a33e6 55%,#0b1a3399 100%)`. That is ≥75% navy under the text, so white text is ≥7:1 even over pure white. | Build: `sections.css` L24 → `var(--gradient-hero-tablet)`; in the 1024 media query, set `.hero::after{background:var(--gradient-hero-desktop)}`. Tokens: add it. Board: `resp-04-inicio-768` hero overlay → the new gradient; `spec-01-tokens` row. |
| **D-23** | The mobile Home artboards (`ios-01`, `android-01`, `resp-03`) end after the FAQ, with no Final CTA or footer. The build renders both. | **Build stands.** It follows §5.11 (block, stacked buttons <480) and §5.12 (1-column footer at 360), which is the system. | Board: append a Final CTA + Footer block at 390 to `ios-01-inicio` and `android-01-inicio`, and at 360 to `resp-03`. Or add a redline note: "continues per §5.11–§5.12, see the desktop-01 components". |
| **D-24** | Process grid gap: board 24px (`desktop-01` L158); spec §5.6 is silent; build uses 32px. | **Board wins: `space.6` (24px).** | Spec §5.6: add "column gap space.6 at ≥1024". Build: FID-A04. |
| **D-25** | Footer city labels: board "Raleigh"; build "Raleigh, NC". | **Board wins.** The ", NC" belongs in the city-page H1 and meta, not the footer list. | Build: FID-A09. |

---

## 3. Verdict

With the Blockers at zero and the six Majors fixed, the Home is ready to show tomorrow:
- A01: 58px H1 at 1024–1535, so the CTAs sit above the 1366×768 fold.
- A02: header phone icon at 18px.
- A03: process steps top-aligned.
- A04: connector from badge 1 to badge 4.
- A05: the 768 trust-strip divider.
- A06: visible placeholder chips on the unconfirmed claims.

Everything else (structure, copy, tokens, icons, borders, shadows, section order, the 390 mobile layout and the 1920 layout) matches the board closely, and overflow and console checks are already clean. The Minors (A07–A09) take minutes each and should go in the same pass. A10 and A11 only need a re-shoot to close. Before the meeting, re-shoot at 360, 768, 1366 and 1920 and eyeball the slices I didn't view (360, 320, 412, the rest of 390, the mobile menu).
