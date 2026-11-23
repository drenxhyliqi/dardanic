import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Comment } from '../../data/comments';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography } from '../../theme';
import { countAll } from '../../utils/commentTree';
import { CommentRow } from './CommentRow';

const t = strings.comments;
const MAX_INDENT = 3; // deeper replies stop moving right (stays readable on a phone)

export type CommentThreadProps = {
  comment: Comment;
  depth: number; // 0 = a comment on the post, 1 = a reply, 2 = a reply to a reply…
  postAuthor: string; // username of whoever wrote the post
  open: ReadonlySet<string>; // comments whose replies are showing
  onToggleOpen: (id: string) => void;
  onReply: (comment: Comment) => void;
  isFlamed: (id: string) => boolean;
  onToggleFlame: (id: string) => void;
};

// A comment and, under it, its replies, each of which is a thread of its own, so
// replies nest. A thin line on the left links replies to the comment they answer.
// Folded replies show "View N replies"; open ones can be folded with "Hide replies".
export const CommentThread = memo(function CommentThread(props: CommentThreadProps) {
  const { comment, depth, postAuthor, open, onToggleOpen, onReply, isFlamed, onToggleFlame } =
    props;
  const styles = useStyles();
  const isOpen = open.has(comment.id);
  const indent = depth < MAX_INDENT; // replies move one step right, up to the limit

  return (
    <View style={styles.thread}>
      <CommentRow
        comment={comment}
        isPostAuthor={comment.author.username === postAuthor}
        small={depth > 0}
        flamed={isFlamed(comment.id)}
        onToggleFlame={() => onToggleFlame(comment.id)}
        onReply={() => onReply(comment)}
      />

      {comment.replies.length > 0 && (
        <View style={[styles.replies, indent && styles.indent, indent && lineFor(depth)]}>
          {isOpen &&
            comment.replies.map((reply) => (
              <CommentThread key={reply.id} {...props} comment={reply} depth={depth + 1} />
            ))}
          <Pressable
            onPress={() => onToggleOpen(comment.id)}
            accessibilityRole="button"
            hitSlop={spacing.sm}
          >
            <Text style={styles.toggle}>
              {isOpen ? t.hideReplies : t.viewReplies(countAll(comment.replies))}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
});

// The line sits under the middle of this comment's avatar.
const lineFor = (depth: number) => {
  const avatar = depth === 0 ? sizes.commentAvatar : sizes.replyAvatar;
  return { marginLeft: (avatar - sizes.threadLine) / 2 };
};

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    thread: {
      gap: spacing.md,
    },
    replies: {
      gap: spacing.md,
    },
    indent: {
      paddingLeft: spacing.md,
      borderLeftWidth: sizes.threadLine,
      borderLeftColor: colors.surfaceBorder,
    },
    toggle: {
      ...typography.label,
      color: colors.textMuted,
    },
  }),
);
