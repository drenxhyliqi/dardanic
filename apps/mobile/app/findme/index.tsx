import { AdultsOnly } from '../../components/findme/AdultsOnly';
import { FindMeHome } from '../../components/findme/FindMeHome';

// FindMe: search a plate to find a driver who opted in (opened from 🔍 on the Feed).
// 18+ only.
export default function FindMeScreen() {
  return (
    <AdultsOnly>
      <FindMeHome />
    </AdultsOnly>
  );
}
