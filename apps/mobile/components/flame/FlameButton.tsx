import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet } from 'react-native';

import { strings } from '../../i18n';
import { sizes, spacing } from '../../theme';
import { FlameIcon } from './FlameIcon';

const FLAME_OPTICAL = 0.9; // flame height that looks the same size as comment / share
const GROW_TO = 1.4; // how big it gets when flamed
const GROW_MS = 140;

export type FlameButtonProps = {
  flamed: boolean;
  onToggle: () => void;
  color?: string; // outline colour before it's flamed (e.g. white on stories)
};

// The flame button, DARDANIC's "like": tap to flame, tap again to unflame.
// Whenever it becomes flamed (tap or double-tapping the photo), it fills red, grows
// bigger and springs back to its normal size.
export function FlameButton({ flamed, onToggle, color }: FlameButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const wasFlamed = useRef(flamed);

  useEffect(() => {
    const justFlamed = flamed && !wasFlamed.current;
    wasFlamed.current = flamed;
    if (!justFlamed) return;
    Animated.sequence([
      Animated.timing(scale, {
        toValue: GROW_TO,
        duration: GROW_MS,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scale, { toValue: 1, friction: 4, tension: 140, useNativeDriver: true }),
    ]).start();
  }, [flamed, scale]);

  return (
    <Pressable
      onPress={onToggle}
      hitSlop={spacing.xs}
      accessibilityRole="button"
      accessibilityLabel={flamed ? strings.flame.remove : strings.flame.add}
      accessibilityState={{ selected: flamed }}
      style={styles.box}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <FlameIcon
          size={Math.round(sizes.actionIcon * FLAME_OPTICAL)}
          flamed={flamed}
          color={color}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: sizes.actionIcon,
    height: sizes.actionIcon,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
