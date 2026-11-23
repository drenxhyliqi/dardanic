import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

export type CreateOptionCardProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  hint: string;
  onPress: () => void;
};

// One choice in the Create sheet: a blue icon in a soft circle, the name and one line
// saying what it's for.
export function CreateOptionCard({ icon, title, hint, onPress }: CreateOptionCardProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${hint}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.icon}>
        <Ionicons name={icon} size={sizes.icon + 4} color={colors.primaryLight} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.hint}>{hint}</Text>
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      flexBasis: '47%',
      flexGrow: 1,
      gap: spacing.xs,
      padding: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: { opacity: 0.8 },
    icon: {
      width: sizes.headerButton + spacing.sm,
      height: sizes.headerButton + spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
      borderRadius: radius.full,
      backgroundColor: colors.primarySoft,
    },
    title: { ...typography.cardTitle, color: colors.text },
    hint: { ...typography.small, color: colors.textMuted },
  }),
);
