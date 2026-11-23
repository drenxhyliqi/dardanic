import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { pickChatPhotos, takeChatPhoto } from '../../utils/pickImage';
import { AttachMenu } from './AttachMenu';
import { PhotoPreviews } from './PhotoPreviews';

const t = strings.messages;
const CONTROL = sizes.headerButton; // buttons and a one-line field are the same height
const LINE = 20; // one line of text in the field
const FIELD_PADDING = (CONTROL - LINE) / 2; // so one line sits exactly in the middle

export type ChatComposerProps = {
  onSend: (message: { text?: string; photos: string[] }) => void;
  initialText?: string; // a message already typed in (e.g. from Message seller)
  attachment?: ReactNode; // shown above the field and sent with the message
};

const takeOne = async () => {
  const photo = await takeChatPhoto();
  return photo ? [photo] : [];
};

// Bottom of a chat: a paperclip (Photo library or Camera), the message field, and a
// blue send button once there's something to send. Picked photos wait above the field
// as a preview (× to remove) and go out with the text when you tap Send. The buttons
// stay level with the last line while the message grows.
export function ChatComposer({ onSend, initialText = '', attachment }: ChatComposerProps) {
  const styles = useStyles();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState(initialText);
  const [photos, setPhotos] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const canSend = text.trim().length > 0 || photos.length > 0 || Boolean(attachment);

  const send = () => {
    if (!canSend) return;
    onSend({ text: text.trim() || undefined, photos });
    setText('');
    setPhotos([]);
  };

  const add = async (pick: () => Promise<string[]>) => {
    setMenuOpen(false);
    const picked = await pick();
    if (picked.length) setPhotos((current) => [...current, ...picked]);
  };

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + spacing.sm }]}>
      {attachment}
      {photos.length > 0 && (
        <PhotoPreviews
          photos={photos}
          onRemove={(index) => setPhotos((current) => current.filter((_, i) => i !== index))}
        />
      )}
      {menuOpen && (
        <AttachMenu onLibrary={() => add(pickChatPhotos)} onCamera={() => add(takeOne)} />
      )}
      <View style={styles.row}>
        <Pressable
          onPress={() => setMenuOpen((open) => !open)}
          accessibilityRole="button"
          accessibilityLabel={t.attach}
          accessibilityState={{ expanded: menuOpen }}
          style={({ pressed }) => [styles.round, pressed && styles.pressed]}
        >
          <Ionicons
            name={menuOpen ? 'close' : 'attach'}
            size={sizes.icon + 2}
            color={colors.text}
          />
        </Pressable>
        {/* The box (border, height) is this View, not the TextInput: iOS can report a
            multi-line TextInput taller than it draws, which pushed the buttons down. */}
        <View style={styles.field}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={t.placeholder}
            placeholderTextColor={colors.textMuted}
            autoCorrect={false} // Albanian text: don't "fix" it into English
            spellCheck={false}
            selectionColor={colors.primary}
            multiline
            style={styles.input}
          />
        </View>
        {canSend && (
          <Pressable
            onPress={send}
            accessibilityRole="button"
            accessibilityLabel={t.send}
            style={({ pressed }) => [styles.round, styles.send, pressed && styles.pressed]}
          >
            <Ionicons name="arrow-up" size={sizes.icon} color={colors.white} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    bar: {
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.surfaceBorder,
      backgroundColor: colors.background,
    },
    // Bottom-aligned: with several lines, the buttons sit level with the last one.
    row: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm },
    round: {
      width: CONTROL,
      height: CONTROL,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      backgroundColor: colors.surface,
    },
    send: { backgroundColor: colors.primary },
    pressed: { opacity: 0.7 },
    field: {
      flex: 1,
      minHeight: CONTROL,
      justifyContent: 'center',
      paddingVertical: FIELD_PADDING - 1, // minus the 1-pt border
      paddingHorizontal: spacing.md,
      borderRadius: CONTROL / 2,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
    },
    // No padding of its own (iOS adds its own on multi-line fields otherwise).
    input: {
      ...typography.input,
      lineHeight: LINE,
      maxHeight: sizes.composerMax - FIELD_PADDING * 2,
      padding: 0,
      color: colors.text,
    },
  }),
);
