# DARDANIC

DARDANIC is a social app for car enthusiasts in Kosovo and the Albanian diaspora: digital garages, crews, meets/events, event photos, trusted automotive businesses.
React Native + Expo app, Supabase backend (not connected yet). App language: English. Dark theme only.

## Stack
- **Now:** Expo SDK 58 + Expo Router, TypeScript (strict), pnpm workspaces, `@expo/vector-icons`, `expo-font` (Unbounded headings), `expo-splash-screen`.
- **Next:** Supabase (Postgres, Auth, Storage, Edge Functions), TanStack Query.
- **Later:** Cloudflare Images/Stream, Expo Notifications, RevenueCat, Next.js web, PostHog, Sentry.

## Structure
```
apps/mobile/
  app/                    Expo Router routes (keep thin): index = welcome, login, forgot-password,
                          choose-plan, terms/privacy/license, (tabs)/, _layout = launch + stack
  components/ui/          shared primitives: Button, Heading, TextField, TextLink
  components/<feature>/   welcome/, auth/, plan/, launch/
  theme/                  colors, spacing/radius/sizes, typography, fonts (index re-exports)
  i18n/                   en.ts (all text) + index.ts (exports `strings`)
  assets/brand|images/    logos, welcome photo, flag pattern (@3x)
docs/                     PROGRESS.md, DECISIONS.md
```
Planned when needed: `apps/mobile/hooks/` (TanStack Query), `apps/mobile/lib/` (Supabase client), `supabase/`, `packages/shared/` (when the web app arrives).

## Commands (from the repo root)
| Task | Command |
|---|---|
| Install | `pnpm install` |
| Start app in iOS Simulator | `pnpm --filter mobile ios` |
| Typecheck | `pnpm --filter mobile typecheck` |
| Add an Expo package | `cd apps/mobile && pnpm exec expo install <pkg>` |

Not set up yet: lint (ESLint), tests, Supabase. Add them here when they are.

## Rules
- **Session start:** read `docs/PROGRESS.md` first. Don't scan the whole repo unless needed.
- **Session end** (or when I say "wrap up"): run the `session-handoff` skill.
- **No hardcoded colours, spacing or fonts.** Use tokens from `apps/mobile/theme`.
- **Solid colours only.** No glows or decorative gradients. Exceptions: fading a photo into the background so text stays readable, and the checkered-flag fade on the Standard plan card (`assets/images/flag-fade@3x.png`).
- **Accent colours:** blue (`primary`) = actions and confirmations (e.g. "Account created"). Red = likes, badges, LIVE only (no token yet). Never red buttons.
- **Fonts:** headings use Unbounded (`typography.heading/title/cardTitle`); everything else the system font.
- **No hardcoded user-facing text.** Add it to `apps/mobile/i18n/en.ts` and read it via `strings` from `apps/mobile/i18n`.
- **Local images:** give `<Image>` an explicit width and height (or a sized container); name high-res images `@3x`.
- **Every Supabase table gets RLS policies in the same migration** that creates it.
- **Never commit secrets.** Use `.env`; keep `.env.example` updated with every new variable.
- **Ask before adding any new dependency**, and explain why it's needed.
- **Small files, one responsibility each.** Split anything that grows past ~150 lines.
- **After each working step:** run typecheck, then **ask before committing** (never commit without the user's OK).
- **Commits:** no `Co-Authored-By` or other AI attribution lines. Split larger work into several logical commits.
- **Explain decisions in plain language.** The user is learning.
- **Record important tech decisions** in `docs/DECISIONS.md` (date, decision, why).

## Skills (.claude/skills/)
`new-feature` (start here for any feature) · `new-screen` · `new-component` · `new-migration` · `pre-commit-check` · `session-handoff`

# Compact instructions
When compacting, preserve: the current task and its step, decisions made (and why), files changed, open problems or failing checks, and anything the user asked to wait on.
