import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { Avatar } from '../profile/Avatar';

const t = strings.comments;

export type CommentComposerProps = {
  me: { name: string; photo: string | null };
  postAuthor: string;
  replyingTo: string | null; // username you're replying to, or null for a new comment
  onCancelReply: () => void;
  onSend: (text: string) => void;
};

// The bottom of the comments sheet: quick emoji to add, a "Replying to …" bar when
// answering someone, and the text field with a blue Post button (only when there's
// something to post).
export function CommentComposer(props: CommentComposerProps) {
  const { me, postAuthor, replyingTo, onCancelReply, onSend } = props;
  const styles = useStyles();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const input = useRef<ComponentRef<typeof TextInput>>(null);
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0;

  // Tapping Reply jumps straight into the field.
  useEffect(() => {
    if (replyingTo) input.current?.focus();
  }, [replyingTo]);

  const send = () => {
    if (!canSend) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom + spacing.sm }]}>
      {replyingTo && (
        <View style={styles.replying}>
          <Text style={styles.replyingText}>{t.replyingTo(replyingTo)}</Text>
          <Pressable
            onPress={onCancelReply}
            accessibilityRole="button"
            accessibilityLabel={t.cancelReply}
            hitSlop={spacing.sm}
          >
            <Ionicons name="close" size={sizes.icon} color={colors.textMuted} />
          </Pressable>
        </View>
      )}
      <View style={styles.reactions}>
        {t.quickReactions.map((emoji) => (
          <Pressable
            key={emoji}
            onPress={() => setText((current) => current + emoji)}
            accessibilityRole="button"
            accessibilityLabel={t.addReaction(emoji)}
            hitSlop={spacing.xs}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.row}>
        <Avatar photo={me.photo} name={me.name} size={sizes.commentAvatar} border={0} />
        <TextInput
          ref={input}
          value={text}
          onChangeText={setText}
          placeholder={replyingTo ? t.replyPlaceholder(replyingTo) : t.placeholder(postAuthor)}
          placeholderTextColor={colors.textMuted}
          autoCorrect={false} // Albanian text: don't "fix" it into English
          spellCheck={false}
          selectionColor={colors.primary}
          multiline
          style={styles.input}
        />
        <Pressable
          onPress={send}
          disabled={!canSend}
          accessibilityRole="button"
          hitSlop={spacing.sm}
        >
          <Text style={[styles.post, !canSend && styles.postDisabled]}>{t.post}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    wrap: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.surfaceBorder,
      backgroundColor: colors.background,
    },
    replying: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      backgroundColor: colors.surface,
    },
    replyingText: {
      ...typography.small,
      color: colors.textMuted,
    },
    reactions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
    },
    emoji: {
      ...typography.title,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    input: {
      ...typography.input,
      flex: 1,
      maxHeight: sizes.composerMax,
      paddingVertical: spacing.sm,
      color: colors.text,
    },
    post: {
      ...typography.link,
      color: colors.primary,
    },
    postDisabled: {
      opacity: 0.4,
    },
  }),
);
