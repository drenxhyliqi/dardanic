import { Pressable, StyleSheet, View } from 'react-native';

import { strings } from '../../../i18n';
import { makeStyles, radius, sizes, spacing } from '../../../theme';

const HOLD_MS = 250; // hold this long to start a video instead of a photo
const SIZE = sizes.headerButton * 2;

export type ShutterButtonProps = {
  recording: boolean;
  onPhoto: () => void;
  onRecordStart: () => void;
  onRecordStop: () => void;
};

// The big round button: tap = photo, hold = video (letting go stops it). While
// recording, the white middle becomes a small red square, like a stop button.
export function ShutterButton(props: ShutterButtonProps) {
  const { recording, onPhoto, onRecordStart, onRecordStop } = props;
  const styles = useStyles();
  return (
    <Pressable
      onPress={onPhoto}
      onLongPress={onRecordStart}
      onPressOut={() => recording && onRecordStop()}
      delayLongPress={HOLD_MS}
      accessibilityRole="button"
      accessibilityLabel={strings.story.shutter}
      style={[styles.ring, recording && styles.ringRecording]}
    >
      <View style={[styles.middle, recording && styles.middleRecording]} />
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    ring: {
      width: SIZE,
      height: SIZE,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      borderWidth: spacing.xs,
      borderColor: colors.white,
    },
    ringRecording: { transform: [{ scale: 1.15 }] },
    middle: {
      width: SIZE - spacing.md * 2,
      height: SIZE - spacing.md * 2,
      borderRadius: radius.full,
      backgroundColor: colors.white,
    },
    // Red = recording (like LIVE).
    middleRecording: {
      width: SIZE / 2.6,
      height: SIZE / 2.6,
      borderRadius: radius.sm,
      backgroundColor: colors.alert,
    },
  }),
);
