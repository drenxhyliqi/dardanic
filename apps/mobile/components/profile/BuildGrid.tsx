import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import type { GarageCar } from '../../data/profile';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography } from '../../theme';
import { Tag } from '../ui/Tag';

const COLUMNS = 3;

// The garage as an Instagram-style grid: square tiles, edge to edge, hairline gaps.
// Each tile shows the car and its HP; the main car has a small blue "Main" tag.
// (Build photos will fill the tiles once they exist. The plate is never shown.)
export function BuildGrid({ cars }: { cars: GarageCar[] }) {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const tile = (width - sizes.gridGap * (COLUMNS - 1)) / COLUMNS;
  const t = strings.profile;

  return (
    <View style={styles.grid}>
      {cars.map((car) => (
        <View key={car.id} style={[styles.tile, { width: tile, height: tile }]}>
          {car.main && <Tag label={t.main} tone="blue" />}
          <View style={styles.caption}>
            <Text style={styles.model} numberOfLines={2}>
              {car.model}
            </Text>
            <Text style={styles.hp}>
              {car.hp} {t.hp}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: sizes.gridGap,
    },
    tile: {
      justifyContent: 'space-between',
      padding: spacing.sm,
      backgroundColor: colors.surface,
    },
    caption: {
      marginTop: 'auto',
      gap: spacing.xxs,
    },
    model: {
      ...typography.label,
      color: colors.text,
    },
    hp: {
      ...typography.small,
      color: colors.textMuted,
    },
  }),
);
