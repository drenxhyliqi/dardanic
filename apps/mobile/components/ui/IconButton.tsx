import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { makeStyles, radius, sizes, useColors } from '../../theme';

export type IconButtonProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string; // read out by screen readers
  onPress?: () => void;
  round?: boolean; // circle instead of the usual small corners
};

// A square (or round) button holding one icon, on a dark surface.
export function IconButton({ icon, label, onPress, round = false }: IconButtonProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.button, round && styles.round, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={sizes.icon} color={colors.text} />
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    button: {
      width: sizes.headerButton,
      height: sizes.headerButton,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    round: {
      borderRadius: radius.full,
    },
    pressed: {
      opacity: 0.7,
    },
  }),
);
