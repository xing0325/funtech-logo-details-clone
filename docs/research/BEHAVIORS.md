# Behaviors

- The initial experience runs a loading phase, sound choice, atlas flipbook/lightning ramp, and page entry.
- The page is viewport-locked (`h-dvh`, `overflow-hidden`).
- Desktop frame padding is 8px. Sidebar width is 200px. Bottom bar height is 56px.
- The sidebar scrolls vertically with mandatory snap points and no visible scrollbar.
- At 768px and 390px the site does not stack or scale down. The same fixed-width stage is clipped by the viewport.
- Wheel navigation uses the original 180-delta threshold, 220ms accumulation window, and 800ms cooldown.
- Menu is click-driven and animates with a 300ms ease-out opacity/scale transition.
- Theme controls are click-driven; selected theme gets an orange field.
- Links and controls brighten on hover with a 300ms cubic-bezier(0.25,1,0.5,1) transition.
- The route's manga canvas uses the original four-frame `manga-d-sprite` at 4 FPS; the clone runs the same source atlas as a live CSS flipbook.
- The original foreground lightning is instanced Three.js geometry. The clone keeps it as a live animated SVG foreground layer using the recovered colors and stacking order.
