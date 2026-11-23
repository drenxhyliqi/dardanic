import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { PHONE_COUNTRIES, type PhoneCountry } from '../../data/phoneCountries';
import { strings } from '../../i18n';
import { makeStyles, radius, spacing, typography } from '../../theme';

export type PhoneCountryPickerProps = {
  value: PhoneCountry;
  onChange: (country: PhoneCountry) => void;
};

// The calling code as a sideways row of chips ("RKS +383"), Kosovo first.
export function PhoneCountryPicker({ value, onChange }: PhoneCountryPickerProps) {
  const styles = useStyles();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      accessibilityLabel={strings.auth.countryCode}
    >
      {PHONE_COUNTRIES.map((country) => {
        const active = country.code === value.code;
        return (
          <Pressable
            key={country.code}
            onPress={() => onChange(country)}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`${country.name} ${country.dial}`}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.code, active && styles.textActive]}>{country.code}</Text>
            <Text style={[styles.dial, active && styles.textActive]}>{country.dial}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { gap: spacing.sm },
    chip: {
      flexDirection: 'row',
      gap: spacing.xs,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
    },
    chipActive: { borderColor: colors.text, backgroundColor: colors.text },
    code: { ...typography.label, color: colors.text },
    dial: { ...typography.label, color: colors.textMuted },
    textActive: { color: colors.background },
  }),
);
