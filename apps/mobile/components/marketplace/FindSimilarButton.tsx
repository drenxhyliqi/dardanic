import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

// A quiet pill on top of a listing's photo, next to the back button (same height and
// look, not blue): "Find similar" opens a page of listings like this one.
export function FindSimilarButton({ id }: { id: string }) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={() => router.push(`/similar/${id}`)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.pill, pressed && styles.pressed]}
    >
      <Ionicons name="search" size={sizes.chipIcon} color={colors.text} />
      <Text style={styles.label}>{strings.marketplace.findSimilar}</Text>
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    pill: {
      height: sizes.headerButton,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: { opacity: 0.7 },
    label: { ...typography.label, color: colors.text },
  }),
);
