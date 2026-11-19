// All app colours live here, as two palettes: dark (the original look) and light (warm
// white). Components never import these directly; they read the active one with
// useColors() / makeStyles() from ./ThemeProvider, so everything switches together.
// Design rule: solid colours only, no glows (exceptions listed in CLAUDE.md).

// Fades a photo into the background colour so text on top stays readable
// (slightly stronger at the very top too, for the status bar and logo).
const photoFade = (rgb: string) =>
  `linear-gradient(to bottom, rgba(${rgb}, 0.55) 0%, rgba(${rgb}, 0) 22%, ` +
  `rgba(${rgb}, 0.15) 40%, rgba(${rgb}, 0.85) 75%, rgba(${rgb}, 1) 100%)`;

// Fades something (e.g. the flag pattern) into the background towards its bottom edge.
const bottomFade = (rgb: string) =>
  `linear-gradient(to bottom, rgba(${rgb}, 0) 0%, rgba(${rgb}, 0.6) 55%, rgba(${rgb}, 1) 100%)`;

// The ring around a profile picture when the user has a story: blue → violet → purple.
const storyGradient = 'linear-gradient(135deg, #2F6BFF 0%, #6E5BFF 50%, #A855F7 100%)';

export const darkColors = {
  background: '#080B12',
  surface: '#121826',
  surfaceBorder: '#232B3B',
  borderFocus: '#4A5468',
  skeleton: '#2E3749', // loading placeholders (a step lighter than borders)
  text: '#F7F4ED',
  textMuted: '#A9ADB6',
  primary: '#2F6BFF', // blue: actions and confirmations
  primarySoft: '#13224A', // soft blue background behind blue text/icons
  primaryLight: '#8FB0FF', // blue text on primarySoft
  contrast: '#FFFFFF', // the strongest button (e.g. Apple): white on dark
  onContrast: '#000000', // text on `contrast`
  white: '#FFFFFF', // text on blue, licence plates
  black: '#000000', // licence plate characters
  imageFade: photoFade('8, 11, 18'),
  edgeFade: bottomFade('8, 11, 18'),
  storyRing: storyGradient,
};

export type Palette = typeof darkColors;

export const lightColors: Palette = {
  background: '#F7F4ED', // warm off-white
  surface: '#FFFFFF',
  surfaceBorder: '#E4E1D8',
  borderFocus: '#B7B3A8',
  skeleton: '#E9E6DD',
  text: '#080B12',
  textMuted: '#5E6470',
  primary: '#2F6BFF',
  primarySoft: '#E2EAFF',
  primaryLight: '#1F4FCC',
  contrast: '#080B12', // black on light
  onContrast: '#FFFFFF',
  white: '#FFFFFF',
  black: '#000000',
  imageFade: photoFade('247, 244, 237'),
  edgeFade: bottomFade('247, 244, 237'),
  storyRing: storyGradient,
};
