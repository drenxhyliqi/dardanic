import { StyleSheet, Text, TextInput, View } from 'react-native';

import { countryByCode, type CountryCode } from '../../data/plateCountries';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

export type PlateFieldProps = {
  country: CountryCode;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  invalid?: boolean; // outlined in blue, with the hint shown below it
};

// A text field that looks like a real plate: white, black letters centred like on a
// real plate, and the blue strip with the country code on the left. Letters are typed
// in capitals.
export function PlateField({ country, value, onChangeText, onSubmit, invalid }: PlateFieldProps) {
  const styles = useStyles();
  const colors = useColors();
  const info = countryByCode(country);

  return (
    <View style={[styles.plate, invalid && styles.invalid]}>
      <View style={styles.strip}>
        <Text style={styles.code}>{info.code}</Text>
      </View>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text.toUpperCase())}
        onSubmitEditing={onSubmit}
        placeholder={strings.findme.platePlaceholder(info.example)}
        placeholderTextColor={colors.borderFocus}
        autoCapitalize="characters"
        autoCorrect={false}
        returnKeyType="search"
        maxLength={12}
        selectionColor={colors.primary}
        accessibilityLabel={strings.findme.plate}
        style={styles.input}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    plate: {
      height: sizes.plateField,
      flexDirection: 'row',
      overflow: 'hidden',
      borderRadius: radius.md,
      borderWidth: sizes.plateBorder,
      borderColor: colors.black,
      backgroundColor: colors.white,
    },
    invalid: {
      borderColor: colors.primary,
    },
    strip: {
      width: sizes.plateFieldStrip,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    code: {
      ...typography.plateCode,
      color: colors.white,
    },
    // Centred like the characters on a real plate, across the whole white area.
    input: {
      flex: 1,
      height: '100%',
      textAlign: 'center',
      paddingHorizontal: spacing.md,
      ...typography.plate,
      color: colors.black,
    },
  }),
);
