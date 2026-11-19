import { Tabs } from 'expo-router';

import { FloatingTabBar } from '../../components/tabs/FloatingTabBar';
import { TabIcon } from '../../components/tabs/TabIcon';
import { strings } from '../../i18n';

const t = strings.tabs;

// The main app bottom bar: Feed, Map, Marketplace, Messages, Profile, shown as a floating
// capsule (FloatingTabBar). Icons only; the titles are still read out by screen readers.
export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <FloatingTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: t.feed,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home" iconOutline="home-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: t.map,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="map" iconOutline="map-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: t.marketplace,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="storefront" iconOutline="storefront-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: t.messages,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="paper-plane" iconOutline="paper-plane-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t.profile,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="person" iconOutline="person-outline" />
          ),
        }}
      />
    </Tabs>
  );
}
