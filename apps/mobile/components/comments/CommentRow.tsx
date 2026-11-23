import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Comment } from '../../data/comments';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { withCommas } from '../../utils/text';
import { FlameIcon } from '../flame/FlameIcon';
import { Avatar } from '../profile/Avatar';
import { CommentName } from './CommentName';
import { CommentText } from './CommentText';

const t = strings.comments;

export type CommentRowProps = {
  comment: Comment;
  isPostAuthor: boolean; // wrote the post (Author tag)
  small?: boolean; // a reply: smaller avatar
  flamed?: boolean;
  onToggleFlame?: () => void; // none → no flame (e.g. the caption on top)
  onReply?: () => void; // none → no Reply link
};

// One comment: avatar, name line (tags + time), the text, and underneath "Reply" and
// "🔥 by author" when the post's author flamed it. A small flame with its count sits
// on the right. Pinned comments get a "Pinned by author" line on top.
export function CommentRow(props: CommentRowProps) {
  const { comment, isPostAuthor, small, flamed = false, onToggleFlame, onReply } = props;
  const styles = useStyles();
  const colors = useColors();
  const flames = comment.flames + (flamed ? 1 : 0);

  return (
    <View style={styles.block}>
      {comment.pinned && (
        <View style={styles.pinned}>
          <Ionicons name="pin" size={sizes.chipIcon} color={colors.textMuted} />
          <Text style={styles.muted}>{t.pinned}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Avatar
          photo={comment.author.photo}
          name={comment.author.name}
          size={small ? sizes.replyAvatar : sizes.commentAvatar}
          border={0}
        />
        <View style={styles.body}>
          <CommentName
            author={comment.author}
            isPostAuthor={isPostAuthor}
            time={strings.feed.timeAgo(comment.minutesAgo)}
          />
          <CommentText text={comment.text} />
          {(onReply || comment.authorFlamed) && (
            <View style={styles.actions}>
              {onReply && (
                <Pressable onPress={onReply} accessibilityRole="button" hitSlop={spacing.sm}>
                  <Text style={styles.action}>{t.reply}</Text>
                </Pressable>
              )}
              {comment.authorFlamed && (
                <View style={styles.authorFlamed}>
                  <FlameIcon size={sizes.chipIcon} flamed />
                  <Text style={styles.muted}>{t.authorFlamed}</Text>
                </View>
              )}
            </View>
          )}
        </View>
        {onToggleFlame && (
          <Pressable
            onPress={onToggleFlame}
            accessibilityRole="button"
            accessibilityLabel={flamed ? strings.flame.remove : strings.flame.add}
            accessibilityState={{ selected: flamed }}
            hitSlop={spacing.sm}
            style={styles.flame}
          >
            <FlameIcon size={sizes.commentFlame} flamed={flamed} color={colors.textMuted} />
            {flames > 0 && <Text style={styles.count}>{withCommas(flames)}</Text>}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    block: {
      gap: spacing.xs,
    },
    pinned: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginLeft: sizes.commentAvatar + spacing.md,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.md,
    },
    body: {
      flex: 1,
      gap: spacing.xxs,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
      marginTop: spacing.xxs,
    },
    action: {
      ...typography.label,
      color: colors.textMuted,
    },
    authorFlamed: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xxs,
    },
    muted: {
      ...typography.small,
      color: colors.textMuted,
    },
    flame: {
      alignItems: 'center',
      gap: spacing.xxs,
      paddingTop: spacing.xxs,
    },
    count: {
      ...typography.small,
      color: colors.textMuted,
    },
  }),
);
