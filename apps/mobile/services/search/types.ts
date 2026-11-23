import type { ExplorePost } from '../../data/explore';
import type { FeedAuthor } from '../../data/feed';

export type { ExplorePost };

// What Explore can be narrowed to: everything ranked for you, only businesses, only
// meets, or one of your vibes ("vibe:bmw").
export type ExploreFilter = 'forYou' | 'businesses' | 'meets' | `vibe:${string}`;

export type AccountResults = {
  people: FeedAuthor[];
  businesses: FeedAuthor[];
};

// Someone suggested on a profile, and the vibes they share with it (for "Into …").
export type SuggestedAccount = {
  person: FeedAuthor;
  sharedVibes: string[];
};

export type ExploreOptions = {
  vibes: string[]; // the viewer's vibe ids (from sign-up)
  filter: ExploreFilter;
  refresh?: number; // bump to get a slightly different mix (pull to refresh)
};
