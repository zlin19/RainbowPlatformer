# Verification

- `node --check app.js` and `node --check engine.js`: pass.
- `node test.js`: pass. Simulates the complete starter route through 1–6 and the flag, plus sequence reset, plain-platform preservation, revisiting completed blocks, spike/fall restart, locked flag, and malformed-level validation.
- Browser: initial rendering, editor mode, clear-level validation, blocked test of an incomplete level, undo recovery, saved draft surviving reload, restore starter, and 390 px mobile editor layout checked.
- The premium static UI audit ran. It reported 14 actionless buttons because its HTML check recognizes inline handlers but not this prototype's separate app.js bindings. These are static false positives; handlers are present. The static report alone does not establish interaction correctness.
- Custom-level reachability is intentionally not validated. Full keyboard screen-reader gameplay and physical touch-device testing are not claimed.

## Color sequence update — 2026-09-21

- Re-ran syntax checks and full physics/rule regression tests: pass. Collection events now verified as Red → Orange → Yellow → Green → Blue → Purple.
- Browser inspection confirmed six distinct colored platforms with color names, color progress, all six editor choices, and successful switching back to play. No browser console errors observed.
- Existing saved draft loaded successfully with the same positions and the new colors.
- Static audit rerun: the same HTML-only action-handler detection limitations remain.

## Multi-level update

- `node --check app.js`, `node --check levels.js`, `node --check victory.js`: pass.
- `node test.js`: existing physics and sequence regressions pass.
- `node test-levels.js`: all ten built-in routes reach their flag with six colors and zero deaths; saved-level creation/update/reload, validation, storage-failure rollback, six-color particle rendering, and reduced-motion behavior pass.
- `node test-app.js`: direct level-ten selection, real engine win-event handling, delayed result panel, rainbow creation, replay cleanup, collection/reset progress markup, custom save/update/reload, and built-in preservation pass in a lightweight DOM harness.
- Browser: ten-card level library, direct jump to level 10, custom save → refresh → select/play, gray computed backgrounds on all six uncollected slots, rainbow effect preview and reduced-motion preview checked. 390 px viewport shows two card columns. Browser console contained no errors. Browser save tests used the separate 127.0.0.1 origin so the localhost library remains clean.
- Static UI audit: 21 actionless-button reports, from the same HTML-only inability to follow app.js handlers (including test-page handlers); all literal controls have handlers. No other rule IDs reported.
- DESIGN.md lint was attempted offline but the @google/design.md package was not cached; no linter result is claimed. Runtime styling was visually checked.
- Difficulty is a design progression rather than a measured player-study result. Custom level geometry is validated, but custom solvability is not automatically proven.

## Chinese and next-level update — 2026-09-22

- Syntax, test.js, test-levels.js, test-app.js and git diff --check pass. New checks cover language persistence, live progress preservation, translated pause/win prompts, reset on advancing, skipped final level, custom ordering and name preservation, playtests, and unavailable storage.
- Isolated headless Chrome: Chinese browser default, switching both ways, reload persistence, ten library cards, actual engine victory → prompt → next-level click, 390 px editor and playtest completion all pass, without page errors or horizontal overflow. Desktop and narrow victory screenshots were visually inspected. No physical touch-device claim is made.
- Strict static audit reports 23 actionless-button findings: the existing HTML-only detector does not follow app.js onclick bindings. New language/next buttons were exercised in Chrome. No other rule IDs were reported; audit JSON is in /tmp/rainbow-audit.json.
- No build/dependency step is needed. DESIGN.md official lint remains unavailable offline as documented above.

## Four-face collection and strict sequence — 2026-09-23

- test.js passes real collision checks from left/right/top/bottom, standing/sliding contact latching, separation and repeated-contact reset, expected-color events, and plain-platform preservation, alongside starter/spike/fall/flag regressions.
- test-levels.js passes all ten full routes with zero deaths and zero order resets. The level-three forward shortcut is separately simulated and produces exactly one yellow-before-orange reset without death. Custom copies drop built-in lesson metadata.
- test-app.js passes translated touched/expected-color feedback, progress reset and language switching, built-in hints, and prior library/next-level coverage. Syntax and whitespace checks pass.
- Isolated Chrome checks: revised second/third levels, bilingual error feedback, all-gray reset display, 390 px viewport without horizontal overflow, and side collection during an editor playtest pass without page errors. Desktop level-three and narrow error screenshots were visually inspected. Browser error screenshots use an injected collection event; collision correctness is verified separately in engine tests and the browser side-contact check.
- Teaching effectiveness has not yet been tested with new players. All old custom data remains readable, but routes that relied on safe repeated colors may need redesign.

## Latest-color repeat refinement — 2026-09-23

Supersedes the earlier blanket repeat-reset rule: the latest collected color is safe on re-entry, even after a plain platform; earlier or skipped-ahead colors still reset progress. Tests cover all six safe repeats, no duplicated collection/death events, physical jump-away/return, and earlier-color resets. Rules, level-four hint, and English/Chinese guide copy are synchronized.

## Synthesized musical feedback — 2026-09-23

