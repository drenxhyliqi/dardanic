import { useLocalSearchParams } from 'expo-router';

import { MeetDetail } from '../../components/meet/MeetDetail';
import { findPost } from '../../data/posts';

// A meet's full page (tap a meet card).
export default function MeetScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const meet = findPost(id);
  if (!meet || meet.kind !== 'meet') return null;
  return <MeetDetail meet={meet} />;
}
