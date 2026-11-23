import { StyleSheet, Text, View } from 'react-native';

import { SAMPLE_GARAGE } from '../../../data/garage';
import { strings } from '../../../i18n';
import { makeStyles, spacing, typography } from '../../../theme';
import { Chip } from '../../ui/Chip';
import { TextField } from '../../ui/TextField';

const t = strings.marketplace;

export type FitsFieldsProps = {
  brand: string;
  model: string;
  onChange: (brand: string, model: string) => void;
};

// For parts, wheels and accessories: which car it fits. One tap fills it from your
// garage, or type the brand and model code. Optional; everything else goes in the
// description.
export function FitsFields({ brand, model, onChange }: FitsFieldsProps) {
  const styles = useStyles();
  return (
    <View style={styles.group}>
      <Text style={styles.hint}>{t.fitsFromGarage}</Text>
      <View style={styles.chips}>
        {SAMPLE_GARAGE.map((car) => {
          const [carBrand, carModel] = car.model.split(' ');
          return (
            <Chip
              key={car.id}
              label={car.model}
              showPlus
              onPress={() => onChange(carBrand, carModel)}
            />
          );
        })}
      </View>
      <View style={styles.pair}>
        <View style={styles.half}>
          <TextField
            label={t.fitsBrand}
            placeholder={t.fitsBrandExample}
            value={brand}
            onChangeText={(value) => onChange(value, model)}
          />
        </View>
        <View style={styles.half}>
          <TextField
            label={t.fitsModel}
            placeholder={t.fitsModelExample}
            value={model}
            onChangeText={(value) => onChange(brand, value)}
          />
        </View>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    group: { gap: spacing.md },
    hint: { ...typography.small, color: colors.textMuted },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    pair: { flexDirection: 'row', gap: spacing.md },
    half: { flex: 1 },
  }),
);
