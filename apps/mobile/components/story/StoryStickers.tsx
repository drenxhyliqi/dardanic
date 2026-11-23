import { router } from 'expo-router';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import type { StorySticker } from '../../data/stories';
import { StickerChip } from './StickerChip';

// The stickers on a story, where they were put (x / y = share of the screen). Tapping
// a @mention opens that person's profile.
export function StoryStickers({ stickers }: { stickers: StorySticker[] }) {
  const { width, height } = useWindowDimensions();
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {stickers.map((sticker) => (
        <Pressable
          key={sticker.id}
          disabled={sticker.kind !== 'mention'}
          onPress={() => router.push(`/user/${sticker.text}`)}
          style={[styles.sticker, { left: sticker.x * width, top: sticker.y * height }]}
        >
          <StickerChip sticker={sticker} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sticker: { position: 'absolute' },
});
