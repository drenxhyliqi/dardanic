import { useLocalSearchParams } from 'expo-router';

import { StoryViewer } from '../../components/story/StoryViewer';

// Full-screen story viewer, opened by tapping a story in the feed (id = whose story).
export default function StoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <StoryViewer startId={id} />;
}
