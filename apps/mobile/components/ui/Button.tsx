import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, sizes, spacing, typography } from '../../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type ButtonVariant = 'primary' | 'secondary' | 'light';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  showArrow?: boolean;
  strong?: boolean;
  disabled?: boolean;
  centered?: boolean;
};

// Full-width button: optional icon + label on the left, optional arrow on the right.
// primary = blue action, secondary = dark surface, light = white (e.g. Apple).
// strong = bolder label, for the main action on a screen. centered = label in the middle.
export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  showArrow = false,
  strong = false,
  disabled = false,
  centered = false,
}: ButtonProps) {
  const palette = palettes[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: palette.background, borderColor: palette.border },
        centered && styles.centered,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.leading}>
        {icon && <Ionicons name={icon} size={sizes.icon} color={palette.text} />}
        <Text style={[styles.label, strong && styles.strong, { color: palette.text }]}>
          {label}
        </Text>
      </View>
      {showArrow && <Ionicons name="arrow-forward" size={sizes.icon} color={palette.text} />}
    </Pressable>
  );
}

const palettes: Record<ButtonVariant, { background: string; border: string; text: string }> = {
  primary: { background: colors.primary, border: colors.primary, text: colors.white },
  secondary: { background: colors.surface, border: colors.surfaceBorder, text: colors.text },
  light: { background: colors.white, border: colors.white, text: colors.black },
};

const styles = StyleSheet.create({
  base: {
    height: sizes.button,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  leading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  label: typography.button,
  strong: typography.buttonStrong,
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  centered: {
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.45,
  },
});
