// Spacing, corner-radius and size steps. Use these instead of raw numbers.
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

// Small corners, matching the slightly rounded edges of the logo letters.
export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  full: 999, // circles (radio dots, badges)
} as const;

export const sizes = {
  button: 60,
  input: 56,
  radio: 22,
  badgeCheck: 20,
  flagPattern: 240,
  logoMarkSmall: 64,
  splashMark: 120, // must match imageWidth of expo-splash-screen in app.json
  loadingTrack: 72,
  loadingLine: 2,
  icon: 20,
  logoWordmark: 290,
} as const;
