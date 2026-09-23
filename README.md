# RainbowPlatformer

A dependency-free HTML canvas platform game and level editor. Open `index.html` directly in a browser, or serve this folder with `python3 -m http.server 5173` and visit http://localhost:5173.

## Play

- Move: A / D or left / right arrows. Jump: Space, W, or up arrow.
- Touch any face of colored blocks in order: red, orange, yellow, green, blue, purple. The latest collected color can be touched repeatedly without changing progress. Earlier colors and skipped-ahead colors clear all progress. Separate from red and touch it again to restart the sequence. Holding or sliding along one continuous contact counts once. A wrong color preserves your position; spikes/falls restart the run.
- Plain platforms preserve progress. Spikes and falling out of the world restart the run.
- Collect all six and touch the flag to win. R restarts; P pauses. Touch controls are available on narrow screens and touch devices.

## Editor

Choose a piece and click the grid to place it. Placing a color piece relocates that color so it stays unique. Select an existing piece, then click its destination to move it. Erase removes platforms and spikes; start and flag can be moved. With the canvas focused, arrows move the editing cursor and Enter places the current piece. Delete erases; Escape cancels selection.

Undo and redo cover all level changes, including clearing, restoring, and importing. Drafts save in this browser's local storage. Export/import JSON to move a complete level between devices. Test level applies the same physics and rules. The validator checks structure and all six colors; it does not prove a custom level is solvable. Start with the starter layout to learn the jump distances.

## Verification

`node test.js` simulates a complete starter playthrough and checks ordering, plain platforms, repeat landings, death, falling, flag locking, and malformed level validation. `node --check app.js` checks script syntax. No packages or build step required.

Existing level files and drafts remain compatible: internal IDs 1–6 now represent red, orange, yellow, green, blue, and purple. Collected blocks retain their original colors and gain a check mark.

## Level library

Choose level opens all ten built-in trails immediately; no unlocks are required. They progress through a safe color introduction, an overhead orange/side-contact lesson, a plain-platform detour, alternating heights, islands, narrow peaks, intermediate stones, uphill switchbacks, tiny sky ledges, and the final summit. Completed levels receive a check mark.

In the editor, enter a name and use **Save as extra level** to add a separate playable level. Select that level from **Your extra levels** to play. Edit it and choose **Save changes** to update the saved level, or **Save as extra level** to make another copy. Built-ins are never overwritten. **Open editor draft** restores your latest working layout, including drafts made before the level library was added. Levels and completion badges stay in this browser on this device; JSON export remains available for backups and transfers. Custom reachability remains up to the designer.

Uncollected progress slots are gray, including the next required color; collected slots gain their color and a check. Winning triggers three waves of rainbow confetti and expanding colored rings at the flag, then asks whether to enter the next level, with replay and free level selection also available. Reduced-motion users see a static rainbow halo instead.

Additional checks: `node test-levels.js` simulates every built-in route and tests library persistence, update behavior, storage failure, and effect drawing. `node test-app.js` exercises app-level selection, completion, effects, restart, save/update, and reload with a lightweight DOM harness. `tests/victory-preview.html` is an isolated visual effect test page.

## Languages and next-level prompts

Use the top-right **中文 / EN** button to switch between Simplified Chinese and English. The first visit follows the browser language; subsequent visits use the saved preference. Switching preserves the current run, editor draft, and player-created names. Menus, built-in level names/descriptions, canvas labels, editor controls, feedback, and accessible labels are localized.

After the rainbow victory effect, choose **Next level**, replay, or another level. Built-ins advance in their numbered order; saved custom levels advance in library order. The final level of either list shows an end-of-list message without a next button. Editor playtests offer replay and level selection. Skipping to the last level does not claim that all ten are completed.

## Learning the strict sequence

The first three levels have a safe floor and no spikes. Level 1 presents all six colors in order. Level 2 puts orange overhead on the jump toward a plain stone, while yellow is farther ahead; touching orange from below or the side counts. Level 3 puts orange on a return path reached through a plain stone, so following only the forward direction reaches yellow too soon. Wrong contacts name the touched and expected colors, clear the progress display, and let players recover on the ground. Level 4 combines the sequence with spikes. Levels 7 and 8 have adjusted geometry for the new contact rules. The next-color arrow and gray outlined progress slot remain available throughout.

Custom levels automatically use the same collision/sequence rules. Existing data remains loadable; routes that revisit earlier colors may require editing. Local completion records are retained. Automated routes prove solvability, not that every player will learn the rule; teaching effectiveness still needs playtesting.

## Musical feedback

The active game uses the original synthesized sound chosen after the listening comparison: a sine fundamental plus a quiet octave overtone, an 8 ms attack, and an exponential decay. Ordinary notes last 0.3 seconds; the victory note lasts 0.85 seconds. C4 starts/resets a run; red through purple play D4/E4/F4/G4/A4/B4; the flag plays C5. Safe repeat touches stay silent.

Playback waits for the first click/key to unlock audio. The top-right control remembers mute, cancels pending/playing sound when muted, and offers retry if activation fails. Editor entry clears pending gameplay sound. No audio failure blocks the game. `node test-audio.js` checks pitch mapping, activation, cancellation and game events.

The synthesized MP3 comparison remains in audio-previews/synthesized-original.mp3. Downloaded piano samples and their credits remain in assets/audio for reference, but are not loaded or played by the game.
