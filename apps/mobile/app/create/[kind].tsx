import { Stack, useLocalSearchParams } from 'expo-router';

import { isCreateKind } from '../../components/create/createOptions';
import { PlaceholderPage } from '../../components/PlaceholderPage';
import { strings } from '../../i18n';

// Creating a post, build, meeting or crew (from the Create sheet). Placeholders until
// each one is designed.
export default function CreateKindScreen() {
  const { kind } = useLocalSearchParams<{ kind: string }>();
  if (!isCreateKind(kind)) return null;
  const title = strings.create.newTitles[kind];
  return (
    <>
      <Stack.Screen options={{ title }} />
      <PlaceholderPage title={title} />
    </>
  );
}
