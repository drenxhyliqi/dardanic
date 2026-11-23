import { useLocalSearchParams } from 'expo-router';

import { SinglePost } from '../../components/feed/SinglePost';

// One post on its own page (opened from Explore).
export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <SinglePost id={id} />;
}
