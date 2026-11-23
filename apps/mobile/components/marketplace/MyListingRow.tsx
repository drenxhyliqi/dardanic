import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import type { Listing, ListingStatus } from '../../services/marketplace';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { withCommas } from '../../utils/text';
import { LoadingImage } from '../ui/LoadingImage';

const t = strings.marketplace;
const THUMB = sizes.searchAvatar * 1.5;

// One of your listings: photo, title, price and its status (Live in blue, Under review,
// Not allowed). Tapping opens it.
export function MyListingRow({ listing }: { listing: Listing }) {
  const styles = useStyles();
  return (
    <Pressable
      onPress={() => router.push(`/listing/${listing.id}`)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.thumb}>
        <LoadingImage source={{ uri: listing.photos[0] }} resizeMode="cover" />
      </View>
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>{listing.title}</Text>
        <Text style={styles.price}>{t.price(withCommas(listing.price))}</Text>
        <StatusPill status={listing.status} />
      </View>
    </Pressable>
  );
}

function StatusPill({ status }: { status: ListingStatus }) {
  const styles = useStyles();
  return (
    <View style={[styles.pill, status === 'live' && styles.pillLive]}>
      <Text style={[styles.pillText, status === 'live' && styles.pillTextLive]}>
        {t.statuses[status]}
      </Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    pressed: { opacity: 0.85 },
    thumb: {
      width: THUMB,
      height: THUMB,
      overflow: 'hidden',
      borderRadius: radius.md,
      backgroundColor: colors.surface,
    },
    text: { flex: 1, alignItems: 'flex-start', gap: spacing.xxs },
    title: { ...typography.label, color: colors.text },
    price: { ...typography.paragraph, color: colors.textMuted },
    pill: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs,
      borderRadius: radius.full,
      backgroundColor: colors.surface,
    },
    pillLive: { backgroundColor: colors.primarySoft },
    pillText: { ...typography.badge, color: colors.textMuted },
    pillTextLive: { color: colors.primaryLight },
  }),
);
