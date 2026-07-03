# ExperienceFrame Specification

## Overview
- **Target file:** `src/components/ExperienceFrame.tsx`
- **Screenshot:** `docs/design-references/original-desktop-1440.png`
- **Interaction model:** time-driven opening and canvas layers, route-style wheel navigation, click-driven controls over a fixed viewport canvas

## DOM Structure
Viewport root > loader and sound gate > fixed 1440x1000 visual stage > shared sidebar, route-native scene, theme controls, bottom navigation, and 14-card menu overlay.

## Computed Styles
- Body: width 100%, height 100%, overflow hidden, background rgb(28,29,30).
- Outer padding: 8px.
- Desktop sidebar: 200px wide; main panel starts at x=208px.
- Content area: 928px tall at a 1000px viewport.
- Bottom navigation: 56px high.
- Key color: rgb(255,72,27). Foreground: approximately rgb(245,243,238).
- Global transition: 0.3s cubic-bezier(0.25,1,0.5,1).

## States & Behaviors
- Loading counter, the original eight-frame logo atlas, lightning texture and audio cues run first, followed by the ON/OFF sound gate.
- Wheel input uses the recovered 180-delta threshold, 220ms accumulation window, and 800ms cooldown. The live site then changes route.
- Menu opens from the bottom-center button and displays a real four-column thumbnail grid over the full stage.
- Theme buttons update selected state and apply a restrained hue treatment.
- Prev/next/sidebar/menu items navigate all 14 real static routes while preserving the presentation transition.
- Mobile/tablet retain the fixed 1440px stage and crop horizontally.

## Assets
- Chapter thumbnails: `public/assets/full-site/thumbnails/*.webp`.
- Losslessly extracted detail vectors: `public/assets/logo-details/detail-01.svg`, `detail-02.svg`, `detail-03.svg`.
- WebGL-derived source artwork: `public/assets/webgl/manga-d-sprite.jpg` and its transparency-preserving local derivative.
- Original noise-border sprites, opening atlas, lightning texture, OBJ geometry, GIF, BGM, and lightning cue are stored under `public/assets/`.
- The page itself is rendered from DOM, CSS, SVG, and source atlases; captured composites are not used as the visual base.
- Mobile reference: `public/reference/logo-details-mobile.png`.
- Full-deck sources: `public/assets/full-site/`.

## Text Content
Logo Details; Play Technology All In; Star Creators; Ever-Evolving; ALL FOR FUN; LOGO VARIATION; MENU; JP; EN.

## Responsive Behavior
- 1440px: complete experience visible.
- 768px: left 768px crop of the fixed stage.
- 390px: left 390px crop; sidebar stays 200px and content begins at x=208px.
