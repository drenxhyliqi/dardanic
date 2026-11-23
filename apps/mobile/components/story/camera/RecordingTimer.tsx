import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../../i18n';
import { makeStyles, radius, spacing, typography } from '../../../theme';
import { MAX_SECONDS } from './useStoryRecorder';

const TICK_MS = 250;

// While recording: a bar across the top filling up to 15 s, and a red pill with the
// seconds so far.
export function RecordingTimer({ top }: { top: number }) {
  const styles = useStyles();
  const [startedAt] = useState(Date.now);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(Date.now() - startedAt), TICK_MS);
    return () => clearInterval(timer);
  }, [startedAt]);

  const share = Math.min(1, elapsed / (MAX_SECONDS * 1000));
  return (
    <View style={[styles.box, { top }]} pointerEvents="none">
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${share * 100}%` }]} />
      </View>
      <View style={styles.pill}>
        <View style={styles.dot} />
        <Text style={styles.time}>{strings.story.recording(Math.floor(elapsed / 1000))}</Text>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    box: {
      position: 'absolute',
      left: spacing.md,
      right: spacing.md,
      alignItems: 'center',
      gap: spacing.sm,
    },
    track: {
      alignSelf: 'stretch',
      height: spacing.xxs,
      borderRadius: radius.full,
      backgroundColor: colors.storyTrack,
    },
    fill: { height: '100%', borderRadius: radius.full, backgroundColor: colors.white },
    pill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs,
      borderRadius: radius.full,
      backgroundColor: colors.alert,
    },
    dot: {
      width: spacing.xs,
      height: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: colors.white,
    },
    time: { ...typography.label, color: colors.white },
  }),
);
