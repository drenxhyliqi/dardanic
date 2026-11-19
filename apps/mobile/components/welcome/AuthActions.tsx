import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { Button } from '../ui/Button';
import { TextLink } from '../ui/TextLink';
import type { WelcomeMode } from './useModeSwitch';

export type AuthActionsProps = {
  mode: WelcomeMode;
  onChangeMode: (mode: WelcomeMode) => void;
};

const goToLogin = () => router.push('/login');
// Sign-up isn't connected yet, so every option pretends it worked and goes to the plan step.
const finishSignup = () => router.replace('/choose-plan');

// The welcome buttons. "Create account" swaps them for Apple / Google / email.
// Apple / Google / email aren't connected yet: they skip ahead to the plan step for now.
export function AuthActions({ mode, onChangeMode }: AuthActionsProps) {
  const styles = useStyles();
  const colors = useColors();
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
      <Pressable
        accessibilityRole="button"
        onPress={() => onChangeMode('start')}
        style={styles.back}
        hitSlop={spacing.sm}
      >
        <Ionicons name="arrow-back" size={sizes.icon - 4} color={colors.textMuted} />
        <Text style={styles.backLabel}>{strings.auth.back}</Text>
      </Pressable>
      <Button
        label={strings.auth.continueApple}
        variant="light"
        icon="logo-apple"
        onPress={finishSignup}
      />
      <Button
        label={strings.auth.continueGoogle}
        variant="secondary"
        icon="logo-google"
        onPress={finishSignup}
      />
      <Button
        label={strings.auth.continueEmail}
        variant="secondary"
        icon="mail-outline"
        onPress={finishSignup}
      />
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
    back: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: spacing.xs,
      paddingVertical: spacing.xs,
    },
    backLabel: {
      ...typography.small,
      color: colors.textMuted,
    },
    prompt: {
      ...typography.paragraph,
      color: colors.textMuted,
      marginTop: spacing.xs,
    },
  }),
);
