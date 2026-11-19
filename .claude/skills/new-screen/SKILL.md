---
name: new-screen
description: How to add a screen/route to the DARDANIC Expo Router app with theme tokens, i18n and loading/empty/error states. Use when creating or restructuring any screen, page, tab or route.
---

# New screen

1. **Route file** in `apps/mobile/app/` following Expo Router conventions (`(tabs)/feed.tsx`, `post/[id].tsx`, `_layout.tsx` for stacks/tabs). Keep the route file thin: read params, call hooks, render feature components.
2. **Data** comes from a TanStack Query hook in `apps/mobile/hooks/`. Never call Supabase directly from a screen.
3. **Always handle 4 states:** loading (`Skeleton` blocks shaped like the real content, never a blank screen or a full-screen spinner), error (message + retry button), empty (friendly message + action if relevant), success. Non-bundled images use `LoadingImage`.
4. **Styling:** only tokens from `apps/mobile/theme` (colours, spacing, radius, sizes, typography). Headings via the `Heading` component (Unbounded font).
5. **Text:** every string from `strings` (`apps/mobile/i18n`); add new text to `i18n/en.ts`. Screen titles too.
6. **Register the route** in `app/_layout.tsx` if it needs header options (e.g. back bar).
7. **Accessibility:** `accessibilityLabel` on icon-only buttons; respect safe areas.
8. Put any piece over ~40 lines into `components/<feature>/`.
- **Theme:** styles that use colours go through `makeStyles((colors) => StyleSheet.create({...}))` + `const styles = useStyles()`; inline colours via `useColors()`. Check the screen in both Light and Dark (Settings → Theme).
