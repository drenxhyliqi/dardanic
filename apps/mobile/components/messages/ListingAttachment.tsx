import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useListing } from '../../hooks/useListing';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { withCommas } from '../../utils/text';
import { LoadingImage } from '../ui/LoadingImage';

const THUMB = sizes.sendButton;

// Above the message field when you came from "Message seller": the listing that will
// be sent with your message (small photo, title, price), with × to leave it out.
export function ListingAttachment({ id, onRemove }: { id: string; onRemove: () => void }) {
  const styles = useStyles();
  const colors = useColors();
  const { listing } = useListing(id);
  if (!listing) return null;

  return (
    <View style={styles.box}>
      <View style={styles.thumb}>
        <LoadingImage source={{ uri: listing.photos[0] }} resizeMode="cover" />
      </View>
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {listing.title}
        </Text>
        <Text style={styles.price}>{strings.marketplace.price(withCommas(listing.price))}</Text>
      </View>
      <Pressable
        onPress={onRemove}
        accessibilityRole="button"
        accessibilityLabel={strings.marketplace.removeAttachment}
        hitSlop={spacing.sm}
      >
        <Ionicons name="close" size={sizes.icon} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    box: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      padding: spacing.sm,
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
    },
    thumb: { width: THUMB, height: THUMB, overflow: 'hidden', borderRadius: radius.md },
    text: { flex: 1 },
    title: { ...typography.label, color: colors.text },
    price: { ...typography.small, color: colors.textMuted },
  }),
);
