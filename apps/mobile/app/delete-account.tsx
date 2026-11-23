import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ReasonList } from '../components/settings/ReasonList';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { ToggleRow } from '../components/ui/ToggleRow';
import { strings } from '../i18n';
import { makeStyles, spacing, typography } from '../theme';

const t = strings.settings;

// Settings → Delete account (required by Apple and Google): what gets deleted, the
// 30-day grace period, an optional reason, a confirmation switch, then the button.
// Nothing is sent yet (no backend); afterwards it goes back to the welcome screen.
export default function DeleteAccountScreen() {
  const styles = useStyles();
  const [reason, setReason] = useState<string | null>(null);
  const [understood, setUnderstood] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <View style={[styles.screen, styles.doneBox]}>
        <EmptyState icon="time-outline" title={t.deletedTitle} hint={t.deletedHint} />
        <Button label={t.deletedDone} centered onPress={() => router.replace('/')} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.group}>
        <Text style={styles.text}>{t.deleteIntro}</Text>
        {t.deleteWhat.map((line) => (
          <Text key={line} style={styles.bullet}>{`•  ${line}`}</Text>
        ))}
        <Text style={styles.text}>{t.deleteGrace}</Text>
      </View>
      <View style={styles.group}>
        <Text style={styles.heading}>{t.deleteReasonTitle}</Text>
        <ReasonList reasons={t.deleteReasons} value={reason} onChange={setReason} />
      </View>
      <ToggleRow label={t.deleteConfirm} value={understood} onChange={setUnderstood} />
      <Button
        label={t.deleteButton}
        icon="trash-outline"
        centered
        disabled={!understood}
        onPress={() => setDone(true)}
      />
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.xl, gap: spacing.xl },
    doneBox: { justifyContent: 'center', gap: spacing.xl, padding: spacing.xl },
    group: { gap: spacing.sm },
    heading: { ...typography.label, color: colors.text },
    text: { ...typography.paragraph, color: colors.textMuted },
    bullet: { ...typography.paragraph, color: colors.text },
  }),
);
