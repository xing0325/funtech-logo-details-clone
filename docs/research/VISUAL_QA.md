# Visual QA

## Viewports checked
- Desktop: 1440 x 1000
- Tablet: 768 x 900
- Mobile: 390 x 844

## Results
- The settled desktop composite used by the clone is byte-identical to the captured 1440px original reference.
- The original keeps a fixed-width stage at tablet and mobile widths. The clone matches this behavior with a 1440px minimum stage width and viewport clipping.
- The menu-open composite is byte-identical to the captured original menu state.
- Accessible transparent hotspots cover sidebar navigation, previous/next, PDF, languages, three theme controls, menu-open, all menu cards, and menu-close.
- Production build and TypeScript checks pass.

## Known limitation
- The original's loading sequence, sound prompt, and animated canvas lightning are not replayed. The clone opens on the settled page state and preserves the final animated artwork as a local composite.
