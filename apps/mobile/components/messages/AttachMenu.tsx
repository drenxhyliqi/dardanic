import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

const t = strings.messages;

export type AttachMenuProps = {
  onLibrary: () => void;
  onCamera: () => void;
};

// Opens above the message field after tapping the paperclip: Photo library (pick one
// or more) or Camera (take one now).
export function AttachMenu({ onLibrary, onCamera }: AttachMenuProps) {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      <Choice icon="images-outline" label={t.library} onPress={onLibrary} />
      <Choice icon="camera-outline" label={t.camera} onPress={onCamera} />
    </View>
  );
}

type ChoiceProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
};

function Choice({ icon, label, onPress }: ChoiceProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.choice, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={sizes.icon} color={colors.text} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', gap: spacing.sm },
    choice: {
      flex: 1,
      height: sizes.headerButton,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: { opacity: 0.7 },
    label: { ...typography.label, color: colors.text },
  }),
);
