# Visual QA

## Viewports checked
- Desktop: 1440 x 1000
- Tablet: 768 x 900
- Mobile: 390 x 844

## Results
- The main page is rendered as real DOM/CSS/SVG and was inspected at 1440 x 1000.
- The three card illustrations are losslessly decoded Next Flight vectors, not screenshot crops.
- The full-slide manga layer uses the original four-frame WebGL atlas at its recovered 4 FPS idle rate.
- The original noise-border sprites and computed sprite offsets are applied to the frame and detail artwork.
- The original keeps a fixed-width stage at tablet and mobile widths. The clone matches this behavior with a 1440px minimum stage width and viewport clipping.
- The opening overlay is independently viewport-fixed, so ON/OFF remains reachable at 390px before returning to the fixed-stage crop.
- The loader, sound gate, main entered state, menu grid, theme controls and card state controls are real interactive elements.
- Wheel input runs the recovered threshold/accumulation/cooldown algorithm.
- All 14 exported routes were opened and captured at 1440x1000. The review sheet is `docs/design-references/full-deck-contact-sheet.png`; individual captures are under `docs/design-references/full-deck/`.
- Wheel navigation was exercised from Logo Details to Logo Variation and verified by the resulting `/logo-variation/` URL, updated rail state, and bottom navigation.
- Final references: `full-deck-contact-sheet.png`, `clone-reverse-mobile-fixed.png`, and `clone-reverse-mobile-entered.png`.

## Known limitation
- The foreground lightning uses an animated SVG surrogate over the original visual stack instead of executing the site's Three.js instanced OBJ shader.
- The live route videos remain remote Vimeo streams. A local Vision poster covers slow or unavailable playback.
