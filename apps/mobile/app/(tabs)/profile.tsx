import { useCallback, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BuildGrid } from '../../components/profile/BuildGrid';
import { ProfileActions } from '../../components/profile/ProfileActions';
import { ProfileEmpty } from '../../components/profile/ProfileEmpty';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileInfo } from '../../components/profile/ProfileInfo';
import { ProfileStats } from '../../components/profile/ProfileStats';
import { ProfileTabs, type ProfileTab } from '../../components/profile/ProfileTabs';
import { useProfileData } from '../../components/profile/useProfileData';
import { tabBarSpace } from '../../components/tabs/FloatingTabBar';
import { RefreshIndicator, refreshGap } from '../../components/ui/RefreshIndicator';
import { usePullToRefresh } from '../../components/ui/usePullToRefresh';
import { SAMPLE_GARAGE } from '../../data/profile';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing } from '../../theme';

const t = strings.profile;
const FAKE_RELOAD_MS = 1200; // until there's a backend to fetch from

// The user's own profile. UI only for now: sample content where there's no data yet.
// Pull down to refresh: a reload circle shows in the gap above the profile, then the
// profile is redrawn and slides back up over it.
export default function ProfileScreen() {
  const styles = useStyles();
  const profile = useProfileData();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<ProfileTab>('posts');
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, FAKE_RELOAD_MS));
    setReloadKey((key) => key + 1);
  }, []);
  const pull = usePullToRefresh(reload, refreshGap(insets.top));

  return (
    <View style={styles.screen}>
      <Animated.ScrollView
        style={styles.screen}
        contentContainerStyle={{ paddingBottom: tabBarSpace(insets.bottom) }}
        onScroll={pull.onScroll}
        onScrollEndDrag={pull.onScrollEndDrag}
        scrollEventThrottle={16}
      >
        <RefreshIndicator
          scrollY={pull.scrollY}
          active={pull.active}
          spin={pull.spin}
          gap={pull.gap}
          refreshing={pull.refreshing}
        />
        {/* Redrawn after a refresh (the scroll view itself stays, so the pull keeps working). */}
        <View key={reloadKey} style={styles.content}>
          <ProfileHeader
            name={profile.displayName || profile.username}
            photo={profile.photo}
            banner={profile.banner}
            hasStory={profile.hasStory}
          />
          <ProfileInfo profile={profile} />
          <ProfileStats />
          <ProfileActions />
          <ProfileTabs active={tab} onChange={setTab} />

          <View style={styles.tabContent}>
            {tab === 'posts' && (
              <ProfileEmpty icon="camera-outline" title={t.noPostsTitle} hint={t.noPostsHint} />
            )}
            {tab === 'gallery' && (
              <ProfileEmpty icon="images-outline" title={t.noPhotosTitle} hint={t.noPhotosHint} />
            )}
            {tab === 'builds' && <BuildGrid cars={SAMPLE_GARAGE} />}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      gap: spacing.lg,
    },
    // Sits right under the tabs (the builds grid runs edge to edge, like Instagram).
    tabContent: {
      marginTop: -spacing.lg,
      paddingTop: sizes.gridGap,
    },
  }),
);
