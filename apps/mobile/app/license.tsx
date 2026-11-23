import { LegalPage } from '../components/legal/LegalPage';
import { strings } from '../i18n';

// License Agreement for the app itself (from the welcome screen).
export default function LicenseScreen() {
  return <LegalPage doc={strings.legalDocs.license} />;
}
