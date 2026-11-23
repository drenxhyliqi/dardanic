import { memo, useCallback, useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { StoryUser } from '../../data/stories';
import { strings } from '../../i18n';
import { makeStyles, spacing } from '../../theme';
import { StoryCaption } from './StoryCaption';
import { OwnStoryControls } from './OwnStoryControls';
import { StoryFooter } from './StoryFooter';
import { StoryHeader } from './StoryHeader';
import { StoryProgress } from './StoryProgress';
import { StoryStickers } from './StoryStickers';
import { StoryMediaView } from './StoryMediaView';
import { useStoryTimer } from './useStoryTimer';

const PHOTO_MS = 5000;
const BACK_ZONE = 0.3; // left 30% of the screen goes back, the rest goes forward
const HOLD_MS = 200;

export type StoryPageProps = {
  user: StoryUser;
  width: number;
  active: boolean; // the person on screen now (others stay still)
  paused: boolean; // e.g. while dragging the viewer down
  onNextUser: () => void;
  onPrevUser?: () => void; // missing for the first person: going back restarts instead
  onClose: () => void;
  onDeleteItem?: (id: string) => void; // set only for your own story
};

// One person's stories, full screen. Tap right → next photo, tap left → previous,
// hold → pause (bars and buttons hide). The bar fills over 5 s (a video: its length),
// starting once it has loaded; after the last one it moves on to the next person.
export const StoryPage = memo(function StoryPage(props: StoryPageProps) {
  const { user, width, active, paused, onNextUser, onPrevUser, onClose, onDeleteItem } = props;
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const [restarts, setRestarts] = useState(0);
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [holding, setHolding] = useState(false);
  const [typing, setTyping] = useState(false);
  const last = user.items.length - 1;
  const item = user.items[Math.min(index, last)]; // stays valid after deleting one

  const next = useCallback(() => {
    if (index < last) setIndex(index + 1);
    else onNextUser();
  }, [index, last, onNextUser]);

  const previous = () => {
    if (index > 0) setIndex(index - 1);
    else if (onPrevUser) onPrevUser();
    else setRestarts((count) => count + 1);
  };

  // `typing` also covers your own story's panels (viewers, •••).
  const playing = active && loadedId === item.id && !holding && !typing && !paused;
  const progress = useStoryTimer({
    duration: item.video ? (item.durationMs ?? PHOTO_MS) : PHOTO_MS,
    running: playing,
    resetKey: `${item.id}-${restarts}`,
    onFinish: next,
  });

  // Start downloading the next photo now so it shows straight away.
  useEffect(() => {
    const upcoming = user.items[index + 1];
    if (upcoming && !upcoming.video) Image.prefetch(upcoming.photo).catch(() => {});
  }, [index, user.items]);

  const onTap = (event: GestureResponderEvent) =>
    event.nativeEvent.locationX < width * BACK_ZONE ? previous() : next();

  return (
    <View style={[styles.page, { width }]}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={onTap}
        onLongPress={() => setHolding(true)}
        onPressOut={() => setHolding(false)}
        delayLongPress={HOLD_MS}
        accessibilityLabel={strings.story.photoOf(user.label, index + 1, user.items.length)}
      >
        <StoryMediaView item={item} playing={playing} onLoaded={() => setLoadedId(item.id)} />
        <View style={styles.fade} pointerEvents="none" />
        {item.stickers && <StoryStickers stickers={item.stickers} />}
        {item.caption && <StoryCaption text={item.caption} />}
      </Pressable>

      <KeyboardAvoidingView
        style={[styles.overlay, holding && styles.hidden]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        pointerEvents="box-none"
      >
        <View style={[styles.top, { paddingTop: insets.top + spacing.sm }]}>
          <StoryProgress count={user.items.length} index={index} progress={progress} />
          <StoryHeader
            label={user.label}
            name={user.name}
            avatar={user.avatar}
            time={strings.feed.timeAgo(item.minutesAgo)}
            onClose={onClose}
          />
        </View>
        <View style={[styles.bottom, { paddingBottom: insets.bottom + spacing.sm }]}>
          {onDeleteItem ? (
            <OwnStoryControls onDelete={() => onDeleteItem(item.id)} onPauseChange={setTyping} />
          ) : (
            <StoryFooter label={user.label} onTypingChange={setTyping} />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
});

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: colors.black,
    },
    fade: {
      ...StyleSheet.absoluteFill,
      backgroundImage: colors.storyFade,
    },
    overlay: {
      ...StyleSheet.absoluteFill,
      justifyContent: 'space-between',
    },
    hidden: {
      opacity: 0,
    },
    top: {
      gap: spacing.md,
      paddingHorizontal: spacing.md,
    },
    bottom: {
      paddingHorizontal: spacing.md,
    },
  }),
);
