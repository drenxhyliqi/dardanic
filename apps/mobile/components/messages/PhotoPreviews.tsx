import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, useColors } from '../../theme';
import { LoadingImage } from '../ui/LoadingImage';

const THUMB = sizes.headerButton * 2;

export type PhotoPreviewsProps = {
  photos: string[];
  onRemove: (index: number) => void;
};

// The photos you're about to send, above the message field: a row of thumbnails, each
// with a small × to leave it out. Nothing is sent until you tap Send.
export function PhotoPreviews({ photos, onRemove }: PhotoPreviewsProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.bar}
      contentContainerStyle={styles.row}
      keyboardShouldPersistTaps="handled"
    >
      {photos.map((uri, index) => (
        <View key={`${uri}-${index}`} style={styles.thumb}>
          <LoadingImage source={{ uri }} resizeMode="cover" />
          <Pressable
            onPress={() => onRemove(index)}
            accessibilityRole="button"
            accessibilityLabel={strings.messages.removePhoto}
            hitSlop={spacing.sm}
            style={styles.remove}
          >
            <Ionicons name="close" size={sizes.chipIcon} color={colors.text} />
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    bar: { flexGrow: 0 },
    row: { gap: spacing.sm },
    thumb: {
      width: THUMB,
      height: THUMB,
      overflow: 'hidden',
      borderRadius: radius.md,
      backgroundColor: colors.surface,
    },
    remove: {
      position: 'absolute',
      top: spacing.xs,
      right: spacing.xs,
      padding: spacing.xxs,
      borderRadius: radius.full,
      backgroundColor: colors.background,
    },
  }),
);
