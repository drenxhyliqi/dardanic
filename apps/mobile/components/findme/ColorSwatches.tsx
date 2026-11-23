import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { VEHICLE_COLORS, type VehicleColorId } from '../../data/vehicleColors';
import { makeStyles, radius, sizes, spacing, useColors } from '../../theme';

export type ColorSwatchesProps = {
  value: VehicleColorId;
  onChange: (id: VehicleColorId) => void;
};

// The car's paint colour as round swatches; the chosen one has a blue ring and a tick.
export function ColorSwatches({ value, onChange }: ColorSwatchesProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.row}>
      {VEHICLE_COLORS.map((color) => {
        const selected = color.id === value;
        return (
          <Pressable
            key={color.id}
            onPress={() => onChange(color.id)}
            accessibilityRole="radio"
            accessibilityLabel={color.name}
            accessibilityState={{ selected }}
            style={[styles.ring, selected && styles.ringActive]}
          >
            <View style={[styles.swatch, { backgroundColor: colors.vehicleSwatches[color.id] }]}>
              {selected && (
                <Ionicons name="checkmark" size={sizes.chipIcon} color={colors.primary} />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    ring: {
      padding: sizes.accentRing,
      borderRadius: radius.full,
      borderWidth: sizes.accentRing,
      borderColor: 'transparent',
    },
    ringActive: { borderColor: colors.primary },
    swatch: {
      width: sizes.colorSwatch,
      height: sizes.colorSwatch,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
    },
  }),
);
