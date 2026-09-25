# Step by Step

## Overview

A small meadow platformer and level-making playground. Keep the game as the main visual object: quiet white controls surround a pale sky, sage terrain, a coral character, and six distinct color platforms. The level library extends the same toy-like language through actual miniature level maps, not unrelated illustrations.

## Colors

Runtime UI tokens live in style.css: paper #f5f7f8, ink #253f49, muted #647981, line #dbe3e5, primary teal #237c70. engine.js COLORS owns the red #db454b, orange #ef923d, yellow #f3d44e, green #38965a, blue #347dcc, and purple #9654c4 palette shared by game blocks, completion slots, thumbnails, editor swatches, and effects.

Uncollected slots always use gray #e4e8ea with #bcc7cb borders, including the next required slot. Collected slots use the corresponding palette color and a check mark. Color names remain visible in the game and available through accessible labels. Never turn all collected platforms into a single success color.

## Typography

Avenir Next, Avenir, Segoe UI, sans-serif for the interface; monospace for utility labels and block names. Maintain the existing rounded heavy headline and compact controls. Long user-created level names wrap in library cards.

## Layout

Main document width caps at 1320 px with desktop padding of 48 px. The game uses a 1440 × 640 coordinate space scaled proportionally. The level library uses five card columns on desktop, three below 1000 px, and two below 600 px. Original trails, design-lab review levels, and player-created levels remain visually grouped. The document owns scrolling; the library expands in normal flow. Editor controls wrap rather than clipping.

## Elevation & Depth

Subtle panel borders and shadows; raised platform edges make landings readable. Avoid additional decorative motion around navigation or saving.

## Shapes

Panels use 12–14 px radii, controls 7–9 px, platform edges 5 px. Level cards retain the same shape language as editor panels.

## Components

Native buttons own actions, toggle palettes, level play targets, and the Bad/Okay/Good review choices. A level card is a bordered container with separate sibling play and review controls—never nested buttons. Selected reviews use a symbol, text, and semantic tint rather than color alone. app.js owns shared title/status/progress rendering and library cards. UX-CONTRACT.md defines selection and persistence behavior. No new component framework.

Only the perfect victory effect is the expressive exception: six expanding rings and three waves of colored confetti, rendered on a separate pointer-transparent canvas above the stage and result panel. Normal achievement uses a small teal pulse, never rainbow rings/confetti. Respect reduced motion with a static rainbow halo for perfect and one teal ring for normal. Restart, mode changes, and level changes clear celebration state.

## Do's and Don'ts

Show every built-in level without unlock gates. Show real layout thumbnails and clear difficulty names. Keep platform, hazard, start, and flag geometry honest. Do not replace missing collection progress with bright color; do not obscure the initial victory burst with an immediate modal.

## Language and continuation update

The top-right language control switches English/Simplified Chinese and remembers the choice locally. Browser language supplies the initial default. Localize controls, messages, built-in metadata and canvas labels while preserving player-authored level names and live game/editor state. After victory, explicitly ask whether to continue to the next level; retain replay and free selection. Advance within the current built-in/custom list only. Hide continuation at list end and during an editor playtest, and never equate finishing the last level with completing every level.

## Sequence teaching

Maintain the existing palette and next-color arrow/outlined progress slot. Introductory geometry teaches the rule before adding danger: a sequential first trail, an overhead orange contact on the second, and a plain-platform return path before yellow on the third. The first three keep a safe recovery floor. The fourth applies the sequence above spikes. Wrong contacts preserve the colored collection slots and reset only the separately labeled perfect chain; the latest chain color remains safe to repeat, but earlier colors break the chain. All four block faces count, once per uninterrupted contact. Custom playtests share these rules without inherited curated route hints.

## Sound feedback

Use the original synthesized sound selected after the MP3 comparison: sine fundamental at gain 0.11, octave overtone at gain 0.018, 8 ms attack, exponential release to 0.0001. Ordinary notes last 0.3 seconds, victory 0.85 seconds. C4 introduces/resets a run; six colors rise through D4–B4; victory completes the scale at C5. Safe repeats stay silent. Keep the existing top-right sound control and localized waiting/on/off/retry labels.

## Achievement components

Reuse showOverlay for normal/perfect variants: teal check for normal, gold star medal and existing rainbow border for perfect. The compact run-goal row distinguishes collection count, perfect chain and direction. Library cards display the best normal/perfect badge and forward/reverse availability. The editor uses a full-row native checkbox for the per-level reverse setting. On phones, result panels flow below the meadow so all actions are visible; the effects canvas remains aligned to the meadow. Runtime visual ownership stays in style.css; no new framework or font dependencies.
