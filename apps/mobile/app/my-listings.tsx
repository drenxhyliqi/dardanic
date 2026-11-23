import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { MyListingRow } from '../components/marketplace/MyListingRow';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useMarketplace } from '../context/MarketplaceContext';
import { strings } from '../i18n';
import { makeStyles, spacing } from '../theme';

const t = strings.marketplace;

// Your listings (Marketplace → tag icon), newest first, each with its status.
export default function MyListingsScreen() {
  const styles = useStyles();
  const { mine } = useMarketplace();
  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={mine}
      keyExtractor={(listing) => listing.id}
      renderItem={({ item }) => <MyListingRow listing={item} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <EmptyState icon="pricetags-outline" title={t.noListingsTitle} hint={t.noListingsHint} />
          <Button label={t.sell} icon="add" small centered onPress={() => router.push('/sell')} />
        </View>
      }
    />
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { paddingVertical: spacing.md },
    empty: { gap: spacing.lg, paddingHorizontal: spacing.xl },
  }),
);
