import type { Listing, ListingDraft, MarketFilter } from './types';

// What the Marketplace asks the backend for. The mock checks listings with simple word
// rules; the real version will run an AI check (photos + text: is it car-related?) in
// a Supabase Edge Function before anything goes live.
export interface MarketplaceService {
  // Live listings only, newest first.
  list(filter: MarketFilter): Promise<Listing[]>;
  get(id: string): Promise<Listing | undefined>;
  // When the newest live listing went up (ms), for the red dot on the Marketplace tab.
  newestAt(): Promise<number>;
  // Live listings like this one, best matches first (at most `limit`). The mock compares
  // the brand, the category and words in the title and description;
  // the real one can use smarter search later without the screens changing.
  similar(listing: Listing, limit?: number): Promise<Listing[]>;
  // Checks the draft and creates the listing: live, under review or rejected.
  publish(draft: ListingDraft): Promise<Listing>;
}
