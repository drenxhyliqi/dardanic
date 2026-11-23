import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { AuthOptions } from '../auth/AuthOptions';
import { Button } from '../ui/Button';
import { TextLink } from '../ui/TextLink';
import type { WelcomeMode } from './useModeSwitch';

export type AuthActionsProps = {
  mode: WelcomeMode;
  onChangeMode: (mode: WelcomeMode) => void;
};

const goToLogin = () => router.push('/login');

// The welcome buttons. "Create account" swaps them for Apple / Google / email / phone
// (AuthOptions); every way then asks for the date of birth and the terms.
export function AuthActions({ mode, onChangeMode }: AuthActionsProps) {
  const styles = useStyles();
  if (mode === 'start') {
    return (
      <View style={styles.group}>
        <Button
          label={strings.welcome.createAccount}
          onPress={() => onChangeMode('signup')}
          showArrow
          strong
        />
        <Button label={strings.welcome.haveAccount} variant="secondary" onPress={goToLogin} />
      </View>
    );
  }

  return (
    <View style={styles.group}>
      <AuthOptions intent="signup" />
      <Text style={styles.prompt}>
        {strings.auth.haveAccountPrompt}
        <TextLink label={strings.auth.logIn} onPress={goToLogin} />
      </Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    group: {
      gap: spacing.md,
    },
    prompt: {
      ...typography.paragraph,
      color: colors.textMuted,
      marginTop: spacing.xs,
    },
  }),
);
