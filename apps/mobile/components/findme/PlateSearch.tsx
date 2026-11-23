import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { CountryCode } from '../../data/plateCountries';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { Button } from '../ui/Button';
import { CountryPicker } from './CountryPicker';
import { PlateField } from './PlateField';

const t = strings.findme;

export type PlateSearchProps = {
  busy: boolean;
  invalid: boolean; // the last search wasn't a valid plate
  searchesLeft: number;
  onSearch: (country: CountryCode, plate: string) => void;
};

// Pick a country, type the plate, search. Shows how many searches are left today.
export function PlateSearch({ busy, invalid, searchesLeft, onSearch }: PlateSearchProps) {
  const styles = useStyles();
  const [country, setCountry] = useState<CountryCode>('RKS');
  const [plate, setPlate] = useState('');
  const canSearch = plate.trim().length > 0 && !busy;
  const search = () => canSearch && onSearch(country, plate);

  return (
    <View style={styles.block}>
      <CountryPicker value={country} onChange={setCountry} />
      <PlateField
        country={country}
        value={plate}
        onChangeText={setPlate}
        onSubmit={search}
        invalid={invalid}
      />
      <Button
        label={t.search}
        icon="search"
        centered
        strong
        disabled={!canSearch}
        onPress={search}
      />
      <Text style={styles.left}>{t.searchesLeft(searchesLeft)}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    block: {
      gap: spacing.md,
    },
    left: {
      ...typography.small,
      textAlign: 'center',
      color: colors.textMuted,
    },
  }),
);
