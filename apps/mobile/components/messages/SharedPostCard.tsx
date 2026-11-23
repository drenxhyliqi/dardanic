import { StyleSheet, Text, View } from 'react-native';

import { SAMPLE_FEED } from '../../data/feed';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { Avatar } from '../profile/Avatar';
import { LoadingImage } from '../ui/LoadingImage';

// A feed post shared in a chat: who posted it, the first photo, and the caption.
// (Tapping it will open the post later.)
export function SharedPostCard({ postId }: { postId: string }) {
  const styles = useStyles();
  const post = SAMPLE_FEED.find((item) => item.id === postId);
  if (!post || post.kind === 'meet') return null;

  return (
    <View style={styles.card}>
      <View style={styles.author}>
        <Avatar
          photo={post.author.photo}
          name={post.author.name}
          size={sizes.replyAvatar}
          border={0}
        />
        <Text style={styles.username} numberOfLines={1}>
          {post.author.username}
        </Text>
      </View>
      {post.kind === 'photo' && (
        <View style={styles.photo}>
          <LoadingImage source={{ uri: post.photos[0] }} resizeMode="cover" />
        </View>
      )}
      <Text style={styles.text} numberOfLines={2}>
        {post.kind === 'photo' ? post.caption : post.text}
      </Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      width: sizes.chatPhoto,
      overflow: 'hidden',
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    author: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      padding: spacing.sm,
    },
    username: {
      ...typography.label,
      flexShrink: 1,
      color: colors.text,
    },
    photo: {
      width: sizes.chatPhoto,
      height: sizes.chatPhoto,
    },
    text: {
      ...typography.small,
      padding: spacing.sm,
      color: colors.textMuted,
    },
  }),
);
