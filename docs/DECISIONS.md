# Decisions

Format: **date — decision.** Why.

- **2026-11-19 — Expo + Expo Router for the mobile app.** One TypeScript codebase for iOS and Android; file-based routing keeps screens easy to find.
- **2026-11-19 — TypeScript strict mode.** Catches mistakes before they run, which matters while learning.
- **2026-11-19 — Supabase (Postgres, Auth, Storage, Edge Functions).** One hosted backend covering the database, login, file storage and server code. Row Level Security keeps data safe at the database level.
- **2026-11-19 — TanStack Query for server data.** Handles caching, loading/error states and refetching, so screens stay simple.
- **2026-11-19 — pnpm workspaces monorepo.** The mobile app (and later the web app) share theme, i18n and types from `packages/shared`.
- **2026-11-19 — Shared code = theme, i18n, types only.** React Native UI components stay in `apps/mobile/components`, because they can't be reused directly by a Next.js web app.
- **2026-11-19 — ~~Bilingual from day one (sq + en).~~ Replaced: the app is English-only for now** (user decision; Albanian didn't fit). Text still lives in one file (`i18n/en.ts`), so adding a language later stays easy. The unused Albanian file was removed.
- **2026-11-19 — Deferred: Cloudflare Images/Stream, Expo Notifications, RevenueCat, Next.js web, PostHog, Sentry.** Added when the features that need them are built.
- **2026-11-19 — Expo SDK 58, app in `apps/mobile`, set up by hand from Expo's blank TypeScript template.** Only the packages we asked for; the default template adds many extras.
- **2026-11-19 — Theme and text live in `apps/mobile/theme` and `apps/mobile/i18n` for now.** No i18n library yet; move them to `packages/shared` when the web app or English arrives.
- **2026-11-19 — `@expo/vector-icons` for icons.** Expo's official icon pack: Apple/Google logos now, tab bar later.
- **2026-11-19 — Solid colours only, no glows.** User's design direction. Photos may fade into the background (React Native's built-in `backgroundImage: linear-gradient`, no library) for readable text.
- **2026-11-19 — System font (San Francisco on iPhone, Roboto on Android).** It's what Instagram and Facebook use for body text; no font files to load.
- **2026-11-19 — Intro animation uses React Native's built-in `Animated`.** Simple enough that Reanimated isn't needed yet.
- **2026-11-19 — Unbounded for headings (`@expo-google-fonts/unbounded` + `expo-font`).** Wide, geometric and modern, matching the wordmark. Body text stays on the system font.
- **2026-11-19 — Blue also marks confirmations** (e.g. the "Account created" pill), at the user's request; replaces an earlier green `success` colour.
- **2026-11-19 — Plan choice right after sign-up: Standard (free) / Professional (paid, for businesses).** Until auth and payments exist, sign-up buttons skip straight to this step and both plans continue into the app.
- **2026-11-19 — `expo-splash-screen` for the launch screen.** Native splash = dark background + D logo (configured in `app.json`), held until our in-app launch animation (`components/launch/LaunchScreen.tsx`) draws the same picture, fills a thin line, and fades into the welcome screen. Expo Go shows its own loader first; only real builds show the native splash.
