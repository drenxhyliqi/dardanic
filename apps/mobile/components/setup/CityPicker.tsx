import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { KOSOVO_CITIES } from '../../data/kosovoCities';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { simplify } from '../../utils/text';
import { TextField } from '../ui/TextField';

export type CityPickerProps = {
  city: string | null;
  onChange: (city: string | null) => void;
};

// City search: tap the field to see all Kosovo cities, type to filter, tap one to pick it.
export function CityPicker({ city, onChange }: CityPickerProps) {
  const styles = useStyles();
  const colors = useColors();
  const t = strings.setup;
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const matches = KOSOVO_CITIES.filter((name) => simplify(name).includes(simplify(query)));

  function pick(name: string) {
    onChange(name);
    setQuery('');
    Keyboard.dismiss();
  }

  function clear() {
    onChange(null);
    setQuery('');
  }

  const clearButton = (city || query) && (
    <Pressable
      onPress={clear}
      accessibilityRole="button"
      accessibilityLabel={t.clearCity}
      hitSlop={spacing.sm}
    >
      <Ionicons name="close-circle" size={sizes.icon} color={colors.textMuted} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <TextField
        label={t.city}
        placeholder={t.cityPlaceholder}
        value={city ?? query}
        onChangeText={(text) => {
          setQuery(text);
          if (city) onChange(null);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        icon={city ? 'location' : 'search-outline'}
        right={clearButton}
        autoCorrect={false}
      />
      {open && !city && (
        <View style={styles.list}>
          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
            {matches.length === 0 ? (
              <Text style={styles.empty}>{t.noCities}</Text>
            ) : (
              matches.map((name) => (
                <Pressable
                  key={name}
                  onPress={() => pick(name)}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                >
                  <Text style={styles.rowText}>{name}</Text>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    container: {
      gap: spacing.sm,
    },
    list: {
      maxHeight: sizes.cityList,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
      overflow: 'hidden',
    },
    row: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    rowPressed: {
      backgroundColor: colors.surfaceBorder,
    },
    rowText: {
      ...typography.body,
      color: colors.text,
    },
    empty: {
      ...typography.paragraph,
      color: colors.textMuted,
      padding: spacing.lg,
    },
  }),
);
