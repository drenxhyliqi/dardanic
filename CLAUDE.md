# DARDANIC

DARDANIC is a mobile-first social app (React Native + Expo) with a Supabase backend.
The app is fully bilingual: Albanian (sq) and English (en).

## Stack
- **Now:** Expo + Expo Router, TypeScript (strict), Supabase (Postgres, Auth, Storage, Edge Functions), TanStack Query, pnpm workspaces.
- **Later:** Cloudflare Images/Stream, Expo Notifications, RevenueCat, Next.js web, PostHog, Sentry.

## Structure
```
apps/mobile/          Expo app
  app/                Expo Router routes (screens only, keep thin)
  components/ui/      generic primitives (Button, Text, Card…)
  components/<feature>/  feature components
  hooks/              TanStack Query hooks (useX / useXMutation)
  lib/                supabase client, query client, helpers
packages/shared/
  theme/              colour, spacing, typography, radius tokens
  i18n/               sq.json, en.json
  types/              database.ts (generated) + shared types
supabase/
  migrations/  seed.sql  functions/
docs/                 PROGRESS.md, DECISIONS.md
```

## Commands
| Task | Command |
|---|---|
| Install | `pnpm install` |
| Start app | `pnpm --filter mobile start` (press `i` for iOS Simulator) |
| Test | `pnpm test` |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` |
| New migration | `supabase migration new <name>` |
| Apply migrations + seed (local) | `supabase db reset` |
| Regenerate DB types | `supabase gen types typescript --local > packages/shared/types/database.ts` |

(Scripts get wired up when the monorepo is scaffolded. Update this table if they change.)

## Rules
- **Session start:** read `docs/PROGRESS.md` first. Don't scan the whole repo unless needed.
- **Session end** (or when I say "wrap up"): run the `session-handoff` skill.
- **No hardcoded colours, spacing or fonts.** Always use tokens from `packages/shared/theme`.
- **Accent colours:** blue (`primary`) = actions only. Red (`alert`) = likes, badges, LIVE only. Never red buttons.
- **No hardcoded user-facing text.** Use i18n keys and add both `sq` and `en`.
- **Every Supabase table gets RLS policies in the same migration** that creates it.
- **Never commit secrets.** Use `.env`; keep `.env.example` updated with every new variable.
- **Ask before adding any new dependency**, and explain why it's needed.
- **Small files, one responsibility each.** Split anything that grows past ~150 lines.
- **After each working step:** run typecheck + lint, then commit with a clear message.
- **Explain decisions in plain language.** The user is learning.
- **Record important tech decisions** in `docs/DECISIONS.md` (date, decision, why).

## Skills (.claude/skills/)
`new-feature` (start here for any feature) · `new-screen` · `new-component` · `new-migration` · `pre-commit-check` · `session-handoff`

# Compact instructions
When compacting, preserve: the current task and its step, decisions made (and why), files changed, open problems or failing checks, and anything the user asked to wait on.
