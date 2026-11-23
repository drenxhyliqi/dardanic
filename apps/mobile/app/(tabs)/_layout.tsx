import { Tabs } from 'expo-router';

import { FloatingTabBar } from '../../components/tabs/FloatingTabBar';
import { TabIcon } from '../../components/tabs/TabIcon';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useMessages } from '../../context/MessagesContext';
import { ScrollCollapseProvider } from '../../context/ScrollCollapseContext';
import { strings } from '../../i18n';

const t = strings.tabs;
const DOT = ''; // an empty badge is drawn as a small dot (FloatingTabBar)

// The main app bottom bar: Feed, Search, Marketplace, Messages, Profile (Map is hidden
// for now), shown as a floating capsule (FloatingTabBar). Icons only; the titles are
// still read out by screen readers.
// ScrollCollapseProvider lets the Feed shrink the bottom bar while scrolling. Messages
// shows a red count of unread messages, Marketplace a red dot for new listings.
export default function TabsLayout() {
  const { unreadTotal } = useMessages();
  const { hasNew } = useMarketplace();
  return (
    <ScrollCollapseProvider>
      <Tabs
        tabBar={(props) => <FloatingTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
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
          name="search"
          options={{
            title: t.search,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="search" iconOutline="search-outline" />
            ),
          }}
        />
        {/* Hidden for the first store release (no real content yet; Apple rejects
            placeholder screens). Bring the button back once the map is built. */}
        <Tabs.Screen
          name="map"
          options={{ title: t.map, tabBarItemStyle: { display: 'none' } }}
        />
        <Tabs.Screen
          name="marketplace"
          options={{
            title: t.marketplace,
            tabBarBadge: hasNew ? DOT : undefined, // red dot: new listings
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="storefront" iconOutline="storefront-outline" />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: t.messages,
            tabBarBadge: unreadTotal || undefined,
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
    </ScrollCollapseProvider>
  );
}
