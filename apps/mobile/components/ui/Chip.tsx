import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

export type ChipProps = {
  label: string;
  onPress: () => void;
  showPlus?: boolean;
};

// A small tappable suggestion, e.g. a username idea or "+ Daily driver".
export function Chip({ label, onPress, showPlus = false }: ChipProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.chip, pressed && styles.pressed]}
    >
      {showPlus && <Ionicons name="add" size={sizes.chipIcon} color={colors.primaryLight} />}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radius.sm,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: {
      opacity: 0.7,
    },
    label: {
      ...typography.label,
      color: colors.text,
    },
  }),
);
