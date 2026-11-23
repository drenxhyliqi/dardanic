import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, useColors, useTheme } from '../../theme';

const HEIGHT = sizes.headerButton;
const KNOB = HEIGHT - spacing.sm; // the blue circle
export const TOGGLE_WIDTH = KNOB * 2 + spacing.sm;
const SLIDE_MS = 220;

// A light / dark switch for the sign-up screens: a pill with a sun and a moon; the
// active theme sits in a blue circle that slides across when you tap it.
export function ThemeToggle() {
  const styles = useStyles();
  const colors = useColors();
  const { scheme, setPreference } = useTheme();
  const dark = scheme === 'dark';
  const position = useRef(new Animated.Value(dark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(position, {
      toValue: dark ? 1 : 0,
      duration: SLIDE_MS,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [dark, position]);

  const slide = position.interpolate({ inputRange: [0, 1], outputRange: [0, KNOB] });
  const icon = (name: 'sunny' | 'moon', active: boolean) => (
    <View style={styles.slot}>
      <Ionicons
        name={name}
        size={sizes.chipIcon + 2}
        color={active ? colors.white : colors.textMuted}
      />
    </View>
  );

  return (
    <Pressable
      onPress={() => setPreference(dark ? 'light' : 'dark')}
      accessibilityRole="switch"
      accessibilityState={{ checked: dark }}
      accessibilityLabel={strings.settings.darkMode}
      hitSlop={spacing.xs}
      style={styles.pill}
    >
      <Animated.View style={[styles.knob, { transform: [{ translateX: slide }] }]} />
      {icon('sunny', !dark)}
      {icon('moon', dark)}
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    pill: {
      width: TOGGLE_WIDTH,
      height: HEIGHT,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.xs,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    knob: {
      position: 'absolute',
      left: spacing.xs - 1, // inside the 1-pt border
      width: KNOB,
      height: KNOB,
      borderRadius: radius.full,
      backgroundColor: colors.primary,
    },
    slot: { width: KNOB, height: KNOB, alignItems: 'center', justifyContent: 'center' },
  }),
);
