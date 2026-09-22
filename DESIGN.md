# Step by Step

## Overview

A small meadow platformer and level-making playground. Keep the game as the main visual object: quiet white controls surround a pale sky, sage terrain, a coral character, and six distinct color platforms. The level library extends the same toy-like language through actual miniature level maps, not unrelated illustrations.

## Colors

Runtime UI tokens live in style.css: paper #f5f7f8, ink #253f49, muted #647981, line #dbe3e5, primary teal #237c70. engine.js COLORS owns the red #db454b, orange #ef923d, yellow #f3d44e, green #38965a, blue #347dcc, and purple #9654c4 palette shared by game blocks, completion slots, thumbnails, editor swatches, and effects.

Uncollected slots always use gray #e4e8ea with #bcc7cb borders, including the next required slot. Collected slots use the corresponding palette color and a check mark. Color names remain visible in the game and available through accessible labels. Never turn all collected platforms into a single success color.

## Typography

Avenir Next, Avenir, Segoe UI, sans-serif for the interface; monospace for utility labels and block names. Maintain the existing rounded heavy headline and compact controls. Long user-created level names wrap in library cards.

## Layout

Main document width caps at 1320 px with desktop padding of 48 px. The game uses a 1440 × 640 coordinate space scaled proportionally. The level library uses five card columns on desktop, three below 1000 px, and two below 600 px. The document owns scrolling; the library expands in normal flow. Editor controls wrap rather than clipping.

## Elevation & Depth

Subtle panel borders and shadows; raised platform edges make landings readable. Avoid additional decorative motion around navigation or saving.

## Shapes

Panels use 12–14 px radii, controls 7–9 px, platform edges 5 px. Level cards retain the same shape language as editor panels.

## Components

Native buttons own actions, toggle palettes, and level cards. app.js owns shared title/status/progress rendering and library cards. UX-CONTRACT.md defines selection and persistence behavior. No new component framework.

The victory effect is the expressive exception: six expanding rings and three waves of colored confetti, rendered on a separate pointer-transparent canvas above the stage and result panel. Respect reduced motion with a static halo. Restart, mode changes, and level changes clear celebration state.

## Do's and Don'ts

Show every built-in level without unlock gates. Show real layout thumbnails and clear difficulty names. Keep platform, hazard, start, and flag geometry honest. Do not replace missing collection progress with bright color; do not obscure the initial victory burst with an immediate modal.
