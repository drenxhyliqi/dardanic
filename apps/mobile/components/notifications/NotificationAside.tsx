import { StyleSheet, View } from 'react-native';

import { findPost } from '../../data/posts';
import type { AppNotification } from '../../services/notifications';
import { makeStyles, radius, sizes } from '../../theme';
import { FollowButton } from '../profile/FollowButton';
import { LoadingImage } from '../ui/LoadingImage';

const STORY_RATIO = 16 / 9;

// Right side of a notification: "Follow back" for a new follower, a small picture of
// the post or story it's about, or nothing.
export function NotificationAside({ note }: { note: AppNotification }) {
  const styles = useStyles();

  if (note.kind === 'follow' && note.people.length === 1 && !note.others) {
    return <FollowButton person={note.people[0]} compact />;
  }
  if (note.storyPhoto) {
    return (
      <View style={[styles.thumb, styles.story]}>
        <LoadingImage source={{ uri: note.storyPhoto }} resizeMode="cover" />
      </View>
    );
  }
  const post = note.postId ? findPost(note.postId) : undefined;
  const photo = post?.kind === 'meet' ? post.photo : post?.kind === 'photo' ? post.photos[0] : null;
  if (!photo) return null;
  return (
    <View style={styles.thumb}>
      <LoadingImage source={{ uri: photo }} resizeMode="cover" />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    thumb: {
      width: sizes.searchAvatar,
      height: sizes.searchAvatar,
      overflow: 'hidden',
      borderRadius: radius.sm,
      backgroundColor: colors.surface,
    },
    story: {
      width: sizes.searchAvatar / STORY_RATIO,
    },
  }),
);
