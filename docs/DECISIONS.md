# Decisions

Format: **date — decision.** Why.

- **2026-11-19 — Expo + Expo Router for the mobile app.** One TypeScript codebase for iOS and Android; file-based routing keeps screens easy to find.
- **2026-11-19 — TypeScript strict mode.** Catches mistakes before they run, which matters while learning.
- **2026-11-19 — Supabase (Postgres, Auth, Storage, Edge Functions).** One hosted backend covering the database, login, file storage and server code. Row Level Security keeps data safe at the database level.
- **2026-11-19 — TanStack Query for server data.** Handles caching, loading/error states and refetching, so screens stay simple.
- **2026-11-19 — pnpm workspaces monorepo.** The mobile app (and later the web app) share theme, i18n and types from `packages/shared`.
- **2026-11-19 — Shared code = theme, i18n, types only.** React Native UI components stay in `apps/mobile/components`, because they can't be reused directly by a Next.js web app.
- **2026-11-19 — Bilingual from day one (sq + en).** Retrofitting translations later is much harder than adding keys as you go.
- **2026-11-19 — Deferred: Cloudflare Images/Stream, Expo Notifications, RevenueCat, Next.js web, PostHog, Sentry.** Added when the features that need them are built.
