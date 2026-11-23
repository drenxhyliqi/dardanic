import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { strings } from '../../i18n';
import type { MeetPost, PhotoPost } from '../../data/feed';
import { makeStyles, sizes, spacing, useColors } from '../../theme';
import { LoadingImage } from '../ui/LoadingImage';

export type ExploreTileProps = {
  post: PhotoPost | MeetPost;
  width: number;
  height: number;
};

// One picture in a grid (Explore, a profile's posts). A small icon in the corner says
// when there's more:
// several photos, or a meet. Tapping opens the full post.
export const ExploreTile = memo(function ExploreTile({ post, width, height }: ExploreTileProps) {
  const styles = useStyles();
  const colors = useColors();
  const photo = post.kind === 'meet' ? post.photo : post.photos[0];
  const corner = post.kind === 'meet' ? 'calendar' : post.photos.length > 1 ? 'copy' : null;

  return (
    <Pressable
      onPress={() =>
        router.push(post.kind === 'meet' ? `/meet/${post.id}` : `/post/${post.id}`)
      }
      accessibilityRole="imagebutton"
      accessibilityLabel={strings.search.openPost(post.author.username)}
      style={({ pressed }) => [styles.tile, { width, height }, pressed && styles.pressed]}
    >
      <LoadingImage source={{ uri: photo }} resizeMode="cover" />
      {corner && (
        <View style={styles.corner}>
          <Ionicons name={corner} size={sizes.chipIcon} color={colors.white} />
        </View>
      )}
    </Pressable>
  );
});

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    tile: { overflow: 'hidden', backgroundColor: colors.surface },
    pressed: { opacity: 0.8 },
    corner: { position: 'absolute', top: spacing.sm, right: spacing.sm },
  }),
);
