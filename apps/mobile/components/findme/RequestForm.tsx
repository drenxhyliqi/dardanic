import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFindMe } from '../../context/FindMeContext';
import { strings } from '../../i18n';
import type { Driver } from '../../services/findme';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { Button } from '../ui/Button';

const t = strings.findme;
const MAX_MESSAGE = 150;

export type RequestFormProps = {
  driver: Driver;
  onDone: () => void;
};

// Inside the "Send request" sheet: an optional short note (where you saw them), then
// Send. After sending it turns into a blue "Request sent ✓" with Done.
export function RequestForm({ driver, onDone }: RequestFormProps) {
  const styles = useStyles();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { sendRequest } = useFindMe();
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const send = async () => {
    setSending(true);
    await sendRequest(driver, message.trim() || undefined);
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <View style={[styles.body, styles.center, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Ionicons name="checkmark-circle" size={sizes.heroIcon} color={colors.primary} />
        <Text style={styles.title}>{t.sentTitle}</Text>
        <Text style={styles.hint}>{t.sentHint(driver.username)}</Text>
        <Button label={t.done} small centered strong onPress={onDone} />
      </View>
    );
  }

  return (
    <View style={[styles.body, { paddingBottom: insets.bottom + spacing.lg }]}>
      <Text style={styles.hint}>{t.requestHint}</Text>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder={t.messagePlaceholder}
        placeholderTextColor={colors.textMuted}
        autoCorrect={false} // Albanian text: don't "fix" it into English
        spellCheck={false}
        selectionColor={colors.primary}
        maxLength={MAX_MESSAGE}
        multiline
        style={styles.input}
      />
      <Text style={styles.count}>{t.messageCount(message.length, MAX_MESSAGE)}</Text>
      <Button
        label={t.sendRequest}
        icon="paper-plane"
        small
        centered
        strong
        disabled={sending}
        onPress={send}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    body: {
      gap: spacing.md,
      padding: spacing.lg,
    },
    center: {
      alignItems: 'stretch',
    },
    title: {
      ...typography.title,
      textAlign: 'center',
      color: colors.text,
    },
    hint: {
      ...typography.paragraph,
      textAlign: 'center',
      color: colors.textMuted,
    },
    input: {
      ...typography.input,
      minHeight: sizes.bioField,
      padding: spacing.md,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
      color: colors.text,
      textAlignVertical: 'top',
    },
    count: {
      ...typography.small,
      textAlign: 'right',
      color: colors.textMuted,
    },
  }),
);
