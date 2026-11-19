import { StyleSheet, View } from 'react-native';

import { spacing, useColors } from '../../theme';
import { MarqueeColumn, type MarqueeCard } from './MarqueeColumn';

export type TiltedCarouselProps = {
  columns: MarqueeCard[][]; // three lists of cards
};

// The top of the intro: three columns of cards, tilted, moving endlessly
// (the middle one the other way), fading into the background at the bottom.
export function TiltedCarousel({ columns }: TiltedCarouselProps) {
  const colors = useColors();
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.tilted}>
        {columns.map((cards, i) => (
          <MarqueeColumn key={i} cards={cards} reverse={i % 2 === 1} />
        ))}
      </View>
      <View style={[StyleSheet.absoluteFill, { backgroundImage: colors.imageFade }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '64%',
    overflow: 'hidden',
  },
  // Just big enough that the rotated edges never show, so all 3 columns stay in view.
  tilted: {
    position: 'absolute',
    top: '-15%',
    bottom: '-15%',
    left: '-14%',
    right: '-14%',
    flexDirection: 'row',
    gap: spacing.md,
    transform: [{ rotate: '-12deg' }],
  },
});
