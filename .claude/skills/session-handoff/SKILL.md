---
name: session-handoff
description: Update docs/PROGRESS.md at the end of a DARDANIC session so the next session can pick up instantly. Use when the user says "wrap up", "handoff", "end session", or work is finishing.
---

# Session handoff

1. Read `docs/PROGRESS.md`.
2. Update it using this structure:
   - **Current status:** one line on where the project is.
   - **Done this session:** short bullets (date at top).
   - **Next steps:** ordered, concrete, the first one ready to start.
   - **Open problems:** bugs, failing checks, questions waiting on the user.
   - **Files touched:** paths only.
   - **History:** one line per older session/step.
3. **Keep the file under 60 lines.** Fold older "Done" sections into one-line History entries; drop details already in git or DECISIONS.md.
4. If a tech decision was made, make sure it's in `docs/DECISIONS.md`.
5. Commit: `docs: session handoff`.
6. Tell the user in 2–3 lines what's done and what's next.
