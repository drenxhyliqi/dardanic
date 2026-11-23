import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import type { ConnectionRequest } from '../../services/findme';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { Avatar } from '../profile/Avatar';
import { Button } from '../ui/Button';

const t = strings.findme;

export type RequestRowProps = {
  request: ConnectionRequest;
  onAccept?: () => Promise<void>;
  onDecline?: () => Promise<void>;
  onBlock?: () => Promise<void>;
  onCancel?: () => Promise<void>;
};

// One FindMe request. Received: who, their car, their note, and Accept / Decline /
// Block. Sent: who, "Waiting for an answer", and Cancel. Buttons wait for the answer
// so they can't be pressed twice.
export function RequestRow({ request, onAccept, onDecline, onBlock, onCancel }: RequestRowProps) {
  const styles = useStyles();
  const [busy, setBusy] = useState(false);
  const { person } = request;
  const run = (action?: () => Promise<void>) => async () => {
    if (!action || busy) return;
    setBusy(true);
    await action();
    setBusy(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Avatar photo={person.photo} name={person.name} size={sizes.headerButton} border={0} />
        <View style={styles.who}>
          <Text style={styles.name}>{person.username}</Text>
          <Text style={styles.muted}>
            {`${person.car} · ${strings.feed.timeAgo(request.minutesAgo)}`}
          </Text>
        </View>
      </View>
      {request.message && <Text style={styles.message}>{request.message}</Text>}

      {request.direction === 'incoming' ? (
        <>
          <View style={styles.buttons}>
            <View style={styles.grow}>
              <Button
                label={t.accept}
                small
                strong
                centered
                disabled={busy}
                onPress={run(onAccept)}
              />
            </View>
            <View style={styles.grow}>
              <Button
                label={t.decline}
                variant="secondary"
                small
                centered
                disabled={busy}
                onPress={run(onDecline)}
              />
            </View>
          </View>
          <Pressable onPress={run(onBlock)} accessibilityRole="button" hitSlop={spacing.sm}>
            <Text style={styles.block}>{t.block}</Text>
          </Pressable>
        </>
      ) : (
        <View style={styles.waitingRow}>
          <Text style={styles.muted}>{t.waiting}</Text>
          <Button
            label={t.cancelRequest}
            variant="secondary"
            small
            compact
            disabled={busy}
            onPress={run(onCancel)}
          />
        </View>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      gap: spacing.md,
      padding: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    top: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    who: { flex: 1 },
    name: { ...typography.name, color: colors.text },
    muted: { ...typography.small, color: colors.textMuted },
    message: {
      ...typography.paragraph,
      padding: spacing.md,
      borderRadius: radius.md,
      overflow: 'hidden',
      backgroundColor: colors.background,
      color: colors.text,
    },
    buttons: { flexDirection: 'row', gap: spacing.sm },
    grow: { flex: 1 },
    block: { ...typography.small, textAlign: 'center', color: colors.textMuted },
    waitingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  }),
);
