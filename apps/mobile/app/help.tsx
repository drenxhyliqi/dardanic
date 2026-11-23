import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

import { LinkRow } from '../components/ui/LinkRow';
import { SUPPORT_EMAIL } from '../config/app';
import { strings } from '../i18n';
import { makeStyles, radius, spacing, typography } from '../theme';

const t = strings.settings;
const mail = (subject?: string) => {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  Linking.openURL(`mailto:${SUPPORT_EMAIL}${query}`);
};

// Settings → Help & support: email us, report a problem, and how to report people or
// content (with the emergency number).
export default function HelpScreen() {
  const styles = useStyles();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <LinkRow
        icon="mail-outline"
        label={t.contactUs}
        hint={`${SUPPORT_EMAIL} · ${t.contactHint}`}
        onPress={() => mail()}
      />
      <LinkRow
        icon="bug-outline"
        label={t.reportProblem}
        hint={t.reportProblemHint}
        onPress={() => mail(t.problemSubject)}
      />
      <View style={styles.box}>
        <Text style={styles.title}>{t.safetyTitle}</Text>
        <Text style={styles.text}>{t.safetyText}</Text>
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.xl, gap: spacing.lg },
    box: {
      gap: spacing.xs,
      padding: spacing.lg,
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
    },
    title: { ...typography.label, color: colors.text },
    text: { ...typography.paragraph, color: colors.textMuted },
  }),
);
