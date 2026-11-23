import Ionicons from '@expo/vector-icons/Ionicons';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Conversation } from '../../data/messages';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { BusinessBadge } from '../ui/BusinessBadge';
import { ChatAvatar } from './ChatAvatar';
import { previewOf } from './messageText';

const t = strings.messages;

export type InboxRowProps = {
  chat: Conversation;
  onPress: () => void;
};

// One conversation in the inbox: picture, name (+ ✓ Business, 🔕 when muted), a preview
// of the last message (bold when unread, blue while someone types), the time and a red
// unread count.
export const InboxRow = memo(function InboxRow({ chat, onPress }: InboxRowProps) {
  const styles = useStyles();
  const colors = useColors();
  const unread = chat.unread > 0;
  const last = chat.messages.at(-1);
  const business = chat.kind === 'direct' && chat.members[0]?.business;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <ChatAvatar chat={chat} size={sizes.inboxAvatar} />
      <View style={styles.middle}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, unread && styles.bold]} numberOfLines={1}>
            {chat.title}
          </Text>
          {business && <BusinessBadge />}
          {chat.muted && (
            <Ionicons
              name="notifications-off-outline"
              size={sizes.chipIcon}
              color={colors.textMuted}
              accessibilityLabel={t.muted}
            />
          )}
        </View>
        <Text
          style={[styles.preview, unread && styles.previewUnread, chat.typing && styles.typing]}
          numberOfLines={1}
        >
          {previewOf(chat)}
        </Text>
      </View>
      <View style={styles.right}>
        {last && <Text style={styles.time}>{strings.feed.timeAgo(last.minutesAgo)}</Text>}
        {unread && (
          <View style={styles.badge} accessibilityLabel={t.unread(chat.unread)}>
            <Text style={styles.badgeText}>{chat.unread}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
});

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    pressed: {
      backgroundColor: colors.surface,
    },
    middle: {
      flex: 1,
      gap: spacing.xxs,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    title: {
      ...typography.name,
      flexShrink: 1,
      color: colors.text,
    },
    bold: {
      fontWeight: '700',
    },
    preview: {
      ...typography.paragraph,
      color: colors.textMuted,
    },
    previewUnread: {
      ...typography.label,
      color: colors.text,
    },
    typing: {
      color: colors.primaryLight,
    },
    right: {
      alignItems: 'flex-end',
      gap: spacing.xs,
    },
    time: {
      ...typography.small,
      color: colors.textMuted,
    },
    badge: {
      minWidth: sizes.unreadBadge,
      height: sizes.unreadBadge,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: colors.alert,
    },
    badgeText: {
      ...typography.badge,
      letterSpacing: 0,
      color: colors.white,
    },
  }),
);
