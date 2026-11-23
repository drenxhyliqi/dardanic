import { useLocalSearchParams } from 'expo-router';

import { PublicProfile } from '../../components/profile/PublicProfile';
import { PEOPLE } from '../../data/feedAuthors';

// Someone else's profile (people come from the sample data until there's a backend).
export default function UserScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const person = PEOPLE.find((item) => item.username === username);
  if (!person) return null;
  return <PublicProfile person={person} />;
}
