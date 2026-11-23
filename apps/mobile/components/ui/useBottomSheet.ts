import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Keyboard, PanResponder, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '../../theme';

const OPEN = 0.7; // how much of the screen it covers when it opens
const CLOSE_BELOW = 0.6; // let go below 60% of that height → close
const FLICK = 120; // how much a flick's speed adds to where it lands
const CLOSE_MS = 200;
const spring = { friction: 9, tension: 70, useNativeDriver: false };

// The moving part of BottomSheet: its height (0 = closed, 70% of the screen, or full screen
// up to just below the status bar), dragging the top bar to change it, and snapping to
// the nearest of the three when you let go. The keyboard opening always goes full.
// Height is animated (not just moved) so the bottom of the sheet always sits on the
// screen's bottom edge, keeping the text field visible at every size.
export function useBottomSheet(onClosed: () => void, openRatio = OPEN) {
  const { height: screen } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const full = screen - insets.top - spacing.sm;
  const opened = screen * openRatio;
  const height = useRef(new Animated.Value(0)).current;
  const resting = useRef(0); // where it last settled

  const snapTo = useCallback(
    (to: number) => {
      resting.current = to;
      Animated.spring(height, { toValue: to, ...spring }).start();
    },
    [height],
  );

  const close = useCallback(() => {
    resting.current = 0;
    Keyboard.dismiss();
    Animated.timing(height, { toValue: 0, duration: CLOSE_MS, useNativeDriver: false }).start(
      onClosed,
    );
  }, [height, onClosed]);

  const expand = useCallback(() => {
    if (resting.current !== full) snapTo(full);
  }, [full, snapTo]);

  // Slide up to 70% when it opens; go full when the keyboard appears.
  useEffect(() => {
    snapTo(opened);
    const sub = Keyboard.addListener('keyboardWillShow', expand);
    return () => sub.remove();
  }, [opened, snapTo, expand]);

  const panHandlers = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, move) =>
          height.setValue(Math.min(full, Math.max(0, resting.current - move.dy))),
        onPanResponderRelease: (_, move) => {
          const landing = resting.current - move.dy - move.vy * FLICK;
          if (landing < opened * CLOSE_BELOW) close();
          else snapTo(landing > (opened + full) / 2 ? full : opened);
        },
      }).panHandlers,
    [height, full, opened, close, snapTo],
  );

  const backdrop = height.interpolate({
    inputRange: [0, opened],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return { height, backdrop, panHandlers, expand, close };
}
