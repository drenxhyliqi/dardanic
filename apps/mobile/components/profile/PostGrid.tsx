import { StyleSheet, useWindowDimensions, View } from 'react-native';

import type { PhotoPost } from '../../data/feed';
import { sizes } from '../../theme';
import { ExploreTile } from '../search/ExploreTile';

const COLUMNS = 3;

// A profile's photo posts as a square grid, edge to edge (like Instagram). Tapping a
// tile opens the post.
export function PostGrid({ posts }: { posts: PhotoPost[] }) {
  const { width } = useWindowDimensions();
  const tile = (width - sizes.gridGap * (COLUMNS - 1)) / COLUMNS;
  return (
    <View style={[styles.grid, { gap: sizes.gridGap }]}>
      {posts.map((post) => (
        <ExploreTile key={post.id} post={post} width={tile} height={tile} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
});
