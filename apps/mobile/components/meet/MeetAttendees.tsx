import { StyleSheet, Text, View } from 'react-native';

import type { FeedAuthor } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { Avatar } from '../profile/Avatar';

const t = strings.feed.meet;
const FACES = 4; // faces shown before "+N"
const NAMES = 2; // names written out

export type MeetAttendeesProps = {
  attendees: FeedAuthor[]; // you first if you're going
  going: number;
  capacity?: number;
};

// Who's going: overlapping faces, "leon_builds, granit.gt +82 going", and when the
// host set a limit, a bar showing how full it is (84 / 120 spots).
export function MeetAttendees({ attendees, going, capacity }: MeetAttendeesProps) {
  const styles = useStyles();
  const colors = useColors();
  const faces = attendees.slice(0, FACES);
  const names = attendees.slice(0, NAMES).map((person) => person.username).join(', ');
  const filled = capacity ? Math.min(1, going / capacity) : 0;

  return (
    <View style={styles.block}>
      <View style={styles.row}>
        <View style={styles.faces}>
          {faces.map((person, index) => (
            <View key={person.username} style={index > 0 && styles.overlap}>
              <Avatar
                photo={person.photo}
                name={person.name}
                size={sizes.meetFace}
                ringColor={colors.surface}
                border={sizes.accentRing}
              />
            </View>
          ))}
        </View>
        <Text style={styles.text} numberOfLines={2}>
          {t.goingWith(names, going - Math.min(NAMES, attendees.length))}
        </Text>
      </View>

      {capacity && (
        <View style={styles.spots}>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${filled * 100}%` }]} />
          </View>
          <Text style={styles.spotsText}>{t.spots(going, capacity)}</Text>
        </View>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    block: {
      gap: spacing.md,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    faces: {
      flexDirection: 'row',
    },
    overlap: {
      marginLeft: -spacing.sm,
    },
    text: {
      ...typography.label,
      flex: 1,
      color: colors.text,
    },
    spots: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    track: {
      flex: 1,
      height: sizes.spotsBar,
      overflow: 'hidden',
      borderRadius: radius.full,
      backgroundColor: colors.surfaceBorder,
    },
    fill: {
      height: '100%',
      borderRadius: radius.full,
      backgroundColor: colors.primary,
    },
    spotsText: {
      ...typography.small,
      color: colors.textMuted,
    },
  }),
);
