import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { radius, sizes, spacing, typography, useColors, type Palette } from '../../theme';

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
  compact?: boolean;
  trailing?: string; // small text on the right instead of the arrow, e.g. "1/3"
  small?: boolean; // shorter button with smaller text, e.g. "Edit profile"
};

// Full-width button: optional icon + label on the left, optional arrow on the right.
// primary = blue action, secondary = dark surface, light = white (e.g. Apple).
// strong = bolder label, for the main action on a screen. centered = label in the middle.
// compact = only as wide as its label (for small side buttons like Back / Skip).
export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  showArrow = false,
  strong = false,
  disabled = false,
  centered = false,
  compact = false,
  trailing,
  small = false,
}: ButtonProps) {
  const colors = useColors();
  const palette = palettesFor(colors)[variant];

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
        compact && styles.compact,
        small && styles.small,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.leading}>
        {icon && <Ionicons name={icon} size={sizes.icon} color={palette.text} />}
        <Text
          style={[
            styles.label,
            strong && styles.strong,
            small && styles.smallLabel,
            { color: palette.text },
          ]}
        >
          {label}
        </Text>
      </View>
      {showArrow && <Ionicons name="arrow-forward" size={sizes.icon} color={palette.text} />}
      {trailing && <Text style={[styles.trailing, { color: palette.text }]}>{trailing}</Text>}
    </Pressable>
  );
}

// Colours per variant for the active theme. `light` is the strongest button (white on the
// dark theme, black on the light theme), e.g. Continue with Apple.
const palettesFor = (
  colors: Palette,
): Record<ButtonVariant, { background: string; border: string; text: string }> => ({
  primary: { background: colors.primary, border: colors.primary, text: colors.white },
  secondary: { background: colors.surface, border: colors.surfaceBorder, text: colors.text },
  light: { background: colors.contrast, border: colors.contrast, text: colors.onContrast },
});

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
  trailing: {
    ...typography.label,
    opacity: 0.8,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  centered: {
    justifyContent: 'center',
  },
  compact: {
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  small: {
    height: sizes.headerButton,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  smallLabel: typography.link,
  disabled: {
    opacity: 0.45,
  },
});
