import Ionicons from '@expo/vector-icons/Ionicons';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { FeedAuthor } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { Avatar } from '../profile/Avatar';
import { FollowButton } from '../profile/FollowButton';
import { BusinessBadge } from '../ui/BusinessBadge';


export type AccountRowProps = {
  person: FeedAuthor;
  onPress: () => void;
  onRemove?: () => void; // in recent searches: an ✕ instead of Follow
};

// A person or business in search: picture, username (+ ✓ Business), name, and a small
// Follow button (or ✕ to remove it from recent searches).
export const AccountRow = memo(function AccountRow({ person, onPress, onRemove }: AccountRowProps) {
  const styles = useStyles();
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Avatar photo={person.photo} name={person.name} size={sizes.searchAvatar} border={0} />
      <View style={styles.names}>
        <View style={styles.nameRow}>
          <Text style={styles.username} numberOfLines={1}>
            {person.username}
          </Text>
          {person.business && <BusinessBadge />}
          {person.private && (
            <Ionicons
              name="lock-closed"
              size={sizes.chipIcon}
              color={colors.textMuted}
              accessibilityLabel={strings.privacy.locked}
            />
          )}
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {person.name}
        </Text>
      </View>
      {onRemove ? (
        <Pressable
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel={strings.search.removeRecent(person.username)}
          hitSlop={spacing.md}
        >
          <Ionicons name="close" size={sizes.icon} color={colors.textMuted} />
        </Pressable>
      ) : (
        <FollowButton person={person} compact />
      )}
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
    pressed: { backgroundColor: colors.surface },
    names: { flex: 1 },
    nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    username: { ...typography.name, flexShrink: 1, color: colors.text },
    name: { ...typography.small, color: colors.textMuted },
  }),
);
