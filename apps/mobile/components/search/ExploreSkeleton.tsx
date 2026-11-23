import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { sizes } from '../../theme';
import { Skeleton } from '../ui/Skeleton';

const COLUMNS = 3;
const TILES = 12;

// Grey, pulsing squares in the shape of the Explore grid while it loads.
export function ExploreSkeleton() {
  const { width } = useWindowDimensions();
  const tile = (width - sizes.gridGap * (COLUMNS - 1)) / COLUMNS;
  return (
    <View style={[styles.grid, { gap: sizes.gridGap }]} accessibilityElementsHidden>
      {Array.from({ length: TILES }, (_, index) => (
        <Skeleton key={index} width={tile} height={tile} radius={0} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
});
