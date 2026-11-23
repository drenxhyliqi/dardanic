import { LegalPage } from '../components/legal/LegalPage';
import { strings } from '../i18n';

// Community Guidelines (from sign-up and Settings).
export default function GuidelinesScreen() {
  return <LegalPage doc={strings.legalDocs.guidelines} />;
}
