import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Vibe } from '../../data/vibes';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

export type VibeSlotsProps = {
  picked: Vibe[];
  total: number;
  onRemove: (id: string) => void;
};

// The 5 slots above the search: picked vibes fill them in order (tap one to remove it),
// the rest stay as numbered dashed boxes. Shows the picks from every category at once.
export function VibeSlots({ picked, total, onRemove }: VibeSlotsProps) {
  const styles = useStyles();
  const colors = useColors();
  const t = strings.vibes;

  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => {
        const vibe = picked[i];
        if (!vibe) {
          return (
            <View key={`empty-${i}`} style={styles.empty} accessibilityLabel={t.emptySlot(i + 1)}>
              <Text style={styles.number}>{i + 1}</Text>
            </View>
          );
        }
        return (
          <Pressable
            key={vibe.id}
            onPress={() => onRemove(vibe.id)}
            accessibilityRole="button"
            accessibilityLabel={t.removeVibe(vibe.label)}
            style={({ pressed }) => [styles.filled, pressed && styles.pressed]}
          >
            <Text style={styles.label}>{vibe.label}</Text>
            <Ionicons name="close" size={sizes.chipIcon} color={colors.white} />
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    empty: {
      width: sizes.vibeSlotEmpty,
      height: sizes.vibeSlot,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.md,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    number: {
      ...typography.label,
      color: colors.textMuted,
    },
    filled: {
      height: sizes.vibeSlot,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: radius.md,
      backgroundColor: colors.primary,
    },
    pressed: {
      transform: [{ scale: 0.96 }],
    },
    label: {
      ...typography.link,
      color: colors.white,
    },
  }),
);
