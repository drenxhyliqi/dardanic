import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { strings } from '../../i18n';
import { makeStyles } from '../../theme';
import { LoadingImage } from '../ui/LoadingImage';
import { FlameBurst } from './FlameBurst';

export const MEDIA_RATIO = 5 / 4; // portrait 4:5, like Instagram
const DOUBLE_TAP_MS = 280;

export type PostMediaProps = {
  photos: string[];
  onDoubleTap: () => void;
  onIndexChange: (index: number) => void;
};

// A post's photos, edge to edge. Several photos → swipe sideways between them.
// Double-tap → onDoubleTap (flames the post) and a big flame pops on the photo; keep
// tapping quickly and the flame grows with each tap (up to a limit).
export function PostMedia({ photos, onDoubleTap, onIndexChange }: PostMediaProps) {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const height = width * MEDIA_RATIO;
  const lastTap = useRef(0);
  const [taps, setTaps] = useState(0); // taps in the current burst (0 = none showing)

  // Two quick taps start the flame; while it's showing, every tap grows it.
  const handleTap = () => {
    const now = Date.now();
    const quick = now - lastTap.current < DOUBLE_TAP_MS;
    lastTap.current = now;
    if (taps === 0 && !quick) return;
    if (taps === 0) onDoubleTap();
    setTaps((count) => count + 1);
  };
  const endBurst = useCallback(() => setTaps(0), []);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onIndexChange(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <View style={[styles.media, { width, height }]}>
      <FlatList
        data={photos}
        keyExtractor={(uri) => uri}
        horizontal
        pagingEnabled
        scrollEnabled={photos.length > 1}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={handleTap}
            style={{ width, height }}
            accessibilityLabel={strings.feed.post.photoOf(index + 1, photos.length)}
          >
            <LoadingImage source={{ uri: item }} resizeMode="cover" />
          </Pressable>
        )}
      />
      <FlameBurst taps={taps} onFinished={endBurst} />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    media: {
      backgroundColor: colors.surface,
    },
  }),
);
