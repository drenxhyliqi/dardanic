import { useEffect, useRef, type ReactNode } from 'react';
import { Animated } from 'react-native';

import { spacing } from '../../theme';

const FADE_MS = 260;

// Fades its content in while it rises a little. Give it a new `key` to play it again
// (e.g. each new search result).
export function FadeIn({ children }: { children: ReactNode }) {
  const shown = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(shown, { toValue: 1, duration: FADE_MS, useNativeDriver: true }).start();
  }, [shown]);

  const translateY = shown.interpolate({ inputRange: [0, 1], outputRange: [spacing.md, 0] });
  return (
    <Animated.View style={{ opacity: shown, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}
