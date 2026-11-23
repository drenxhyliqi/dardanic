import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { FlameButton } from '../flame/FlameButton';
import { useFlame } from '../flame/useFlame';

const t = strings.story;

export type StoryFooterProps = {
  label: string; // who you'd reply to
  onTypingChange: (typing: boolean) => void; // the story pauses while you type
};

// Bottom of a story: a "Reply to …" field, the flame (like) and send.
// Sending a reply does nothing yet (no messages backend).
export function StoryFooter({ label, onTypingChange }: StoryFooterProps) {
  const styles = useStyles();
  const colors = useColors();
  const { flamed, toggle } = useFlame();

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.reply}
        placeholder={t.reply(label)}
        placeholderTextColor={colors.storyMuted}
        autoCorrect={false} // Albanian text: don't "fix" it into English
        spellCheck={false}
        selectionColor={colors.white}
        keyboardAppearance="dark"
        onFocus={() => onTypingChange(true)}
        onBlur={() => onTypingChange(false)}
      />
      <FlameButton flamed={flamed} onToggle={toggle} color={colors.white} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t.send}
        hitSlop={spacing.xs}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Ionicons name="paper-plane-outline" size={sizes.actionIcon} color={colors.white} />
      </Pressable>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
    },
    reply: {
      ...typography.input,
      flex: 1,
      height: sizes.storyReply,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.storyMuted,
      color: colors.white,
    },
    pressed: {
      transform: [{ scale: 0.85 }],
    },
  }),
);
