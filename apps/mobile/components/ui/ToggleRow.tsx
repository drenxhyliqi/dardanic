import { StyleSheet, Switch, Text, View } from 'react-native';

import { makeStyles, spacing, typography, useColors } from '../../theme';

export type ToggleRowProps = {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
};

// A label (with an optional quiet hint) and an on/off switch on the right, blue when on.
export function ToggleRow({ label, hint, value, onChange, disabled }: ToggleRowProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={[styles.row, disabled && styles.disabled]}>
      <View style={styles.text}>
        <Text style={styles.label}>{label}</Text>
        {hint && <Text style={styles.hint}>{hint}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{ true: colors.primary, false: colors.surfaceBorder }}
        thumbColor={colors.white}
        accessibilityLabel={label}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    disabled: { opacity: 0.5 },
    text: { flex: 1, gap: spacing.xxs },
    label: { ...typography.name, color: colors.text },
    hint: { ...typography.small, color: colors.textMuted },
  }),
);
