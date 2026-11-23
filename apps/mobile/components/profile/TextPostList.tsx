import { StyleSheet, View } from 'react-native';

import type { TextPost } from '../../data/feed';
import { makeStyles, spacing } from '../../theme';
import { PostCard } from '../feed/PostCard';

// A profile's text posts (statuses), newest first, using the feed's post card so
// flames, comments and shares work the same, with a thin line between them.
export function TextPostList({ posts }: { posts: TextPost[] }) {
  const styles = useStyles();
  return (
    <View>
      {posts.map((post, index) => (
        <View key={post.id} style={index > 0 && styles.divider}>
          <PostCard post={post} />
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    divider: {
      marginTop: spacing.lg,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.surfaceBorder,
    },
  }),
);
