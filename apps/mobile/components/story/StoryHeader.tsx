import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { Avatar } from '../profile/Avatar';

export type StoryHeaderProps = {
  label: string; // username or crew name
  name: string; // for initials when there's no avatar
  avatar: string | null;
  time: string; // "2h"
  onClose: () => void;
};

// Who posted the story and when, with a close button on the right. White on the
// darkened top of the photo.
export function StoryHeader({ label, name, avatar, time, onClose }: StoryHeaderProps) {
  const styles = useStyles();
  const colors = useColors();

  return (
    <View style={styles.row}>
      <Avatar photo={avatar} name={name} size={sizes.postAvatar} border={0} />
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.time}>{time}</Text>
      <Pressable
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel={strings.story.close}
        hitSlop={spacing.md}
        style={({ pressed }) => [styles.close, pressed && styles.pressed]}
      >
        <Ionicons name="close" size={sizes.headerIcon} color={colors.white} />
      </Pressable>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    label: {
      ...typography.name,
      flexShrink: 1,
      color: colors.white,
    },
    time: {
      ...typography.paragraph,
      color: colors.storyMuted,
    },
    close: {
      marginLeft: 'auto',
    },
    pressed: {
      opacity: 0.6,
    },
  }),
);
