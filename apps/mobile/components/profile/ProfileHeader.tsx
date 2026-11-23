import { router } from 'expo-router';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, useColors } from '../../theme';
import { IconButton } from '../ui/IconButton';
import { LoadingImage } from '../ui/LoadingImage';
import { Avatar } from './Avatar';

const BANNER_RATIO = 3; // same 3:1 shape as the banner crop in profile setup
const flagPattern = require('../../assets/images/flag-fade.png');

export type ProfileHeaderProps = {
  name: string;
  photo: string | null;
  banner: string | null;
  hasStory: boolean;
  onBack?: () => void; // someone else's profile: a back button instead of settings
  onMore?: () => void; // someone else's profile: a ••• button on the right (options)
};

// Banner across the top (behind the status bar) with a clean straight bottom edge,
// a settings button (a back button on someone else's profile), and the profile
// picture sitting on that edge, on the left,
// with a ring around it: blue → purple gradient when there's a story, otherwise a
// thin solid blue accent ring. The dark ring in between is the gap.
// No banner yet → the blue race-flag pattern, so it never looks empty.
export function ProfileHeader(props: ProfileHeaderProps) {
  const { name, photo, banner, hasStory, onBack, onMore } = props;
  const styles = useStyles();
  const colors = useColors();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const ring = hasStory ? sizes.storyRing : sizes.accentRing;

  return (
    <View>
      <View style={[styles.banner, { height: insets.top + width / BANNER_RATIO }]}>
        {banner ? (
          <LoadingImage source={{ uri: banner }} resizeMode="cover" />
        ) : (
          <Image
            source={flagPattern}
            tintColor={colors.primary}
            resizeMode="cover"
            style={styles.fill}
          />
        )}
        {onBack ? (
          <>
            <View style={[styles.back, { top: insets.top + spacing.sm }]}>
              <IconButton
                icon="chevron-back"
                label={strings.messages.back}
                round
                onPress={onBack}
              />
            </View>
            {onMore && (
              <View style={[styles.settings, { top: insets.top + spacing.sm }]}>
                <IconButton
                  icon="ellipsis-horizontal"
                  label={strings.profileMenu.more}
                  round
                  onPress={onMore}
                />
              </View>
            )}
          </>
        ) : (
          <View style={[styles.settings, { top: insets.top + spacing.sm }]}>
            <IconButton
              icon="settings-outline"
              label={strings.profile.settings}
              round
              onPress={() => router.push('/settings')}
            />
          </View>
        )}
      </View>

      <View style={[styles.avatar, { marginTop: -(sizes.profileAvatar / 2 + ring) }]}>
        <View style={hasStory ? styles.story : styles.accent}>
          <Avatar
            photo={photo}
            name={name}
            size={sizes.profileAvatar}
            ringColor={colors.background}
          />
        </View>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    banner: {
      overflow: 'hidden',
      backgroundColor: colors.surface,
    },
    fill: {
      width: '100%',
      height: '100%',
    },
    back: {
      position: 'absolute',
      left: spacing.lg,
    },
    settings: {
      position: 'absolute',
      right: spacing.lg,
    },
    avatar: {
      alignItems: 'flex-start',
      paddingHorizontal: spacing.xl,
    },
    accent: {
      borderRadius: radius.full,
      borderWidth: sizes.accentRing,
      borderColor: colors.primary,
    },
    story: {
      padding: sizes.storyRing,
      borderRadius: radius.full,
      backgroundImage: colors.storyRing,
    },
  }),
);
