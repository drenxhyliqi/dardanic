import { useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useExplore } from '../../hooks/useExplore';
import { strings } from '../../i18n';
import type { ExploreFilter } from '../../services/search';
import { makeStyles, spacing } from '../../theme';
import { tabBarSpace } from '../tabs/FloatingTabBar';
import { EmptyState } from '../ui/EmptyState';
import { RefreshIndicator, refreshGap } from '../ui/RefreshIndicator';
import { usePullToRefresh } from '../ui/usePullToRefresh';
import { ExploreFilters } from './ExploreFilters';
import { ExploreGrid } from './ExploreGrid';
import { ExploreSkeleton } from './ExploreSkeleton';
import { FindMeCard } from './FindMeCard';

// What search shows before you type: the FindMe card, filter chips, and the Explore
// grid of posts from people you don't follow, ranked for you. Pull down to refresh.
export function ExploreView() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<ExploreFilter>('forYou');
  const { posts, isLoading, vibes, refresh } = useExplore(filter);
  const pull = usePullToRefresh(refresh, refreshGap(0));

  return (
    <Animated.ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: tabBarSpace(insets.bottom) }}
      onScroll={pull.onScroll}
      onScrollEndDrag={pull.onScrollEndDrag}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
    >
      <RefreshIndicator
        scrollY={pull.scrollY}
        active={pull.active}
        spin={pull.spin}
        gap={pull.gap}
        refreshing={pull.refreshing}
      />
      <View style={styles.top}>
        <FindMeCard />
      </View>
      <View style={styles.filters}>
        <ExploreFilters active={filter} vibes={vibes} onChange={setFilter} />
      </View>
      {isLoading ? (
        <ExploreSkeleton />
      ) : posts.length ? (
        <ExploreGrid posts={posts} />
      ) : (
        <EmptyState
          icon="compass-outline"
          title={strings.search.emptyTitle}
          hint={strings.search.emptyHint}
        />
      )}
    </Animated.ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    top: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
    filters: { paddingVertical: spacing.md },
  }),
);
