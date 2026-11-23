import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useOnboarding } from '../../context/OnboardingContext';
import { strings } from '../../i18n';
import { makeStyles, spacing } from '../../theme';
import { ageFromIso, FINDME_AGE } from '../../utils/age';
import { EmptyState } from '../ui/EmptyState';

// FindMe is 18+ (finding people by their plate). Under 18 sees a short explanation
// instead. (Accounts without a known birthday, like the sample one, count as adults.)
export function AdultsOnly({ children }: { children: ReactNode }) {
  const styles = useStyles();
  const { birthDate } = useOnboarding();
  const age = ageFromIso(birthDate);
  if (age === null || age >= FINDME_AGE) return <>{children}</>;
  return (
    <View style={styles.screen}>
      <EmptyState
        icon="lock-closed-outline"
        title={strings.findme.adultsTitle}
        hint={strings.findme.adultsHint}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      padding: spacing.xl,
      backgroundColor: colors.background,
    },
  }),
);
