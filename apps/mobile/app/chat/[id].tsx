import { useLocalSearchParams } from 'expo-router';

import { ChatScreen } from '../../components/messages/ChatScreen';

// One conversation, full screen (opened from the Messages tab, New message, or a
// listing's Message seller, which passes the listing to send along).
export default function ChatRoute() {
  const { id, listing } = useLocalSearchParams<{ id: string; listing?: string }>();
  return <ChatScreen id={id} listingId={listing} />;
}
