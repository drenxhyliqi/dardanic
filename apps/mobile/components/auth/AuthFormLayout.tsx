import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { makeStyles, spacing } from '../../theme';
import { Heading } from '../ui/Heading';

export type AuthFormLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

// Shared layout for login-type forms: heading, then fields. Scrolls above the keyboard.
export function AuthFormLayout({ title, subtitle, children }: AuthFormLayoutProps) {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.screen} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
      >
        <Heading title={title} subtitle={subtitle} />
        <View style={styles.form}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xl,
      gap: spacing.xxl,
    },
    form: {
      gap: spacing.lg,
    },
  }),
);
