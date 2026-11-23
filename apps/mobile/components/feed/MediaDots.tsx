import { StyleSheet, View } from 'react-native';

import { makeStyles, radius, sizes, spacing } from '../../theme';

export type MediaDotsProps = {
  count: number;
  active: number;
};

// Small dots showing which photo of a post you're on (blue = current).
// Nothing shows when there's only one photo.
export function MediaDots({ count, active }: MediaDotsProps) {
  const styles = useStyles();
  if (count < 2) return null;

  return (
    <View style={styles.row} accessibilityElementsHidden importantForAccessibility="no">
      {Array.from({ length: count }, (_, index) => (
        <View key={index} style={[styles.dot, index === active && styles.active]} />
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.xs,
    },
    dot: {
      width: sizes.mediaDot,
      height: sizes.mediaDot,
      borderRadius: radius.full,
      backgroundColor: colors.surfaceBorder,
    },
    active: {
      backgroundColor: colors.primary,
    },
  }),
);
