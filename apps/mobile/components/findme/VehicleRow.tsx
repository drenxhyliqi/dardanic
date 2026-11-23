import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colorById } from '../../data/vehicleColors';
import { strings } from '../../i18n';
import type { Vehicle } from '../../services/findme';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { maskPlate } from '../../utils/plates';
import { Plate } from '../intro/cards/CardParts';
import { Tag } from '../ui/Tag';
import { ToggleRow } from '../ui/ToggleRow';

const t = strings.findme;

export type VehicleRowProps = {
  vehicle: Vehicle;
  findMeOn: boolean; // the main FindMe switch
  onPress: () => void;
  onToggle: (discoverable: boolean) => void;
};

// One of your vehicles: paint colour, make and model, masked plate, whether it's
// verified, and a switch for being findable (works once verified). Tap to edit.
export function VehicleRow({ vehicle, findMeOn, onPress, onToggle }: VehicleRowProps) {
  const styles = useStyles();
  const colors = useColors();
  const verified = vehicle.verification === 'verified';

  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} accessibilityRole="button" style={styles.top}>
        <View style={[styles.paint, { backgroundColor: colors.vehicleSwatches[colorById(vehicle.color).id] }]} />
        <View style={styles.who}>
          <Text style={styles.name}>{`${vehicle.make} ${vehicle.model}`}</Text>
          <Plate text={maskPlate(vehicle.country, vehicle.plate)} />
        </View>
        <Tag
          label={t.verification[vehicle.verification]}
          tone={verified ? 'blue' : vehicle.verification === 'pending' ? 'quiet' : 'outline'}
        />
      </Pressable>
      <ToggleRow
        label={t.discoverable}
        value={vehicle.discoverable && verified}
        onChange={onToggle}
        disabled={!verified || !findMeOn}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      gap: spacing.md,
      padding: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    top: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    paint: {
      width: sizes.colorSwatch,
      height: sizes.colorSwatch,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
    },
    who: { flex: 1, gap: spacing.xs },
    name: { ...typography.name, color: colors.text },
  }),
);
