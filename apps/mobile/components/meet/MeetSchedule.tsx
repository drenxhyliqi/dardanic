import { StyleSheet, Text, View } from 'react-native';

import type { MeetPost } from '../../data/feed';
import { makeStyles, radius, spacing, typography } from '../../theme';

// The meet's plan: a time on the left and what happens then, one step per row.
export function MeetSchedule({ schedule }: { schedule: MeetPost['schedule'] }) {
  const styles = useStyles();
  return (
    <View style={styles.card}>
      {schedule.map((step, index) => (
        <View key={step.time + step.title} style={[styles.row, index > 0 && styles.divider]}>
          <Text style={styles.time}>{step.time}</Text>
          <Text style={styles.title}>{step.title}</Text>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      paddingHorizontal: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    row: { flexDirection: 'row', gap: spacing.lg, paddingVertical: spacing.md },
    divider: { borderTopWidth: 1, borderTopColor: colors.surfaceBorder },
    time: { ...typography.label, minWidth: spacing.xxl * 2, color: colors.primaryLight },
    title: { ...typography.paragraph, flex: 1, color: colors.text },
  }),
);
