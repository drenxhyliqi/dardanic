import { StyleSheet, View } from 'react-native';

import { makeStyles, radius, sizes, spacing } from '../../theme';

export type IntroProgressProps = {
  current: number; // 0-based
  total: number;
};

// Small bars at the top left of the intro: the active step is a long blue bar,
// the others short grey ones.
export function IntroProgress({ current, total }: IntroProgressProps) {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[styles.bar, i === current && styles.active]} />
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    bar: {
      width: sizes.introStep,
      height: sizes.progressLine,
      borderRadius: radius.full,
      backgroundColor: colors.borderFocus,
    },
    active: {
      width: sizes.introStepActive,
      backgroundColor: colors.primary,
    },
  }),
);
