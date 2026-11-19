import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { makeStyles, radius, sizes, spacing, useColors } from '../../theme';

const logoMark = require('../../assets/brand/logo-mark.png');
const MARK_RATIO = 600 / 229;

export type LaunchScreenProps = {
  ready: boolean; // true once fonts etc. are loaded
  onDone: () => void; // called after the fade-out, to show the app
};

// The launch animation. It starts as an exact copy of the native splash
// (dark background, D logo in the middle), so the handover is invisible.
// Then a thin line fills under the logo, and everything fades out.
export function LaunchScreen({ ready, onDone }: LaunchScreenProps) {
  const colors = useColors();
  const styles = useStyles();
  const progress = useRef(new Animated.Value(0)).current;
  const exit = useRef(new Animated.Value(0)).current;
  const filled = useRef(false);

  // Hide the native splash (we're now drawing the same picture) and fill the line.
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
    Animated.timing(progress, {
      toValue: 1,
      duration: 800,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      filled.current = true;
    });
  }, [progress]);

  // Once the line is full and the app is ready, fade out and hand over.
  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => {
      if (!filled.current) return;
      clearInterval(id);
      Animated.timing(exit, {
        toValue: 1,
        duration: 350,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(onDone);
    }, 50);
    return () => clearInterval(id);
  }, [ready, exit, onDone]);

  const contentStyle = {
    opacity: exit.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
    transform: [{ scale: exit.interpolate({ inputRange: [0, 1], outputRange: [1, 0.94] }) }],
  };

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.center, contentStyle]}>
        <Animated.Image
          source={logoMark}
          tintColor={colors.text}
          style={styles.mark}
          resizeMode="contain"
          accessibilityLabel="DARDANIC"
        />
        <View style={styles.track}>
          <Animated.View style={[styles.fill, { transform: [{ scaleX: progress }] }]} />
        </View>
      </Animated.View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    center: {
      ...StyleSheet.absoluteFill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mark: {
      width: sizes.splashMark,
      height: sizes.splashMark / MARK_RATIO,
    },
    // The line sits below the logo without moving it off-centre.
    track: {
      position: 'absolute',
      top: '50%',
      marginTop: sizes.splashMark / MARK_RATIO / 2 + spacing.xxl,
      width: sizes.loadingTrack,
      height: sizes.loadingLine,
      borderRadius: radius.full,
      overflow: 'hidden',
      backgroundColor: colors.surfaceBorder,
    },
    fill: {
      flex: 1,
      backgroundColor: colors.text,
      transformOrigin: 'left',
    },
  }),
);
