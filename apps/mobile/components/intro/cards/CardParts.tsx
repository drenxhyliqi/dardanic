import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, sizes, spacing, typography } from '../../../theme';

// The card frame. active = blue outline, like something you follow or that's happening now.
export function CardFrame({ active, children }: { active?: boolean; children: ReactNode }) {
  const styles = useStyles();
  return <View style={[styles.card, active && styles.cardActive]}>{children}</View>;
}

// A Kosovo-style licence plate: blue strip on the left, black characters on white.
export function Plate({ text }: { text: string }) {
  const styles = useStyles();
  return (
    <View style={styles.plate}>
      <View style={styles.plateStrip} />
      <Text style={styles.plateText}>{text}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      flex: 1,
      justifyContent: 'space-between',
      padding: spacing.md,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    cardActive: {
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    plate: {
      alignSelf: 'flex-start',
      height: sizes.plate,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: radius.sm,
      backgroundColor: colors.white,
      overflow: 'hidden',
    },
    plateStrip: {
      width: sizes.plateStrip,
      height: '100%',
      backgroundColor: colors.primary,
    },
    plateText: {
      ...typography.badge,
      color: colors.black,
      paddingHorizontal: spacing.sm,
    },
  }),
);
