import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, type DimensionValue, type ViewStyle } from 'react-native';

import { makeStyles, radius as radii } from '../../theme';

const PULSE_MS = 800;
const DIM = 0.45;

export type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number;
  style?: ViewStyle;
};

// A grey placeholder block that gently pulses, shown where content is still loading.
// Solid colour only (fades in and out, no shimmer gradient).
export function Skeleton({
  width = '100%',
  height = '100%',
  radius = radii.md,
  style,
}: SkeletonProps) {
  const styles = useStyles();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: DIM, duration: PULSE_MS, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: PULSE_MS, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.block, { width, height, borderRadius: radius, opacity }, style]}
    />
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    block: {
      backgroundColor: colors.skeleton,
    },
  }),
);
