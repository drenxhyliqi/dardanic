import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { TextField } from '../ui/TextField';

const t = strings.auth;

export type Birthday = { day: string; month: string; year: string };

export type BirthdayFieldProps = {
  value: Birthday;
  onChange: (value: Birthday) => void;
  error?: string; // e.g. too young, or not a real date
};

// Date of birth as three number fields (DD / MM / YYYY), with a note that it isn't
// shown on the profile, or what's wrong with it.
export function BirthdayField({ value, onChange, error }: BirthdayFieldProps) {
  const styles = useStyles();
  const part = (key: keyof Birthday, max: number) => (text: string) =>
    onChange({ ...value, [key]: text.replace(/\D/g, '').slice(0, max) });

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{t.birthday}</Text>
      <View style={styles.row}>
        {(
          [
            ['day', t.day, 2, styles.small],
            ['month', t.month, 2, styles.small],
            ['year', t.year, 4, styles.large],
          ] as const
        ).map(([key, placeholder, max, style]) => (
          <View key={key} style={style}>
            <TextField
              placeholder={placeholder}
              value={value[key]}
              onChangeText={part(key, max)}
              keyboardType="number-pad"
              maxLength={max}
            />
          </View>
        ))}
      </View>
      <Text style={[styles.hint, error && styles.error]}>{error ?? t.birthdayHint}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    group: { gap: spacing.sm },
    label: { ...typography.label, color: colors.text },
    row: { flexDirection: 'row', gap: spacing.md },
    small: { flex: 1 },
    large: { flex: 1.6 },
    hint: { ...typography.small, color: colors.textMuted },
    error: { color: colors.text },
  }),
);
