import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { makeStyles, radius, sizes, useColors } from '../../theme';

export type SocialButtonProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string; // read out by screen readers ("Continue with Apple")
  onPress: () => void;
};

// One of the icon-only sign-in buttons under "Continue with email" (Apple, Google,
// phone): all the same size, side by side.
export function SocialButton({ icon, label, onPress }: SocialButtonProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={sizes.icon + 4} color={colors.text} />
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    button: {
      flex: 1,
      height: sizes.button,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: { opacity: 0.7 },
  }),
);
