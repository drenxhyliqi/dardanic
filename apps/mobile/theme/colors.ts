// All app colours live here, as two palettes: dark (the original look) and light (warm
// white). Components never import these directly; they read the active one with
// useColors() / makeStyles() from ./ThemeProvider, so everything switches together.
// Design rule: solid colours only, no glows (exceptions listed in CLAUDE.md).

// Fades a photo into the background colour so text on top stays readable
// (slightly stronger at the very top too, for the status bar and logo).
const photoFade = (rgb: string) =>
  `linear-gradient(to bottom, rgba(${rgb}, 0.55) 0%, rgba(${rgb}, 0) 22%, ` +
  `rgba(${rgb}, 0.15) 40%, rgba(${rgb}, 0.85) 75%, rgba(${rgb}, 1) 100%)`;

// Fades a card's cover photo into the card colour at the bottom, so the title on it
// stays readable (meet cards).
const coverFade = (rgb: string) =>
  `linear-gradient(to bottom, rgba(${rgb}, 0) 35%, rgba(${rgb}, 0.75) 75%, rgba(${rgb}, 1) 100%)`;

// Fades something (e.g. the flag pattern) into the background towards its bottom edge.
const bottomFade = (rgb: string) =>
  `linear-gradient(to bottom, rgba(${rgb}, 0) 0%, rgba(${rgb}, 0.6) 55%, rgba(${rgb}, 1) 100%)`;

// Story viewer (always on black, in both themes): darkens the top and bottom of the
// photo so the white bars, name and reply field stay readable.
const storyFade =
  'linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.5) 15%, ' +
  'rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 68%, rgba(0, 0, 0, 0.35) 84%, ' +
  'rgba(0, 0, 0, 0.75) 100%)';

// The ring around a profile picture when the user has a story: blue → violet → purple.
const storyGradient = 'linear-gradient(135deg, #2F6BFF 0%, #6E5BFF 50%, #A855F7 100%)';

// Backgrounds people can put behind a story photo (part of the story itself, so the
// same in both themes). Solid colours only.
const storyBackgrounds = [
  '#000000', '#FFFFFF', '#2F6BFF', '#0B1530', '#6E5BFF', '#E8E3DA', '#1F7A4D', '#C9372C',
];

// Car paint colours (FindMe vehicles): the car's real colour, so the same in both themes.
const vehicleSwatches = {
  white: '#F4F4F2',
  black: '#111214',
  grey: '#6B6F76',
  silver: '#B9BDC3',
  blue: '#1F4FCC',
  red: '#C62828',
  yellow: '#F2C230',
  green: '#2E7D4F',
  orange: '#E8711C',
};

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
  alert: '#FF3B5C', // red: badges and LIVE only (never buttons)
  flame: '#FF4530', // red: a given flame (like), only there
  contrast: '#FFFFFF', // the strongest button (e.g. Apple): white on dark
  onContrast: '#000000', // text on `contrast`
  white: '#FFFFFF', // text on blue, licence plates
  black: '#000000', // licence plate characters
  imageFade: photoFade('8, 11, 18'),
  edgeFade: bottomFade('8, 11, 18'),
  cardFade: coverFade('18, 24, 38'), // into `surface`
  storyRing: storyGradient,
  storyFade,
  storyTrack: 'rgba(255, 255, 255, 0.35)', // empty part of the story progress bars
  storyMuted: 'rgba(255, 255, 255, 0.75)', // quieter white text on a story
  storyControl: 'rgba(0, 0, 0, 0.35)', // soft circle behind white buttons on a photo
  storyBackgrounds,
  vehicleSwatches,
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
  alert: '#E8243F',
  flame: '#E3301F',
  contrast: '#080B12', // black on light
  onContrast: '#FFFFFF',
  white: '#FFFFFF',
  black: '#000000',
  imageFade: photoFade('247, 244, 237'),
  edgeFade: bottomFade('247, 244, 237'),
  cardFade: coverFade('255, 255, 255'),
  storyRing: storyGradient,
  storyFade,
  storyTrack: 'rgba(255, 255, 255, 0.35)',
  storyMuted: 'rgba(255, 255, 255, 0.75)',
  storyControl: 'rgba(0, 0, 0, 0.35)',
  storyBackgrounds,
  vehicleSwatches,
};
