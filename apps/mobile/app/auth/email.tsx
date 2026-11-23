import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { AuthFormLayout } from '../../components/auth/AuthFormLayout';
import { Button } from '../../components/ui/Button';
import { TextField } from '../../components/ui/TextField';
import { strings } from '../../i18n';

const t = strings.auth;
const looksLikeEmail = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text.trim());

// Sign up or log in with email: type it, and we send a 6-digit code.
export default function EmailScreen() {
  const { intent = 'signup' } = useLocalSearchParams<{ intent?: string }>();
  const [email, setEmail] = useState('');
  const send = () =>
    router.push({ pathname: '/auth/code', params: { intent, method: 'email', to: email.trim() } });

  return (
    <AuthFormLayout title={t.emailTitle} subtitle={t.emailSubtitle}>
      <TextField
        label={t.emailLabel}
        placeholder={t.emailPlaceholder}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        autoFocus
        returnKeyType="send"
        onSubmitEditing={() => looksLikeEmail(email) && send()}
      />
      <Button
        label={t.sendCode}
        strong
        centered
        disabled={!looksLikeEmail(email)}
        onPress={send}
      />
    </AuthFormLayout>
  );
}
