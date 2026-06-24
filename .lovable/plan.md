# Risk Explorer page

Build a new `/risk-explorer` page following the supplied spec verbatim. Add it to the main nav between "Water Risk" and "Digital Water Governance".

## Files

1. **Data drop** — copy the three uploads into `public/data/`:
   - `public/data/sweep_results.json`
   - `public/data/aqueduct_seasonal_peaks.json`
   - `public/data/metadata.json`

2. **New page** — `src/pages/RiskExplorer.tsx`
   - Page intro section (Reckless Neue headline, DM Serif Display subhead, Open Sans body) on `#0e0e0e` background.
   - Two-column layout: 240px controls + flex outputs, 16px gap, 24px padding. Stacks on mobile.
   - All cards as frosted glass (`rgba(255,255,255,0.04)`, `1px solid rgba(255,255,255,0.12)`, radius 10px).
   - Loads `/data/sweep_results.json` on mount, builds keyed index `${crop}|${timing}|${irrigation}|${allocation}|${schedule}`.

3. **Small components co-located in the page file** (or `src/components/risk-explorer/`):
   - `ControlsPanel` — Crop card, Water source card (allocation OR depth slider), Irrigation card, Financial card.
   - `MetricStrip` — 4 tiles (Yield P50, Revenue P50, DSCR P50, Breach prob) with colour logic per spec.
   - `AqueductPanel` — fully static, hardcoded values, amber accent, four "—" rows that never update.
   - `PhysicalPanel` — 5 yield bars (P10–P90 at specified opacities), revenue-at-risk line, DSCR P50 big number, breach probability with 3px fill track.
   - `GroundwaterStrip` — visible only when source = Groundwater.
   - `UpsellStrip` — always visible, button links to `/contact` (route doesn't exist; use `mailto:info@hydrotrace.io` to match the existing Contact us pattern — confirm below).

4. **Logic helpers** — keep inside the page module:
   - `computeFinancials(yieldsRaw, price, farmHa, loanPerHa, dscrCovenant)` exactly as specified (normal CDF approximation included).
   - `gwCost(irrAppliedMm, farmHa, depthM)` exactly as specified.
   - `formatRevenue`, plus formatters for yield/DSCR/breach/area/price/loan/depth/allocation per the number-formatting table.
   - Irrigation label → key map; allocation → `p${pct}` (forced to `p100` when Rainfed); schedule label → `standard|optimised`.
   - When crop changes, reset price and loan-per-ha to the crop default; clamp price slider range to ±40% of new default.

5. **Routing** — `src/App.tsx`: add `<Route path="/risk-explorer" element={<RiskExplorer />} />` above the catch-all.

6. **Navigation** — `src/components/Navbar.tsx`: insert "Risk explorer" button between "Water Risk" and "Digital Water Governance" (desktop + mobile), matching existing styling.

## Styling notes

- All colours hardcoded per the spec's data palette — this page is intentionally outside the site's design tokens because it's a self-contained dark tool surface. Confirmed by the explicit hex table in the brief.
- Use native `<input type="range">` styled to spec rather than the shadcn Slider, to hit the exact 3px track + `#4B5FDB` fill cleanly without fighting the token system.
- Fonts loaded already (`Reckless Neue`, `DM Serif Display`/`DM Serif Text`, `Open Sans`, `Brown Std`). Page intro uses Reckless Neue for the headline only; everything else uses DM Serif Display for headings and Open Sans for body.
- Generic `$` for monetary values; never surface `allocation_label` or any region-specific terms from JSON.

## One clarification before I build

The upsell button says "linking to existing `/contact` page", but this site has no `/contact` route — Contact us currently opens `mailto:info@hydrotrace.io` everywhere. I'll wire the button to `mailto:info@hydrotrace.io` to match the rest of the site unless you'd rather I add a new `/contact` route.
