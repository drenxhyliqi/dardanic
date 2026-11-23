import { useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
import { Animated, Easing, type NativeScrollEvent } from 'react-native';

import { useOptionalScrollCollapse } from '../../context/ScrollCollapseContext';

const HIDE_AFTER = 8; // scroll down this far (in a row) to collapse
const SHOW_AFTER = 12; // scroll up just a little to bring everything back
const ANIMATION_MS = 220;

// Watches which way the list scrolls and moves the shared collapse value:
// scrolling down (past the top bar) collapses, a small scroll up or reaching the top
// brings everything back. Leaving the screen always resets to full size, so the
// other tabs show the normal bottom bar.
// `topBarHeight`: nothing collapses until you've scrolled at least this far.
// Outside the tabs (no bottom bar) it does nothing.
export function useCollapseOnScroll(topBarHeight = 0) {
  const shared = useOptionalScrollCollapse();
  const fallback = useRef(new Animated.Value(0)).current;
  const collapse = shared ?? fallback;
  const collapsed = useRef(false);
  const lastY = useRef(0);
  const travel = useRef(0); // how far we've moved in the current direction

  const animateTo = useCallback(
    (next: boolean) => {
      if (collapsed.current === next) return;
      collapsed.current = next;
      Animated.timing(collapse, {
        toValue: next ? 1 : 0,
        duration: ANIMATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    },
    [collapse],
  );

  const onScroll = useCallback(
    ({ contentOffset, contentSize, layoutMeasurement }: NativeScrollEvent) => {
      const y = contentOffset.y;
      const maxY = contentSize.height - layoutMeasurement.height;
      if (y > maxY) return; // bouncing past the end: ignore, it isn't a real scroll up

      const dy = y - lastY.current;
      lastY.current = y;
      if (y <= 0) {
        travel.current = 0;
        animateTo(false); // back at the top
        return;
      }
      // Keep adding up while going the same way; start over when the direction flips.
      travel.current = Math.sign(dy) === Math.sign(travel.current) ? travel.current + dy : dy;
      if (travel.current > HIDE_AFTER && y > topBarHeight) animateTo(true);
      if (travel.current < -SHOW_AFTER) animateTo(false);
    },
    [animateTo, topBarHeight],
  );

  useFocusEffect(
    useCallback(
      () => () => {
        travel.current = 0;
        animateTo(false);
      },
      [animateTo],
    ),
  );

  return { collapse, onScroll };
}
