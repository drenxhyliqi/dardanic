import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, spacing, typography } from '../../theme';
import { LiveDot } from './LiveDot';

export type StatusBadgeProps = {
  label: string; // LIVE / Tonight / Tomorrow / In 4 days
  live: boolean; // red with a pulsing dot
  top?: number; // distance from the photo's top (default: a small margin)
};

// A meet's status on its photo, top-right: plain, or red with a pulsing dot when LIVE.
export function StatusBadge({ label, live, top }: StatusBadgeProps) {
  const styles = useStyles();
  return (
    <View style={[styles.badge, live && styles.live, top !== undefined && { top }]}>
      {live && <LiveDot />}
      <Text style={[styles.text, live && styles.textLive]}>{label}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    badge: {
      position: 'absolute',
      top: spacing.md,
      right: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: radius.sm,
      backgroundColor: colors.background,
    },
    live: { backgroundColor: colors.alert },
    text: { ...typography.badge, color: colors.text },
    textLive: { color: colors.white },
  }),
);
