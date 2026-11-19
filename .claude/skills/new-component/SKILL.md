---
name: new-component
description: Where DARDANIC components live, how to name them, type their props and use theme tokens. Use when creating or editing any React Native component.
---

# New component

- **Location:** generic, reusable primitives → `apps/mobile/components/ui/`. Feature-specific → `apps/mobile/components/<feature>/`. Search `components/ui/` first and reuse before creating.
- **Naming:** PascalCase file = component name (`PostCard.tsx`). One component per file. Named export, no default.
- **Props:** `type PostCardProps = { … }` exported above the component. No `any`. Callbacks named `onX`. Pass data down, not query clients.
- **Theme:** import `colors`, `spacing`, `radius`, `sizes`, `typography` from `apps/mobile/theme`. No hex values, raw spacing numbers or font names in the file. The app is dark-only; solid colours only.
- **Accent rules:** `primary` (blue) for actions and confirmations; red only for likes, badges, LIVE. Never a red button.
- **Images:** local `<Image>` needs explicit width + height (or a sized container); high-res files named `@3x`.
- **Text:** no literal strings; take text via props or from `strings` (`apps/mobile/i18n`).
- **Size:** keep under ~150 lines; split sub-parts into their own files.
- **Pure UI:** components don't fetch data. Data lives in hooks; screens connect the two.
- **Theme:** styles that use colours go through `makeStyles((colors) => StyleSheet.create({...}))` + `const styles = useStyles()`; inline colours via `useColors()`. Check the screen in both Light and Dark (Settings → Theme).
