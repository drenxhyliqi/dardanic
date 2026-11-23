import { useLocalSearchParams } from 'expo-router';

import { BuildDetail } from '../../components/build/BuildDetail';
import { findCar } from '../../data/garage';

// A car's full build page (tap a build card on the profile).
export default function BuildScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = findCar(id);
  if (!car) return null;
  return <BuildDetail car={car} />;
}
