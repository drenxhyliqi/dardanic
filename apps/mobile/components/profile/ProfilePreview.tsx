import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { BANNER_ASPECT, pickBanner, pickProfilePhoto } from '../setup/pickImage';
import { LoadingImage } from '../ui/LoadingImage';
import { Avatar } from './Avatar';

export type ProfilePreviewProps = {
  username: string;
  displayName: string;
  city: string | null;
  bio: string;
  photo: string | null;
  banner: string | null;
  // Pass these to make the banner and photo tappable (opens the photo library).
  onChangePhoto?: (uri: string) => void;
  onChangeBanner?: (uri: string) => void;
};

// A live card showing how the profile will look, updated as the user fills in setup.
export function ProfilePreview(props: ProfilePreviewProps) {
  const styles = useStyles();
  const colors = useColors();
  const { username, displayName, city, bio, photo, banner, onChangePhoto, onChangeBanner } = props;
  const t = strings.setup;
  const editable = Boolean(onChangePhoto || onChangeBanner);

  async function chooseBanner() {
    const uri = await pickBanner();
    if (uri) onChangeBanner?.(uri);
  }

  async function choosePhoto() {
    const uri = await pickProfilePhoto();
    if (uri) onChangePhoto?.(uri);
  }

  return (
    <View style={styles.card}>
      <Pressable
        onPress={chooseBanner}
        disabled={!onChangeBanner}
        accessibilityRole={onChangeBanner ? 'button' : undefined}
        accessibilityLabel={t.banner}
        style={styles.banner}
      >
        {banner ? (
          <LoadingImage source={{ uri: banner }} resizeMode="cover" />
        ) : (
          editable && (
            <View style={styles.bannerEmpty}>
              <Ionicons name="image-outline" size={sizes.icon} color={colors.textMuted} />
              <Text style={styles.muted}>{t.addBanner}</Text>
            </View>
          )
        )}
      </Pressable>

      <Pressable
        onPress={choosePhoto}
        disabled={!onChangePhoto}
        accessibilityRole={onChangePhoto ? 'button' : undefined}
        accessibilityLabel={t.profilePhoto}
        style={styles.avatar}
      >
        <Avatar photo={photo} name={displayName.trim() || username} />
        {onChangePhoto && (
          <View style={styles.badge}>
            <Ionicons name="camera" size={sizes.chipIcon} color={colors.white} />
          </View>
        )}
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {displayName.trim() || t.previewName}
        </Text>
        <Text style={styles.muted} numberOfLines={1}>
          @{username || t.previewUsername}
        </Text>
        {city && (
          <View style={styles.city}>
            <Ionicons name="location-outline" size={sizes.chipIcon} color={colors.textMuted} />
            <Text style={styles.muted}>{city}</Text>
          </View>
        )}
        {bio.trim() !== '' && <Text style={styles.bio}>{bio.trim()}</Text>}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
      overflow: 'hidden',
    },
    banner: {
      aspectRatio: BANNER_ASPECT[0] / BANNER_ASPECT[1],
      backgroundColor: colors.surfaceBorder,
    },
    bannerEmpty: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    avatar: {
      alignSelf: 'flex-start',
      marginTop: -sizes.avatar / 2,
      marginLeft: spacing.lg,
    },
    badge: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: sizes.avatarBadge,
      height: sizes.avatarBadge,
      borderRadius: radius.full,
      borderWidth: 2,
      borderColor: colors.surface,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    info: {
      gap: spacing.xxs,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.lg,
    },
    name: {
      ...typography.cardTitle,
      color: colors.text,
    },
    city: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginTop: spacing.xs,
    },
    bio: {
      ...typography.paragraph,
      color: colors.text,
      marginTop: spacing.sm,
    },
    muted: {
      ...typography.small,
      color: colors.textMuted,
    },
  }),
);
