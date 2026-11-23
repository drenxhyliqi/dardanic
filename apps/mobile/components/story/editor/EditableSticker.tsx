import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import type { StorySticker } from '../../../data/stories';
import { strings } from '../../../i18n';
import { makeStyles, radius, sizes, spacing, useColors } from '../../../theme';
import { StickerChip } from '../StickerChip';
import { useDragGesture } from './useDragGesture';

export type EditableStickerProps = {
  sticker: StorySticker;
  start: { x: number; y: number }; // px
  register: (id: string, current: () => { x: number; y: number }) => void;
  onRemove: () => void;
};

// A sticker while editing: drag it anywhere; the small × removes it.
export function EditableSticker({ sticker, start, register, onRemove }: EditableStickerProps) {
  const styles = useStyles();
  const colors = useColors();
  const drag = useDragGesture(start);

  useEffect(() => register(sticker.id, drag.current), [register, sticker.id, drag.current]);

  return (
    <Animated.View
      style={[styles.box, { transform: drag.animated.getTranslateTransform() }]}
      {...drag.panHandlers}
    >
      <StickerChip sticker={sticker} />
      <Pressable
        onPress={onRemove}
        accessibilityRole="button"
        accessibilityLabel={strings.story.removeSticker}
        hitSlop={spacing.sm}
        style={styles.remove}
      >
        <Ionicons name="close" size={sizes.chipIcon - 2} color={colors.white} />
      </Pressable>
    </Animated.View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    box: { position: 'absolute', left: 0, top: 0 },
    remove: {
      position: 'absolute',
      top: -spacing.sm,
      right: -spacing.sm,
      padding: spacing.xxs,
      borderRadius: radius.full,
      backgroundColor: colors.black,
    },
  }),
);
