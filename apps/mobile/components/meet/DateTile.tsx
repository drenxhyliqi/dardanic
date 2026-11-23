import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { dateTile } from './meetTime';

export type DateTileProps = {
  startsAt: number;
  top?: number; // distance from the photo's top (default: a small margin)
  right?: boolean; // sit on the right instead of the left
};

// A small calendar tile ("SAT / 23 / NOV") sitting on a meet's photo, top-left (or right).
export function DateTile({ startsAt, top, right = false }: DateTileProps) {
  const styles = useStyles();
  const tile = dateTile(startsAt);
  return (
    <View
      style={[
        styles.tile,
        right && styles.right,
        top !== undefined && { top },
      ]}
    >
      <Text style={styles.small}>{tile.weekday}</Text>
      <Text style={styles.day}>{tile.day}</Text>
      <Text style={styles.small}>{tile.month}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    tile: {
      position: 'absolute',
      top: spacing.md,
      left: spacing.md,
      width: sizes.dateTile,
      alignItems: 'center',
      paddingVertical: spacing.xs,
      borderRadius: radius.md,
      backgroundColor: colors.background,
    },
    right: { left: undefined, right: spacing.md },
    small: { ...typography.badge, color: colors.textMuted },
    day: { ...typography.stat, color: colors.text },
  }),
);
