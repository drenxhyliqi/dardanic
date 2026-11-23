import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { useSimilarListings } from '../../hooks/useSimilarListings';
import { strings } from '../../i18n';
import type { Listing } from '../../services/marketplace';
import { makeStyles, radius, spacing, typography } from '../../theme';
import { EmptyState } from '../ui/EmptyState';
import { LoadingImage } from '../ui/LoadingImage';
import { ListingCard } from './ListingCard';
import { ListingSkeleton } from './ListingSkeleton';

const t = strings.marketplace;
const COLUMNS = 2;
const THUMB = spacing.xxl + spacing.lg;

// "Find similar": which listing you started from (small photo + title), then every
// listing like it in two columns, best matches first.
export function SimilarListings({ listing }: { listing: Listing }) {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const similar = useSimilarListings(listing);
  const card = (width - spacing.lg * 2 - spacing.md) / COLUMNS;

  const header = (
    <View style={styles.source}>
      <View style={styles.thumb}>
        <LoadingImage source={{ uri: listing.photos[0] }} resizeMode="cover" />
      </View>
      <View style={styles.sourceText}>
        <Text style={styles.like}>{t.similarTo}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {listing.title}
        </Text>
      </View>
    </View>
  );

  if (similar === null) {
    return (
      <View style={styles.screen}>
        {header}
        <ListingSkeleton width={card} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      data={similar}
      keyExtractor={(item) => item.id}
      numColumns={COLUMNS}
      columnWrapperStyle={styles.columns}
      contentContainerStyle={styles.list}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <EmptyState icon="search-outline" title={t.noSimilarTitle} hint={t.noSimilarHint} />
      }
      renderItem={({ item }) => <ListingCard listing={item} width={card} />}
    />
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    list: { gap: spacing.lg, paddingBottom: spacing.xxl },
    columns: { gap: spacing.md, paddingHorizontal: spacing.lg },
    source: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      margin: spacing.lg,
      marginBottom: 0,
      padding: spacing.md,
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
    },
    thumb: { width: THUMB, height: THUMB, overflow: 'hidden', borderRadius: radius.md },
    sourceText: { flex: 1, gap: spacing.xxs },
    like: { ...typography.small, color: colors.textMuted },
    title: { ...typography.label, color: colors.text },
  }),
);
