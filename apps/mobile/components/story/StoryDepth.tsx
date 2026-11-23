import type { ReactNode } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { makeStyles, radius } from '../../theme';

const BACK_SCALE = 0.88; // how small a story gets when the next person covers it
const BACK_DIM = 0.7; // how dark it gets

export type StoryDepthProps = {
  scrollX: Animated.Value; // the pager's sideways scroll position
  index: number; // this person's page
  width: number;
  children: ReactNode;
};

// The "card stack" switch between people. While the next person's story slides in
// over this one, this one stays in place, shrinks back and darkens, like a card being
// put down; going back plays it in reverse. Driven straight by the scroll, so it
// follows your finger and also plays on automatic switches.
// (The corners are only visible once it shrinks: at full size the phone's own rounded
// screen hides them.)
export function StoryDepth({ scrollX, index, width, children }: StoryDepthProps) {
  const styles = useStyles();
  // 0 = this page fills the screen, 1 = the next page fully covers it.
  const covered = Animated.subtract(Animated.divide(scrollX, width), index);
  const clamp = { inputRange: [0, 1], extrapolate: 'clamp' as const };

  const stayPut = covered.interpolate({ ...clamp, outputRange: [0, width] });
  const scale = covered.interpolate({ ...clamp, outputRange: [1, BACK_SCALE] });
  const dim = covered.interpolate({ ...clamp, outputRange: [0, BACK_DIM] });

  return (
    <Animated.View
      style={[styles.card, { width, transform: [{ translateX: stayPut }, { scale }] }]}
    >
      {children}
      <Animated.View pointerEvents="none" style={[styles.dim, { opacity: dim }]} />
    </Animated.View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      flex: 1,
      overflow: 'hidden',
      borderRadius: radius.lg,
    },
    dim: {
      ...StyleSheet.absoluteFill,
      backgroundColor: colors.black,
    },
  }),
);
