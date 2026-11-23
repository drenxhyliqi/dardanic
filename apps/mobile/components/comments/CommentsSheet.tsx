import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { useComments } from '../../context/CommentsContext';
import type { Comment } from '../../data/comments';
import type { PhotoPost, TextPost } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, spacing } from '../../theme';
import { openAtStart, pinnedFirst } from '../../utils/commentTree';
import { useProfileData } from '../profile/useProfileData';
import { EmptyState } from '../ui/EmptyState';
import { CommentComposer } from './CommentComposer';
import { CommentRow } from './CommentRow';
import { CommentSkeleton } from './CommentSkeleton';
import { CommentThread } from './CommentThread';

const t = strings.comments;
const FAKE_LOAD_MS = 500; // until there's a backend to fetch from
const OPEN_LEVELS = 2; // replies showing at the start: comments + their replies

export type CommentsSheetProps = {
  post: PhotoPost | TextPost;
  onScrollStart?: () => void; // e.g. open the sheet full screen
};

// The comments on one post: the post's caption (or text) on top, then the threads with
// nested replies, pinned ones first, and the field to write your own at the bottom.
// Your comments and replies show straight away.
export function CommentsSheet({ post, onScrollStart }: CommentsSheetProps) {
  const styles = useStyles();
  const profile = useProfileData();
  const { commentsFor, add, isFlamed, toggleFlame } = useComments();
  const comments = commentsFor(post.id);
  const list = useRef<FlatList<Comment>>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState<ReadonlySet<string>>(
    () => new Set(openAtStart(comments, OPEN_LEVELS)),
  );
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const me = {
    name: profile.displayName || profile.username,
    username: profile.username,
    photo: profile.photo,
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), FAKE_LOAD_MS);
    return () => clearTimeout(timer);
  }, []);

  const toggleOpen = useCallback((id: string) => {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const send = (text: string) => {
    add(post.id, me, text, replyTo?.id);
    if (replyTo) {
      setOpen((current) => new Set(current).add(replyTo.id)); // show the new reply
      setReplyTo(null);
    } else {
      setTimeout(() => list.current?.scrollToEnd({ animated: true }), 50);
    }
  };

  const caption: Comment = {
    id: post.id,
    author: post.author,
    text: post.kind === 'photo' ? post.caption : post.text,
    minutesAgo: post.minutesAgo,
    flames: 0,
    replies: [],
  };

  return (
    <KeyboardAvoidingView
      style={styles.sheet}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.listBox}>
        <FlatList
          ref={list}
          data={isLoading ? [] : pinnedFirst(comments)}
          keyExtractor={(comment) => comment.id}
          keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="never"
          onScrollBeginDrag={onScrollStart}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <View style={styles.caption}>
              <CommentRow comment={caption} isPostAuthor />
            </View>
          }
          ListEmptyComponent={
            isLoading ? (
              <CommentSkeleton />
            ) : (
              <EmptyState icon="chatbubbles-outline" title={t.emptyTitle} hint={t.emptyHint} />
            )
          }
          renderItem={({ item }) => (
            <CommentThread
              comment={item}
              depth={0}
              postAuthor={post.author.username}
              open={open}
              onToggleOpen={toggleOpen}
              onReply={setReplyTo}
              isFlamed={isFlamed}
              onToggleFlame={toggleFlame}
            />
          )}
        />
      </View>
      <CommentComposer
        me={me}
        postAuthor={post.author.username}
        replyingTo={replyTo?.author.username ?? null}
        onCancelReply={() => setReplyTo(null)}
        onSend={send}
      />
    </KeyboardAvoidingView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    sheet: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listBox: {
      flex: 1,
      overflow: 'hidden',
    },
    content: {
      gap: spacing.xl,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    caption: {
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.surfaceBorder,
    },
  }),
);
