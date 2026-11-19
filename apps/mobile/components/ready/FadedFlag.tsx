import { Animated, StyleSheet, View, type ViewStyle } from 'react-native';

import { useColors } from '../../theme';

const flagFade = require('../../assets/images/flag-fade.png');

export type FadedFlagProps = {
  width: number;
  height: number;
  opacity?: Animated.Value | number;
  style?: ViewStyle; // position (and rotation for the bottom corner)
};

// The checkered flag tinted blue. It already fades out sideways; this also fades it
// into the background towards its bottom edge, so it never ends in a hard line.
export function FadedFlag({ width, height, opacity, style }: FadedFlagProps) {
  const colors = useColors();
  return (
    <Animated.View style={[styles.container, { width, height, opacity }, style]}>
      <Animated.Image source={flagFade} tintColor={colors.primary} style={styles.fill} />
      <View style={[StyleSheet.absoluteFill, { backgroundImage: colors.edgeFade }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
});
