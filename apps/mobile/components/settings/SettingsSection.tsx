import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, spacing, typography } from '../../theme';

// A titled group of rows on the Settings page.
export function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  const styles = useStyles();
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    section: { gap: spacing.md },
    title: { ...typography.label, color: colors.textMuted, textTransform: 'uppercase' },
  }),
);
