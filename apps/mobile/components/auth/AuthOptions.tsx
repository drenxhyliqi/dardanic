import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { strings } from '../../i18n';
import { spacing } from '../../theme';
import { Button } from '../ui/Button';

export type AuthIntent = 'signup' | 'login';

// Apple / Google aren't connected yet: they pretend it worked. A new account goes on
// to the age + terms step; logging in goes straight into the app.
export type AuthMethod = 'apple' | 'google' | 'email' | 'phone';

export function afterAuth(intent: AuthIntent, method: AuthMethod, contact = '') {
  if (intent === 'login') router.replace('/feed');
  else router.replace({ pathname: '/auth/details', params: { method, contact } });
}

// The four ways in, the same for creating an account and logging in: Apple, Google,
// email (a code, no password) and phone (a code by SMS).
export function AuthOptions({ intent }: { intent: AuthIntent }) {
  const t = strings.auth;
  return (
    <View style={styles.group}>
      <Button
        label={t.continueApple}
        variant="light"
        icon="logo-apple"
        onPress={() => afterAuth(intent, 'apple')}
      />
      <Button
        label={t.continueGoogle}
        variant="secondary"
        icon="logo-google"
        onPress={() => afterAuth(intent, 'google')}
      />
      <Button
        label={t.continueEmail}
        variant="secondary"
        icon="mail-outline"
        onPress={() => router.push({ pathname: '/auth/email', params: { intent } })}
      />
      <Button
        label={t.continuePhone}
        variant="secondary"
        icon="call-outline"
        onPress={() => router.push({ pathname: '/auth/phone', params: { intent } })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: { gap: spacing.md },
});
