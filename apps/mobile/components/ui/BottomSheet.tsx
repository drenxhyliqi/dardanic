import type { ReactNode } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { useBottomSheet } from './useBottomSheet';

const BACKDROP_DIM = 0.5;

export type SheetControls = { expand: () => void; close: () => void };

export type BottomSheetProps = {
  title: string;
  onClosed: () => void; // after it has slid away (e.g. go back)
  children: (sheet: SheetControls) => ReactNode; // can open it full screen or close it
  openRatio?: number; // share of the screen it opens to (default 0.7)
};

// A sheet attached to the bottom edge of the screen: opens to 70% of the screen over a
// dimmed background, slide its top bar (handle + title) up for full screen or down to
// close; tapping the dimmed part closes it too. The content can call `expand` (e.g.
// when you start scrolling) to go full screen, or `close` (e.g. a Done button).
export function BottomSheet({ title, onClosed, children, openRatio }: BottomSheetProps) {
  const styles = useStyles();
  const sheet = useBottomSheet(onClosed, openRatio);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[styles.backdrop, { opacity: Animated.multiply(sheet.backdrop, BACKDROP_DIM) }]}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={sheet.close}
          accessibilityRole="button"
          accessibilityLabel={strings.common.close}
        />
      </Animated.View>
      <Animated.View style={[styles.sheet, { height: sheet.height }]}>
        <View style={styles.top} {...sheet.panHandlers}>
          <View style={styles.grabber} />
          <Text style={styles.title}>{title}</Text>
        </View>
        {children({ expand: sheet.expand, close: sheet.close })}
      </Animated.View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: colors.black,
    },
    sheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      backgroundColor: colors.background,
    },
    top: {
      alignItems: 'center',
      gap: spacing.sm,
      paddingTop: spacing.sm,
      paddingBottom: spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.surfaceBorder,
    },
    grabber: {
      width: sizes.grabber,
      height: sizes.grabberHeight,
      borderRadius: radius.full,
      backgroundColor: colors.borderFocus,
    },
    title: {
      ...typography.label,
      color: colors.text,
    },
  }),
);
