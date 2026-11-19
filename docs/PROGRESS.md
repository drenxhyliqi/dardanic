# Progress

**Current status:** Onboarding UI done (launch → welcome → sign-up options / login → plan choice → tabs). No backend yet; all auth buttons are UI-only.

## Done this session (2026-11-19)
- Expo SDK 58 app in `apps/mobile` (pnpm workspace), runs in the iOS Simulator via Expo Go.
- Launch screen: native splash (dark + D logo) → in-app loading line → fade into welcome.
- Welcome: car photo with fade, wordmark, tagline, Create account / I already have an account, legal links.
- Create account step: CREATE YOUR ACCOUNT heading, Apple / Google / email buttons, "Already have an account? Log in", longer legal line (Terms, License Agreement, Privacy).
- Login (username, password with show/hide, Forgot password?) and Forgot password (email) pages.
- Plan choice after sign-up: Account created pill, WELCOME TO DARDANIC, Standard (preselected, badge, flag pattern, focus animation) / Professional, "Continue as …".
- Placeholder pages: Terms, Privacy, License. Tabs (Home / Explore / Profile) still placeholders.
- Design system: theme tokens, Unbounded headings, Button / Heading / TextField / TextLink, all text in `i18n/en.ts`.

## Next steps
1. Design the main tabs (Home feed, Explore, Profile) with real icons in the tab bar.
2. Set up Supabase (local) + auth; connect email sign-up, login and forgot password.
3. Apple / Google sign-in; RevenueCat for the Professional plan.
4. Add ESLint and a lint script.
5. Replace the welcome photo with a sharper portrait car photo (and check its licence); real app icon from the D mark.

## Open problems
- Expo Go shows its own white loader before our launch screen (dev only); a development build would show the real splash (may need CocoaPods).
- Original logo/photo files and the setup prompt (`PROGRESS.md`) sit untracked in the repo root.

## Files touched
- apps/mobile/** (app, components, theme, i18n, assets, app.json, package.json), pnpm-workspace.yaml, pnpm-lock.yaml, CLAUDE.md, .claude/skills/*, docs/*

## History
- Step 0 — project rules and skills set up.
- Step 1 — Expo app, launch, welcome, auth screens, plan choice (this session).
