import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

export type EmptyStateProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  hint: string;
};

// Nothing to show yet (a profile tab, an empty feed), Instagram-style: an outlined circle with an
// icon, a bold title and a short hint. No buttons.
export function EmptyState({ icon, title, hint }: EmptyStateProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={sizes.emptyIconGlyph} color={colors.text} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.hint}>{hint}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: spacing.sm,
      paddingTop: spacing.xxl,
      paddingHorizontal: spacing.xxl,
    },
    circle: {
      width: sizes.emptyIcon,
      height: sizes.emptyIcon,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
      borderRadius: radius.full,
      borderWidth: 1.5,
      borderColor: colors.text,
    },
    title: {
      ...typography.profileName,
      color: colors.text,
    },
    hint: {
      ...typography.paragraph,
      color: colors.textMuted,
      textAlign: 'center',
    },
  }),
);
