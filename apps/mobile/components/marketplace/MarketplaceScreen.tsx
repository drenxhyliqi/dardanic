import { router, useFocusEffect } from 'expo-router';
import { useState } from 'react';
import { Animated, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMarketplace } from '../../context/MarketplaceContext';
import type { ListingCategory } from '../../data/marketplaceCategories';
import { useListings } from '../../hooks/useListings';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { tabBarSpace } from '../tabs/FloatingTabBar';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { IconButton } from '../ui/IconButton';
import { SearchField } from '../ui/SearchField';
import { useRefreshable } from '../ui/useRefreshable';
import { ListingCard } from './ListingCard';
import { ListingSkeleton } from './ListingSkeleton';
import { MarketFilters } from './MarketFilters';

const t = strings.marketplace;
const COLUMNS = 2;

// The Marketplace tab: title with Your listings and Sell, search, the car categories,
// and the listings in two columns, newest first (pull down to refresh).
export function MarketplaceScreen() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ListingCategory | 'all'>('all');
  const { listings: all, isLoading, refresh } = useListings({ category, query });
  const { isHidden, markSeen } = useMarketplace();
  useFocusEffect(markSeen); // opening the Marketplace clears the red dot on its tab
  const listings = all.filter((listing) => !isHidden(listing.id));
  const { scrollProps, indicator } = useRefreshable(refresh);
  const card = (width - spacing.lg * 2 - spacing.md) / COLUMNS;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.title}</Text>
        <IconButton
          icon="pricetags-outline"
          label={t.yourListings}
          onPress={() => router.push('/my-listings')}
        />
        <Button label={t.sell} icon="add" small compact onPress={() => router.push('/sell')} />
      </View>
      <View style={styles.search}>
        <SearchField placeholder={t.search} query={query} onChange={setQuery} />
      </View>
      <View style={styles.filters}>
        <MarketFilters category={category} onCategory={setCategory} />
      </View>
      {isLoading ? (
        <View style={styles.loading}>
          <ListingSkeleton width={card} />
        </View>
      ) : (
        <Animated.FlatList
          {...scrollProps}
          data={listings}
          keyExtractor={(listing) => listing.id}
          numColumns={COLUMNS}
          columnWrapperStyle={styles.columns}
          contentContainerStyle={[styles.list, { paddingBottom: tabBarSpace(insets.bottom) }]}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={indicator}
          ListEmptyComponent={
            <EmptyState icon="pricetags-outline" title={t.emptyTitle} hint={t.emptyHint} />
          }
          renderItem={({ item }) => <ListingCard listing={item} width={card} />}
        />
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    title: { ...typography.title, flex: 1, color: colors.text },
    search: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
    filters: {
      paddingBottom: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.surfaceBorder,
    },
    loading: { paddingTop: spacing.lg },
    list: { gap: spacing.lg, paddingTop: spacing.lg },
    columns: { gap: spacing.md, paddingHorizontal: spacing.lg },
  }),
);
