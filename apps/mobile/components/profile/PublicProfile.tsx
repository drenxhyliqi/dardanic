import { router } from 'expo-router';
import { useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFindMe } from '../../context/FindMeContext';
import { useFollow } from '../../context/FollowContext';
import { useMessages } from '../../context/MessagesContext';
import type { FeedAuthor } from '../../data/feed';
import { PLAIN_DETAILS, PUBLIC_DETAILS } from '../../data/publicProfiles';
import { strings } from '../../i18n';
import { makeStyles, spacing } from '../../theme';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { useRefreshable } from '../ui/useRefreshable';
import { FollowButton } from './FollowButton';
import { PrivateNotice } from './PrivateNotice';
import { ProfileHeader } from './ProfileHeader';
import { ProfileInfo } from './ProfileInfo';
import { ProfileOptionsSheet } from './ProfileOptionsSheet';
import { SuggestedAccounts } from './SuggestedAccounts';

const t = strings.publicProfile;
const m = strings.profileMenu;

// Someone else's profile, built from the same parts as yours: banner + picture, name
// (🔒 when private, "Follows you"), followers, crew, bio and Instagram, a Follow button,
// "Suggested for you", then their posts (or "This account is private"). The ••• opens
// Send message, Share, About this account, Block and Report. Messages become a request
// when they're private and you don't follow each other (unless you met on FindMe).
export function PublicProfile({ person }: { person: FeedAuthor }) {
  const styles = useStyles();
  const { startWith } = useMessages();
  const { canSeePosts, canMessageDirectly, followsYou, isBlocked, block, unblock } = useFollow();
  const findMe = useFindMe();
  const [menuOpen, setMenuOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const { scrollProps, indicator } = useRefreshable(undefined, insets.top);
  const findMeConnected = findMe.connectionWith(person.username).state === 'connected';
  const asRequest = !canMessageDirectly(person) && !findMeConnected;
  const details = PUBLIC_DETAILS[person.username] ?? PLAIN_DETAILS;
  const blocked = isBlocked(person);

  return (
    <Animated.ScrollView
      {...scrollProps}
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      {indicator}
      <ProfileHeader
        name={person.name}
        photo={person.photo}
        banner={null}
        hasStory={false}
        onBack={() => router.back()}
        onMore={() => setMenuOpen(true)}
      />
      <ProfileInfo
        locked={person.private}
        followsYou={!blocked && followsYou(person)}
        profile={{
          displayName: person.name,
          username: person.username,
          city: '',
          bio: blocked ? '' : details.bio,
          photo: person.photo,
          banner: null,
          crew: blocked ? '' : (person.crew ?? ''),
          followers: details.followers,
          following: details.following,
          hasStory: false,
          instagram: blocked ? undefined : details.instagram,
        }}
      />

      {blocked ? (
        <>
          <EmptyState icon="ban-outline" title={m.blocked(person.username)} hint={m.blockedHint} />
          <View style={styles.actions}>
            <Button
              label={m.unblock}
              variant="secondary"
              small
              centered
              onPress={() => unblock(person)}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.actions}>
            <FollowButton person={person} />
          </View>
          <SuggestedAccounts username={person.username} />
          {canSeePosts(person) ? (
            <EmptyState
              icon="camera-outline"
              title={strings.profile.noPostsTitle}
              hint={t.noPostsHint}
            />
          ) : (
            <PrivateNotice />
          )}
        </>
      )}

      <ProfileOptionsSheet
        person={person}
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onMessage={() => router.push(`/chat/${startWith(person, asRequest)}`)}
        onBlock={() => {
          block(person);
          findMe.block(person.username);
        }}
        onReport={() => findMe.report(person.username)}
      />
    </Animated.ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { gap: spacing.lg, paddingBottom: spacing.xxl },
    actions: { paddingHorizontal: spacing.xl },
  }),
);
