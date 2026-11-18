---
name: new-screen
description: How to add a screen/route to the DARDANIC Expo Router app with theme tokens, i18n and loading/empty/error states. Use when creating or restructuring any screen, page, tab or route.
---

# New screen

1. **Route file** in `apps/mobile/app/` following Expo Router conventions (`(tabs)/feed.tsx`, `post/[id].tsx`, `_layout.tsx` for stacks/tabs). Keep the route file thin: read params, call hooks, render feature components.
2. **Data** comes from a TanStack Query hook in `apps/mobile/hooks/`. Never call Supabase directly from a screen.
3. **Always handle 4 states:** loading (skeleton or spinner), error (message + retry button), empty (friendly message + action if relevant), success.
4. **Styling:** only tokens from `packages/shared/theme` (colours, spacing, typography, radius). Support light and dark.
5. **Text:** every string via `t('screen.key')`. Add keys to both `packages/shared/i18n/sq.json` and `en.json`. Screen title too.
6. **Accessibility:** `accessibilityLabel` on icon-only buttons; respect safe areas.
7. Put any piece over ~40 lines into `components/<feature>/`.
