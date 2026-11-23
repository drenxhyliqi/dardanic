import { router } from 'expo-router';
import { useRef } from 'react';

import { CreateChooser } from '../../components/create/CreateChooser';
import type { CreateKind } from '../../components/create/createOptions';
import { BottomSheet } from '../../components/ui/BottomSheet';
import { strings } from '../../i18n';

const OPEN_RATIO = 0.55;

// Create (the + in the feed's top bar): a sheet from the bottom asking what to create.
// Picking one slides the sheet away and opens that kind's page.
export default function CreateScreen() {
  const chosen = useRef<CreateKind | null>(null);
  return (
    <BottomSheet
      title={strings.create.title}
      openRatio={OPEN_RATIO}
      onClosed={() =>
        chosen.current ? router.replace(`/create/${chosen.current}`) : router.back()
      }
    >
      {(sheet) => (
        <CreateChooser
          onChoose={(kind) => {
            chosen.current = kind;
            sheet.close();
          }}
        />
      )}
    </BottomSheet>
  );
}
