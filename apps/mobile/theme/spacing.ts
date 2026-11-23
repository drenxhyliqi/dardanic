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
  searchBar: 44, // rounded search fields
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
  pullRefresh: 90, // how far to pull down before letting go refreshes (like iOS apps)
  spinner: 26, // the reload circle shown while pulling / refreshing
  spinnerLine: 2.5,
  tabIndicator: 1.5, // line under the active profile tab
  emptyIcon: 72, // outlined circle on an empty profile tab
  emptyIconGlyph: 32,
  gridGap: 2, // hairline gap between grid tiles
  introStepActive: 24, // width of the active step bar on the intro
  introStep: 8,
  storyAvatar: 64, // feed stories row
  storyLabel: 72, // width of the name under a story
  storyAddBadge: 20, // blue + on "Your story"
  postAvatar: 36, // avatar in a post header
  actionIcon: 26, // like / comment / share / save
  mediaDot: 6, // photo position dots under a post
  flameBurst: 96, // flame that pops on double-tap
  dateTile: 58, // calendar tile on a meet's photo
  meetFace: 30, // attendee faces on a meet card
  spotsBar: 6, // how full a meet is
  inboxAvatar: 52,
  chatAvatar: 28,
  chatPhoto: 220, // width of a photo in a chat (height is 4:5)
  sendButton: 34,
  typingDot: 6,
  unreadBadge: 20,
  plateField: 64, // the big plate-shaped search field
  plateFieldStrip: 34, // its blue country strip
  plateBorder: 2,
  codeBadge: 22, // height of a country code badge (mini plate strip)
  codeBadgeWidth: 38, // fixed, so names line up whatever the code length
  heroIcon: 56, // round icon at the top of a feature page
  colorSwatch: 34,
  searchAvatar: 48,
  suggestionCard: 156, // width of a 'Suggested for you' card
  suggestionAvatar: 72,
  grabber: 36, // handle on top of a bottom sheet
  grabberHeight: 5,
  commentAvatar: 32,
  replyAvatar: 24,
  threadLine: 1.5, // line linking nested replies to their comment
  commentFlame: 16, // small flame on a comment
  composerMax: 100, // the comment field grows up to this height
  storyProgress: 2.5, // height of the bars at the top of a story
  storyReply: 44, // height of the reply field on a story
} as const;
