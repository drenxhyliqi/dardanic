import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { Button } from '../ui/Button';
import { SocialButton } from './SocialButton';

export type AuthIntent = 'signup' | 'login';

// Apple / Google aren't connected yet: they pretend it worked. A new account goes on
// to the age + terms step; logging in goes straight into the app.
export type AuthMethod = 'apple' | 'google' | 'email' | 'phone';

export function afterAuth(intent: AuthIntent, method: AuthMethod, contact = '') {
  if (intent === 'login') router.replace('/feed');
  // Email / phone sign-ups choose a password first; Apple / Google don't need one.
  else if (method === 'email' || method === 'phone') {
    router.replace({ pathname: '/auth/password', params: { method, contact } });
  } else router.replace({ pathname: '/auth/details', params: { method, contact } });
}

// The ways in, the same for creating an account and logging in: email (a code, then a
// password for new accounts) as the main button, then "or continue with" and Apple, Google and phone
// (a code by SMS) as three equal icon buttons.
export function AuthOptions({ intent }: { intent: AuthIntent }) {
  const styles = useStyles();
  const t = strings.auth;
  return (
    <View style={styles.group}>
      <Button
        label={t.continueEmail}
        icon="mail-outline"
        strong
        onPress={() => router.push({ pathname: '/auth/email', params: { intent } })}
      />
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.or}>{t.orContinueWith}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.row}>
        <SocialButton
          icon="logo-apple"
          label={t.continueApple}
          onPress={() => afterAuth(intent, 'apple')}
        />
        <SocialButton
          icon="logo-google"
          label={t.continueGoogle}
          onPress={() => afterAuth(intent, 'google')}
        />
        <SocialButton
          icon="call-outline"
          label={t.continuePhone}
          onPress={() => router.push({ pathname: '/auth/phone', params: { intent } })}
        />
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    group: { gap: spacing.md },
    divider: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.surfaceBorder },
    or: { ...typography.small, color: colors.textMuted },
    row: { flexDirection: 'row', gap: spacing.md },
  }),
);
