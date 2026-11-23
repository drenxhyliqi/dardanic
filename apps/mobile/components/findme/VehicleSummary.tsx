import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { useFindMe } from '../../context/FindMeContext';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { maskPlate } from '../../utils/plates';
import { Button } from '../ui/Button';
import { LinkRow } from '../ui/LinkRow';

const t = strings.findme;

// On the FindMe page: your vehicle at a glance (masked plate, verified, findable),
// or a "Register your vehicle" button when you haven't added one yet. Warns when the
// main FindMe switch is off.
export function VehicleSummary() {
  const styles = useStyles();
  const { vehicles, settings } = useFindMe();
  const vehicle = vehicles[0];

  if (!vehicle) {
    return (
      <View style={styles.block}>
        <Text style={styles.hint}>{t.registerHint}</Text>
        <Button
          label={t.registerVehicle}
          icon="add"
          variant="secondary"
          centered
          onPress={() => router.push('/findme/vehicle')}
        />
      </View>
    );
  }

  const status = [
    maskPlate(vehicle.country, vehicle.plate),
    t.verification[vehicle.verification],
    ...(vehicle.discoverable && settings.discovery ? [t.discoverable] : []),
  ].join(' · ');

  return (
    <View style={styles.block}>
      <LinkRow
        icon="car-sport-outline"
        label={`${vehicle.make} ${vehicle.model}`}
        hint={status}
        onPress={() => router.push({ pathname: '/findme/vehicle', params: { id: vehicle.id } })}
      />
      {!settings.discovery && <Text style={styles.warning}>{t.hiddenEverywhere}</Text>}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    block: {
      gap: spacing.sm,
    },
    hint: {
      ...typography.paragraph,
      textAlign: 'center',
      color: colors.textMuted,
    },
    warning: {
      ...typography.small,
      color: colors.textMuted,
    },
  }),
);
