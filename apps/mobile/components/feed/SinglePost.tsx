import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { findPost } from '../../data/posts';
import { makeStyles, spacing } from '../../theme';
import { MeetCard } from '../meet/MeetCard';
import { PostCard } from './PostCard';

// One post on its own page (e.g. opened from Explore), using the same card as the
// feed, so flames, comments and the rest all work.
export function SinglePost({ id }: { id: string }) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const post = findPost(id);
  if (!post) return null;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
    >
      {post.kind === 'meet' ? <MeetCard meet={post} /> : <PostCard post={post} />}
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { paddingTop: spacing.sm },
  }),
);
