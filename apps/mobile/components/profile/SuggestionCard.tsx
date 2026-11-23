import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { VIBES } from '../../data/vibes';
import { strings } from '../../i18n';
import type { SuggestedAccount } from '../../services/search';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { Avatar } from './Avatar';
import { FollowButton } from './FollowButton';

const REASON_VIBES = 2;
const t = strings.suggestions;

export type SuggestionCardProps = {
  suggestion: SuggestedAccount;
  onHide: () => void;
};

// One "Suggested for you" card: ✕ to remove it, their photo, name, why they're
// suggested ("Into BMW · Stance") and Follow. Tapping the card opens their profile.
export const SuggestionCard = memo(function SuggestionCard(props: SuggestionCardProps) {
  const { suggestion, onHide } = props;
  const styles = useStyles();
  const colors = useColors();
  const { person, sharedVibes } = suggestion;
  const labels = sharedVibes
    .slice(0, REASON_VIBES)
    .map((id) => VIBES.find((vibe) => vibe.id === id)?.label)
    .filter(Boolean);
  const reason = labels.length ? t.into(labels.join(' · ')) : t.popular;

  return (
    <Pressable
      onPress={() => router.push(`/user/${person.username}`)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Pressable
        onPress={onHide}
        accessibilityRole="button"
        accessibilityLabel={t.hide(person.username)}
        hitSlop={spacing.sm}
        style={styles.hide}
      >
        <Ionicons name="close" size={sizes.chipIcon + 2} color={colors.textMuted} />
      </Pressable>
      <Avatar photo={person.photo} name={person.name} size={sizes.suggestionAvatar} border={0} />
      <Text style={styles.name} numberOfLines={1}>
        {person.username}
      </Text>
      <Text style={styles.reason} numberOfLines={2}>
        {reason}
      </Text>
      <FollowButton person={person} compact />
    </Pressable>
  );
});

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      width: sizes.suggestionCard,
      alignItems: 'center',
      gap: spacing.xs,
      padding: spacing.md,
      paddingTop: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: { opacity: 0.85 },
    hide: { position: 'absolute', top: spacing.sm, right: spacing.sm },
    name: { ...typography.name, marginTop: spacing.xs, color: colors.text },
    reason: {
      ...typography.small,
      textAlign: 'center',
      minHeight: typography.small.lineHeight * 2, // two lines, so cards line up
      color: colors.textMuted,
    },
  }),
);
