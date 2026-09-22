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
