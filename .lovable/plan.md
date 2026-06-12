## Goal

Make the GitHub/Netlify build self-contained. Remove every reference to `/__l5e/assets-v1/...` and every `.asset.json` import. Serve all images and fonts from `public/images/` and `public/fonts/` using root-relative URLs (`/images/...`, `/fonts/...`).

## Files to migrate

**Images → `public/images/`**
- hydrotrace-logo-v2.png
- hydrotrace-logo-dark.png
- hydrotrace-logo-white.png
- hydrotrace-background.png
- hydrotrace-bg-sand.jpg
- hydrotrace-bg-fields.jpg
- hydrotrace-bg-rings.png
- water-risk-bg.png
- water-risk-crop.jpg
- water-governance-bg.png
- water-governance.jpg

**Fonts → `public/fonts/`**
- reckless-neue-light.ttf
- BrownStd-Light.otf
- BrownStd-Regular.otf
- BrownStd-Bold.otf

## Steps

1. **Download** each asset from its current Lovable CDN URL (read from the `.asset.json` files) and save under `public/images/` or `public/fonts/`.

2. **Rewrite imports in components/pages.** In each of these files, drop the `import X from "@/assets/....asset.json"` line and replace `X.url` references with a string literal like `/images/foo.png`:
   - `src/pages/Index.tsx` (hydrotrace-bg-sand.jpg)
   - `src/pages/WaterRisk.tsx` (water-risk-bg.png)
   - `src/pages/DigitalWaterGovernance.tsx` (water-governance-bg.png)
   - `src/components/Navbar.tsx` (hydrotrace-logo-v2.png, hydrotrace-logo-dark.png)
   - `src/components/HomeCards.tsx` (whatever it currently imports)

3. **Rewrite `src/index.css`** — replace the four `@font-face` `url('/__l5e/...')` lines with `url('/fonts/<file>')`.

4. **Delete the `.asset.json` files** under `src/assets/` (15 files) since nothing imports them anymore.

5. **Verify** with a build and a quick grep that no `__l5e` or `.asset.json` references remain.

## Notes

- Using `public/` (not `src/assets/`) means Vite copies the files through unchanged and root-relative `/images/...` URLs work identically on Lovable, Netlify, or any static host.
- Total payload added to the repo is ~16 MB (mostly the 2–3 MB PNG backgrounds). Acceptable for a marketing site; if you'd rather keep the repo small we can convert the large PNG backgrounds to JPG/WebP at the same time — say the word and I'll include that.
- Lovable hosting will keep working after this change; only the dependency on the `__l5e` CDN path goes away.
