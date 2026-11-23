import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMeets } from '../../context/MeetsContext';
import type { MeetPost } from '../../data/feed';
import { PEOPLE } from '../../data/feedAuthors';
import { ME } from '../../data/myPosts';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { openReport } from '../report/openReport';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { LinkRow } from '../ui/LinkRow';
import { MeetActions } from './MeetActions';
import { MeetAttendees } from './MeetAttendees';
import { MeetCover } from './MeetCover';
import { MeetDetails } from './MeetDetails';
import { MeetRules } from './MeetRules';
import { MeetSchedule } from './MeetSchedule';
import { meetTiming, useNow } from './meetTime';

const t = strings.feed.meet;

// A meet's full page: big cover (date, status, title, host), the details (time with
// countdown, place, cars, entry, tags), About, Schedule, Rules, who's going and the
// host, with I'm going / Interested / Directions / Share fixed at the bottom.
export function MeetDetail({ meet }: { meet: MeetPost }) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const timing = meetTiming(meet, useNow());
  const { isGoing, isInterested, toggleGoing, toggleInterested } = useMeets();
  const going = isGoing(meet.id);
  const hostProfile = PEOPLE.find((person) => person.username === meet.author.username);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <MeetCover
          meet={meet}
          badge={timing.badge}
          live={timing.live}
          onPage
          topInset={insets.top}
        />
        <View style={styles.content}>
          <MeetDetails meet={meet} timing={timing} />
          <Section title={t.about}>
            <Text style={styles.body}>{meet.description}</Text>
          </Section>
          <Section title={t.schedule}>
            <MeetSchedule schedule={meet.schedule} />
          </Section>
          <Section title={t.rules}>
            <MeetRules rules={meet.rules} />
          </Section>
          <Section title={t.whosGoing}>
            <MeetAttendees
              attendees={going ? [ME, ...meet.attendees] : meet.attendees}
              going={meet.going + (going ? 1 : 0)}
              capacity={meet.capacity}
            />
          </Section>
          <Section title={t.host}>
            <LinkRow
              icon="people-outline"
              label={meet.author.name}
              hint={`@${meet.author.username}`}
              onPress={() => hostProfile && router.push(`/user/${hostProfile.username}`)}
            />
          </Section>
          <Button
            label={strings.report.reportMeet}
            icon="flag-outline"
            variant="secondary"
            small
            centered
            onPress={() => openReport('meet', meet.id, meet.author.username)}
          />
        </View>
      </ScrollView>
      <View style={[styles.back, { top: insets.top + spacing.sm }]}>
        <IconButton icon="chevron-back" label={t.back} round onPress={() => router.back()} />
      </View>
      <View style={[styles.bar, { paddingBottom: insets.bottom + spacing.sm }]}>
        <MeetActions
          joined={going}
          interested={isInterested(meet.id)}
          onToggleJoin={() => toggleGoing(meet.id)}
          onToggleInterested={() => toggleInterested(meet.id)}
        />
      </View>
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const styles = useStyles();
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    scroll: { paddingBottom: spacing.xxl * 3 },
    content: { gap: spacing.xl, padding: spacing.lg },
    section: { gap: spacing.md },
    heading: { ...typography.cardTitle, color: colors.text },
    body: { ...typography.paragraph, color: colors.textMuted },
    back: { position: 'absolute', left: spacing.lg },
    bar: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.surfaceBorder,
      backgroundColor: colors.background,
    },
  }),
);
