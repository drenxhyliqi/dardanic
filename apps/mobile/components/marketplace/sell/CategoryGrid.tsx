import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LISTING_CATEGORIES, type ListingCategory } from '../../../data/marketplaceCategories';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../../theme';

export type CategoryGridProps = {
  value: ListingCategory | null;
  onChange: (category: ListingCategory) => void;
};

// The car-only categories as tiles (icon + name), two per row. There's no "Other":
// if it doesn't fit one of these, it doesn't belong on the Marketplace.
export function CategoryGrid({ value, onChange }: CategoryGridProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.grid}>
      {LISTING_CATEGORIES.map((category) => {
        const active = category.id === value;
        return (
          <Pressable
            key={category.id}
            onPress={() => onChange(category.id)}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            style={[styles.tile, active && styles.active]}
          >
            <Ionicons
              name={category.icon}
              size={sizes.icon}
              color={active ? colors.primaryLight : colors.textMuted}
            />
            <Text style={[styles.name, active && styles.nameActive]} numberOfLines={1}>
              {category.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    tile: {
      flexBasis: '48%',
      flexGrow: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      padding: spacing.md,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    active: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
    name: { ...typography.label, flexShrink: 1, color: colors.text },
    nameActive: { color: colors.primaryLight },
  }),
);
