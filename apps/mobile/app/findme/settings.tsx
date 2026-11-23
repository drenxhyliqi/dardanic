import { AdultsOnly } from '../../components/findme/AdultsOnly';
import { FindMeSettings } from '../../components/findme/FindMeSettings';

// FindMe settings: main switch, who can send requests, blocked drivers, how it works.
// 18+ only, like FindMe itself.
export default function FindMeSettingsScreen() {
  return (
    <AdultsOnly>
      <FindMeSettings />
    </AdultsOnly>
  );
}
