import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFindMe } from '../../context/FindMeContext';
import { countryByCode, type CountryCode } from '../../data/plateCountries';
import type { VehicleColorId } from '../../data/vehicleColors';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { cleanPlate, formatPlate, isValidPlate } from '../../utils/plates';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import { ToggleRow } from '../ui/ToggleRow';
import { ColorSwatches } from './ColorSwatches';
import { CountryPicker } from './CountryPicker';
import { PlateField } from './PlateField';
import { VerificationCard } from './VerificationCard';

const t = strings.findme;
let nextId = 0;

// Add or edit one of your vehicles: country + plate, make, model, colour, the
// ownership check and "Can be found by plate" (only once verified). Saving sends the
// registration photo for checking if you added one. Editing also offers Remove.
export function VehicleEditor({ vehicleId }: { vehicleId?: string }) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { vehicles, saveVehicle, removeVehicle, verifyVehicle } = useFindMe();
  const existing = vehicles.find((v) => v.id === vehicleId);
  const [country, setCountry] = useState<CountryCode>(existing?.country ?? 'RKS');
  const [plate, setPlate] = useState(existing ? formatPlate(existing.country, existing.plate) : '');
  const [make, setMake] = useState(existing?.make ?? '');
  const [model, setModel] = useState(existing?.model ?? '');
  const [color, setColor] = useState<VehicleColorId>(existing?.color ?? 'white');
  const [discoverable, setDiscoverable] = useState(existing?.discoverable ?? false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const verification = existing?.verification ?? 'unverified';

  const save = async () => {
    if (!isValidPlate(country, plate)) {
      return setError(t.invalidPlate(countryByCode(country).example));
    }
    if (!make.trim() || !model.trim()) return setError(t.missingCar);
    setError(null);
    setSaving(true);
    const id = existing?.id ?? `mine-${nextId++}`;
    await saveVehicle({
      id, country, plate: cleanPlate(plate), make: make.trim(), model: model.trim(), color,
      discoverable, verification,
    });
    if (photo && verification === 'unverified') await verifyVehicle(id, photo);
    setSaving(false);
    router.back();
  };

  const remove = async () => {
    if (!existing) return;
    setSaving(true);
    await removeVehicle(existing.id);
    router.back();
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>{t.country}</Text>
      <CountryPicker value={country} onChange={setCountry} />
      <Text style={styles.label}>{t.plate}</Text>
      <PlateField country={country} value={plate} onChangeText={setPlate} invalid={!!error} />
      <TextField
        label={t.make}
        placeholder={t.makePlaceholder}
        value={make}
        onChangeText={setMake}
      />
      <TextField
        label={t.model}
        placeholder={t.modelPlaceholder}
        value={model}
        onChangeText={setModel}
      />
      <Text style={styles.label}>{t.color}</Text>
      <ColorSwatches value={color} onChange={setColor} />
      <VerificationCard status={verification} photo={photo} onPick={setPhoto} />
      <ToggleRow
        label={t.discoverable}
        hint={t.discoverableHint}
        value={discoverable && verification === 'verified'}
        onChange={setDiscoverable}
        disabled={verification !== 'verified'}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button label={t.save} centered strong disabled={saving} onPress={save} />
      {existing && (
        <Button label={t.remove} variant="secondary" centered disabled={saving} onPress={remove} />
      )}
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { gap: spacing.md, padding: spacing.lg },
    label: { ...typography.label, marginTop: spacing.xs, color: colors.text },
    error: { ...typography.label, textAlign: 'center', color: colors.primaryLight },
  }),
);
