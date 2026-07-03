# Visual QA

## Viewports checked
- Desktop: 1440 x 1000
- Tablet: 768 x 900
- Mobile: 390 x 844

## Results
- The main page is rendered as real DOM/CSS/SVG and was inspected at 1440 x 1000.
- The original keeps a fixed-width stage at tablet and mobile widths. The clone matches this behavior with a 1440px minimum stage width and viewport clipping.
- The loader, sound gate, main entered state, menu grid, theme controls and card state controls are real interactive elements.
- Wheel input drives the active detail card; explicit meter buttons provide the same three states.
- Production build and TypeScript checks pass.

## Known limitation
- Sound choice is visual only; the clone does not ship the original site's proprietary audio files.
