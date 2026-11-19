import { ScrollView, StyleSheet } from 'react-native';

import { ThemePicker } from '../components/settings/ThemePicker';
import { makeStyles, spacing } from '../theme';

// Settings, opened from the ⚙️ on the profile. For now: Theme (Light / Dark / Automatic).
export default function SettingsScreen() {
  const styles = useStyles();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ThemePicker />
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
