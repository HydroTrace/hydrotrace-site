## Goal
Reduce file sizes of the 7 images in `public/images/` (currently ~11.3 MB total) while keeping them visually crisp, so the Netlify site renders faster.

## Approach
Use `sharp` (already in the sandbox) to re-encode each image in place. Same filenames, same paths — no code changes needed.

## Per-file targets

| File | Current | Action | Expected |
|---|---|---|---|
| hydrotrace-bg-sand.jpg | 2.4 MB | JPEG quality 78, mozjpeg, max 2560px wide | ~350–500 KB |
| water-risk-bg.png | 2.7 MB | Convert to JPEG q80 (it's a photo bg), max 2560px | ~400–600 KB |
| water-governance-bg.png | 2.5 MB | Convert to JPEG q80, max 2560px | ~400–600 KB |
| water-risk-crop.jpg | 2.0 MB | JPEG q80, mozjpeg, max 2000px | ~250–400 KB |
| water-governance.jpg | 1.2 MB | JPEG q80, mozjpeg, max 2000px | ~200–350 KB |
| hydrotrace-logo-v2.png | 369 KB | PNG palette/quantize (keep transparency) | ~60–120 KB |
| hydrotrace-logo-dark.png | 161 KB | PNG palette/quantize | ~40–80 KB |

Total expected: ~1.7–2.7 MB (≈75–85% reduction).

## Notes
- The two `*-bg.png` files I'll convert to `.jpg` only if they have no transparency. If they do, I'll keep PNG and run `pngquant`-style quantization via sharp. If converting to .jpg, I'll update the two `const bg = { url: "/images/...png" }` references in `src/pages/WaterRisk.tsx` and `src/pages/DigitalWaterGovernance.tsx`.
- Originals will be overwritten — revertable from chat history.
- After compression I'll run `bun run build` to confirm nothing breaks.

## Out of scope
No layout, markup, or caching-header changes. No WebP/AVIF variants (would require `<picture>` markup changes).
