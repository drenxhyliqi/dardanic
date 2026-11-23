import Constants from 'expo-constants';
import { router } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';

import { SettingsSection } from '../components/settings/SettingsSection';
import { ThemePicker } from '../components/settings/ThemePicker';
import { LinkRow } from '../components/ui/LinkRow';
import { ToggleRow } from '../components/ui/ToggleRow';
import { useFollow } from '../context/FollowContext';
import { usePrivacy } from '../context/PrivacyContext';
import { strings } from '../i18n';
import { makeStyles, spacing, typography } from '../theme';

const t = strings.settings;

// Settings (⚙️ on your profile): privacy & safety (private account, FindMe, blocked
// accounts), appearance, help & legal, and the account (log out, delete account).
export default function SettingsScreen() {
  const styles = useStyles();
  const { isPrivate, setPrivate } = usePrivacy();
  const { blockedPeople } = useFollow();

  const logOut = () =>
    Alert.alert(t.logOutTitle, undefined, [
      { text: t.logOutCancel, style: 'cancel' },
      { text: t.logOut, onPress: () => router.replace('/') },
    ]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SettingsSection title={t.sections.privacy}>
        <ToggleRow
          label={strings.privacy.privateAccount}
          hint={strings.privacy.privateAccountHint}
          value={isPrivate}
          onChange={setPrivate}
        />
        <LinkRow
          icon="car-sport-outline"
          label={strings.findme.settings}
          hint={strings.findme.registerHint}
          onPress={() => router.push('/findme/settings')}
        />
        <LinkRow
          icon="ban-outline"
          label={t.blocked}
          hint={t.blockedHint(blockedPeople.length)}
          onPress={() => router.push('/blocked')}
        />
      </SettingsSection>

      <SettingsSection title={t.sections.appearance}>
        <ThemePicker />
      </SettingsSection>

      <SettingsSection title={t.sections.support}>
        <LinkRow
          icon="help-buoy-outline"
          label={t.help}
          hint={t.helpHint}
          onPress={() => router.push('/help')}
        />
        <LinkRow
          icon="people-outline"
          label={t.guidelines}
          onPress={() => router.push('/guidelines')}
        />
        <LinkRow
          icon="document-text-outline"
          label={t.terms}
          onPress={() => router.push('/terms')}
        />
        <LinkRow
          icon="shield-checkmark-outline"
          label={t.privacyPolicy}
          onPress={() => router.push('/privacy')}
        />
      </SettingsSection>

      <SettingsSection title={t.sections.account}>
        <LinkRow icon="log-out-outline" label={t.logOut} onPress={logOut} />
        <LinkRow
          icon="trash-outline"
          label={t.deleteAccount}
          hint={t.deleteAccountHint}
          onPress={() => router.push('/delete-account')}
        />
      </SettingsSection>

      <Text style={styles.version}>{t.version(Constants.expoConfig?.version ?? '')}</Text>
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.xl, gap: spacing.xxl },
    version: { ...typography.small, textAlign: 'center', color: colors.textMuted },
  }),
);
