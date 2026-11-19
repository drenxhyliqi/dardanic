import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { sizes, spacing } from '../../theme';

const PIXELS_PER_SECOND = 22;

export type MarqueeCard = { key: string; tall?: boolean; node: ReactNode };

export type MarqueeColumnProps = {
  cards: MarqueeCard[];
  reverse?: boolean; // true = moves down instead of up
};

const heightOf = (card: MarqueeCard) => (card.tall ? sizes.introCardTall : sizes.introCard);

// One endlessly moving column. The cards are drawn twice, one set under the other;
// the column slides by exactly one set and starts over, so the loop has no visible jump.
export function MarqueeColumn({ cards, reverse = false }: MarqueeColumnProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const loopHeight = cards.reduce((sum, card) => sum + heightOf(card) + spacing.md, 0);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: (loopHeight / PIXELS_PER_SECOND) * 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [progress, loopHeight]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: reverse ? [-loopHeight, 0] : [0, -loopHeight],
  });

  return (
    <View style={styles.column}>
      <Animated.View style={[styles.track, { transform: [{ translateY }] }]}>
        {[...cards, ...cards].map((card, i) => (
          <View key={`${card.key}-${i}`} style={{ height: heightOf(card) }}>
            {card.node}
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  track: {
    gap: spacing.md,
  },
});
