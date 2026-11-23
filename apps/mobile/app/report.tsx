import { router, useLocalSearchParams } from 'expo-router';

import { isReportKind } from '../components/report/reportReasons';
import { ReportFlow } from '../components/report/ReportFlow';
import { BottomSheet } from '../components/ui/BottomSheet';
import { strings } from '../i18n';

const OPEN_RATIO = 0.75;

// Report something (post, comment, story, listing, message, account, meet), as a sheet
// from the bottom. Opened with /report?kind=…&id=…&username=… from anywhere.
export default function ReportScreen() {
  const { kind, id, username } = useLocalSearchParams<{
    kind: string;
    id: string;
    username?: string;
  }>();
  if (!isReportKind(kind)) return null;
  return (
    <BottomSheet
      title={strings.report.titles[kind]}
      openRatio={OPEN_RATIO}
      onClosed={() => router.back()}
    >
      {(sheet) => <ReportFlow kind={kind} id={id} username={username} onClose={sheet.close} />}
    </BottomSheet>
  );
}
