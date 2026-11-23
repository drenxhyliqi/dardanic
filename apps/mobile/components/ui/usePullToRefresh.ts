import { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, Easing, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { sizes } from '../../theme';
import { useCollapseOnScroll } from '../tabs/useCollapseOnScroll';

const SPIN_MS = 800;
const OPEN_MS = 200;
const CLOSE_MS = 250;

// Pull-to-refresh for a scroll view: pull down past sizes.pullRefresh and let go to call
// onRefresh. While it runs, a gap of gapHeight stays open at the top (holding the reload
// circle); when it's done the content slides back up over it.
// Gives back the scroll handlers plus the values the reload circle animates with.
// Scrolling also shrinks the bottom bar (on the main tabs), like on the Feed.
// onScrollChange (optional) replaces that, for a page with its own bars (the Feed).
export function usePullToRefresh(
  onRefresh: () => Promise<void>,
  gapHeight: number,
  onScrollChange?: (event: NativeScrollEvent) => void,
) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const active = useRef(new Animated.Value(0)).current; // 1 while refreshing
  const spin = useRef(new Animated.Value(0)).current;
  const gap = useRef(new Animated.Value(0)).current; // space kept open above the content
  const [refreshing, setRefreshing] = useState(false);
  const bottomBar = useCollapseOnScroll();
  const listener = onScrollChange ?? bottomBar.onScroll;

  // Built once (per listener): rebuilding it on every redraw can drop the drag being
  // tracked, so the pull wouldn't register.
  const onScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
        listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => listener(event.nativeEvent),
      }),
    [scrollY, listener],
  );

  const onScrollEndDrag = useCallback(
    async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (refreshing || event.nativeEvent.contentOffset.y > -sizes.pullRefresh) return;

      setRefreshing(true);
      active.setValue(1);
      spin.setValue(0);
      Animated.timing(gap, {
        toValue: gapHeight,
        duration: OPEN_MS,
        useNativeDriver: false,
      }).start();
      const loop = Animated.loop(
        Animated.timing(spin, {
          toValue: 1,
          duration: SPIN_MS,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      loop.start();

      await onRefresh();

      // Slide the content back up over the circle, fading it, then stop spinning.
      Animated.parallel([
        Animated.timing(gap, { toValue: 0, duration: CLOSE_MS, useNativeDriver: false }),
        Animated.timing(active, { toValue: 0, duration: CLOSE_MS, useNativeDriver: true }),
      ]).start(() => loop.stop());
      setRefreshing(false);
    },
    [refreshing, onRefresh, gapHeight, active, spin, gap],
  );

  return { scrollY, active, spin, gap, refreshing, onScroll, onScrollEndDrag };
}
