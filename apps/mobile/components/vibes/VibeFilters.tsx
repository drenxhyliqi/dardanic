import { Pressable, StyleSheet, Text, View } from 'react-native';

import { VIBE_FILTERS, type VibeFilter } from '../../data/vibes';
import { strings } from '../../i18n';
import { makeStyles, radius, spacing, typography } from '../../theme';

export type VibeFiltersProps = {
  active: VibeFilter;
  onChange: (filter: VibeFilter) => void;
};

// Filter tabs above the vibes (Popular, Brands, Style, Mods, Meets).
// All five share one row in equal widths, so nothing needs scrolling.
export function VibeFilters({ active, onChange }: VibeFiltersProps) {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      {VIBE_FILTERS.map((filter) => {
        const isActive = filter === active;
        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Text
              style={[styles.label, isActive && styles.labelActive]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {strings.vibes.filters[filter]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.xs,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xs,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    tabActive: {
      borderColor: colors.text,
      backgroundColor: colors.text,
    },
    label: {
      ...typography.label,
      color: colors.textMuted,
    },
    labelActive: {
      color: colors.background,
    },
  }),
);
