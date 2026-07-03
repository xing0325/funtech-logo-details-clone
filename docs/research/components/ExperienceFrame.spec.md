# ExperienceFrame Specification

## Overview
- **Target file:** `src/components/ExperienceFrame.tsx`
- **Screenshot:** `docs/design-references/original-desktop-1440.png`
- **Interaction model:** click-driven controls over a fixed viewport canvas

## DOM Structure
Viewport root > loader and sound gate > fixed 1440x1000 visual stage > real sidebar, three detail cards, theme controls, bottom navigation, and menu overlay.

## Computed Styles
- Body: width 100%, height 100%, overflow hidden, background rgb(28,29,30).
- Outer padding: 8px.
- Desktop sidebar: 200px wide; main panel starts at x=208px.
- Content area: 928px tall at a 1000px viewport.
- Bottom navigation: 56px high.
- Key color: rgb(255,72,27). Foreground: approximately rgb(245,243,238).
- Global transition: 0.3s cubic-bezier(0.25,1,0.5,1).

## States & Behaviors
- Loading counter and SVG lightning run first, followed by the ON/OFF sound gate.
- Wheel input changes the active Logo Detail card with a throttled state transition.
- Menu opens from the bottom-center button and displays a real four-column thumbnail grid over the full stage.
- Theme buttons update selected state and apply a restrained hue treatment.
- Prev/next/PDF/sidebar items are real anchors.
- Mobile/tablet retain the fixed 1440px stage and crop horizontally.

## Assets
- Chapter thumbnails: `public/assets/thumbnails/*.webp`.
- The page itself is rendered from DOM, CSS, and SVG; captured composites are not used as the visual base.
- Mobile reference: `public/reference/logo-details-mobile.png`.
- Thumbnail files: `public/assets/thumbnails/*.webp`.

## Text Content
Logo Details; Play Technology All In; Star Creators; Ever-Evolving; ALL FOR FUN; LOGO VARIATION; MENU; JP; EN.

## Responsive Behavior
- 1440px: complete experience visible.
- 768px: left 768px crop of the fixed stage.
- 390px: left 390px crop; sidebar stays 200px and content begins at x=208px.
