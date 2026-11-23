import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../../theme';
import { pickListingPhoto } from '../../../utils/pickImage';

const t = strings.marketplace;
const MAX_PHOTOS = 8;
const TILE = sizes.searchAvatar * 2;

export type PhotoStripProps = {
  photos: string[];
  onChange: (photos: string[]) => void;
};

// The listing's photos in a sideways row: an "Add photo" tile first (up to 8), then the
// picked photos, each with a small × to remove it. The first photo is the cover.
export function PhotoStrip({ photos, onChange }: PhotoStripProps) {
  const styles = useStyles();
  const colors = useColors();
  const add = async () => {
    const uri = await pickListingPhoto();
    if (uri) onChange([...photos, uri]);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.bar}
      contentContainerStyle={styles.row}
    >
      {photos.length < MAX_PHOTOS && (
        <Pressable
          onPress={add}
          accessibilityRole="button"
          accessibilityLabel={t.addPhoto}
          style={styles.add}
        >
          <Ionicons name="camera-outline" size={sizes.icon + 4} color={colors.primaryLight} />
          <Text style={styles.addText}>{`${photos.length}/${MAX_PHOTOS}`}</Text>
        </Pressable>
      )}
      {photos.map((uri, index) => (
        <View key={`${uri}-${index}`} style={styles.tile}>
          <Image source={{ uri }} style={styles.image} />
          <Pressable
            onPress={() => onChange(photos.filter((_, i) => i !== index))}
            accessibilityRole="button"
            accessibilityLabel={t.removePhoto}
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
    row: { gap: spacing.sm, paddingHorizontal: spacing.lg },
    add: {
      width: TILE,
      height: TILE,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xxs,
      borderRadius: radius.md,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.primary,
      backgroundColor: colors.primarySoft,
    },
    addText: { ...typography.small, color: colors.primaryLight },
    tile: { width: TILE, height: TILE, overflow: 'hidden', borderRadius: radius.md },
    image: { width: TILE, height: TILE, backgroundColor: colors.surface },
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
