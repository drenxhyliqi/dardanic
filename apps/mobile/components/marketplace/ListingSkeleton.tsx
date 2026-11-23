import { StyleSheet, View } from 'react-native';

import { radius, spacing } from '../../theme';
import { Skeleton } from '../ui/Skeleton';

const CARDS = 4;

// Grey, pulsing listing cards (photo, price, title) while the Marketplace loads.
export function ListingSkeleton({ width }: { width: number }) {
  return (
    <View style={styles.grid} accessibilityElementsHidden>
      {Array.from({ length: CARDS }, (_, index) => (
        <View key={index} style={[styles.card, { width }]}>
          <Skeleton width={width} height={width} radius={radius.lg} />
          <Skeleton width="40%" height={spacing.md} />
          <Skeleton width="85%" height={spacing.md} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  card: { gap: spacing.sm },
});
