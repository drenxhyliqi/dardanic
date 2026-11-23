import type { AccountResults, ExploreOptions, ExplorePost, SuggestedAccount } from './types';

// What search and Explore ask the backend for. Screens use it through hooks; the mock
// (mockSearchService) can be swapped for a Supabase version later.
export interface SearchService {
  // People and businesses whose username or name matches.
  searchAccounts(query: string): Promise<AccountResults>;
  // Posts from people you don't follow, ranked for you (popularity + your taste).
  explore(options: ExploreOptions): Promise<ExplorePost[]>;
  // Accounts like the one you're viewing (shared vibes first, then popular), leaving
  // out `exclude` (yourself, people you follow, blocked accounts).
  suggestedAccounts(forUsername: string, exclude: string[]): Promise<SuggestedAccount[]>;
}
