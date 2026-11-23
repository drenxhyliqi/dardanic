import { router, useLocalSearchParams } from 'expo-router';

import { RequestForm } from '../../components/findme/RequestForm';
import { BottomSheet } from '../../components/ui/BottomSheet';
import { strings } from '../../i18n';
import type { Driver } from '../../services/findme';

type DriverParams = Omit<Driver, 'photo'> & { photo: string };

// "Send request" sheet over the FindMe page, for the driver that was just found.
export default function RequestScreen() {
  const params = useLocalSearchParams<DriverParams>();
  const driver: Driver = { ...params, photo: params.photo || null };
  return (
    <BottomSheet
      title={strings.findme.requestTitle(driver.username)}
      onClosed={() => router.back()}
    >
      {(sheet) => <RequestForm driver={driver} onDone={sheet.close} />}
    </BottomSheet>
  );
}
