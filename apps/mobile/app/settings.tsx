import { router } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemePicker } from '../components/settings/ThemePicker';
import { LinkRow } from '../components/ui/LinkRow';
import { ToggleRow } from '../components/ui/ToggleRow';
import { usePrivacy } from '../context/PrivacyContext';
import { strings } from '../i18n';
import { makeStyles, spacing } from '../theme';

// Settings, opened from the ⚙️ on the profile: Theme (Light / Dark / Automatic),
// Private account, and a way into FindMe settings.
export default function SettingsScreen() {
  const styles = useStyles();
  const { isPrivate, setPrivate } = usePrivacy();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ThemePicker />
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
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: spacing.xl,
      gap: spacing.xl,
    },
  }),
);
