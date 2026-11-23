import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useSimilarListings } from '../../hooks/useSimilarListings';
import { strings } from '../../i18n';
import type { Listing } from '../../services/marketplace';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { Skeleton } from '../ui/Skeleton';
import { ListingCard } from './ListingCard';

const CARD = sizes.chatPhoto * 0.7;
const LOADING_CARDS = 3;
const RELATED = 6;

// "Related listings": a sideways row of listings like this one (same
// brand, same category). Grey blocks while they load; nothing when there are none.
export function RelatedListings({ listing }: { listing: Listing }) {
  const styles = useStyles();
  const related = useSimilarListings(listing, RELATED);
  if (related?.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{strings.marketplace.related}</Text>
      {related === null ? (
        <View style={styles.row} accessibilityElementsHidden>
          {Array.from({ length: LOADING_CARDS }, (_, index) => (
            <Skeleton key={index} width={CARD} height={CARD} radius={radius.lg} />
          ))}
        </View>
      ) : (
        <FlatList
          horizontal
          data={related}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
          renderItem={({ item }) => <ListingCard listing={item} width={CARD} />}
        />
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    // The row runs to the screen edges; the heading keeps the page margin.
    section: { gap: spacing.md, marginHorizontal: -spacing.lg },
    heading: { ...typography.cardTitle, marginHorizontal: spacing.lg, color: colors.text },
    row: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg },
  }),
);
