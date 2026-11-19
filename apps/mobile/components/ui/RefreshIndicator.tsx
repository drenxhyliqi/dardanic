import { Animated, StyleSheet, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing } from '../../theme';

const APPEAR_AT = 24; // starts fading in after pulling this far

export type RefreshIndicatorProps = {
  scrollY: Animated.Value;
  active: Animated.Value;
  spin: Animated.Value;
  gap: Animated.Value;
  refreshing: boolean;
};

// Put this first inside the scroll view. The reload circle sits just above the content,
// so it only shows in the gap that opens when you pull down, and the content covers it
// again when it goes back up. While refreshing, the gap stays open and the circle spins.
export function RefreshIndicator({
  scrollY,
  active,
  spin,
  gap,
  refreshing,
}: RefreshIndicatorProps) {
  const styles = useStyles();
  // 0 → 1 as you pull down from APPEAR_AT to the refresh distance.
  const pulled = scrollY.interpolate({
    inputRange: [-sizes.pullRefresh, -APPEAR_AT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const shown = Animated.add(pulled, active).interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  // Turns backwards with the pull, forwards while spinning.
  const rotate = Animated.add(Animated.multiply(pulled, -1), spin).interpolate({
    inputRange: [-1, 1],
    outputRange: ['-360deg', '360deg'],
  });

  return (
    <Animated.View style={{ height: gap }}>
      <View style={styles.anchor} pointerEvents="none">
        <Animated.View
          style={[
            styles.circle,
            {
              opacity: shown,
              transform: [
                { scale: shown.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) },
                { rotate },
              ],
            },
          ]}
          accessibilityLabel={refreshing ? strings.common.refreshing : undefined}
        />
      </View>
    </Animated.View>
  );
}

// The gap's bottom edge is where the content starts; the circle sits just above it.
export const refreshGap = (safeTop: number) => safeTop + sizes.spinner + spacing.md * 2;

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    anchor: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: spacing.md,
      alignItems: 'center',
    },
    circle: {
      width: sizes.spinner,
      height: sizes.spinner,
      borderRadius: radius.full,
      borderWidth: sizes.spinnerLine,
      borderColor: colors.borderFocus,
      borderTopColor: colors.text,
    },
  }),
);
