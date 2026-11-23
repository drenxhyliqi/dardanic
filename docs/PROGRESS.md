# Progress

**Current status:** The whole app UI exists with sample data (no backend): sign-up, feed, stories (camera + editor), flames, comments, DMs, FindMe, search/explore, notifications, profiles/builds, meets, marketplace, Create sheet. Next: what Apple / Google require before store approval.

## Done (2026-11-23 → 24)
- Feed: photo + text posts, filters Your vibes / Near you / Meetings, scroll-collapsing bars on every tab, pull-to-refresh.
- Flames (replace likes), comments sheet with nested replies, post counts + shares.
- Stories: viewer with card-stack switch; camera (tap photo, hold video, library) with `expo-camera` + `expo-video`; editor (move/pinch/rotate, background, @tags, location); own story shows viewers + delete.
- Messages: inbox, chats, requests, shared posts/meets/listings, paperclip (library/camera) with preview, flame read receipts.
- FindMe plate search (22 countries, ownership check, requests); Search + Explore (hidden tab); Notifications.
- Profiles: public/private accounts, follow requests ("Awaiting"), ••• menu (message/share/about/block/report), suggestions, Posts / Text / Builds tabs, build detail page.
- Meets: minimal cards + detail page. Marketplace: car-only categories, sell flow with mock car check, listing page (photos full screen, related, find similar, hide), new-listings dot.
- Create sheet (Post / Build / Meeting / Crew) with placeholder pages. All demo content in Albanian; autocorrect off.

## Next steps
1. Store requirements: done as UI (delete account, report everywhere, blocked accounts, settings, sign-in with Apple/Google/email/phone codes, 16+ birthday + terms at sign-up, FindMe 18+, legal page drafts, Map hidden). Left for the backend: real deletion, moderation queue, notification settings.
2. Create flows: New post, New build, New meeting, New crew; crew pages; business profiles; edit profile.
3. Error / offline states on every screen; service layer (mock) for feed, comments, messages, stories, meets, profiles.
4. Data model + RLS plan, auth decision (email code / phone / Apple / Google) → Supabase.
5. ESLint (ask first). Android pass (pull-to-refresh).

## Open problems
- Before launch: fill in the company details in `apps/mobile/config/app.ts` (name, address, registration, support/privacy emails) and have a lawyer review `apps/mobile/i18n/legal/`.
- Simulator can't record video (handled with a message); test camera, recording and gestures on a phone.
- The user should confirm the privacy rule: posts visible to followers only; DMs need a mutual follow.
- Your story, sent messages, listings etc. live in memory only (reset on restart) until the backend.
- Expo Go white loader before our splash (dev only); native splash ignores the in-app theme.
- Untracked on purpose: root `PROGRESS.md` (setup prompt), logo/photo originals, `UIBUG.png` (delete when done).

## Files touched
- apps/mobile/** (app, components, context, services, hooks, data, theme, i18n, utils, assets, app.json, package.json), pnpm-lock.yaml, CLAUDE.md, docs/*

## History
- Step 0 — project rules and skills set up.
- Step 1 — Expo app, launch, welcome, auth screens, plan choice.
- Step 2 — profile setup, vibes, intro, account ready, main tabs, profile, light/dark theme.
- Step 3 (2026-11-23/24) — every main feature's UI with sample data (see Done).
