import { StyleSheet, useWindowDimensions, View } from 'react-native';

import type { ExplorePost } from '../../services/search';
import { sizes } from '../../theme';
import { ExploreTile } from './ExploreTile';

const COLUMNS = 3;
const GROUP = 5; // one tall tile + four squares

// Explore as a grid, edge to edge, in groups of five: a tall tile next to four squares,
// the tall one switching sides each group (like Instagram). Leftovers are squares.
export function ExploreGrid({ posts }: { posts: ExplorePost[] }) {
  const { width } = useWindowDimensions();
  const gap = sizes.gridGap;
  const tile = (width - gap * (COLUMNS - 1)) / COLUMNS;
  const tall = tile * 2 + gap;

  const groups: ExplorePost[][] = [];
  for (let i = 0; i < posts.length; i += GROUP) groups.push(posts.slice(i, i + GROUP));

  return (
    <View style={{ gap }}>
      {groups.map((group, index) =>
        group.length === GROUP ? (
          <View
            key={group[0].id}
            style={[styles.row, { gap }, index % 2 === 1 && styles.reverse]}
          >
            <ExploreTile post={group[0]} width={tile} height={tall} />
            <View style={[styles.squares, { gap, width: tile * 2 + gap }]}>
              {group.slice(1).map((post) => (
                <ExploreTile key={post.id} post={post} width={tile} height={tile} />
              ))}
            </View>
          </View>
        ) : (
          <View key={group[0].id} style={[styles.squares, { gap }]}>
            {group.map((post) => (
              <ExploreTile key={post.id} post={post} width={tile} height={tile} />
            ))}
          </View>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  reverse: { flexDirection: 'row-reverse' },
  squares: { flexDirection: 'row', flexWrap: 'wrap' },
});
