---
name: new-feature
description: The workflow for building any DARDANIC feature end to end (plan → database → hooks → UI → test → commit → progress). Use whenever the user asks to build, add or implement a feature.
---

# New feature workflow

1. **Plan (stop and wait).** Write a short plan: goal, tables/columns, hooks, screens/components, new text in `i18n/en.ts`, any new dependency (with why). Wait for the user's OK before writing code.
2. **Database.** If data changes, use the `new-migration` skill (RLS in the same migration, seed, regenerate types).
3. **Data hooks.** In `apps/mobile/hooks/`, one file per hook: `useThing` (useQuery) and `useThingMutation` (useMutation). Use typed query keys and invalidate them on mutation success.
4. **UI.** Use the `new-screen` and `new-component` skills.
5. **Test.** Run on the iOS Simulator (`pnpm --filter mobile ios`). Check loading, empty, error and success states.
6. **Check + commit.** Run the `pre-commit-check` skill, then ask the user before committing (`feat: …`).
7. **Progress.** Add a line to `docs/PROGRESS.md`. Record any tech decision in `docs/DECISIONS.md`.

Explain each step in plain language as you go.
