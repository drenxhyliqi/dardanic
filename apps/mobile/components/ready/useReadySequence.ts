import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const LINES = 3;

// The timeline of the "account ready" moment:
// 1. flag pattern and logo fade in, text lines slide in one by one
// 2. short pause to read
// 3. the text fades into the logo while the logo glides up into its spot in the feed's
//    top bar, a small pulse, then onDone (open the feed)
export function useReadySequence(onDone: () => void) {
  const flag = useRef(new Animated.Value(0)).current;
  const lines = useRef(Array.from({ length: LINES }, () => new Animated.Value(0))).current;
  const compact = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timing = (
      value: Animated.Value,
      toValue: number,
      duration: number,
      easing = Easing.out(Easing.cubic),
    ) => Animated.timing(value, { toValue, duration, easing, useNativeDriver: true });

    const sequence = Animated.sequence([
      Animated.parallel([
        timing(flag, 1, 700),
        Animated.sequence([
          Animated.delay(300),
          Animated.stagger(
            140,
            lines.map((line) => timing(line, 1, 450)),
          ),
        ]),
      ]),
      Animated.delay(1300),
      timing(compact, 1, 700, Easing.inOut(Easing.cubic)),
      timing(pulse, 1, 140),
      timing(pulse, 0, 200),
    ]);

    sequence.start(({ finished }) => {
      if (finished) onDone();
    });
    return () => sequence.stop();
  }, [flag, lines, compact, pulse, onDone]);

  return { flag, lines, compact, pulse };
}
