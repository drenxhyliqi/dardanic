import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { FeedAuthor } from '../../data/feed';
import { NEW_SELLER, SELLERS } from '../../data/marketplace';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { Avatar } from '../profile/Avatar';
import { BusinessBadge } from '../ui/BusinessBadge';

const t = strings.marketplace;

// Who's selling: picture, name (+ ✓ Business), rating and items sold, and since when
// they're on DARDANIC. Tapping opens their profile.
export function SellerCard({ seller }: { seller: FeedAuthor }) {
  const styles = useStyles();
  const colors = useColors();
  const stats = SELLERS[seller.username] ?? NEW_SELLER;

  return (
    <Pressable
      onPress={() => router.push(`/user/${seller.username}`)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Avatar photo={seller.photo} name={seller.name} size={sizes.searchAvatar} border={0} />
      <View style={styles.text}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{seller.username}</Text>
          {seller.business && <BusinessBadge />}
        </View>
        <Text style={styles.meta}>
          {stats.sold ? t.rating(stats.rating, stats.sold) : t.newSeller}
        </Text>
        <Text style={styles.meta}>{t.memberSince(stats.since)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={sizes.icon} color={colors.textMuted} />
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      padding: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: { opacity: 0.85 },
    text: { flex: 1, gap: spacing.xxs },
    nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    name: { ...typography.name, color: colors.text },
    meta: { ...typography.small, color: colors.textMuted },
  }),
);
