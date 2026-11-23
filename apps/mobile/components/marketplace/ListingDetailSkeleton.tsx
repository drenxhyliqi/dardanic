import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { makeStyles, radius, spacing } from '../../theme';
import { Skeleton } from '../ui/Skeleton';

// The listing page's shape (photo, price, title, details) while it loads.
export function ListingDetailSkeleton() {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  return (
    <View style={styles.screen} accessibilityElementsHidden>
      <Skeleton width={width} height={width} radius={0} />
      <View style={styles.content}>
        <Skeleton width="35%" height={spacing.xl} />
        <Skeleton width="80%" height={spacing.lg} />
        <Skeleton width="100%" height={spacing.xxl * 3} radius={radius.lg} />
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { gap: spacing.md, padding: spacing.lg },
  }),
);
