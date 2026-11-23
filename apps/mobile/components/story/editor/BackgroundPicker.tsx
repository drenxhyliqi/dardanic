import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { strings } from '../../../i18n';
import { makeStyles, radius, sizes, spacing, useColors } from '../../../theme';

const DOT = sizes.headerButton - spacing.sm;

export type BackgroundPickerProps = {
  value: string;
  onChange: (color: string) => void;
};

// A row of solid colours for behind the photo; the chosen one has a white ring.
export function BackgroundPicker({ value, onChange }: BackgroundPickerProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {colors.storyBackgrounds.map((color, index) => (
        <Pressable
          key={color}
          onPress={() => onChange(color)}
          accessibilityRole="radio"
          accessibilityState={{ selected: color === value }}
          accessibilityLabel={strings.story.backgroundColor(index + 1)}
          style={[styles.dot, { backgroundColor: color }, color === value && styles.chosen]}
        />
      ))}
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { gap: spacing.md, paddingHorizontal: spacing.lg, alignItems: 'center' },
    dot: {
      width: DOT,
      height: DOT,
      borderRadius: radius.full,
      borderWidth: sizes.accentRing,
      borderColor: colors.storyTrack,
    },
    chosen: { borderWidth: sizes.accentRing * 2, borderColor: colors.white },
  }),
);
