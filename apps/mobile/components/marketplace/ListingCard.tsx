import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useMarketplace } from '../../context/MarketplaceContext';
import { strings } from '../../i18n';
import type { Listing } from '../../services/marketplace';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { withCommas } from '../../utils/text';
import { LoadingImage } from '../ui/LoadingImage';

const t = strings.marketplace;

export type ListingCardProps = {
  listing: Listing;
  width: number;
};

// One listing in the Marketplace grid: square photo with a save button, the price,
// title, condition, city and time.
export const ListingCard = memo(function ListingCard({ listing, width }: ListingCardProps) {
  const styles = useStyles();
  const colors = useColors();
  const { isSaved, toggleSave } = useMarketplace();
  const saved = isSaved(listing.id);

  return (
    <Pressable
      onPress={() => router.push(`/listing/${listing.id}`)}
      accessibilityRole="button"
      style={({ pressed }) => [{ width }, pressed && styles.pressed]}
    >
      <View style={[styles.photo, { width, height: width }]}>
        <LoadingImage source={{ uri: listing.photos[0] }} resizeMode="cover" />
        <Pressable
          onPress={() => toggleSave(listing.id)}
          accessibilityRole="button"
          accessibilityLabel={saved ? t.unsave : t.save}
          hitSlop={spacing.sm}
          style={styles.save}
        >
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={sizes.chipIcon + 2}
            color={colors.text}
          />
        </Pressable>
      </View>
      <Text style={styles.price}>{t.price(withCommas(listing.price))}</Text>
      <Text style={styles.title} numberOfLines={2}>
        {listing.title}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {[t.conditions[listing.condition], listing.city, strings.feed.timeAgo(listing.minutesAgo)]
          .join(' · ')}
      </Text>
    </Pressable>
  );
});

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    pressed: { opacity: 0.85 },
    photo: { overflow: 'hidden', borderRadius: radius.lg, backgroundColor: colors.surface },
    save: {
      position: 'absolute',
      top: spacing.sm,
      right: spacing.sm,
      width: sizes.sendButton - spacing.xs,
      height: sizes.sendButton - spacing.xs,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      backgroundColor: colors.background,
    },
    price: { ...typography.name, marginTop: spacing.sm, color: colors.text },
    title: { ...typography.paragraph, color: colors.text },
    meta: { ...typography.small, marginTop: spacing.xxs, color: colors.textMuted },
  }),
);
