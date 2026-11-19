import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export type WelcomeMode = 'start' | 'signup';

// Which step of the welcome screen is showing, plus a quick fade when it changes.
export function useModeSwitch() {
  const [mode, setMode] = useState<WelcomeMode>('start');
  const fade = useRef(new Animated.Value(1)).current;

  const switchTo = (next: WelcomeMode) => {
    Animated.timing(fade, { toValue: 0, duration: 160, useNativeDriver: true }).start(() => {
      setMode(next);
      Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: true }).start();
    });
  };

  const fadeStyle = {
    opacity: fade,
    transform: [{ translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
  };

  return { mode, switchTo, fadeStyle };
}
