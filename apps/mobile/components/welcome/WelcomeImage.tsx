import type { ComponentProps } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { imageFade } from '../../theme';

const welcomeImage = require('../../assets/images/welcome.jpg');

export type WelcomeImageProps = {
  style?: ComponentProps<typeof Animated.View>['style'];
};

// The car photo across the top of the screen, fading into the background from the middle down.
export function WelcomeImage({ style }: WelcomeImageProps) {
  return (
    <Animated.View style={[styles.container, style]} pointerEvents="none">
      <Animated.Image source={welcomeImage} style={styles.image} resizeMode="cover" />
      <View style={[StyleSheet.absoluteFill, { backgroundImage: imageFade }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '68%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
