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
  headerWordmark: 160, // full logo in the middle of the feed top bar
  feedMenu: 200, // width of the feed filter dropdown
  headerIcon: 24,
  headerButton: 40,
  tabIcon: 26,
  tabBar: 64, // height of the floating bottom bar
  tabBarInset: 5, // space between the bar's edge and the active-tab circle
  progressLine: 4,
  chipIcon: 14,
  cityList: 240,
  bioField: 104,
  avatar: 80,
  avatarBorder: 4,
  avatarBadge: 26,
  vibeSlot: 36, // height of vibe chips and slots
  vibeSlotEmpty: 56, // width of an empty slot
  introCard: 128, // short card in the intro carousel
  introCardTall: 176, // tall card in the intro carousel
  introAvatar: 36,
  introDot: 18, // attendee dots on a meet card
  plate: 22, // licence plate height
  plateStrip: 8, // blue strip on the left of a plate
  profileAvatar: 96,
  accentRing: 2, // blue ring around the profile picture
  storyRing: 3, // gradient ring when the user has a story
  pullRefresh: 140, // how far to pull down before letting go refreshes (a long pull)
  spinner: 26, // the reload circle shown while pulling / refreshing
  spinnerLine: 2.5,
  tabIndicator: 1.5, // line under the active profile tab
  emptyIcon: 72, // outlined circle on an empty profile tab
  emptyIconGlyph: 32,
  gridGap: 2, // hairline gap between grid tiles
  introStepActive: 24, // width of the active step bar on the intro
  introStep: 8,
} as const;
