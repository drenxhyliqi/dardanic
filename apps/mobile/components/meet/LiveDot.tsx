import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { makeStyles, radius, sizes } from '../../theme';

const PULSE_MS = 700;

// A small white dot that gently pulses, next to "LIVE".
export function LiveDot() {
  const styles = useStyles();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.3, duration: PULSE_MS, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: PULSE_MS, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return <Animated.View style={[styles.dot, { opacity }]} />;
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    dot: {
      width: sizes.mediaDot,
      height: sizes.mediaDot,
      borderRadius: radius.full,
      backgroundColor: colors.white,
    },
  }),
);
