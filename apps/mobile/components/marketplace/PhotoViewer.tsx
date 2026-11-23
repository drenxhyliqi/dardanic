import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { LoadingImage } from '../ui/LoadingImage';

const t = strings.marketplace;
const MAX_ZOOM = 4;

export type PhotoViewerProps = {
  photos: string[];
  start: number; // the photo that was tapped
};

// A listing's photos full screen, on black: swipe between them, pinch (or double-tap
// zoom on iOS) to look at details. × on the left closes, "7 of 9" sits top centre.
export function PhotoViewer({ photos, start }: PhotoViewerProps) {
  const styles = useStyles();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(start);
  const onEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) =>
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));

  return (
    <View style={styles.screen}>
      <FlatList
        data={photos}
        keyExtractor={(uri, i) => `${uri}-${i}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={start}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onMomentumScrollEnd={onEnd}
        renderItem={({ item }) => (
          // Each photo zooms on its own (pinch); zooming back out lets you swipe again.
          <ScrollView
            style={{ width, height }}
            contentContainerStyle={styles.page}
            maximumZoomScale={MAX_ZOOM}
            minimumZoomScale={1}
            centerContent
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ width, height }}>
              <LoadingImage source={{ uri: item }} resizeMode="contain" />
            </View>
          </ScrollView>
        )}
      />
      <View style={[styles.top, { paddingTop: insets.top + spacing.sm }]} pointerEvents="box-none">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel={t.closePhotos}
          hitSlop={spacing.md}
          style={styles.close}
        >
          <Ionicons name="close" size={sizes.icon + 4} color={colors.white} />
        </Pressable>
        <Text style={styles.count}>{t.photoCount(index + 1, photos.length)}</Text>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.black },
    page: { flexGrow: 1, alignItems: 'center', justifyContent: 'center' },
    top: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    // The × sits on the left; the count stays centred on the screen.
    close: { position: 'absolute', left: spacing.lg, bottom: 0 },
    count: { ...typography.label, color: colors.white },
  }),
);
