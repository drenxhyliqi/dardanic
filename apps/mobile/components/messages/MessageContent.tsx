import { StyleSheet, Text, View } from 'react-native';

import type { Message } from '../../data/messages';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { LoadingImage } from '../ui/LoadingImage';
import { SharedListingCard } from './SharedListingCard';
import { SharedMeetCard } from './SharedMeetCard';
import { SharedPostCard } from './SharedPostCard';
import { StoryReplyCard } from './StoryReplyCard';

const PHOTO_RATIO = 5 / 4;

export type MessageContentProps = {
  message: Message;
  mine: boolean;
  first: boolean; // first of a run from the same sender
  last: boolean; // last of a run
};

// What's inside a message: a text bubble (solid blue for you, grey for them, with the
// corners joining up within a run), a photo, a shared post, meet or listing, or a story
// reply.
export function MessageContent({ message, mine, first, last }: MessageContentProps) {
  const styles = useStyles();
  if (message.postId) return <SharedPostCard postId={message.postId} />;
  if (message.meetId) return <SharedMeetCard meetId={message.meetId} />;
  if (message.listingId) return <SharedListingCard id={message.listingId} />;
  if (message.photo) {
    return (
      <View style={styles.photo}>
        <LoadingImage source={{ uri: message.photo }} resizeMode="cover" radius={radius.lg} />
      </View>
    );
  }

  // Corners on the sender's side are tighter where bubbles of the same run meet.
  const top = first ? radius.lg : radius.sm;
  const bottom = last ? radius.lg : radius.sm;
  const joined = mine
    ? { borderTopRightRadius: top, borderBottomRightRadius: bottom }
    : { borderTopLeftRadius: top, borderBottomLeftRadius: bottom };

  return (
    <View style={[styles.stack, mine && styles.stackMine]}>
      {message.story && <StoryReplyCard photo={message.story} mine={mine} />}
      {message.text && (
        <View style={[styles.bubble, mine ? styles.mine : styles.theirs, joined]}>
          <Text style={[styles.text, mine && styles.textMine]}>{message.text}</Text>
        </View>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    stack: {
      gap: spacing.xs,
      alignItems: 'flex-start',
    },
    stackMine: {
      alignItems: 'flex-end',
    },
    bubble: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radius.lg,
    },
    mine: {
      backgroundColor: colors.primary,
    },
    theirs: {
      backgroundColor: colors.surface,
    },
    text: {
      ...typography.body,
      color: colors.text,
    },
    textMine: {
      color: colors.white,
    },
    photo: {
      width: sizes.chatPhoto,
      height: sizes.chatPhoto * PHOTO_RATIO,
      overflow: 'hidden',
      borderRadius: radius.lg,
    },
  }),
);
