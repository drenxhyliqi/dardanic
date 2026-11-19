import { StyleSheet, View } from 'react-native';

import { strings } from '../../i18n';
import { spacing } from '../../theme';
import { Button } from '../ui/Button';

export type SetupFooterProps = {
  onBack: () => void;
  onSkip?: () => void; // leave out to hide Skip (e.g. on the username step)
  onContinue: () => void;
  continueDisabled?: boolean;
};

// Bottom of each setup step: small Back and Skip, and the main blue Continue.
export function SetupFooter({ onBack, onSkip, onContinue, continueDisabled }: SetupFooterProps) {
  const t = strings.setup;

  return (
    <View style={styles.row}>
      <Button label={t.back} variant="secondary" compact onPress={onBack} />
      {onSkip && <Button label={t.skip} variant="secondary" compact onPress={onSkip} />}
      <View style={styles.main}>
        <Button
          label={t.continue}
          onPress={onContinue}
          disabled={continueDisabled}
          strong
          centered
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  main: {
    flex: 1,
  },
});
