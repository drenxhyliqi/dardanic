import type { strings } from '../../i18n';

export type FeedFilter = keyof typeof strings.feed.filters;
export const FEED_FILTERS: FeedFilter[] = ['forYou', 'following', 'crews'];
