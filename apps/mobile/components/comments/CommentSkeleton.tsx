import { StyleSheet, View } from 'react-native';

import { radius, sizes, spacing } from '../../theme';
import { Skeleton } from '../ui/Skeleton';

const ROWS = 5;

// Grey, pulsing stand-ins for comments while they load: avatar + name + two lines.
export function CommentSkeleton() {
  return (
    <View
      style={styles.list}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {Array.from({ length: ROWS }, (_, index) => (
        <View key={index} style={styles.row}>
          <Skeleton
            width={sizes.commentAvatar}
            height={sizes.commentAvatar}
            radius={radius.full}
          />
          <View style={styles.lines}>
            <Skeleton width="35%" height={spacing.md} />
            <Skeleton width="90%" height={spacing.md} />
            <Skeleton width="60%" height={spacing.md} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.xl,
    paddingVertical: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  lines: {
    flex: 1,
    gap: spacing.sm,
  },
});
