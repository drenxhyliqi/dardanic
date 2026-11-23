import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { MeetPost } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { Tag } from '../ui/Tag';
import type { MeetTiming } from './meetTime';

const t = strings.feed.meet;
type IconName = ComponentProps<typeof Ionicons>['name'];

export type MeetDetailsProps = {
  meet: MeetPost;
  timing: MeetTiming;
};

// What you need to decide: tags (BMW only, 18+…), the time with a live countdown,
// where and how far, how many cars to expect, and the entry price.
export function MeetDetails({ meet, timing }: MeetDetailsProps) {
  const styles = useStyles();
  const colors = useColors();

  const rows: { icon: IconName; text: string; strong?: boolean }[] = [
    { icon: 'time-outline', text: timing.range },
    ...(timing.countdown
      ? [{ icon: 'hourglass-outline' as IconName, text: timing.countdown, strong: true }]
      : []),
    { icon: 'location-outline', text: t.place(meet.place, meet.km) },
    ...(meet.expectedCars
      ? [{ icon: 'car-sport-outline' as IconName, text: t.expectedCars(meet.expectedCars) }]
      : []),
    { icon: 'ticket-outline', text: meet.entry ? t.entry(meet.entry) : t.free },
  ];

  return (
    <View style={styles.block}>
      <View style={styles.tags}>
        {meet.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </View>
      {rows.map((row) => (
        <View key={row.icon} style={styles.row}>
          <Ionicons
            name={row.icon}
            size={sizes.icon}
            color={row.strong ? colors.primaryLight : colors.textMuted}
          />
          <Text style={[styles.text, row.strong && styles.strong]} numberOfLines={1}>
            {row.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    block: {
      gap: spacing.sm,
    },
    tags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
      marginBottom: spacing.xs,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    text: {
      ...typography.paragraph,
      flexShrink: 1,
      color: colors.text,
    },
    strong: {
      ...typography.label,
      color: colors.primaryLight,
    },
  }),
);
