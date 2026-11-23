import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFindMe } from '../../context/FindMeContext';
import { strings } from '../../i18n';
import type { WhoCanRequest } from '../../services/findme';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { PillTabs } from '../ui/PillTabs';
import { ToggleRow } from '../ui/ToggleRow';

const t = strings.findme;

// FindMe settings: the main switch (hides all your vehicles at once), who can send you
// requests, the drivers you've blocked, and how FindMe works.
export function FindMeSettings() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { settings, updateSettings, blocked } = useFindMe();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
    >
      <View style={styles.card}>
        <ToggleRow
          label={t.discoveryMain}
          hint={t.discoveryMainHint}
          value={settings.discovery}
          onChange={(discovery) => updateSettings({ discovery })}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>{t.whoCanRequest}</Text>
        <PillTabs<WhoCanRequest>
          tabs={[
            { key: 'everyone', label: t.everyone },
            { key: 'mutuals', label: t.mutuals },
          ]}
          active={settings.whoCanRequest}
          onChange={(whoCanRequest) => updateSettings({ whoCanRequest })}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>{t.blockedDrivers}</Text>
        <Text style={styles.body}>{blocked.length ? blocked.join(', ') : t.noBlocked}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>{t.howItWorks}</Text>
        {t.howSteps.map((step, index) => (
          <View key={step} style={styles.step}>
            <View style={styles.number}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <Text style={styles.body}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { gap: spacing.xl, padding: spacing.lg },
    card: {
      padding: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    section: { gap: spacing.md },
    heading: { ...typography.label, color: colors.text },
    body: { ...typography.paragraph, flex: 1, color: colors.textMuted },
    step: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
    number: {
      width: sizes.replyAvatar,
      height: sizes.replyAvatar,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      backgroundColor: colors.primarySoft,
    },
    numberText: { ...typography.label, color: colors.primaryLight },
  }),
);
