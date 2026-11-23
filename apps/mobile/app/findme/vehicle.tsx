import { Stack, useLocalSearchParams } from 'expo-router';

import { VehicleEditor } from '../../components/findme/VehicleEditor';
import { strings } from '../../i18n';

// Add a vehicle, or edit one (?id=…).
export default function VehicleScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  return (
    <>
      <Stack.Screen
        options={{ title: id ? strings.findme.editVehicle : strings.findme.addVehicle }}
      />
      <VehicleEditor vehicleId={id} />
    </>
  );
}
