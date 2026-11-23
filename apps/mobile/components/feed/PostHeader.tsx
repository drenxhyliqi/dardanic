import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { FeedAuthor } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { Avatar } from '../profile/Avatar';

export type PostHeaderProps = {
  author: FeedAuthor;
  details: string[]; // shown under the username, joined with dots (car, city, time)
};

// Top of a post: small avatar, username, a quiet line of details, and a ••• menu
// (the menu does nothing yet).
export function PostHeader({ author, details }: PostHeaderProps) {
  const styles = useStyles();
  const colors = useColors();

  return (
    <View style={styles.row}>
      <Avatar
        photo={author.photo}
        name={author.name}
        size={sizes.postAvatar}
        ringColor={colors.surfaceBorder}
        border={StyleSheet.hairlineWidth}
      />
      <View style={styles.text}>
        <Text style={styles.username} numberOfLines={1}>
          {author.username}
        </Text>
        <Text style={styles.details} numberOfLines={1}>
          {details.join(' · ')}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={strings.feed.post.options}
        hitSlop={spacing.md}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Ionicons name="ellipsis-horizontal" size={sizes.icon} color={colors.text} />
      </Pressable>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    text: {
      flex: 1,
    },
    username: {
      ...typography.name,
      color: colors.text,
    },
    details: {
      ...typography.small,
      color: colors.textMuted,
    },
    pressed: {
      opacity: 0.6,
    },
  }),
);
