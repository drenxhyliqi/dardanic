import { StyleSheet, Text, View } from 'react-native';

import type { FeedAuthor } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { BusinessBadge } from '../ui/BusinessBadge';
import { Tag } from '../ui/Tag';

const t = strings.comments;

export type CommentNameProps = {
  author: FeedAuthor;
  isPostAuthor: boolean;
  time: string; // "9m"
};

// The line on top of a comment: username, an Author tag if they wrote the post,
// a ✓ Business badge for trusted automotive businesses, and how long ago.
export function CommentName({ author, isPostAuthor, time }: CommentNameProps) {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      <Text style={styles.username} numberOfLines={1}>
        {author.username}
      </Text>
      {isPostAuthor && <Tag label={t.author} tone="blue" />}
      {author.business && <BusinessBadge />}
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    username: {
      ...typography.label,
      flexShrink: 1,
      color: colors.text,
    },
    time: {
      ...typography.small,
      color: colors.textMuted,
    },
  }),
);
