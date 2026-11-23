import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { MY_STORY_ID, useStories } from '../../context/StoriesContext';
import type { StoryUser } from '../../data/stories';
import { makeStyles } from '../../theme';
import { StoryDepth } from './StoryDepth';
import { StoryIntro } from './StoryIntro';
import { StoryPage } from './StoryPage';
import { useSwipeDown } from './useSwipeDown';

export type StoryViewerProps = {
  startId: string; // whose story was tapped
};

// Full-screen stories, one person per page. Swipe sideways (or finish someone's last
// photo) to move to the next person: their story slides in over the current one,
// which shrinks back like a card being put down (StoryDepth), and a short name card
// shows whose story it is now (StoryIntro). After the last person it closes. Drag
// down to close. Each person you open is marked as watched (grey ring in the feed).
// The order is fixed when the viewer opens, so it doesn't reshuffle while watching.
export function StoryViewer({ startId }: StoryViewerProps) {
  const styles = useStyles();
  const { width, height } = useWindowDimensions();
  const { stories, myStory, markSeen, removeFromMyStory } = useStories();
  // Your own story plays first when you open it, then everyone else's.
  const [order] = useState(() =>
    startId === MY_STORY_ID && myStory ? [myStory, ...stories] : stories,
  );
  const start = Math.max(0, order.findIndex((story) => story.id === startId));
  const [current, setCurrent] = useState(start);
  const [introKey, setIntroKey] = useState(0); // bumps on every switch to a new person
  const introFor = useRef(start);
  const list = useRef<FlatList<StoryUser>>(null);
  const scrollX = useRef(new Animated.Value(start * width)).current;

  const onScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: true,
      }),
    [scrollX],
  );

  const close = useCallback(() => router.back(), []);
  const { offset, dragging, panHandlers } = useSwipeDown(close);

  // Deleted the last photo of your own story: nothing left to show.
  useEffect(() => {
    if (order[current]?.id === MY_STORY_ID && !myStory) close();
  }, [order, current, myStory, close]);

  useEffect(() => {
    markSeen(order[current].id);
    if (current !== introFor.current) {
      introFor.current = current;
      setIntroKey((key) => key + 1);
    }
  }, [current, order, markSeen]);

  const goTo = useCallback(
    (index: number) => {
      if (index >= order.length) return close();
      list.current?.scrollToIndex({ index, animated: true });
      setCurrent(index);
    },
    [order.length, close],
  );

  const onSwipeEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) =>
    setCurrent(Math.round(event.nativeEvent.contentOffset.x / width));

  // Shrinks a little and lets the feed show through as you drag down.
  const scale = offset.interpolate({ inputRange: [0, height], outputRange: [1, 0.85] });
  const backdrop = offset.interpolate({ inputRange: [0, height / 2], outputRange: [1, 0] });

  return (
    <>
      <StatusBar style="light" />
      <Animated.View style={[styles.backdrop, { opacity: backdrop }]} />
      <Animated.View
        style={[styles.screen, { transform: [{ translateY: offset }, { scale }] }]}
        {...panHandlers}
      >
        <Animated.FlatList
          ref={list}
          data={order}
          keyExtractor={(story) => story.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={start}
          getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onMomentumScrollEnd={onSwipeEnd}
          extraData={`${current}-${dragging}-${myStory?.items.length ?? 0}`}
          windowSize={3}
          renderItem={({ item, index }) => {
            const own = item.id === MY_STORY_ID;
            // Your own story always shows what's left after deleting.
            const user = own ? myStory : item;
            if (!user) return null;
            return (
              <StoryDepth scrollX={scrollX} index={index} width={width}>
                <StoryPage
                  user={user}
                  width={width}
                  active={index === current}
                  paused={dragging}
                  onNextUser={() => goTo(index + 1)}
                  onPrevUser={index > 0 ? () => goTo(index - 1) : undefined}
                  onClose={close}
                  onDeleteItem={own ? removeFromMyStory : undefined}
                />
              </StoryDepth>
            );
          }}
        />
        {introKey > 0 && <StoryIntro key={introKey} user={order[current]} />}
      </Animated.View>
    </>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: colors.black,
    },
    screen: {
      flex: 1,
      overflow: 'hidden',
    },
  }),
);
