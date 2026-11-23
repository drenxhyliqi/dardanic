import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import type { FeedAuthor } from '../../data/feed';
import { NEW_SELLER, SELLERS } from '../../data/marketplace';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';

// Under the seller card: the city the seller gave in their profile ("Peja, Kosovo").
// Nothing when they didn't give one.
export function SellerLocation({ seller }: { seller: FeedAuthor }) {
  const styles = useStyles();
  const colors = useColors();
  const city = (SELLERS[seller.username] ?? NEW_SELLER).city;
  if (!city) return null;
  return (
    <View style={styles.row}>
      <Ionicons name="location-outline" size={sizes.icon} color={colors.textMuted} />
      <Text style={styles.text}>{strings.marketplace.location(city)}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    text: { ...typography.paragraph, color: colors.text },
  }),
);
