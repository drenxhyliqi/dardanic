import { useState } from 'react';
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
import { makeStyles, spacing } from '../../theme';
import { MediaDots } from '../feed/MediaDots';
import { LoadingImage } from '../ui/LoadingImage';

export type ListingGalleryProps = {
  photos: string[];
  onOpen: (index: number) => void; // tap a photo: open it full screen
};

// A listing's photos, square and edge to edge; swipe for more, with dots underneath.
// Tapping one opens the full-screen viewer at that photo.
export function ListingGallery({ photos, onOpen }: ListingGalleryProps) {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const onEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) =>
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));

  return (
    <View>
      <FlatList
        data={photos}
        keyExtractor={(uri, i) => `${uri}-${i}`}
        horizontal
        pagingEnabled
        scrollEnabled={photos.length > 1}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onEnd}
        renderItem={({ item, index: at }) => (
          <Pressable
            onPress={() => onOpen(at)}
            accessibilityRole="imagebutton"
            accessibilityLabel={strings.marketplace.openPhoto}
            style={[styles.photo, { width, height: width }]}
          >
            <LoadingImage source={{ uri: item }} resizeMode="cover" />
          </Pressable>
        )}
      />
      {photos.length > 1 && (
        <View style={styles.dots}>
          <MediaDots count={photos.length} active={index} />
        </View>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    photo: { backgroundColor: colors.surface },
    dots: { alignItems: 'center', paddingTop: spacing.sm },
  }),
);
