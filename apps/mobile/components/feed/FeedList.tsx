import { Animated, StyleSheet, View, type NativeScrollEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { FeedPost } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, spacing } from '../../theme';
import { useProfileData } from '../profile/useProfileData';
import { tabBarSpace } from '../tabs/FloatingTabBar';
import { MeetCard } from '../meet/MeetCard';
import { EmptyState } from '../ui/EmptyState';
import { RefreshIndicator, refreshGap } from '../ui/RefreshIndicator';
import { usePullToRefresh } from '../ui/usePullToRefresh';
import type { FeedFilter } from './feedFilters';
import { PostCard } from './PostCard';
import { PostSkeleton } from './PostSkeleton';
import { StoriesRow } from './StoriesRow';
import { useFeedData } from './useFeedData';

const t = strings.feed.empty;

export type FeedListProps = {
  filter: FeedFilter;
  topInset: number; // room at the top for the top bar floating over the list
  onScrollChange?: (event: NativeScrollEvent) => void;
};

// The scrolling feed under the top bar: stories, then posts (photos and meets).
// Skeleton posts while loading, a friendly empty state when there's nothing, and
// pull down to refresh with the same reload circle as the profile.
export function FeedList({ filter, topInset, onScrollChange }: FeedListProps) {
  const insets = useSafeAreaInsets();
  const profile = useProfileData();
  const { posts, isLoading, refresh } = useFeedData(filter);
  const pull = usePullToRefresh(refresh, refreshGap(0), onScrollChange);

  return (
    <Animated.FlatList
      data={isLoading ? [] : posts}
      keyExtractor={(post) => post.id}
      renderItem={({ item }) => <FeedItem post={item} />}
      ItemSeparatorComponent={Separator}
      onScroll={pull.onScroll}
      onScrollEndDrag={pull.onScrollEndDrag}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingTop: topInset, paddingBottom: tabBarSpace(insets.bottom) }}
      scrollIndicatorInsets={{ top: topInset }}
      ListHeaderComponent={
        <>
          <RefreshIndicator
            scrollY={pull.scrollY}
            active={pull.active}
            spin={pull.spin}
            gap={pull.gap}
            refreshing={pull.refreshing}
          />
          <StoriesRow
            me={{ name: profile.displayName || profile.username, photo: profile.photo }}
          />
        </>
      }
      ListEmptyComponent={
        isLoading ? (
          <View style={styles.skeletons}>
            <PostSkeleton />
            <PostSkeleton />
          </View>
        ) : filter === 'meetings' ? (
          <EmptyState icon="calendar-outline" title={t.meetingsTitle} hint={t.meetingsHint} />
        ) : (
          <EmptyState icon="location-outline" title={t.nearTitle} hint={t.nearHint} />
        )
      }
    />
  );
}

function FeedItem({ post }: { post: FeedPost }) {
  return post.kind === 'meet' ? <MeetCard meet={post} /> : <PostCard post={post} />;
}

// A thin line across the screen between posts (with room above and below), so each
// post reads as its own block, even a text post right after a photo post.
function Separator() {
  const themed = useThemedStyles();
  return <View style={themed.separator} />;
}

const useThemedStyles = makeStyles((colors) =>
  StyleSheet.create({
    separator: {
      height: 1,
      marginVertical: spacing.lg,
      backgroundColor: colors.surfaceBorder,
    },
  }),
);

const styles = StyleSheet.create({
  skeletons: {
    gap: spacing.xl,
  },
});
