import { StyleSheet, Text } from 'react-native';

import { makeStyles, spacing, typography } from '../../theme';

// "Today", "Yesterday", "Monday", "12 Nov" between messages from different days.
export function DayDivider({ label }: { label: string }) {
  const styles = useStyles();
  return <Text style={styles.label}>{label}</Text>;
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    label: {
      ...typography.small,
      textAlign: 'center',
      paddingVertical: spacing.md,
      color: colors.textMuted,
    },
  }),
);
