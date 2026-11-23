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
  onReport?: () => void; // others' stories: a flag to report it
};

// Who posted the story and when, with report (others' stories) and close on the
// right. White on the darkened top of the photo.
export function StoryHeader({ label, name, avatar, time, onClose, onReport }: StoryHeaderProps) {
  const styles = useStyles();
  const colors = useColors();

  return (
    <View style={styles.row}>
      <Avatar photo={avatar} name={name} size={sizes.postAvatar} border={0} />
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.actions}>
        {onReport && (
          <Pressable
            onPress={onReport}
            accessibilityRole="button"
            accessibilityLabel={strings.report.titles.story}
            hitSlop={spacing.sm}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Ionicons name="flag-outline" size={sizes.icon} color={colors.white} />
          </Pressable>
        )}
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={strings.story.close}
          hitSlop={spacing.md}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Ionicons name="close" size={sizes.headerIcon} color={colors.white} />
        </Pressable>
      </View>
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
    // Flag and × together on the right, with breathing room between them.
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
      marginLeft: 'auto',
    },
    pressed: {
      opacity: 0.6,
    },
  }),
);
