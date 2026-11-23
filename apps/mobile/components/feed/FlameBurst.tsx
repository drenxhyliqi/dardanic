import * as Haptics from 'expo-haptics';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { sizes } from '../../theme';
import { FlameIcon } from '../flame/FlameIcon';

const GROW_STEP = 0.12; // each extra tap makes it this much bigger
const MAX_SCALE = 1.8; // …up to this (reached after 8 taps)
const HOLD_MS = 550; // stays this long after the last tap
const FADE_MS = 220;

export const flameBurstScale = (taps: number) =>
  Math.min(MAX_SCALE, 1 + (taps - 1) * GROW_STEP);

export type FlameBurstProps = {
  taps: number; // 0 = hidden, 1 = the double-tap, 2+ = each extra tap after it
  onFinished: () => void; // faded out after the last tap
};

// The big flame on a photo. Double-tap: it springs in at its normal size. Keep tapping:
// it grows with each tap (with a light vibration) up to a maximum (stronger vibration),
// stays while you tap, and fades out shortly after the last tap.
export function FlameBurst({ taps, onFinished }: FlameBurstProps) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const finished = useRef(onFinished);

  useEffect(() => {
    finished.current = onFinished;
  }, [onFinished]);

  useEffect(() => {
    if (taps === 0) return;
    const target = flameBurstScale(taps);
    if (taps === 1) scale.setValue(0);
    const grew = taps > 1 && target > flameBurstScale(taps - 1); // no buzz once it's maxed
    if (grew) {
      const { Medium, Light } = Haptics.ImpactFeedbackStyle;
      Haptics.impactAsync(target >= MAX_SCALE ? Medium : Light).catch(() => {});
    }
    opacity.stopAnimation();
    opacity.setValue(1);
    Animated.spring(scale, {
      toValue: target,
      friction: 4,
      tension: 160,
      useNativeDriver: true,
    }).start();

    // Fade out if no more taps come; a new tap cancels this and starts it again.
    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: FADE_MS, useNativeDriver: true }).start(
        ({ finished: done }) => done && finished.current(),
      );
    }, HOLD_MS);
    return () => clearTimeout(timer);
  }, [taps, scale, opacity]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.center, { opacity, transform: [{ scale }] }]}
    >
      <FlameIcon size={sizes.flameBurst} flamed />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
