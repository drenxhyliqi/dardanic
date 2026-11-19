import {
  Unbounded_600SemiBold,
  Unbounded_700Bold,
} from '@expo-google-fonts/unbounded';

// Font files loaded when the app starts (see app/_layout.tsx).
export const fontFiles = {
  Unbounded_600SemiBold,
  Unbounded_700Bold,
};

// Font names for styles. Headings use Unbounded (wide and geometric, like the logo).
// Body text uses the phone's system font, so it has no entry here.
export const fonts = {
  heading: 'Unbounded_700Bold',
  headingSemi: 'Unbounded_600SemiBold',
} as const;
