import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { AuthFormLayout } from '../components/auth/AuthFormLayout';
import { AuthOptions } from '../components/auth/AuthOptions';
import { TextLink } from '../components/ui/TextLink';
import { strings } from '../i18n';
import { makeStyles, typography } from '../theme';

// Log in the same way you signed up: Apple, Google, or a code by email or SMS (no
// passwords). Not connected to a server yet.
export default function LoginScreen() {
  const styles = useStyles();
  return (
    <AuthFormLayout title={strings.login.title} subtitle={strings.login.subtitle}>
      <AuthOptions intent="login" />
      <Text style={styles.prompt}>
        {strings.login.noAccount}
        <TextLink label={strings.login.createAccount} onPress={() => router.replace('/')} />
      </Text>
    </AuthFormLayout>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    prompt: { ...typography.paragraph, color: colors.textMuted },
  }),
);
