import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useListing } from '../../hooks/useListing';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { withCommas } from '../../utils/text';
import { LoadingImage } from '../ui/LoadingImage';
import { Skeleton } from '../ui/Skeleton';

const PHOTO_HEIGHT = sizes.chatPhoto * 0.75;

// A Marketplace listing sent in a chat: photo, title and price. Tapping opens it.
export function SharedListingCard({ id }: { id: string }) {
  const styles = useStyles();
  const { listing, isLoading } = useListing(id);
  if (isLoading) {
    return <Skeleton width={sizes.chatPhoto} height={PHOTO_HEIGHT} radius={radius.lg} />;
  }
  if (!listing) return null;

  return (
    <Pressable
      onPress={() => router.push(`/listing/${listing.id}`)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.photo}>
        <LoadingImage source={{ uri: listing.photos[0] }} resizeMode="cover" />
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {listing.title}
        </Text>
        <Text style={styles.price}>{strings.marketplace.price(withCommas(listing.price))}</Text>
      </View>
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      width: sizes.chatPhoto,
      overflow: 'hidden',
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: { opacity: 0.85 },
    photo: { width: sizes.chatPhoto, height: PHOTO_HEIGHT },
    body: { gap: spacing.xxs, padding: spacing.sm },
    title: { ...typography.label, color: colors.text },
    price: { ...typography.name, color: colors.text },
  }),
);
