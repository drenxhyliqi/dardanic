---
name: pre-commit-check
description: Checks to run before every DARDANIC git commit — typecheck, lint, hardcoded colours/strings, secrets, console.logs. Use before committing or when the user asks to check the code.
---

# Pre-commit check

Run on the changed files (`git diff --cached --name-only` / `git status`). Fix what fails, then report a short pass/fail list.

1. `pnpm typecheck` — must pass.
2. `pnpm lint` — must pass.
3. **Hardcoded colours:** grep changed `.ts/.tsx` (outside `packages/shared/theme`) for `#[0-9a-fA-F]{3,8}`, `rgb(`, `rgba(`, named colours like `'white'`/`'black'`.
4. **Hardcoded text:** look for literal strings inside `<Text>` or in `title=`/`placeholder=`/`accessibilityLabel=` props. They must use `t()`. New keys must exist in both `sq.json` and `en.json`.
5. **Secrets:** no keys/tokens/passwords in the diff; `.env` not staged; new env vars added to `.env.example`.
6. **Debug leftovers:** no `console.log`, `debugger`, or stray `TODO` without a note.
7. **Migrations:** any new table has RLS enabled and policies in the same file.

Then commit with a clear conventional message (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
