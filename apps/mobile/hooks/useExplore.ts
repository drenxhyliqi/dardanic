import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useOnboarding } from '../context/OnboardingContext';
import { searchService, type ExploreFilter, type ExplorePost } from '../services/search';

// Vibes for the sample account (when you haven't been through sign-up).
const SAMPLE_VIBES = ['bmw', 'e46', 'stance', 'jdm', 'euro'];

// Explore posts ranked for you, for the chosen filter: the posts, whether they're
// loading (skeletons on first load and when the filter changes), your vibes (for the
// filter chips) and a refresh for pull-to-refresh, which keeps the grid while it loads.
// Later this becomes a TanStack Query hook; screens stay the same.
export function useExplore(filter: ExploreFilter) {
  const onboarding = useOnboarding();
  const vibesKey = (onboarding.vibes.length ? onboarding.vibes : SAMPLE_VIBES).join(',');
  const vibes = useMemo(() => vibesKey.split(','), [vibesKey]);
  const [posts, setPosts] = useState<ExplorePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const round = useRef(0);

  useEffect(() => {
    let current = true;
    setIsLoading(true);
    searchService.explore({ vibes, filter }).then((result) => {
      if (!current) return;
      setPosts(result);
      setIsLoading(false);
    });
    return () => {
      current = false;
    };
  }, [vibes, filter]);

  const refresh = useCallback(async () => {
    round.current += 1;
    setPosts(await searchService.explore({ vibes, filter, refresh: round.current }));
  }, [vibes, filter]);

  return { posts, isLoading, vibes, refresh };
}
