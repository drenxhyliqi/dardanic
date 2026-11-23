import { LegalPage } from '../components/legal/LegalPage';
import { strings } from '../i18n';

// Terms of Service (from sign-up, Settings and the welcome screen).
export default function TermsScreen() {
  return <LegalPage doc={strings.legalDocs.terms} />;
}
