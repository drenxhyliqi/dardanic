import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Conversation } from '../../data/messages';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { Button } from '../ui/Button';

const t = strings.messages;

export type RequestBannerProps = {
  chat: Conversation;
  onAccept: () => void;
  onDelete: () => void;
  onBlock: () => void;
};

// Instead of the message field on a message request: who it is, a note that they can't
// see you've read it, and Accept / Delete / Block. You can only reply after accepting.
// (People who found you by plate send a FindMe request instead.)
export function RequestBanner({ chat, onAccept, onDelete, onBlock }: RequestBannerProps) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const text = t.requestFromProfile(chat.title);

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom + spacing.md }]}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.hint}>{t.requestHint}</Text>
      <Button label={t.accept} small strong centered onPress={onAccept} />
      <View style={styles.row}>
        <View style={styles.half}>
          <Button label={t.delete} variant="secondary" small centered onPress={onDelete} />
        </View>
        <View style={styles.half}>
          <Button label={t.block} variant="secondary" small centered onPress={onBlock} />
        </View>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    wrap: {
      gap: spacing.sm,
      padding: spacing.lg,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.surfaceBorder,
      backgroundColor: colors.background,
    },
    text: {
      ...typography.label,
      textAlign: 'center',
      color: colors.text,
    },
    hint: {
      ...typography.small,
      textAlign: 'center',
      marginBottom: spacing.xs,
      color: colors.textMuted,
    },
    row: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    half: {
      flex: 1,
    },
  }),
);
