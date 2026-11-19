import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import type { ProfileData } from './useProfileData';

// Name, @username, followers | following, city and crew, then the bio, aligned left
// under the profile picture.
export function ProfileInfo({ profile }: { profile: ProfileData }) {
  const styles = useStyles();
  const colors = useColors();
  const t = strings.profile;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{profile.displayName || profile.username}</Text>
        <Text style={styles.muted}>@{profile.username}</Text>
      </View>

      <View style={styles.follow}>
        <Text style={styles.muted}>
          <Text style={styles.count}>{profile.followers}</Text> {t.followers}
        </Text>
        <View style={styles.followDivider} />
        <Text style={styles.muted}>
          <Text style={styles.count}>{profile.following}</Text> {t.following}
        </Text>
      </View>

      <View style={styles.meta}>
        {profile.city && (
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={sizes.chipIcon} color={colors.textMuted} />
            <Text style={styles.muted}>{profile.city}</Text>
          </View>
        )}
        <View style={styles.metaItem}>
          <Ionicons name="people-outline" size={sizes.chipIcon} color={colors.primaryLight} />
          <Text style={styles.crew}>
            {t.crew} · {profile.crew}
          </Text>
        </View>
      </View>

      {profile.bio !== '' && <Text style={styles.bio}>{profile.bio}</Text>}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    container: {
      gap: spacing.md,
      paddingHorizontal: spacing.xl,
    },
    name: {
      ...typography.profileName,
      color: colors.text,
    },
    muted: {
      ...typography.paragraph,
      color: colors.textMuted,
    },
    follow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    count: {
      ...typography.label,
      color: colors.text,
    },
    followDivider: {
      width: StyleSheet.hairlineWidth,
      height: sizes.chipIcon,
      backgroundColor: colors.borderFocus,
    },
    meta: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.lg,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    crew: {
      ...typography.paragraph,
      color: colors.primaryLight,
    },
    bio: {
      ...typography.paragraph,
      color: colors.text,
    },
  }),
);
