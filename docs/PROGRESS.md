# Progress

**Current status:** Full sign-up flow and the main app shell are built as UI (no backend): launch → welcome → sign-up / login → plan → profile setup → vibes → intro → account ready → Feed. Light + dark theme. Profile page designed. Feed, Map, Marketplace, Messages and Create are still placeholders.

## Done (2026-11-19)
- Step 1: Expo SDK 58 app, launch screen, welcome, sign-up options, login, forgot password, plan choice, legal placeholders.
- Profile setup after Standard (3 steps with a live profile preview): identity (username + ideas, display name), place (Kosovo city search, bio + suggestions), images (photo + banner via `expo-image-picker`).
- Vibes: pick exactly 5 from 146 (filters Popular/Brands/Style/Mods/Meets, search, 5 slots).
- Intro: 3 steps with tilted, endlessly moving card carousels (people / near you / builds), Skip, Next 1/3.
- Account ready: full logo + welcome text, zooms into the Feed's top-bar logo; greets by first name (onboarding data kept in `context/OnboardingContext.tsx`).
- Main app: floating capsule tab bar with sliding highlight (Feed · Map · Marketplace · Messages · Profile); Feed top bar (+ → Create modal, logo with For you / Following / Crews dropdown, search, bell).
- Profile (sample data): clean-cut banner, avatar with blue accent ring or blue→purple story ring, followers | following, stats (Posts/Builds/Crews), Edit/Share, icon tabs Posts · Gallery · Builds (Instagram-style grid), pull-to-refresh circle.
- Light/dark theme: Settings → Theme (Light / Dark / Automatic), saved with AsyncStorage; all components read colours via `makeStyles` / `useColors`.
- Skeletons + `LoadingImage` for anything slow to load.

## Next steps
1. Test on device: Add photo/banner opens on the first tap; pull-to-refresh feel; theme choice survives a restart.
2. Design the Feed (posts), Create menu (post / build / meet / crew), Map, Marketplace and Messages.
3. Set up Supabase (local) + auth; save the onboarding data (profile, vibes) and connect login / sign-up.
4. Apple / Google sign-in; RevenueCat for the Professional plan.
5. Add ESLint and a lint script.
6. Sharper welcome photo (check licence); real app icon from the D mark.
7. Open question for the user: swipe between tabs (needs `react-native-pager-view`)?

## Planned features
- **Plate search ("Spotted a car? Find the build") — MUST BUILD, core feature (decided by the user, not optional).** Users can add their licence plate so people who saw the car (in traffic, at a meet) can search it and find their profile. Needs the backend + messaging first. Rules agreed (2026-11-19):
  - Optional: a simple on/off switch in settings (off by default). People who don't want to be found just don't turn it on (or don't join).
  - **Proof of ownership before the plate goes live** (photo of the registration, checked), so nobody can register someone else's plate and pretend to be them.
  - A search shows a small card only (username, car, "Send message request"); no city, location or other photos. The plate itself is never shown on the profile.
  - Contact goes through **message requests** the owner accepts, ignores or blocks; **block and report** everywhere (also required by the App Store).
  - Search limit per day (e.g. 10) so nobody can scan plates one by one; 18+ only.
  - Position it as a car feature, not "meet people from traffic".

## Open problems
- Expo Go shows its own white loader before our launch screen (dev only); a development build would show the real splash (may need CocoaPods).
- The native splash follows the phone's light/dark setting, not the in-app theme choice.
- Pull-to-refresh only triggers on iOS (Android doesn't overscroll); add Android's RefreshControl later.
- Original logo/photo files and the setup prompt (`PROGRESS.md`) sit untracked in the repo root.

## Files touched
- apps/mobile/** (app, components, theme, i18n, assets, app.json, package.json), pnpm-workspace.yaml, pnpm-lock.yaml, CLAUDE.md, .claude/skills/*, docs/*

## History
- Step 0 — project rules and skills set up.
- Step 1 — Expo app, launch, welcome, auth screens, plan choice.
- Step 2 — profile setup, vibes, intro, account ready, main tabs, profile, light/dark theme.
