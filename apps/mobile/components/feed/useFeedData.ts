import { useCallback, useEffect, useMemo, useState } from 'react';

import { useOnboarding } from '../../context/OnboardingContext';
import { SAMPLE_FEED, type FeedPost } from '../../data/feed';
import { SAMPLE_PROFILE } from '../../data/profile';
import { distanceKm } from '../../utils/geo';
import type { FeedFilter } from './feedFilters';

const FAKE_LOAD_MS = 900; // until there's a backend to fetch from
const FAKE_RELOAD_MS = 1200;
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const NEAR_KM = 50; // posts from cities this close count as near you
const NEAR_MEET_KM = 30; // meets this close (their distance is already worked out)
const MINUTE = 60_000;

// How far a post is from your city (meets carry their own distance), or null if unknown.
function distanceFrom(city: string, post: FeedPost): number | null {
  return post.kind === 'meet' ? post.km : distanceKm(city, post.city);
}

// Which posts each feed shows. Private accounts you don't follow never show up.
// - Your vibes: everything.
// - Near you: posts and meets around your city, nearest first.
// - Meetings: only meets, live ones first, then soonest; finished ones are left out.
function pickPosts(filter: FeedFilter, city: string): FeedPost[] {
  const visible = SAMPLE_FEED.filter((p) => !p.author.private || p.author.followed);
  if (filter === 'vibes') return visible;
  if (filter === 'nearYou') {
    return visible
      .map((post) => ({ post, km: distanceFrom(city, post) }))
      .filter(({ post, km }) => {
        const limit = post.kind === 'meet' ? NEAR_MEET_KM : NEAR_KM;
        return km !== null && km <= limit;
      })
      .sort((a, b) => (a.km ?? 0) - (b.km ?? 0))
      .map(({ post }) => post);
  }
  const now = Date.now();
  const meets = visible.filter((p) => p.kind === 'meet');
  return meets
    .filter((m) => m.startsAt + m.durationMinutes * MINUTE > now)
    .sort((a, b) => a.startsAt - b.startsAt);
}

// The feed's posts (stories come from StoriesContext). Same shape the TanStack Query
// hook will have once Supabase is in ({ posts, isLoading, refresh }), so only this
// file changes then.
export function useFeedData(filter: FeedFilter) {
  const onboarding = useOnboarding();
  const city = onboarding.city ?? SAMPLE_PROFILE.city;
  const [isLoading, setIsLoading] = useState(true);

  // Pretend to load each time the feed changes, so the skeletons show.
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), FAKE_LOAD_MS);
    return () => clearTimeout(timer);
  }, [filter]);

  const posts = useMemo(() => pickPosts(filter, city), [filter, city]);
  const refresh = useCallback(() => wait(FAKE_RELOAD_MS), []);

  return { posts, isLoading, refresh };
}
