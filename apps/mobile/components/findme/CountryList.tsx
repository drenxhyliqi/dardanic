import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PLATE_COUNTRIES, type CountryCode, type PlateCountry } from '../../data/plateCountries';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { simplify } from '../../utils/text';
import { SearchField } from '../ui/SearchField';
import { CountryCodeBadge } from './CountryCodeBadge';

const t = strings.findme;
const REGIONS = ['home', 'west', 'nordic'] as const;

export type CountryListProps = {
  selected: CountryCode;
  onSelect: (code: CountryCode) => void;
  onSearchStart?: () => void; // e.g. open the sheet full screen for the keyboard
};

// Every plate country: a search field (by name or code), then Popular and the regions.
// While searching it's one plain list of matches.
export function CountryList({ selected, onSelect, onSearchStart }: CountryListProps) {
  const styles = useStyles();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const search = simplify(query.trim());

  const sections = search
    ? [
        {
          title: '',
          data: PLATE_COUNTRIES.filter((c) => simplify(`${c.name} ${c.code}`).includes(search)),
        },
      ]
    : [
        { title: t.regions.popular, data: PLATE_COUNTRIES.filter((c) => c.popular) },
        ...REGIONS.map((region) => ({
          title: t.regions[region],
          data: PLATE_COUNTRIES.filter((c) => c.region === region),
        })),
      ];

  const row = ({ item }: { item: PlateCountry }) => (
    <Pressable
      onPress={() => onSelect(item.code)}
      accessibilityRole="radio"
      accessibilityState={{ selected: item.code === selected }}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <CountryCodeBadge code={item.code} />
      <Text style={styles.name}>{item.name}</Text>
      {item.code === selected && (
        <Ionicons name="checkmark" size={sizes.icon} color={colors.primary} />
      )}
    </Pressable>
  );

  return (
    <View style={styles.wrap}>
      <View style={styles.search}>
        <SearchField
          placeholder={t.searchCountries}
          query={query}
          onChange={(text) => {
            setQuery(text);
            onSearchStart?.();
          }}
        />
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${item.code}-${index}`}
        keyboardShouldPersistTaps="handled"
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + spacing.lg }}
        renderSectionHeader={({ section }) =>
          section.title ? <Text style={styles.heading}>{section.title}</Text> : null
        }
        renderItem={row}
        ListEmptyComponent={<Text style={styles.empty}>{t.noCountries(query.trim())}</Text>}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    wrap: { flex: 1 },
    search: { padding: spacing.lg, paddingBottom: spacing.sm },
    heading: {
      ...typography.label,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xs,
      color: colors.textMuted,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    pressed: { backgroundColor: colors.surface },
    name: { ...typography.name, flex: 1, color: colors.text },
    empty: {
      ...typography.paragraph,
      textAlign: 'center',
      padding: spacing.xl,
      color: colors.textMuted,
    },
  }),
);
