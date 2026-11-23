import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Conversation } from '../../data/messages';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { BusinessBadge } from '../ui/BusinessBadge';
import { ChatAvatar } from './ChatAvatar';
import { statusOf } from './messageText';

const t = strings.messages;

// Top of a chat: back, the chat's picture and name (+ ✓ Business), a status line
// ("Active 5m ago", "Crew · 24 members", or "… is typing"), and an info button
// (does nothing yet).
export function ChatHeader({ chat }: { chat: Conversation }) {
  const styles = useStyles();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const business = chat.kind === 'direct' && chat.members[0]?.business;
  const status = chat.typing ? t.typing(chat.typing) : statusOf(chat);

  return (
    <View style={[styles.bar, { paddingTop: insets.top + spacing.xs }]}>
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel={t.back}
        hitSlop={spacing.sm}
      >
        <Ionicons name="chevron-back" size={sizes.headerIcon} color={colors.text} />
      </Pressable>
      <ChatAvatar chat={chat} size={sizes.headerButton} />
      <View style={styles.middle}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {chat.title}
          </Text>
          {business && <BusinessBadge />}
        </View>
        {status !== '' && (
          <Text style={[styles.status, chat.typing && styles.typing]} numberOfLines={1}>
            {status}
          </Text>
        )}
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel={t.info} hitSlop={spacing.sm}>
        <Ionicons name="information-circle-outline" size={sizes.headerIcon} color={colors.text} />
      </Pressable>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.surfaceBorder,
      backgroundColor: colors.background,
    },
    middle: {
      flex: 1,
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
    status: {
      ...typography.small,
      color: colors.textMuted,
    },
    typing: {
      color: colors.primaryLight,
    },
  }),
);
