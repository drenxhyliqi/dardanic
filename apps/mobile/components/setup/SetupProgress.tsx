import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, sizes, spacing, typography } from '../../theme';

export type SetupProgressProps = {
  current: number; // 1-based
  names: readonly string[]; // one per step, e.g. Identity, Place, Media
};

// Top of profile setup: one short line per step with its name underneath.
// Done and current steps are blue with light text; upcoming ones are grey.
export function SetupProgress({ current, names }: SetupProgressProps) {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      {names.map((name, i) => {
        const reached = i < current;
        return (
          <View key={name} style={styles.step}>
            <View style={[styles.bar, reached && styles.barActive]} />
            <Text style={[styles.label, reached && styles.labelActive]} numberOfLines={1}>
              {`${i + 1}. ${name}`}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.sm,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
    },
    step: {
      flex: 1,
      gap: spacing.sm,
    },
    bar: {
      height: sizes.progressLine,
      borderRadius: radius.full,
      backgroundColor: colors.surfaceBorder,
    },
    barActive: {
      backgroundColor: colors.primary,
    },
    label: {
      ...typography.label,
      color: colors.textMuted,
    },
    labelActive: {
      color: colors.text,
    },
  }),
);
