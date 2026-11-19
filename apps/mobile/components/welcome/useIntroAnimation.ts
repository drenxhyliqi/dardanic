import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const ease = Easing.out(Easing.cubic);

// The welcome intro, in two beats (~1.5s total):
// 1. the photo and the DARDANIC logo fade in, the logo growing slightly into place,
// 2. the text and buttons slide up from below.
export function useIntroAnimation() {
  const logo = useRef(new Animated.Value(0)).current;
  const content = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timing = (value: Animated.Value, duration: number) =>
      Animated.timing(value, { toValue: 1, duration, easing: ease, useNativeDriver: true });

    Animated.sequence([timing(logo, 800), timing(content, 550)]).start();
  }, [logo, content]);

  return {
    imageStyle: { opacity: logo },
    logoStyle: {
      opacity: logo,
      transform: [
        { scale: logo.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) },
        { translateY: logo.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) },
      ],
    },
    contentStyle: {
      opacity: content,
      transform: [{ translateY: content.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
    },
  };
}
