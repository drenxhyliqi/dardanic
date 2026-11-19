import { Animated, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Heading } from '../components/ui/Heading';
import { AuthActions } from '../components/welcome/AuthActions';
import { LegalNotice } from '../components/welcome/LegalNotice';
import { useIntroAnimation } from '../components/welcome/useIntroAnimation';
import { useModeSwitch } from '../components/welcome/useModeSwitch';
import { WelcomeImage } from '../components/welcome/WelcomeImage';
import { strings } from '../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../theme';

const logoWordmark = require('../assets/brand/logo-wordmark.png');

// Logo proportions (width / height), so it never stretches.
const WORDMARK_RATIO = 1200 / 94;

// The first screen people see: photo, logo, what DARDANIC is, and how to get in.
// Tapping "Create account" swaps the logo for a heading and shows the sign-up options.
export default function WelcomeScreen() {
  const colors = useColors();
  const styles = useStyles();
  const { imageStyle, logoStyle, contentStyle } = useIntroAnimation();
  const { mode, switchTo, fadeStyle } = useModeSwitch();

  return (
    <View style={styles.screen}>
      <WelcomeImage style={imageStyle} />
      <SafeAreaView style={styles.safe}>
        <Animated.View style={[styles.intro, fadeStyle]}>
          {mode === 'start' ? (
            <>
              <Animated.Image
                source={logoWordmark}
                tintColor={colors.text}
                style={[styles.wordmark, logoStyle]}
                resizeMode="contain"
                accessibilityLabel="DARDANIC"
              />
              <Animated.Text style={[styles.tagline, contentStyle]}>
                {strings.welcome.tagline}
              </Animated.Text>
            </>
          ) : (
            <Heading
              title={strings.welcome.signupTitle}
              subtitle={strings.welcome.signupSubtitle}
            />
          )}
        </Animated.View>

        <Animated.View style={contentStyle}>
          <Animated.View style={[styles.bottom, fadeStyle]}>
            <AuthActions mode={mode} onChangeMode={switchTo} />
            <LegalNotice mode={mode} />
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safe: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.md,
    },
    intro: {
      alignItems: 'flex-start',
      marginBottom: spacing.xxl,
    },
    wordmark: {
      width: sizes.logoWordmark,
      height: sizes.logoWordmark / WORDMARK_RATIO,
      marginBottom: spacing.lg,
    },
    tagline: {
      ...typography.paragraph,
      color: colors.textMuted,
    },
    bottom: {
      gap: spacing.xl,
    },
  }),
);
