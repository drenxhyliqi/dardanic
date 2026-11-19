import { fonts } from './fonts';

// Text sizes and weights. Use these instead of raw font values.
// Headings: Unbounded. Everything else: the phone's system font
// (San Francisco on iPhone, Roboto on Android), like Instagram and Facebook.
export const typography = {
  display: { fontFamily: fonts.heading, fontSize: 28, letterSpacing: 2 },
  heading: { fontFamily: fonts.heading, fontSize: 26, lineHeight: 34 },
  title: { fontFamily: fonts.heading, fontSize: 22, lineHeight: 30 },
  cardTitle: { fontFamily: fonts.headingSemi, fontSize: 15, letterSpacing: 0.4 },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  paragraph: { fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: -0.1 },
  input: { fontSize: 16, fontWeight: '400' },
  label: { fontSize: 13, fontWeight: '600' },
  link: { fontSize: 14, fontWeight: '600' },
  button: { fontSize: 17, fontWeight: '600', letterSpacing: -0.2 },
  buttonStrong: { fontWeight: '700' },
  badge: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8 },
  small: { fontSize: 12, lineHeight: 18, fontWeight: '400' },
} as const;
