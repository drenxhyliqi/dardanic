import { useState } from 'react';

import { AuthFormLayout } from '../components/auth/AuthFormLayout';
import { Button } from '../components/ui/Button';
import { TextField } from '../components/ui/TextField';
import { strings } from '../i18n';

// Ask for an email to send a password-reset link to. Not connected to a server yet.
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  return (
    <AuthFormLayout title={strings.forgotPassword.title} subtitle={strings.forgotPassword.subtitle}>
      <TextField
        label={strings.forgotPassword.email}
        placeholder={strings.forgotPassword.emailPlaceholder}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="send"
      />
      <Button label={strings.forgotPassword.submit} disabled={email.trim().length === 0} strong />
    </AuthFormLayout>
  );
}
