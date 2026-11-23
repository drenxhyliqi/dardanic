import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { Avatar } from '../profile/Avatar';

export type StoryBubbleProps = {
  title: string; // shown under the circle
  name: string; // whose story (initials when there's no photo)
  label: string; // read out by screen readers
  photo: string | null;
  ring: 'new' | 'seen' | 'own';
  onPress?: () => void;
  onAdd?: () => void; // your story once it has something: a small + to add more
};

// One circle in the stories row. new = blue → purple ring (like the profile),
// seen = thin grey ring, own = no ring but a small blue + to add a story. With onAdd,
// the + is its own button (tap the circle to watch, the + to add).
export function StoryBubble(props: StoryBubbleProps) {
  const { title, name, label, photo, ring, onPress, onAdd } = props;
  const styles = useStyles();
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.bubble, pressed && styles.pressed]}
    >
      <View style={[styles.ring, styles[ring]]}>
        <Avatar
          photo={photo}
          name={name}
          size={sizes.storyAvatar}
          ringColor={colors.background}
          border={sizes.storyRing}
        />
        {onAdd ? (
          <Pressable
            onPress={onAdd}
            accessibilityRole="button"
            accessibilityLabel={strings.story.addStory}
            hitSlop={spacing.sm}
            style={styles.add}
          >
            <Ionicons name="add" size={sizes.chipIcon} color={colors.white} />
          </Pressable>
        ) : (
          ring === 'own' && (
            <View style={styles.add}>
              <Ionicons name="add" size={sizes.chipIcon} color={colors.white} />
            </View>
          )
        )}
      </View>
      <Text style={[styles.name, ring === 'seen' && styles.nameSeen]} numberOfLines={1}>
        {title}
      </Text>
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    bubble: {
      width: sizes.storyLabel,
      alignItems: 'center',
      gap: spacing.xs,
    },
    pressed: {
      opacity: 0.7,
    },
    ring: {
      padding: sizes.storyRing,
      borderRadius: radius.full,
    },
    new: {
      backgroundImage: colors.storyRing,
    },
    seen: {
      backgroundColor: colors.surfaceBorder,
    },
    own: {},
    add: {
      position: 'absolute',
      right: sizes.storyRing,
      bottom: sizes.storyRing,
      width: sizes.storyAddBadge,
      height: sizes.storyAddBadge,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      borderWidth: 2,
      borderColor: colors.background,
      backgroundColor: colors.primary,
    },
    name: {
      ...typography.small,
      color: colors.text,
    },
    nameSeen: {
      color: colors.textMuted,
    },
  }),
);
