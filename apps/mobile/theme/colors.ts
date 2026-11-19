// All app colours live here. Screens import these instead of typing colour values.
// Design rule: solid colours only, no glows.
export const colors = {
  background: '#080B12',
  surface: '#121826',
  surfaceBorder: '#232B3B',
  borderFocus: '#4A5468',
  text: '#F7F4ED',
  textMuted: '#A9ADB6',
  primary: '#2F6BFF', // blue: actions and confirmations
  primarySoft: '#13224A', // dark blue background behind blue text/icons
  primaryLight: '#8FB0FF', // light blue text on primarySoft
  white: '#FFFFFF',
  black: '#000000',
} as const;

// Fades a photo into the background colour so text on top stays readable
// (slightly darker at the very top too, for the status bar and logo).
export const imageFade =
  'linear-gradient(to bottom, rgba(8, 11, 18, 0.55) 0%, rgba(8, 11, 18, 0) 22%, rgba(8, 11, 18, 0.15) 40%, rgba(8, 11, 18, 0.85) 75%, rgba(8, 11, 18, 1) 100%)';
