import { router } from 'expo-router';
import { useCallback } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FEED_BAR_HEIGHT, FEED_LOGO_SHIFT } from '../components/feed/FeedHeader';
import { FadedFlag } from '../components/ready/FadedFlag';
import { useReadySequence } from '../components/ready/useReadySequence';
import { useOnboarding } from '../context/OnboardingContext';
import { strings } from '../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../theme';

const wordmark = require('../assets/brand/logo-wordmark.png');
const WORDMARK_RATIO = 1200 / 94;
const FLAG_RATIO = 720 / 300;
const LOGO_WIDTH = sizes.logoWordmark;
const LOGO_HEIGHT = LOGO_WIDTH / WORDMARK_RATIO;
const LOGO_Y = 0.4; // logo centre, as a share of the screen height

const t = strings.ready;

// "Your account is ready": the full logo in the middle with the welcome text under it. Then the text fades into the logo while the logo glides up and shrinks into exactly
// the spot of the logo in the feed's top bar, and the feed fades in around it.
export default function ReadyScreen() {
  const colors = useColors();
  const styles = useStyles();
  const { username, displayName } = useOnboarding();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const openFeed = useCallback(() => router.replace('/feed'), []);
  const { flag, lines, compact, pulse } = useReadySequence(openFeed);

  // Where the logo starts (middle of the screen) and where it lands (feed top bar).
  const start = { x: width / 2, y: height * LOGO_Y };
  const end = { x: width / 2 - FEED_LOGO_SHIFT, y: insets.top + FEED_BAR_HEIGHT / 2 };
  const endScale = sizes.headerWordmark / LOGO_WIDTH;

  // First name feels personal; fall back to the username.
  const name = displayName.split(/\s+/)[0] || username;
  const texts = [t.eyebrow, t.welcome(name), t.body];
  const textStyles = [styles.eyebrow, styles.title, styles.body];

  const flagHeight = width / FLAG_RATIO;
  const along = (to: number[]) => compact.interpolate({ inputRange: [0, 1], outputRange: to });

  const slideIn = (value: Animated.Value) => ({
    opacity: value,
    transform: [{ translateY: value.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
  });

  return (
    <View style={styles.screen}>
      {/* Everything except the logo: fades and shrinks into the logo at the end. */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transformOrigin: [start.x, start.y, 0],
            opacity: along([1, 0]),
            transform: [{ scale: along([1, 0.3]) }],
          },
        ]}
      >
        <FadedFlag width={width} height={flagHeight} opacity={flag} style={styles.flagTop} />
        <FadedFlag width={width} height={flagHeight} opacity={flag} style={styles.flagBottom} />

        <View style={[styles.text, { top: start.y + LOGO_HEIGHT / 2 + spacing.xxl }]}>
          {texts.map((text, i) => (
            <Animated.Text
              key={i}
              style={[textStyles[i], slideIn(lines[i])]}
              accessibilityRole={i === 1 ? 'header' : undefined}
            >
              {text}
            </Animated.Text>
          ))}
        </View>
      </Animated.View>

      {/* The logo: in the middle, then glides up into the feed's top bar. */}
      <Animated.Image
        source={wordmark}
        tintColor={colors.text}
        resizeMode="contain"
        accessibilityLabel="DARDANIC"
        style={[
          styles.logo,
          {
            left: start.x - LOGO_WIDTH / 2,
            top: start.y - LOGO_HEIGHT / 2,
            opacity: flag,
            transform: [
              { translateX: along([0, end.x - start.x]) },
              { translateY: along([0, end.y - start.y]) },
              { scale: along([1, endScale]) },
              { scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) },
            ],
          },
        ]}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    flagTop: {
      top: 0,
      right: 0,
    },
    // Same pattern turned around, so the bottom-left corner mirrors the top-right
    // (its fade then points up, into the middle of the screen).
    flagBottom: {
      bottom: 0,
      left: 0,
      transform: [{ rotate: '180deg' }],
    },
    text: {
      position: 'absolute',
      left: spacing.xl,
      right: spacing.xl,
      alignItems: 'center',
      gap: spacing.md,
    },
    eyebrow: {
      ...typography.badge,
      color: colors.primary,
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    title: {
      ...typography.heading,
      color: colors.text,
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    body: {
      ...typography.paragraph,
      color: colors.textMuted,
      textAlign: 'center',
    },
    logo: {
      position: 'absolute',
      width: LOGO_WIDTH,
      height: LOGO_HEIGHT,
    },
  }),
);
