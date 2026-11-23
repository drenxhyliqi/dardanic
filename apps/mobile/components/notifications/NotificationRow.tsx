import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import type { AppNotification } from '../../services/notifications';
import { makeStyles, spacing, typography } from '../../theme';
import { NotificationAside } from './NotificationAside';
import { NotificationAvatar } from './NotificationAvatar';
import { notificationText } from './notificationText';

export type NotificationRowProps = {
  note: AppNotification;
  isNew: boolean; // unread when the screen opened: soft highlight
  onPress: () => void;
};

// One notification: who (with a badge for what happened), "**leon_builds and
// granit.gt** flamed your post." and when, then a thumbnail or "Follow back".
export const NotificationRow = memo(function NotificationRow(props: NotificationRowProps) {
  const { note, isNew, onPress } = props;
  const styles = useStyles();
  const { names, action } = notificationText(note);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, isNew && styles.new, pressed && styles.pressed]}
    >
      <NotificationAvatar note={note} />
      <Text style={styles.text}>
        {names !== '' && <Text style={styles.names}>{`${names} `}</Text>}
        {action}
        <Text style={styles.time}>{`  ${strings.feed.timeAgo(note.minutesAgo)}`}</Text>
      </Text>
      <View>
        <NotificationAside note={note} />
      </View>
    </Pressable>
  );
});

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    new: { backgroundColor: colors.surface },
    pressed: { opacity: 0.7 },
    text: { ...typography.paragraph, flex: 1, color: colors.text },
    names: { fontWeight: typography.label.fontWeight },
    time: { ...typography.small, color: colors.textMuted },
  }),
);
