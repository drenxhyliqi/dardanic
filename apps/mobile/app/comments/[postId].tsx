import { router, useLocalSearchParams } from 'expo-router';

import { CommentsSheet } from '../../components/comments/CommentsSheet';
import { BottomSheet } from '../../components/ui/BottomSheet';
import { findPost } from '../../data/posts';
import { strings } from '../../i18n';

// The comments on a post, in a sheet from the bottom (tap 💬 or "View all"): 70% of
// the screen, slide up for full screen. Posts come from the sample data until there's a
// backend.
export default function CommentsScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const post = findPost(postId);
  if (!post || post.kind === 'meet') return null;
  return (
    <BottomSheet title={strings.comments.title} onClosed={() => router.back()}>
      {(sheet) => <CommentsSheet post={post} onScrollStart={sheet.expand} />}
    </BottomSheet>
  );
}
