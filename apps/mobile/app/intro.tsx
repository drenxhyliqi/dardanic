import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BuildCard } from '../components/intro/cards/BuildCard';
import { PersonCard } from '../components/intro/cards/PersonCard';
import { PlaceCard } from '../components/intro/cards/PlaceCard';
import { IntroProgress } from '../components/intro/IntroProgress';
import { TiltedCarousel } from '../components/intro/TiltedCarousel';
import { Button } from '../components/ui/Button';
import { Heading } from '../components/ui/Heading';
import { INTRO_BUILDS, INTRO_PEOPLE, INTRO_PLACES, toColumns } from '../data/intro';
import { strings } from '../i18n';
import { makeStyles, spacing, typography } from '../theme';

const t = strings.intro;
const FADE_MS = 400;

// The cards moving behind each step: people, things near you, builds.
const CAROUSELS = [
  toColumns(INTRO_PEOPLE).map((col) =>
    col.map((p) => ({ key: p.username, tall: p.tall, node: <PersonCard person={p} /> })),
  ),
  toColumns(INTRO_PLACES).map((col) =>
    col.map((p) => ({ key: p.title, tall: p.tall, node: <PlaceCard place={p} /> })),
  ),
  toColumns(INTRO_BUILDS).map((col) =>
    col.map((b) => ({ key: b.car, tall: b.tall, node: <BuildCard build={b} /> })),
  ),
];

// A 3-step introduction shown once, after picking vibes. Next on the last step
// (or Skip) goes to the "account ready" animation, which opens the feed.
export default function IntroScreen() {
  const styles = useStyles();
  const [step, setStep] = useState(0);
  const fade = useRef(new Animated.Value(0)).current;
  const total = t.steps.length;
  const content = t.steps[step];

  // Fade each step in when it appears.
  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: FADE_MS, useNativeDriver: true }).start();
  }, [step, fade]);

  const enterApp = () => router.replace('/ready');
  const next = () => (step === total - 1 ? enterApp() : setStep(step + 1));

  return (
    <View style={styles.screen}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: fade }]}>
        <TiltedCarousel key={step} columns={CAROUSELS[step]} />
      </Animated.View>

      <SafeAreaView style={styles.safe}>
        <View style={styles.topBar}>
          <IntroProgress current={step} total={total} />
          <Pressable onPress={enterApp} accessibilityRole="button" hitSlop={spacing.md}>
            <Text style={styles.skip}>{t.skip}</Text>
          </Pressable>
        </View>

        <Animated.View style={[styles.text, { opacity: fade }]}>
          <Text style={styles.eyebrow}>{content.eyebrow}</Text>
          <Heading title={content.title} subtitle={content.body} />
        </Animated.View>

        <Button label={t.next} trailing={t.stepCounter(step + 1, total)} onPress={next} strong />
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
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.sm,
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.md,
    },
    skip: {
      ...typography.link,
      color: colors.text,
    },
    text: {
      flex: 1,
      justifyContent: 'flex-end',
      gap: spacing.md,
      paddingBottom: spacing.xxl,
    },
    eyebrow: {
      ...typography.badge,
      color: colors.primary,
      textTransform: 'uppercase',
    },
  }),
);
