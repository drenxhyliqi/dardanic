import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, sizes, typography, useColors } from '../../theme';
import { initials } from '../../utils/text';
import { LoadingImage } from '../ui/LoadingImage';

export type AvatarProps = {
  photo: string | null;
  name: string; // used for initials when there's no photo
  size?: number;
  ringColor?: string; // the border around the circle; match what's behind it
  border?: number; // width of that border (thinner on small avatars)
};

// Round profile picture: the photo if there is one, otherwise the user's initials,
// otherwise a person icon (nothing typed yet).
export function Avatar({
  photo,
  name,
  size = sizes.avatar,
  ringColor,
  border = sizes.avatarBorder,
}: AvatarProps) {
  const styles = useStyles();
  const colors = useColors();
  const ring = ringColor ?? colors.surface;
  const letters = initials(name);

  return (
    <View
      style={[styles.circle, { width: size, height: size, borderColor: ring, borderWidth: border }]}
    >
      {photo ? (
        <LoadingImage source={{ uri: photo }} resizeMode="cover" radius={radius.full} />
      ) : letters ? (
        <Text
          style={[
            styles.initials,
            size < sizes.avatar && styles.initialsSmall,
            size < sizes.commentAvatar && styles.initialsTiny,
          ]}
        >
          {letters}
        </Text>
      ) : (
        <Ionicons name="person" size={sizes.headerIcon} color={colors.primaryLight} />
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    circle: {
      borderRadius: radius.full,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    initials: {
      ...typography.title,
      color: colors.primaryLight,
    },
    initialsSmall: typography.label,
    initialsTiny: typography.badge, // faces on meet cards, replies
  }),
);
