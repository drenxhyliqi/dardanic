import { FlatList, StyleSheet, Text, View } from 'react-native';

import { SAMPLE_VIEWERS } from '../../data/storyViewers';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography } from '../../theme';
import { FlameIcon } from '../flame/FlameIcon';
import { Avatar } from '../profile/Avatar';
import { StoryPanel } from './StoryPanel';

const t = strings.story;

// Who watched your story: "6 views · 3 flames", then everyone with when they watched,
// and a red flame next to the people who flamed it.
export function StoryViewersPanel({ onClose }: { onClose: () => void }) {
  const styles = useStyles();
  const flames = SAMPLE_VIEWERS.filter((viewer) => viewer.flamed).length;
  return (
    <StoryPanel onClose={onClose} tall>
      <View>
        <Text style={styles.title}>{t.viewers}</Text>
        <Text style={styles.summary}>{t.viewSummary(SAMPLE_VIEWERS.length, flames)}</Text>
      </View>
      <FlatList
        data={SAMPLE_VIEWERS}
        keyExtractor={(viewer) => viewer.person.username}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Avatar
              photo={item.person.photo}
              name={item.person.name}
              size={sizes.searchAvatar}
              border={0}
            />
            <View style={styles.text}>
              <Text style={styles.name}>{item.person.username}</Text>
              <Text style={styles.hint}>
                {item.flamed ? t.flamedIt : strings.feed.timeAgo(item.minutesAgo)}
              </Text>
            </View>
            {item.flamed && <FlameIcon size={sizes.icon} flamed />}
          </View>
        )}
      />
    </StoryPanel>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    title: { ...typography.cardTitle, color: colors.text },
    summary: { ...typography.small, color: colors.textMuted },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: spacing.sm,
    },
    text: { flex: 1 },
    name: { ...typography.name, color: colors.text },
    hint: { ...typography.small, color: colors.textMuted },
  }),
);
