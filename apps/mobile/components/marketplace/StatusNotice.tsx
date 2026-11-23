import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import type { Listing } from '../../services/marketplace';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

const t = strings.marketplace;

// On your own listing that isn't live: "Under review" (blue, clock) or "Not allowed"
// (grey, block icon), with the reason.
export function StatusNotice({ listing }: { listing: Listing }) {
  const styles = useStyles();
  const colors = useColors();
  const review = listing.status === 'review';
  return (
    <View style={[styles.box, review && styles.review]}>
      <Ionicons
        name={review ? 'time-outline' : 'ban-outline'}
        size={sizes.icon}
        color={review ? colors.primaryLight : colors.textMuted}
      />
      <View style={styles.text}>
        <Text style={[styles.title, review && styles.titleReview]}>
          {t.statuses[listing.status]}
        </Text>
        {listing.reason && <Text style={styles.reason}>{listing.reason}</Text>}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    box: {
      flexDirection: 'row',
      gap: spacing.md,
      padding: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    review: { borderColor: colors.primarySoft, backgroundColor: colors.primarySoft },
    text: { flex: 1, gap: spacing.xxs },
    title: { ...typography.label, color: colors.text },
    titleReview: { color: colors.primaryLight },
    reason: { ...typography.paragraph, color: colors.text },
  }),
);
