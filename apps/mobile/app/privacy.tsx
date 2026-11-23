import { LegalPage } from '../components/legal/LegalPage';
import { strings } from '../i18n';

// Privacy Policy (from sign-up, Settings and the welcome screen).
export default function PrivacyScreen() {
  return <LegalPage doc={strings.legalDocs.privacy} />;
}
