import { StyleSheet, View } from 'react-native';

import { strings } from '../../i18n';
import { spacing } from '../../theme';
import { Chip } from '../ui/Chip';
import { TextField } from '../ui/TextField';
import { CityPicker } from './CityPicker';

const SEPARATOR = ' · ';

export type PlaceStepProps = {
  city: string | null;
  bio: string;
  onChangeCity: (city: string | null) => void;
  onChangeBio: (bio: string) => void;
};

// Step 2: city (optional) and bio (optional) with tap-to-add suggestions.
export function PlaceStep({ city, bio, onChangeCity, onChangeBio }: PlaceStepProps) {
  const t = strings.setup;
  const suggestions = t.bioSuggestions.filter((s) => !bio.includes(s));

  function addSuggestion(text: string) {
    const current = bio.trim();
    onChangeBio(current ? current + SEPARATOR + text : text);
  }

  return (
    <View style={styles.container}>
      <CityPicker city={city} onChange={onChangeCity} />

      <View style={styles.group}>
        <TextField
          label={t.bio}
          placeholder={t.bioPlaceholder}
          value={bio}
          onChangeText={onChangeBio}
          multiline
        />
        <View style={styles.chips}>
          {suggestions.map((s) => (
            <Chip key={s} label={s} showPlus onPress={() => addSuggestion(s)} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  group: {
    gap: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
