import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFollow } from '../../context/FollowContext';
import { PEOPLE } from '../../data/feedAuthors';
import { ME } from '../../data/myPosts';
import { strings } from '../../i18n';
import { reportsService, type ReportKind, type ReportReason } from '../../services/reports';
import { makeStyles, spacing, typography } from '../../theme';
import { ReasonList } from '../settings/ReasonList';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import { ToggleRow } from '../ui/ToggleRow';
import { ReportDone } from './ReportDone';
import { REASONS_BY_KIND } from './reportReasons';

const t = strings.report;

export type ReportFlowProps = {
  kind: ReportKind;
  id: string;
  username?: string; // whose content it is (offers "Also block")
  onClose: () => void;
};

// Inside the Report sheet: 1) why (reasons that fit what's reported), 2) optional
// details and "Also block @user", 3) thanks. Reports are anonymous.
export function ReportFlow({ kind, id, username, onClose }: ReportFlowProps) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { block } = useFollow();
  const reasons = REASONS_BY_KIND[kind];
  const labels: string[] = reasons.map((reason) => t.reasons[reason]);
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [step, setStep] = useState<'reason' | 'details' | 'done'>('reason');
  const [details, setDetails] = useState('');
  const [alsoBlock, setAlsoBlock] = useState(false);
  const [sending, setSending] = useState(false);
  const person = username && username !== ME.username
    ? PEOPLE.find((someone) => someone.username === username)
    : undefined;

  const send = async () => {
    if (!reason) return;
    setSending(true);
    await reportsService.send({ kind, id, username, reason, details: details.trim() || undefined });
    if (alsoBlock && person) block(person);
    setSending(false);
    setStep('done');
  };

  if (step === 'done') {
    const blocked = alsoBlock && person ? person.username : undefined;
    return <ReportDone blocked={blocked} onDone={onClose} />;
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
    >
      {step === 'reason' ? (
        <>
          <View style={styles.head}>
            <Text style={styles.title}>{t.question}</Text>
            <Text style={styles.hint}>{t.hint}</Text>
          </View>
          <ReasonList
            reasons={labels}
            value={reason ? t.reasons[reason] : null}
            onChange={(label) => setReason(reasons[labels.indexOf(label ?? '')] ?? null)}
          />
          <Button
            label={t.next}
            small
            centered
            disabled={!reason}
            onPress={() => setStep('details')}
          />
        </>
      ) : (
        <>
          <TextField
            label={t.detailsTitle}
            placeholder={t.detailsPlaceholder}
            value={details}
            onChangeText={setDetails}
            multiline
            maxLength={500}
          />
          {person && (
            <ToggleRow
              label={t.alsoBlock(person.username)}
              hint={t.alsoBlockHint}
              value={alsoBlock}
              onChange={setAlsoBlock}
            />
          )}
          <Button label={t.submit} small centered disabled={sending} onPress={send} />
        </>
      )}
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    content: { gap: spacing.lg, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
    head: { gap: spacing.xs },
    title: { ...typography.cardTitle, color: colors.text },
    hint: { ...typography.small, color: colors.textMuted },
  }),
);
