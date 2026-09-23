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

Source: user's multi-level request. All ten built-in levels are selectable at any time; difficulty order never locks a level. levels.js owns the curated layouts and LevelStore library persistence. app.js owns library navigation, editor draft handling, and selection. Level names use a native labeled text input; library cards use native buttons and textContent for user data.

Saving creates a new custom level unless Save changes is explicitly chosen while editing an existing custom level. Library writes complete before in-memory records change; failed writes leave the previous library intact. Saved levels and the working draft are separate copies. The existing draft key and internal color IDs remain compatible. Editing a saved level clears that level's completion badge when committed; built-in layouts are immutable from the editor.

The default entry opens the first built-in level. Selection resets run state, particles, and progress. The library pauses play; closing resumes unless a pause/win overlay remains. A saved level earns a completion badge when played from its library card; draft playtests do not alter completion badges. No remote publishing or account synchronization is implied.

style.css owns the gray uncollected progress state; only .done takes the shared COLORS palette. victory.js owns the effect; app.js triggers it only on the engine's win event, delays the result overlay by 1.25 seconds, and clears the effect on restart or mode/level change. Reduced motion uses a static halo and immediate result feedback.

## Language and continuation update

The top-right language control switches English/Simplified Chinese and remembers the choice locally. Browser language supplies the initial default. Localize controls, messages, built-in metadata and canvas labels while preserving player-authored level names and live game/editor state. After victory, explicitly ask whether to continue to the next level; retain replay and free selection. Advance within the current built-in/custom list only. Hide continuation at list end and during an editor playtest, and never equate finishing the last level with completing every level.

## Strict sequence and four-face contacts

All four faces trigger color collection on contact entry. A continuous contact with a block is counted once; separation and re-entry counts again. Only progress + 1 advances the sequence. Repeating the latest collected color is a safe no-op (including purple after all six), even after touching plain platforms. Earlier colors and skipped-ahead colors clear progress without teleporting the player. Plain platforms preserve progress. Spikes/falls still reset the run. The error message names touched/expected color, or the flag when all six were complete. Level-specific hints belong only to curated built-ins, not edited/custom copies. The first three levels have safe recovery floors; the fourth adds hazards.

## Musical feedback

audio.js uses the original synthesized C-major notes selected by the user after auditioning both versions. Reset/start=C4; colors 1–6=D4 through B4; victory=C5. Safe repeats are silent. First interaction unlocks playback; only the current pending cue is kept. Muting/editor entry cancels pending and active sounds; mute survives reload; activation failures offer retry without blocking gameplay. Downloaded piano files are retained as reference assets and are not in the runtime script chain.
