---
name: new-component
description: Where DARDANIC components live, how to name them, type their props and support dark/light mode. Use when creating or editing any React Native component.
---

# New component

- **Location:** generic, reusable primitives → `apps/mobile/components/ui/`. Feature-specific → `apps/mobile/components/<feature>/`. Search `components/ui/` first and reuse before creating.
- **Naming:** PascalCase file = component name (`PostCard.tsx`). One component per file. Named export, no default.
- **Props:** `type PostCardProps = { … }` exported above the component. No `any`. Callbacks named `onX`. Pass data down, not query clients.
- **Theme:** get colours/spacing/fonts from the theme hook (`packages/shared/theme`). No hex values, raw numbers for spacing, or font names in the file. Must look right in light and dark.
- **Accent rules:** `primary` (blue) for actions; `alert` (red) only for likes, badges, LIVE. Never a red button.
- **Text:** no literal strings; take translated text via props or `t()`.
- **Size:** keep under ~150 lines; split sub-parts into their own files.
- **Pure UI:** components don't fetch data. Data lives in hooks; screens connect the two.
