import { RefreshIndicator, refreshGap } from './RefreshIndicator';
import { usePullToRefresh } from './usePullToRefresh';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const FAKE_RELOAD_MS = 1000; // pages with nothing to fetch yet still show a real refresh

// Pull-to-refresh for any Animated scroll view / list in two pieces: spread
// `scrollProps` on the list and render `indicator` as its first child (or list
// header). `onRefresh` defaults to a short pretend reload until there's a backend.
// `topInset`: space above the content (e.g. the safe area when it scrolls behind it).
export function useRefreshable(onRefresh?: () => Promise<void>, topInset = 0) {
  const pull = usePullToRefresh(onRefresh ?? (() => wait(FAKE_RELOAD_MS)), refreshGap(topInset));

  const scrollProps = {
    onScroll: pull.onScroll,
    onScrollEndDrag: pull.onScrollEndDrag,
    scrollEventThrottle: 16,
    alwaysBounceVertical: true, // even short pages can be pulled
  };
  const indicator = (
    <RefreshIndicator
      scrollY={pull.scrollY}
      active={pull.active}
      spin={pull.spin}
      gap={pull.gap}
      refreshing={pull.refreshing}
    />
  );
  return { scrollProps, indicator, refreshing: pull.refreshing };
}
