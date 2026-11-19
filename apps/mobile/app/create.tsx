import { CenteredTitle } from '../components/CenteredTitle';
import { strings } from '../i18n';

// Create (posts, builds, meets, crews). Opened from the + in the feed's top bar,
// slides up from the bottom. Placeholder for now.
export default function CreateScreen() {
  return <CenteredTitle title={strings.create.title} />;
}
