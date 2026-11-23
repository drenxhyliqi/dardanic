import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import type { StoryUser } from '../../data/stories';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { Avatar } from '../profile/Avatar';

const WAIT_MS = 220; // let the slide finish first
const IN_MS = 180;
const HOLD_MS = 650;
const OUT_MS = 250;

export type StoryIntroProps = {
  user: StoryUser;
};

// A short "name card" in the middle of the screen when you arrive at a new person's
// story: once the slide has landed, their avatar (with the story ring) and username
// pop in, hold for a moment, then fade away. Mount it with a new key each time to play
// it again.
export function StoryIntro({ user }: StoryIntroProps) {
  const styles = useStyles();
  const colors = useColors();
  const shown = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(WAIT_MS),
      Animated.timing(shown, { toValue: 1, duration: IN_MS, useNativeDriver: true }),
      Animated.delay(HOLD_MS),
      Animated.timing(shown, { toValue: 0, duration: OUT_MS, useNativeDriver: true }),
    ]).start();
  }, [shown]);

  const scale = shown.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] });

  return (
    <View style={styles.center} pointerEvents="none">
      <Animated.View style={[styles.card, { opacity: shown, transform: [{ scale }] }]}>
        <View style={styles.ring}>
          <Avatar
            photo={user.avatar}
            name={user.name}
            size={sizes.storyAvatar}
            ringColor={colors.black}
            border={sizes.storyRing}
          />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {user.label}
        </Text>
      </Animated.View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    center: {
      ...StyleSheet.absoluteFill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      alignItems: 'center',
      gap: spacing.sm,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      borderRadius: radius.lg,
      backgroundColor: colors.black,
    },
    ring: {
      padding: sizes.storyRing,
      borderRadius: radius.full,
      backgroundImage: colors.storyRing,
    },
    label: {
      ...typography.cardTitle,
      color: colors.white,
    },
  }),
);
