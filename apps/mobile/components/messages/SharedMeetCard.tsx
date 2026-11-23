import { StyleSheet, Text, View } from 'react-native';

import { SAMPLE_FEED } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { dateTile } from '../meet/meetTime';
import { LoadingImage } from '../ui/LoadingImage';

// A meet shared in a chat: its photo, title, day and place, and how many are going.
// (Tapping it will open the meet later.)
export function SharedMeetCard({ meetId }: { meetId: string }) {
  const styles = useStyles();
  const meet = SAMPLE_FEED.find((item) => item.id === meetId);
  if (!meet || meet.kind !== 'meet') return null;
  const tile = dateTile(meet.startsAt);

  return (
    <View style={styles.card}>
      <View style={styles.photo}>
        <LoadingImage source={{ uri: meet.photo }} resizeMode="cover" />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{meet.title}</Text>
        <Text style={styles.text} numberOfLines={1}>
          {`${tile.weekday} ${tile.day} ${tile.month} · ${meet.place}`}
        </Text>
        <Text style={styles.going}>{strings.feed.meet.going(meet.going)}</Text>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      width: sizes.chatPhoto,
      overflow: 'hidden',
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    photo: {
      width: sizes.chatPhoto,
      height: sizes.chatPhoto / 2,
    },
    body: {
      gap: spacing.xs,
      padding: spacing.sm,
    },
    title: {
      ...typography.cardTitle,
      color: colors.text,
    },
    text: {
      ...typography.small,
      color: colors.textMuted,
    },
    going: {
      ...typography.label,
      color: colors.primaryLight,
    },
  }),
);
