import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthFormLayout } from '../components/auth/AuthFormLayout';
import { Button } from '../components/ui/Button';
import { TextField } from '../components/ui/TextField';
import { TextLink } from '../components/ui/TextLink';
import { strings } from '../i18n';
import { spacing } from '../theme';

// Log in with username and password. Not connected to a server yet.
export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = username.trim().length > 0 && password.length > 0;

  return (
    <AuthFormLayout title={strings.login.title} subtitle={strings.login.subtitle}>
      <TextField
        label={strings.login.username}
        placeholder={strings.login.usernamePlaceholder}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username"
        textContentType="username"
        returnKeyType="next"
      />
      <TextField
        label={strings.login.password}
        placeholder={strings.login.passwordPlaceholder}
        value={password}
        onChangeText={setPassword}
        password
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="done"
      />
      <View style={styles.forgot}>
        <TextLink
          label={strings.login.forgotPassword}
          onPress={() => router.push('/forgot-password')}
        />
      </View>
      <Button label={strings.login.submit} disabled={!canSubmit} strong centered />
    </AuthFormLayout>
  );
}

const styles = StyleSheet.create({
  forgot: {
    alignItems: 'flex-end',
    marginBottom: spacing.sm,
  },
});
