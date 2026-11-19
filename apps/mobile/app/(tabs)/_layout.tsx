import { Tabs } from 'expo-router';

import { strings } from '../../i18n';
import { colors } from '../../theme';

// The main app tabs (shown after login, once login exists).
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.background },
        tabBarIconStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="home" options={{ title: strings.tabs.home }} />
      <Tabs.Screen name="explore" options={{ title: strings.tabs.explore }} />
      <Tabs.Screen name="profile" options={{ title: strings.tabs.profile }} />
    </Tabs>
  );
}
