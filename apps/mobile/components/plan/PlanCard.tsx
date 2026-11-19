import { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

const flagPattern = require('../../assets/images/flag-fade.png');

export type PlanCardProps = {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
  flag?: boolean;
  badge?: string;
  large?: boolean;
};

// A selectable plan: name and one line of description.
// Works like a radio button: the selected card gets a blue border and a filled dot.
// flag = a checkered racing-flag pattern (assets/images/flag-fade@3x.png) fading in from the left.
// badge = a blue label sitting on the card's top edge (e.g. "For car enthusiasts").
// large = title 1.5x bigger, to make this plan stand out.
// Selecting a card springs it slightly bigger; the other card shrinks and dims a little.
export function PlanCard({
  title,
  description,
  selected,
  onPress,
  flag = false,
  badge,
  large = false,
}: PlanCardProps) {
  const colors = useColors();
  const styles = useStyles();
  const focus = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(focus, {
      toValue: selected ? 1 : 0,
      friction: 7,
      tension: 90,
      useNativeDriver: true,
    }).start();
  }, [selected, focus]);

  const focusStyle = {
    opacity: focus.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }),
    transform: [{ scale: focus.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.02] }) }],
  };

  return (
    <Animated.View style={focusStyle}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ checked: selected }}
        accessibilityLabel={[badge, title, description].filter(Boolean).join('. ')}
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          selected && styles.cardSelected,
          pressed && styles.pressed,
        ]}
      >
        {flag && (
          <View style={styles.flag} pointerEvents="none">
            <Image
              source={flagPattern}
              tintColor={colors.text}
              style={styles.flagImage}
              resizeMode="cover"
            />
          </View>
        )}
        <View style={styles.text}>
          <Text style={[styles.title, large && styles.titleLarge]}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected && <View style={styles.radioDot} />}
        </View>
      </Pressable>
      {badge && (
        <View style={styles.badge} pointerEvents="none">
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </Animated.View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
      padding: spacing.xl,
      borderRadius: radius.lg,
      borderWidth: 1.5,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
      overflow: 'hidden',
    },
    flag: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: sizes.flagPattern,
    },
    flagImage: {
      width: '100%',
      height: '100%',
    },
    badge: {
      position: 'absolute',
      top: -spacing.md,
      left: spacing.xl,
      paddingHorizontal: spacing.sm + spacing.xxs,
      paddingVertical: spacing.xs + spacing.xxs,
      borderRadius: radius.sm,
      backgroundColor: colors.primary,
    },
    badgeText: {
      ...typography.badge,
      color: colors.white,
      textTransform: 'uppercase',
    },
    cardSelected: {
      borderColor: colors.primary,
    },
    pressed: {
      opacity: 0.9,
    },
    text: {
      flex: 1,
      gap: spacing.sm,
    },
    title: {
      ...typography.cardTitle,
      color: colors.text,
      textTransform: 'uppercase',
    },
    titleLarge: {
      fontSize: typography.cardTitle.fontSize * 1.5,
    },
    description: {
      ...typography.paragraph,
      color: colors.textMuted,
    },
    radio: {
      width: sizes.radio,
      height: sizes.radio,
      borderRadius: radius.full,
      borderWidth: 2,
      borderColor: colors.surfaceBorder,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioSelected: {
      borderColor: colors.primary,
    },
    radioDot: {
      width: sizes.radio / 2,
      height: sizes.radio / 2,
      borderRadius: radius.full,
      backgroundColor: colors.primary,
    },
  }),
);
