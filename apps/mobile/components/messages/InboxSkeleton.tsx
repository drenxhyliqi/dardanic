import { StyleSheet, View } from 'react-native';

import { radius, sizes, spacing } from '../../theme';
import { Skeleton } from '../ui/Skeleton';

const ROWS = 7;

// Grey, pulsing stand-ins for conversations while the inbox loads.
export function InboxSkeleton() {
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {Array.from({ length: ROWS }, (_, index) => (
        <View key={index} style={styles.row}>
          <Skeleton width={sizes.inboxAvatar} height={sizes.inboxAvatar} radius={radius.full} />
          <View style={styles.lines}>
            <Skeleton width="40%" height={spacing.md} />
            <Skeleton width="75%" height={spacing.md} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  lines: {
    flex: 1,
    gap: spacing.sm,
  },
});
