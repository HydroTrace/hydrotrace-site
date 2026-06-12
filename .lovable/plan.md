## Plan

1. Register the uploaded fonts as Lovable assets from `/mnt/user-uploads/`:
   - `reckless-neue-light.ttf` → `src/assets/reckless-neue-light.ttf.asset.json`
   - `BrownStd-Light.otf` → `src/assets/BrownStd-Light.otf.asset.json`

2. In `src/index.css`, add two `@font-face` declarations pointing at the asset URLs:
   - `font-family: 'Reckless Neue'`, weight 300
   - `font-family: 'Brown Std'`, weight 300

3. In `src/components/Hero.tsx`:
   - Change the `<h1>` font from `font-['Open_Sans']` to `font-['Reckless_Neue']` (keep current size/color/weight).
   - Change the subtitle `<p>` from `font-['Fira_Code'] uppercase tracking-wide` to `font-['Brown_Std']` (drop the uppercase + mono styling so the new font reads naturally; keep color `#249be0` and size).

No other components or pages are touched.