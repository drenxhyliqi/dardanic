import { EXPLORE_POSTS } from './explore';
import { SAMPLE_FEED, type FeedPost } from './feed';
import { MY_POSTS, MY_TEXT_POSTS } from './myPosts';

// Find any sample post by id (feed, Explore or your own), until posts come from the
// backend.
export function findPost(id: string): FeedPost | undefined {
  const all = [...SAMPLE_FEED, ...EXPLORE_POSTS, ...MY_POSTS, ...MY_TEXT_POSTS];
  return all.find((post) => post.id === id);
}
