# DARDANIC

DARDANIC is a social app for car enthusiasts in Kosovo and the Albanian diaspora: digital garages, crews, meets/events, event photos, trusted automotive businesses.
React Native + Expo app, Supabase backend (not connected yet). App language: English. Light and dark theme (Settings → Theme: Light / Dark / Automatic).

## Stack
- **Now:** Expo SDK 58 + Expo Router, TypeScript (strict), pnpm workspaces, `@expo/vector-icons`, `expo-font` (Unbounded headings), `expo-splash-screen`, `expo-image-picker`, `@react-native-async-storage/async-storage` (saved settings).
- **Next:** Supabase (Postgres, Auth, Storage, Edge Functions), TanStack Query.
- **Later:** Cloudflare Images/Stream, Expo Notifications, RevenueCat, Next.js web, PostHog, Sentry.

## Structure
```
apps/mobile/
  app/                    Expo Router routes (keep thin): index = welcome, login, forgot-password,
                          choose-plan, profile-setup, vibes, intro, ready,
                          terms/privacy/license, (tabs)/,
                          _layout = launch + stack
  components/ui/          shared primitives: Button, Heading, TextField, TextLink, Chip,
                          Skeleton, LoadingImage
  components/<feature>/   welcome/, auth/, plan/, launch/, setup/, profile/, vibes/,
                          intro/, ready/, feed/, tabs/
  theme/                  colors (dark + light palettes), ThemeProvider (useColors, makeStyles,
                          useTheme), spacing/radius/sizes, typography, fonts
  i18n/                   en.ts (all text) + index.ts (exports `strings`)
  assets/brand|images/    logos, welcome photo, flag pattern (@3x)
  data/  utils/           static lists (Kosovo cities, vibes, intro samples), small helpers (text)
  context/                OnboardingContext (what the user entered during sign-up)
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
- **Colours come from the active theme.** Never import a palette directly. In components use `makeStyles((colors) => StyleSheet.create({...}))` and call the hook (`const styles = useStyles()`), or `useColors()` for inline colours. Both palettes live in `theme/colors.ts`; any new colour needs a dark and a light value. Single-colour logos get `tintColor={colors.text}`.
- **Solid colours only.** No glows or decorative gradients. Exceptions: fading a photo (or the intro card carousel) into the background so text stays readable, the checkered-flag fade on the Standard plan card (`assets/images/flag-fade@3x.png`), and the blue → purple story ring around a profile picture (`storyRing`).
- **Accent colours:** blue (`primary`) = actions and confirmations (e.g. "Account created"). Red = likes, badges, LIVE only (no token yet). Never red buttons.
- **Fonts:** headings use Unbounded (`typography.heading/title/cardTitle`); everything else the system font.
- **No hardcoded user-facing text.** Add it to `apps/mobile/i18n/en.ts` and read it via `strings` from `apps/mobile/i18n`.
- **Local images:** give `<Image>` an explicit width and height (or a sized container); name high-res images `@3x`.
- **Loading = skeletons.** Anything that takes time to appear (data from the server, picked or remote images, lists, profiles) shows `Skeleton` blocks shaped like the real content until it's ready, never a blank screen. Non-bundled images use `LoadingImage`. Spinners only for button actions.
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
