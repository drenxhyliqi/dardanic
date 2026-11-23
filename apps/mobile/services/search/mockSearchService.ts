import { EXPLORE_POSTS } from '../../data/explore';
import { PEOPLE } from '../../data/feedAuthors';
import { simplify } from '../../utils/text';
import type { SearchService } from './SearchService';
import type { ExplorePost } from './types';

const NETWORK_MS = 450;
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const TASTE_POINTS = 2.5; // per vibe a post shares with you
const SUGGESTIONS = 8;

// A person's vibes: everything their posts are tagged with.
const vibesOf = (username: string) =>
  new Set(EXPLORE_POSTS.filter((p) => p.author.username === username).flatMap((p) => p.vibes));
// A person's popularity: flames on their posts.
const flamesOf = (username: string) =>
  EXPLORE_POSTS.filter((p) => p.author.username === username && p.kind === 'photo').reduce(
    (sum, p) => sum + (p.kind === 'photo' ? p.flames : 0),
    0,
  );
const FRESH_HOURS = 24; // a post's popularity halves for every day it gets older
const SHUFFLE = 0.6; // how much a refresh can move things around

// The mock "algorithm": popularity (flames and shares, shares count more), fading as a
// post gets older, plus points for every vibe it shares with you. A tiny bit of
// randomness per refresh keeps Explore from feeling frozen.
function score(post: ExplorePost, vibes: Set<string>, refresh: number): number {
  const engagement = post.kind === 'meet' ? post.going * 20 : post.flames + post.shares * 5;
  const popularity = Math.log10(1 + engagement);
  const freshness = 1 / (1 + post.minutesAgo / 60 / FRESH_HOURS);
  const taste = post.vibes.filter((vibe) => vibes.has(vibe)).length * TASTE_POINTS;
  const seed = refresh * 97 + post.id.length * 13 + post.minutesAgo;
  const jitter = refresh ? Math.sin(seed) * SHUFFLE : 0;
  return popularity * (0.5 + freshness) + taste + jitter;
}

export const mockSearchService: SearchService = {
  async searchAccounts(query) {
    await wait(NETWORK_MS);
    const search = simplify(query.trim());
    const matches = PEOPLE.filter((person) =>
      simplify(`${person.username} ${person.name}`).includes(search),
    );
    return {
      people: matches.filter((person) => !person.business),
      businesses: matches.filter((person) => person.business),
    };
  },

  async suggestedAccounts(forUsername, exclude) {
    await wait(NETWORK_MS);
    const theirVibes = vibesOf(forUsername);
    const skip = new Set([forUsername, ...exclude]);
    return PEOPLE.filter((person) => !skip.has(person.username))
      .map((person) => {
        const sharedVibes = [...vibesOf(person.username)].filter((v) => theirVibes.has(v));
        const rank = sharedVibes.length * 3 + Math.log10(1 + flamesOf(person.username));
        return { person, sharedVibes, rank };
      })
      .sort((a, b) => b.rank - a.rank)
      .slice(0, SUGGESTIONS)
      .map(({ person, sharedVibes }) => ({ person, sharedVibes }));
  },

  async explore({ vibes, filter, refresh = 0 }) {
    await wait(NETWORK_MS);
    const taste = new Set(vibes);
    // Explore = people you don't follow, minus private accounts (followers only).
    const notFollowed = EXPLORE_POSTS.filter(
      (post) => !post.author.followed && !post.author.private,
    );
    const narrowed = notFollowed.filter((post) => {
      if (filter === 'businesses') return post.author.business;
      if (filter === 'meets') return post.kind === 'meet';
      if (filter.startsWith('vibe:')) return post.vibes.includes(filter.slice(5));
      return true;
    });
    return narrowed
      .map((post) => ({ post, rank: score(post, taste, refresh) }))
      .sort((a, b) => b.rank - a.rank)
      .map(({ post }) => post);
  },
};
