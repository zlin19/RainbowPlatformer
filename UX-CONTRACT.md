# Prototype interaction contract

Source: user's platform-game brief. English, single-device prototype; no remote service or accounts.

- Native buttons own all actions; app.js binds their behavior. Canvas owns game controls and the editor grid.
- Shared status messages: say() and #status; editor validation: check() and #validation.
- Editor mutations: commit(), undo, redo, save(); automatic local drafts with explicit storage-failure feedback and JSON export fallback. Clear/restore are reversible through Undo.
- Select/Listbox: not applicable. Palette uses native toggle buttons.
- Scrollbar: global style.css variables and standard/WebKit rules.
- Gameplay overlay: nonmodal pause/win panel, retaining access to restart and mode switching.
- Editing preserves its draft when switching to play; every test starts with zero progress. Incomplete levels stay in editor.
- Every direct manipulation supports a click-place alternative and canvas arrow/Enter keyboard controls.
- Runtime styling is owned by style.css. Pale sky, sage terrain, six colored blocks (red, orange, yellow, green, blue, purple), coral player; quiet white editor panels. System Avenir Next/sans and monospace utility labels. No external assets or fonts.

- Color definitions: engine.js COLORS is the shared palette for canvas platforms, progress, editor swatches, and feedback. Color names accompany swatches; collection adds a check without changing the block color. Internal n IDs preserve saved-level compatibility.

## Multi-level behavior

Source: user's multi-level request. All eighteen built-in levels are selectable at any time; difficulty order never locks a level. levels.js owns the curated layouts and LevelStore library persistence. app.js owns library navigation, editor draft handling, and selection. Level names use a native labeled text input; library play and review actions use native buttons and textContent for user data.

The library contains the original ten trails plus eight design-lab review levels. Lab cards expose separate native Bad/Okay/Good buttons beside the play action; controls are siblings rather than nested interactive elements. RatingStore persists one mutable rating per lab level in the separate `step-by-step-ratings` local-storage record. Ratings do not change completion/perfect medals or custom-level data. A failed write leaves the prior in-memory rating intact and reports the failure through the shared library status region.

Saving creates a new custom level unless Save changes is explicitly chosen while editing an existing custom level. Library writes complete before in-memory records change; failed writes leave the previous library intact. Saved levels and the working draft are separate copies. The existing draft key and internal color IDs remain compatible. Editing a saved level clears that level's completion badge when committed; built-in layouts are immutable from the editor.

The default entry opens the first built-in level. Selection resets run state, particles, and progress. The library pauses play; closing resumes unless a pause/win overlay remains. A saved level earns its normal/perfect badge when played from its library card; draft playtests do not alter completion badges. No remote publishing or account synchronization is implied.

style.css owns the gray uncollected progress state; only .done takes the shared COLORS palette. victory.js owns the effect; app.js triggers it only on the engine's win event, delays the perfect overlay by 1.25 seconds and the normal overlay by 0.45 seconds, and clears the effect on restart or mode/level change. Reduced motion uses a static rainbow halo for perfect, a single teal ring for normal, and immediate result feedback.

## Language and continuation update

The top-right language control switches English/Simplified Chinese and remembers the choice locally. Browser language supplies the initial default. Localize controls, messages, built-in metadata and canvas labels while preserving player-authored level names and live game/editor state. After victory, explicitly ask whether to continue to the next level; retain replay and free selection. Advance within the current built-in/custom list only. Hide continuation at list end and during an editor playtest, and never equate finishing the last level with completing every level.

## Collection, achievement and reverse-order rules

Source: user's normal/perfect achievement update. engine.js owns a unique collected-color set, a separate uninterrupted chain counter/direction, and the final normal/perfect result. Four-face contact entry collects a color. Continuous contact counts once; plain blocks and repeating the latest chain color are safe. Wrong-order contact adds that color to the set, resets the chain, and keeps position. Rebuild a full red-to-purple chain (or purple-to-red when allowed) before the flag to earn perfect. All six unique colors without a full chain earn normal. Spikes/falls clear both progress types. A result cannot change after victory.

Level `allowReverse` is a validated optional boolean, default false. The original ten built-ins keep it off; the design-lab Mirror circuit opts in with geometry tested for both directions. app.js uses a native labeled editor checkbox through commit/save/undo/redo, including JSON import/export and drafts. No gameplay toggle mutates a run. The six HUD slots and block checks reflect collected colors, while the run-goal row shows chain progress and direction. i18n.js owns labels. showWin/showOverlay own both result variants and the medal; mobile panels sit below the canvas with visible actions. victory.js owns the exclusive rainbow perfect effect and separate teal normal pulse, including reduced motion.

LevelStore version 2 retains best results in completed/perfect ID lists, upgrades without downgrading, and clears edited custom results. Version-1 completed IDs migrate to perfect because the old win rule required sequence completion. Writes remain atomic; failure retains previous in-memory state. Editor playtests do not award library medals. Future middle/late built-ins can opt in independently; enabling reverse does not change geometry.

## Musical feedback

audio.js uses the original synthesized C-major notes selected by the user after auditioning both versions. Reset/start=C4; colors 1–6=D4 through B4; victory=C5. Safe repeats are silent. First interaction unlocks playback; only the current pending cue is kept. Muting/editor entry cancels pending and active sounds; mute survives reload; activation failures offer retry without blocking gameplay. Downloaded piano files are retained as reference assets and are not in the runtime script chain.
