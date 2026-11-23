import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

export type LinkRowProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  hint?: string; // a quiet second line
  count?: number; // red badge (e.g. new requests)
  onPress: () => void;
};

// A tappable row that opens another page: icon, label (+ hint), optional red count,
// and a › on the right.
export function LinkRow({ icon, label, hint, count, onPress }: LinkRowProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.icon}>
        <Ionicons name={icon} size={sizes.icon} color={colors.primaryLight} />
      </View>
      <View style={styles.text}>
        <Text style={styles.label}>{label}</Text>
        {hint && <Text style={styles.hint}>{hint}</Text>}
      </View>
      {!!count && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={sizes.icon} color={colors.textMuted} />
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      padding: spacing.md,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: {
      opacity: 0.8,
    },
    icon: {
      width: sizes.headerButton,
      height: sizes.headerButton,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      backgroundColor: colors.primarySoft,
    },
    text: {
      flex: 1,
      gap: spacing.xxs,
    },
    label: {
      ...typography.name,
      color: colors.text,
    },
    hint: {
      ...typography.small,
      color: colors.textMuted,
    },
    badge: {
      minWidth: sizes.unreadBadge,
      height: sizes.unreadBadge,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: colors.alert,
    },
    badgeText: {
      ...typography.badge,
      letterSpacing: 0,
      color: colors.white,
    },
  }),
);
