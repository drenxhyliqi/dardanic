import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, sizes, spacing, typography } from '../../theme';

const STEP_WIDTH = sizes.headerButton * 2; // fits "1. Identity"

export type SetupProgressProps = {
  current: number; // 1-based
  names: readonly string[]; // one per step, e.g. Identity, Place, Media
};

// Top of profile setup: one short line per step with its name underneath, compact and
// on the same line as the light / dark switch (same height, centred with it).
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
    // Same top and height as the switch (top right), so the two line up.
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      height: sizes.headerButton,
      marginTop: spacing.sm,
      paddingHorizontal: spacing.xl,
    },
    step: {
      width: STEP_WIDTH,
      gap: spacing.xs,
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
