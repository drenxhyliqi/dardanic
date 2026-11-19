import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

export type VibeChipProps = {
  label: string;
  selected: boolean;
  disabled: boolean; // true when 5 are already picked and this one isn't
  onPress: () => void;
};

// A vibe to pick: see-through with a dashed outline and "+", solid blue with a ✓ once picked.
export function VibeChip({ label, selected, disabled, onPress }: VibeChipProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked: selected, disabled }}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.selected,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons
        name={selected ? 'checkmark' : 'add'}
        size={sizes.icon}
        color={selected ? colors.white : colors.primaryLight}
      />
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
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
      paddingLeft: spacing.md,
      paddingRight: spacing.lg,
      borderRadius: radius.md,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.borderFocus,
    },
    selected: {
      borderStyle: 'solid',
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    disabled: {
      opacity: 0.4,
    },
    pressed: {
      transform: [{ scale: 0.96 }],
    },
    label: {
      ...typography.link,
      color: colors.text,
    },
    labelSelected: {
      color: colors.white,
    },
  }),
);
