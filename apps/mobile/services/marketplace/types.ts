// The shapes the Marketplace works with (the real backend will use the same).
import type { FeedAuthor } from '../../data/feed';
import type { ListingCategory } from '../../data/marketplaceCategories';

export type Condition = 'new' | 'likeNew' | 'used' | 'forParts';

// Live = visible to everyone. Review = waiting for a moderator (only the seller sees
// it). Rejected = not car-related, not shown.
export type ListingStatus = 'live' | 'review' | 'rejected';

export type Listing = {
  id: string;
  title: string; // written by the seller, everything important up front ("AUDI A6 2018…")
  description: string; // all the details, in the seller's own words
  category: ListingCategory;
  price: number; // €
  condition: Condition;
  photos: string[];
  city: string;
  minutesAgo: number;
  seller: FeedAuthor;
  status: ListingStatus;
  reason?: string; // why it's under review / not allowed
  saves: number;
};

// What the seller fills in; the server adds id, time, status.
export type ListingDraft = Omit<Listing, 'id' | 'minutesAgo' | 'status' | 'reason' | 'saves'>;

export type MarketFilter = {
  category: ListingCategory | 'all';
  query: string;
};
