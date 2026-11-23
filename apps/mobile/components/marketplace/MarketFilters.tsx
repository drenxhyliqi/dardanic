import { ScrollView, StyleSheet } from 'react-native';

import { LISTING_CATEGORIES, type ListingCategory } from '../../data/marketplaceCategories';
import { strings } from '../../i18n';
import { spacing } from '../../theme';
import { PillTabs } from '../ui/PillTabs';

export type MarketFiltersProps = {
  category: ListingCategory | 'all';
  onCategory: (category: ListingCategory | 'all') => void;
};

// The row under the search, scrolling sideways: All and the car categories.
export function MarketFilters({ category, onCategory }: MarketFiltersProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.bar}
      contentContainerStyle={styles.row}
    >
      <PillTabs<ListingCategory | 'all'>
        tabs={[
          { key: 'all', label: strings.marketplace.all },
          ...LISTING_CATEGORIES.map((c) => ({ key: c.id, label: c.name })),
        ]}
        active={category}
        onChange={onCategory}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bar: { flexGrow: 0, flexShrink: 0 }, // keep its height next to the list below
  row: { alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.xs },
});