- audio.js/app.js/i18n.js syntax and git diff --check pass. test-audio.js checks C4–C5 mapping, the octave finish, single pending opening cue, silence on repeat colors, mute during asynchronous unlock, active-voice cancellation, unavailable audio, and real engine event integration. test-app.js, test.js and all ten routes in test-levels.js pass.
- Isolated Chrome: no AudioContext before a gesture, first restart plays exactly one opening note plus its overtone, the six collections and flag schedule the exact eight-note scale, latest-color repeats schedule nothing, mute survives reload, and re-enabling works. No page errors. OfflineAudioContext renders non-silent output (RMS 0.01984, peak 0.11518, below clipping). This verifies browser scheduling and audio output, not physical-speaker listening or every mobile browser.

## Downloaded piano samples replace synthesis — 2026-09-23

- Supersedes the synthesized-feedback section: audio.js now decodes and plays eight unchanged FluidR3_GM piano MP3 samples from the pinned gleitz/midi-js-soundfonts source. There are no oscillator nodes or synthesized fallback. Attribution and CC BY 3.0 source declaration are retained in assets/audio/CREDITS.md, linked from the footer.
- FFT estimates from decoded original files identify C4/D4/E4/F4/G4/A4/B4/C5, each within 1 cent of its target at the analysis resolution; details in assets/audio/pitch-verification.json. A scale-preview.mp3 is provided for user listening. Human listening quality is not claimed from this measurement.
- test-audio.js verifies original-file SHA-256, note mapping, original playback rate, decoded-buffer caching, single pending start, prior-tail cancellation, mute during loading, decode-error retry, missing assets and real game event integration. test-app.js, test.js, all ten routes, syntax and whitespace checks pass.
- Isolated Chrome actually decodes all eight MP3s and plays buffers 0–7 at rate 1 for start/colors/flag. A test hook rejects oscillator creation. Safe repeats are silent, mute survives reload, direct file opening works, and the 390 px layout has no horizontal overflow. No page errors.

## Restored preferred synthesized sound — 2026-09-23

The user selected the original synthesized version after hearing its MP3 export. Restored its exact frequency, overtone, attack and decay parameters; removed the piano sample script and runtime attribution link. Reference piano assets retain their credits and are not loaded. Game mechanics and levels are unchanged. test-audio.js and test-app.js pass, as do syntax/whitespace checks. Isolated Chrome verified one opening Do, the eight-note sequence, safe-repeat silence, saved mute and non-clipping offline render. Earlier piano-replacement notes are historical, not the current runtime.

## Normal/perfect achievements and reverse opt-in — 2026-09-23

- All five suites pass: test.js, test-levels.js, test-app.js, test-achievements.js, test-audio.js. All ten built-in routes earn perfect with no deaths/order resets. A physically simulated color-reversed introductory route also earns perfect when allowReverse is enabled. Tests separately cover unordered normal wins, reverse disabled/enabled, mixed directions, repeated/latest colors, retained color sets, chain recovery, six-color flag gate, spike/fall reset, frozen results, old-save migration, best-medal upgrades, edited-custom invalidation and atomic storage failure.
- Browser: ordinary/perfect panels, non-rainbow normal effect vs 216-particle perfect effect, next-level continuation, normal-to-perfect upgrade/no downgrade, keyboard reverse checkbox, undo/redo, custom save/reload, JSON export/import and invalid flag validation, English/Chinese, reduced-motion perfect outcome, and 390 px layout pass without page errors. Export/import waits for asynchronous file reading before assertions. Engine/effect tests cover reduced-motion normal output. Screenshots of desktop normal and narrow perfect/editor states were inspected. Mobile result actions are fully visible below the meadow.
- Syntax and git diff --check pass. Strict UI audit reports the same 23 HTML-only actionless-button findings because it does not follow app.js handlers; no additional rule IDs. Report: /tmp/rainbow-achievements-audit.json. Official DESIGN.md lint remains unavailable offline as previously documented.
- All current built-ins default reverse off; future individual middle/late levels can set allowReverse true. Geometry is not automatically redesigned for reverse reachability. The implemented recovery rule allows rebuilding a full chain after a mistake before reaching the flag. No new-player study or physical mobile-device testing is claimed.

## Design-lab review batch — 2026-09-24

- Added eight built-in design-lab levels (11–18) covering underside hits, left- and right-side brushes, mixed-face chains, route reading, vertical return routes, perfect-chain recovery, and a forward/reverse mirror circuit. `test-levels.js` physically simulates all eighteen forward routes with perfect results, zero deaths and zero order resets, plus the Mirror circuit's real reverse route.
- Added separate Bad/Okay/Good review controls to lab cards. Ratings persist in the versioned `step-by-step-ratings` record, can be changed or cleared, remain independent of achievements/custom levels, and retain previous in-memory state when storage fails. `test-app.js` covers semantic controls, count updates, persistence, clearing, storage feedback and English/Chinese copy.
- All five suites pass: `test.js`, `test-levels.js`, `test-app.js`, `test-achievements.js`, and `test-audio.js`; syntax checks and `git diff --check` also pass. The official DESIGN.md lint reports zero errors and one warning because the established document has no YAML frontmatter.
- Browser inspection covered the three-column responsive library, the full lab review section, selected/unselected rating states, count/status updates, Chinese localization, and loading a new underside-contact level. Static strict audit still reports the same 23 HTML-only actionless-button false positives because it does not follow the separate app.js handlers; runtime controls and tests confirm the handlers. Audit report: `/tmp/rainbow-rating-audit.json`.
- This supersedes the prior statement that every built-in has reverse mode off: the original ten remain forward-only, while level 18 intentionally enables and physically verifies reverse play. Automated routes prove mechanical solvability, not human difficulty calibration; the new review controls are intended to gather that judgment.
