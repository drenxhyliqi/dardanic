import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { afterAuth, type AuthIntent } from '../../components/auth/AuthOptions';
import { AuthFormLayout } from '../../components/auth/AuthFormLayout';
import { CodeInput } from '../../components/auth/CodeInput';
import { Button } from '../../components/ui/Button';
import { PHONE_COUNTRIES } from '../../data/phoneCountries';
import { TextLink } from '../../components/ui/TextLink';
import { strings } from '../../i18n';
import { makeStyles, typography } from '../../theme';

const t = strings.auth;
const RESEND_AFTER = 30; // seconds

// The 6-digit code we sent by email or SMS. No server yet: any 6 digits work. After
// it: a new account creates a password, logging in goes into the app.
export default function CodeScreen() {
  const styles = useStyles();
  const params = useLocalSearchParams<{
    intent?: string;
    method?: string;
    to?: string; // email
    country?: string; // phone: calling code's country + the number
    number?: string;
  }>();
  const intent: AuthIntent = params.intent === 'login' ? 'login' : 'signup';
  const method = params.method === 'phone' ? 'phone' : 'email';
  const dial = PHONE_COUNTRIES.find((country) => country.code === params.country)?.dial ?? '';
  const to = method === 'phone' ? `${dial} ${params.number ?? ''}` : (params.to ?? '');
  const [code, setCode] = useState('');
  const [wait, setWait] = useState(RESEND_AFTER);

  useEffect(() => {
    if (wait === 0) return;
    const timer = setTimeout(() => setWait(wait - 1), 1000);
    return () => clearTimeout(timer);
  }, [wait]);

  return (
    <AuthFormLayout title={t.codeTitle} subtitle={t.codeSubtitle(to)}>
      <CodeInput value={code} onChange={setCode} />
      {__DEV__ && <Text style={styles.note}>{t.codeDevHint}</Text>}
      <Button
        label={t.verify}
        strong
        centered
        disabled={code.length < 6}
        onPress={() => afterAuth(intent, method, to)}
      />
      {wait > 0 ? (
        <Text style={styles.note}>{t.resendIn(wait)}</Text>
      ) : (
        <TextLink label={t.resend} onPress={() => setWait(RESEND_AFTER)} />
      )}
    </AuthFormLayout>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    note: { ...typography.small, color: colors.textMuted },
  }),
);
