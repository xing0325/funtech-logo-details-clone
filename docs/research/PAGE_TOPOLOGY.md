# Page topology

The target is a single viewport experience with `body` fixed to the viewport and overflow hidden.

1. A 200px vertical thumbnail rail on desktop. It remains present on narrow screens; mobile shows a crop of the fixed-width canvas rather than a reflow.
2. A flexible central Logo Details artwork panel with a dark #1c1d1e field and #ff481b key color.
3. A 56px bottom navigation bar containing previous, PDF, menu, sound/language, and next controls.
4. Three theme buttons in the top-right.
5. A full-canvas menu overlay opened by the bottom Menu control.

Interaction model: the opening and manga layers are time-driven; wheel gestures trigger route navigation through a recovered threshold/cooldown algorithm; the thumbnail rail uses vertical scroll snap; page-to-page controls are links; theme controls change coloration; the menu is click-driven.
