import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { radius, sizes, spacing } from '../../theme';
import { Skeleton } from '../ui/Skeleton';
import { MEDIA_RATIO } from './PostMedia';

// A grey, pulsing stand-in for a post while the feed loads: avatar + two lines,
// the photo, the action icons and two caption lines.
export function PostSkeleton() {
  const { width } = useWindowDimensions();

  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={styles.header}>
        <Skeleton width={sizes.postAvatar} height={sizes.postAvatar} radius={radius.full} />
        <View style={styles.lines}>
          <Skeleton width="40%" height={spacing.md} />
          <Skeleton width="60%" height={spacing.sm} />
        </View>
      </View>
      <Skeleton width={width} height={width * MEDIA_RATIO} radius={0} />
      <View style={styles.actions}>
        {[0, 1, 2].map((key) => (
          <Skeleton
            key={key}
            width={sizes.actionIcon}
            height={sizes.actionIcon}
            radius={radius.full}
          />
        ))}
      </View>
      <View style={styles.caption}>
        <Skeleton width="30%" height={spacing.md} />
        <Skeleton width="85%" height={spacing.md} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  lines: {
    flex: 1,
    gap: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  caption: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
});
