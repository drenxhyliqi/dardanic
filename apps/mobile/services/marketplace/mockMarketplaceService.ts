import { SAMPLE_LISTINGS } from '../../data/marketplace';
import { simplify } from '../../utils/text';
import { checkListing } from './mockCheck';
import { similarity } from './similarity';
import type { MarketplaceService } from './MarketplaceService';
import type { Listing } from './types';

const NETWORK_MS = 500;
const CHECK_MS = 1600; // the "Checking your listing…" step
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const OPENED = Date.now(); // sample listings' "minutes ago" count from here
let nextId = 0;
const created: Listing[] = []; // listings published in this session

// A pretend Marketplace backend: the sample listings plus what you publish, searched
// and filtered here; publishing runs the mock car-related check.
export const mockMarketplaceService: MarketplaceService = {
  async list({ category, query }) {
    await wait(NETWORK_MS);
    const search = simplify(query.trim());
    const all = [...created, ...SAMPLE_LISTINGS];
    const newestFirst = all.sort((a, b) => a.minutesAgo - b.minutesAgo);
    return newestFirst.filter((listing) => {
      if (listing.status !== 'live') return false;
      if (category !== 'all' && listing.category !== category) return false;
      const text = simplify(`${listing.title} ${listing.description}`);
      return !search || text.includes(search);
    });
  },

  async newestAt() {
    await wait(NETWORK_MS);
    const live = [...created, ...SAMPLE_LISTINGS].filter((listing) => listing.status === 'live');
    const newest = Math.min(...live.map((listing) => listing.minutesAgo));
    return OPENED - newest * 60_000;
  },

  async get(id) {
    await wait(NETWORK_MS / 2);
    return [...created, ...SAMPLE_LISTINGS].find((listing) => listing.id === id);
  },

  async similar(listing, limit = Infinity) {
    await wait(NETWORK_MS);
    const score = similarity(listing);
    return [...created, ...SAMPLE_LISTINGS]
      .filter((other) => other.id !== listing.id && other.status === 'live' && score(other) > 0)
      .sort((a, b) => score(b) - score(a) || a.minutesAgo - b.minutesAgo)
      .slice(0, limit);
  },

  async publish(draft) {
    await wait(CHECK_MS);
    const check = checkListing(draft);
    const id = `mine-${nextId++}`;
    const listing: Listing = { ...draft, id, minutesAgo: 0, saves: 0, ...check };
    created.unshift(listing);
    return listing;
  },
};
