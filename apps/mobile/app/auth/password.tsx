import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { AuthFormLayout } from '../../components/auth/AuthFormLayout';
import { PasswordRules } from '../../components/auth/PasswordRules';
import { Button } from '../../components/ui/Button';
import { TextField } from '../../components/ui/TextField';
import { strings } from '../../i18n';
import { checkPassword, passwordOk } from '../../utils/password';

const t = strings.auth;

// After the email / phone code when creating an account: choose a password and repeat
// it (eye icons to show them), with a checklist that ticks as the rules are met. Then
// the date of birth + terms step. (Nothing is saved yet: the backend will store it
// safely, never as plain text.)
export default function CreatePasswordScreen() {
  const params = useLocalSearchParams<{ method?: string; contact?: string }>();
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const check = checkPassword(password, repeat);
  const ready = passwordOk(check);

  const next = () =>
    ready &&
    router.replace({
      pathname: '/auth/details',
      params: { method: params.method ?? 'email', contact: params.contact ?? '' },
    });

  return (
    <AuthFormLayout title={t.passwordTitle} subtitle={t.passwordSubtitle}>
      <TextField
        label={t.passwordLabel}
        placeholder={t.passwordPlaceholder}
        value={password}
        onChangeText={setPassword}
        password
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        autoFocus
        returnKeyType="next"
      />
      <TextField
        label={t.repeatLabel}
        placeholder={t.repeatPlaceholder}
        value={repeat}
        onChangeText={setRepeat}
        password
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="done"
        onSubmitEditing={next}
      />
      <PasswordRules check={check} />
      <Button label={t.verify} strong centered disabled={!ready} onPress={next} />
    </AuthFormLayout>
  );
}
