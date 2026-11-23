import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useMeets } from '../../context/MeetsContext';
import type { MeetPost } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { AvatarStack } from '../profile/AvatarStack';
import { Button } from '../ui/Button';
import { LoadingImage } from '../ui/LoadingImage';
import { DateTile } from './DateTile';
import { meetTiming, useNow } from './meetTime';
import { StatusBadge } from './StatusBadge';

const t = strings.feed.meet;
const PHOTO_RATIO = 16 / 9;

export type MeetCardProps = {
  meet: MeetPost;
};

// A meet in the feed, kept minimal: photo with the date and LIVE / Tonight badge, the
// title, one line with time · place · distance, who's going and a small Going button.
// Tapping it opens the meet page with everything else.
export const MeetCard = memo(function MeetCard({ meet }: MeetCardProps) {
  const styles = useStyles();
  const timing = meetTiming(meet, useNow());
  const { isGoing, toggleGoing } = useMeets();
  const going = isGoing(meet.id);
  const place = meet.place.split(',')[0];

  return (
    <Pressable
      onPress={() => router.push(`/meet/${meet.id}`)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.photo, { aspectRatio: PHOTO_RATIO }]}>
        <LoadingImage source={{ uri: meet.photo }} resizeMode="cover" />
        <DateTile startsAt={meet.startsAt} />
        <StatusBadge label={timing.badge} live={timing.live} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{meet.title}</Text>
        <Text style={styles.meta} numberOfLines={1}>
          {`${timing.start} · ${place} · ${t.km(meet.km)}`}
        </Text>
        <View style={styles.footer}>
          <AvatarStack people={meet.attendees} size={sizes.introAvatar} />
          <Text style={styles.going}>{t.going(meet.going + (going ? 1 : 0))}</Text>
          <Button
            label={going ? t.joined : t.join}
            icon={going ? 'checkmark' : undefined}
            variant={going ? 'secondary' : 'primary'}
            small
            compact
            onPress={() => toggleGoing(meet.id)}
          />
        </View>
      </View>
    </Pressable>
  );
});

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      marginHorizontal: spacing.lg,
      overflow: 'hidden',
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: { opacity: 0.9 },
    photo: { width: '100%' },
    body: { gap: spacing.xs, padding: spacing.lg },
    title: { ...typography.cardTitle, color: colors.text },
    meta: { ...typography.paragraph, color: colors.textMuted },
    footer: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
    going: { ...typography.label, flex: 1, color: colors.text },
  }),
);
