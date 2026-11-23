import { Animated, StyleSheet, View } from 'react-native';

import { makeStyles, radius, sizes, spacing } from '../../theme';

export type StoryProgressProps = {
  count: number; // photos in this person's story
  index: number; // the one showing now
  progress: Animated.Value; // 0 → 1 for the one showing now
};

// The thin bars across the top of a story, one per photo: watched ones full,
// the current one filling up, the rest empty.
export function StoryProgress({ count, index, progress }: StoryProgressProps) {
  const styles = useStyles();

  return (
    <View
      style={styles.row}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {Array.from({ length: count }, (_, bar) => (
        <View key={bar} style={styles.track}>
          {bar < index && <View style={styles.fill} />}
          {bar === index && (
            <Animated.View style={[styles.fill, { transform: [{ scaleX: progress }] }]} />
          )}
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.xs,
    },
    track: {
      flex: 1,
      height: sizes.storyProgress,
      overflow: 'hidden',
      borderRadius: radius.full,
      backgroundColor: colors.storyTrack,
    },
    fill: {
      ...StyleSheet.absoluteFill,
      transformOrigin: 'left',
      backgroundColor: colors.white,
    },
  }),
);
