import { useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FEED_BAR_HEIGHT, FeedHeader } from '../../components/feed/FeedHeader';
import { FeedList } from '../../components/feed/FeedList';
import type { FeedFilter } from '../../components/feed/feedFilters';
import { useSwipeToCamera } from '../../components/feed/useSwipeToCamera';
import { useCollapseOnScroll } from '../../components/tabs/useCollapseOnScroll';
import { makeStyles } from '../../theme';

// The Feed tab: the scrolling feed (stories + posts) with the top bar floating over it.
// Scrolling down slides the top bar away (and shrinks the bottom bar); a small scroll up
// brings both back. A solid strip behind the status bar keeps the clock readable.
// The filter (Your vibes / Near you / Meetings) decides which posts show. Swiping from
// the left edge to the right opens the story camera.
export default function FeedScreen() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<FeedFilter>('vibes');
  const { collapse, onScroll } = useCollapseOnScroll(FEED_BAR_HEIGHT);
  const swipeToCamera = useSwipeToCamera();

  const slide = collapse.interpolate({ inputRange: [0, 1], outputRange: [0, -FEED_BAR_HEIGHT] });
  const fade = collapse.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <View style={styles.screen} {...swipeToCamera}>
      <FeedList
        filter={filter}
        topInset={insets.top + FEED_BAR_HEIGHT}
        onScrollChange={onScroll}
      />
      <Animated.View
        style={[styles.topBar, { paddingTop: insets.top, transform: [{ translateY: slide }] }]}
      >
        <Animated.View style={{ opacity: fade }}>
          <FeedHeader filter={filter} onChangeFilter={setFilter} />
        </Animated.View>
      </Animated.View>
      <View style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    topBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.background,
    },
    statusBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.background,
    },
  }),
);
