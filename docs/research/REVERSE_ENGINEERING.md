# Reverse-engineering findings

## Runtime stack
- Next.js App Router with React Server Components.
- GSAP 3.15.0 including Observer and ScrollTrigger.
- Three.js r179 and React Three Fiber 9.6.1 for the opening and route transitions.
- Adobe Typekit kit `pfl7wcw`: Proxima Nova 600/700 and Elevon 400/800.

## Opening state machine
- Phases: loading -> sound prompt -> logo flipbook -> outro -> page intro.
- Logo atlas: `/opening/logos/old-logos-atlas.webp`, 4 columns x 2 rows, 8 frames.
- Lightning texture: `/webgl/lightning.png`.
- Lightning OBJ geometry: `tapered-01.obj` and `tapered-02.obj`.
- Original maximum lightning instances: 72.
- Ramp: 2.4s; peak hold: 0.4s; overlay fade: 0.6s.
- Lightning density: 0.22 -> 10; FPS: 4 -> 52.
- Logo FPS: 1.25 -> 36; outro scale: 1.5.
- Loading minimum: 0.8s; complete hold: 0.2s; fade: 0.6s.
- Sound assets: `/sound/bgm.mp3` and `/sound/lightning.aac`; BGM cue starts at 16.5s with volume 0.2.

## Wheel navigation algorithm
- Normalize line-mode wheel deltas by 40 and page-mode deltas by viewport height.
- Ignore absolute deltas below 4.
- Accumulate deltas while events remain within 220ms and direction does not change.
- Commit navigation at absolute accumulated delta 180.
- Apply an 800ms navigation cooldown.
- Next/previous page selection is route-driven, not a fake carousel inside Logo Details.

## Logo Details page
- Content is laid out inside a centered 16:9 slide canvas.
- The first WebGL canvas renders a four-frame manga flipbook. For this route the target is index 3, sourced from `/webgl/manga-d-sprite.jpg` (2048x512, four 512px frames) at 4 FPS.
- The second transparent WebGL canvas renders the large-lightning overlay above slide content.
- Noise borders use `/noise-border/fun-h.png` and `/noise-border/fun-v.png`, with computed sizes 128x320 and 320x128 and offsets `0 -85px` / `-85px 0`.
- Title: left 2cqw, top 6cqw, font-size 5cqw.
- Cards: 30cqw square artwork plus 1cqw gap to body copy.
- Detail 01: left 2cqw, top 14cqw.
- Detail 02: horizontally centered, top 9cqw.
- Detail 03: right 2cqw, top 2cqw.
- Entry values: opacity 0, y 16, duration 0.6s, `power3.inOut`.
- Delays: 0 / 0.05 / 0.1s; typography delays: 0.2 / 0.25 / 0.3s.
- All three 380x380 illustrations were extracted losslessly from Next Flight RSC text records.

## Sidebar
- Native scroll container with mandatory snap, hidden scrollbar, overscroll containment.
- Active card is centered with smooth `scrollIntoView`.
- A route push occurs only after the target thumbnail opacity transition completes.
