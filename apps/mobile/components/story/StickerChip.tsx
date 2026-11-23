import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import type { StorySticker } from '../../data/stories';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

// How a sticker looks on a story: a white pill with "@username" (blue) or
// "📍 place" (dark), readable on any photo.
export function StickerChip({ sticker }: { sticker: Pick<StorySticker, 'kind' | 'text'> }) {
  const styles = useStyles();
  const colors = useColors();
  const mention = sticker.kind === 'mention';
  return (
    <View style={styles.chip}>
      <Ionicons
        name={mention ? 'at' : 'location'}
        size={sizes.chipIcon}
        color={mention ? colors.primary : colors.black}
      />
      <Text style={[styles.text, mention && styles.mention]} numberOfLines={1}>
        {sticker.text}
      </Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xxs,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: radius.md,
      backgroundColor: colors.white,
    },
    text: { ...typography.name, color: colors.black },
    mention: { color: colors.primary },
  }),
);
