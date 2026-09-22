# RainbowPlatformer

A dependency-free HTML canvas platform game and level editor. Open `index.html` directly in a browser, or serve this folder with `python3 -m http.server 5173` and visit http://localhost:5173.

## Play

- Move: A / D or left / right arrows. Jump: Space, W, or up arrow.
- Land on the tops of colored blocks in order: red, orange, yellow, green, blue, purple. A later color resets the sequence. Revisited completed colors are safe.
- Plain platforms preserve progress. Spikes and falling out of the world restart the run.
- Collect all six and touch the flag to win. R restarts; P pauses. Touch controls are available on narrow screens and touch devices.

## Editor

Choose a piece and click the grid to place it. Placing a color piece relocates that color so it stays unique. Select an existing piece, then click its destination to move it. Erase removes platforms and spikes; start and flag can be moved. With the canvas focused, arrows move the editing cursor and Enter places the current piece. Delete erases; Escape cancels selection.

Undo and redo cover all level changes, including clearing, restoring, and importing. Drafts save in this browser's local storage. Export/import JSON to move a complete level between devices. Test level applies the same physics and rules. The validator checks structure and all six colors; it does not prove a custom level is solvable. Start with the starter layout to learn the jump distances.

## Verification

`node test.js` simulates a complete starter playthrough and checks ordering, plain platforms, repeat landings, death, falling, flag locking, and malformed level validation. `node --check app.js` checks script syntax. No packages or build step required.

Existing level files and drafts remain compatible: internal IDs 1–6 now represent red, orange, yellow, green, blue, and purple. Collected blocks retain their original colors and gain a check mark.

## Level library

Choose level opens all ten built-in trails immediately; no unlocks are required. They progress through wide meadow platforms, stairs, hurdles, alternating heights, islands, narrow peaks, intermediate stones, uphill switchbacks, tiny sky ledges, and the final summit. Completed levels receive a check mark.

In the editor, enter a name and use **Save as extra level** to add a separate playable level. Select that level from **Your extra levels** to play. Edit it and choose **Save changes** to update the saved level, or **Save as extra level** to make another copy. Built-ins are never overwritten. **Open editor draft** restores your latest working layout, including drafts made before the level library was added. Levels and completion badges stay in this browser on this device; JSON export remains available for backups and transfers. Custom reachability remains up to the designer.

Uncollected progress slots are gray, including the next required color; collected slots gain their color and a check. Winning triggers three waves of rainbow confetti and expanding colored rings at the flag, then offers replay or any other level. Reduced-motion users see a static rainbow halo instead.

Additional checks: `node test-levels.js` simulates every built-in route and tests library persistence, update behavior, storage failure, and effect drawing. `node test-app.js` exercises app-level selection, completion, effects, restart, save/update, and reload with a lightweight DOM harness. `tests/victory-preview.html` is an isolated visual effect test page.
