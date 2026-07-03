# FullSlideDeck Specification

## Target
- `src/components/SlideScenes.tsx`
- `src/data/slides.ts`
- Reference: `docs/design-references/full-deck-contact-sheet.png`

## Contract
- Render one distinct scene for each of the 14 recovered routes.
- Keep all scenes inside the shared 100cqw x 100% slide canvas and use container-relative measurements so the original fixed-stage crop survives narrow viewports.
- Reuse original thumbnails, sticker GIFs/WebPs, noise borders, animated three-frame illustrations, manga atlases, member pairs, Fin imagery, and route copy.
- Preserve the route theme accent and foreground colors.

## Motion
- Scene entry: 620ms ease-out opacity/y reveal.
- Manga masks: four-frame 4 FPS flipbook.
- Noise illustrations: three-frame cycling strip.
- Logo Variation and 10th Item: staggered drop/scatter entry.
- We Are FunTech: timed wave through the 15 recovered on/off image pairs.
- Videos: autoplay, muted, looping, inline; the Vision poster remains visible beneath the stream.

## Verification
- Build all route params through `generateStaticParams`.
- Capture every route at 1440x1000 and inspect the composite contact sheet.
- Verify a real wheel gesture advances the URL and shell state to the adjacent route.
