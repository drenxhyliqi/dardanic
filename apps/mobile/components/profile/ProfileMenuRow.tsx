import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';

export type ProfileMenuRowProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
};

// One option in a profile's ••• menu: icon and label.
export function ProfileMenuRow({ icon, label, onPress }: ProfileMenuRowProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={sizes.headerIcon} color={colors.text} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
    },
    pressed: { backgroundColor: colors.surface },
    label: { ...typography.body, color: colors.text },
  }),
);
