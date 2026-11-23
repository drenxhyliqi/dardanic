import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { makeStyles, radius, sizes, spacing, useColors } from '../../../theme';

export type CameraIconProps = {
  icon?: ComponentProps<typeof Ionicons>['name']; // none = an empty spot (keeps the layout)
  label?: string;
  onPress?: () => void;
  filled?: boolean; // a soft dark circle behind it, for bright photos
};

// A white icon button on the camera (×, flash, library, switch camera).
export function CameraIcon({ icon, label, onPress, filled = false }: CameraIconProps) {
  const styles = useStyles();
  const colors = useColors();
  if (!icon) return <View style={styles.button} />;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={spacing.sm}
      style={[styles.button, filled && styles.filled]}
    >
      <Ionicons name={icon} size={sizes.icon + 4} color={colors.white} />
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
      borderRadius: radius.full,
    },
    filled: { backgroundColor: colors.storyControl },
  }),
);
