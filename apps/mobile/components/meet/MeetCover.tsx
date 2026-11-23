import { StyleSheet, Text, View } from 'react-native';

import type { MeetPost } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { Avatar } from '../profile/Avatar';
import { LoadingImage } from '../ui/LoadingImage';
import { DateTile } from './DateTile';
import { StatusBadge } from './StatusBadge';

const COVER_RATIO = 16 / 10;
const BADGE_ROOM = spacing.xxl + spacing.xs; // the status badge's height plus a gap

export type MeetCoverProps = {
  meet: MeetPost;
  badge: string; // LIVE / Tonight / Tomorrow…
  live: boolean;
  onPage?: boolean; // on the meet page: fades into the page instead of a card
  topInset?: number; // on the meet page: keep the badges below the status bar
};

// The top of the meet page: the cover photo with a calendar tile (SAT 23 NOV) on the
// left, a status badge on the right (red with a pulsing dot when LIVE), and the title
// and host at the bottom, where the photo fades into the card.
export function MeetCover({ meet, badge, live, onPage = false, topInset = 0 }: MeetCoverProps) {
  const styles = useStyles();

  return (
    <View style={[styles.cover, { aspectRatio: COVER_RATIO }]}>
      <LoadingImage source={{ uri: meet.photo }} resizeMode="cover" />
      <View style={[styles.fade, onPage && styles.fadePage]} pointerEvents="none" />

      {onPage ? (
        // The back button takes the top-left corner on the page: status and date go right.
        <>
          <StatusBadge label={badge} live={live} top={topInset + spacing.sm} />
          <DateTile startsAt={meet.startsAt} right top={topInset + spacing.sm + BADGE_ROOM} />
        </>
      ) : (
        <>
          <DateTile startsAt={meet.startsAt} />
          <StatusBadge label={badge} live={live} />
        </>
      )}

      <View style={styles.bottom}>
        <Text style={styles.title} numberOfLines={2}>
          {meet.title}
        </Text>
        <View style={styles.host}>
          <Avatar
            photo={meet.author.photo}
            name={meet.author.name}
            size={sizes.replyAvatar}
            border={0}
          />
          <Text style={styles.hostText} numberOfLines={1}>
            {strings.feed.meet.hostedBy(meet.author.name)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    cover: {
      width: '100%',
    },
    fade: {
      ...StyleSheet.absoluteFill,
      backgroundImage: colors.cardFade,
    },
    fadePage: {
      backgroundImage: colors.imageFade,
    },
    bottom: {
      position: 'absolute',
      left: spacing.lg,
      right: spacing.lg,
      bottom: spacing.md,
      gap: spacing.xs,
    },
    title: {
      ...typography.title,
      color: colors.text,
    },
    host: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    hostText: {
      ...typography.label,
      flexShrink: 1,
      color: colors.text,
    },
  }),
);
