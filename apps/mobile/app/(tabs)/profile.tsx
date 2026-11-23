import { useCallback, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BuildCard } from '../../components/build/BuildCard';
import { PostGrid } from '../../components/profile/PostGrid';
import { TextPostList } from '../../components/profile/TextPostList';
import { ProfileActions } from '../../components/profile/ProfileActions';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileInfo } from '../../components/profile/ProfileInfo';
import { ProfileStats } from '../../components/profile/ProfileStats';
import { ProfileTabs, type ProfileTab } from '../../components/profile/ProfileTabs';
import { useProfileData } from '../../components/profile/useProfileData';
import { useOnboarding } from '../../context/OnboardingContext';
import { usePrivacy } from '../../context/PrivacyContext';
import { tabBarSpace } from '../../components/tabs/FloatingTabBar';
import { RefreshIndicator, refreshGap } from '../../components/ui/RefreshIndicator';
import { usePullToRefresh } from '../../components/ui/usePullToRefresh';
import { MY_POSTS, MY_TEXT_POSTS } from '../../data/myPosts';
import { SAMPLE_GARAGE } from '../../data/garage';
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
  const { isPrivate } = usePrivacy();
  // A brand-new account (just signed up) has nothing yet; the sample account has posts.
  const isNewAccount = Boolean(useOnboarding().username);
  const photoPosts = isNewAccount ? [] : MY_POSTS;
  const textPosts = isNewAccount ? [] : MY_TEXT_POSTS;
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
        alwaysBounceVertical
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
          <ProfileInfo profile={profile} locked={isPrivate} />
          <ProfileStats />
          <ProfileActions />
          <ProfileTabs active={tab} onChange={setTab} />

          <View style={styles.tabContent}>
            {tab === 'posts' &&
              (photoPosts.length ? (
                <PostGrid posts={photoPosts} />
              ) : (
                <EmptyState icon="camera-outline" title={t.noPostsTitle} hint={t.noPostsHint} />
              ))}
            {tab === 'text' &&
              (textPosts.length ? (
                <TextPostList posts={textPosts} />
              ) : (
                <EmptyState icon="reader-outline" title={t.noTextTitle} hint={t.noTextHint} />
              ))}
            {tab === 'builds' && (
              <View style={styles.builds}>
                {SAMPLE_GARAGE.map((car) => (
                  <BuildCard key={car.id} car={car} />
                ))}
              </View>
            )}
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
    // Sits right under the tabs (the posts grid runs edge to edge, like Instagram).
    builds: {
      gap: spacing.lg,
      padding: spacing.lg,
    },
    tabContent: {
      marginTop: -spacing.lg,
      paddingTop: sizes.gridGap,
    },
  }),
);
