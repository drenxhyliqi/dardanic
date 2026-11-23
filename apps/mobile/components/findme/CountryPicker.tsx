import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text } from 'react-native';

import { countryByCode, type CountryCode } from '../../data/plateCountries';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { BottomSheet } from '../ui/BottomSheet';
import { CountryCodeBadge } from './CountryCodeBadge';
import { CountryList } from './CountryList';

const t = strings.findme;

export type CountryPickerProps = {
  value: CountryCode;
  onChange: (code: CountryCode) => void;
};

// The plate's country as one button ("[RKS] Kosovo ▾"). Tapping it opens a sheet with
// all countries, searchable and grouped (popular, Kosovo & neighbours, Western Europe,
// Nordic countries); picking one closes it.
export function CountryPicker({ value, onChange }: CountryPickerProps) {
  const styles = useStyles();
  const colors = useColors();
  const [open, setOpen] = useState(false);
  const country = countryByCode(value);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={t.chooseCountry(country.name)}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <CountryCodeBadge code={country.code} />
        <Text style={styles.name}>{country.name}</Text>
        <Ionicons name="chevron-down" size={sizes.icon} color={colors.textMuted} />
      </Pressable>

      <Modal visible={open} transparent animationType="none" statusBarTranslucent>
        <BottomSheet title={t.plateCountry} onClosed={() => setOpen(false)}>
          {(sheet) => (
            <CountryList
              selected={value}
              onSearchStart={sheet.expand}
              onSelect={(code) => {
                onChange(code);
                sheet.close();
              }}
            />
          )}
        </BottomSheet>
      </Modal>
    </>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      height: sizes.input,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: { opacity: 0.8 },
    name: { ...typography.name, flex: 1, color: colors.text },
  }),
);
