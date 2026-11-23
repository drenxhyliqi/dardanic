import { router } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { MY_STORY_ID, useStories } from '../../context/StoriesContext';
import { strings } from '../../i18n';
import { makeStyles, spacing } from '../../theme';
import { StoryBubble } from './StoryBubble';

const t = strings.feed.stories;

export type StoriesRowProps = {
  me: { name: string; photo: string | null };
};

// Stories across the top of the feed, scrolling sideways: "Your story" first, then
// new stories (gradient ring), then the ones already seen (grey ring). Tapping one
// opens the story viewer. "Your story" opens the camera to add one; once you have a
// story, tapping it plays it and its small + adds more.
export function StoriesRow({ me }: StoriesRowProps) {
  const styles = useStyles();
  const { stories, myStory, isSeen } = useStories();
  const addStory = () => router.push('/story/new');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={styles.bar}
    >
      {myStory ? (
        <StoryBubble
          title={t.yours}
          name={me.name}
          label={t.open(t.yours)}
          photo={me.photo}
          ring={isSeen(MY_STORY_ID) ? 'seen' : 'new'}
          onPress={() => router.push(`/story/${MY_STORY_ID}`)}
          onAdd={addStory}
        />
      ) : (
        <StoryBubble
          title={t.yours}
          name={me.name}
          label={t.add}
          photo={me.photo}
          ring="own"
          onPress={addStory}
        />
      )}
      {stories.map((story) => (
        <StoryBubble
          key={story.id}
          title={story.label}
          name={story.name}
          label={t.open(story.label)}
          photo={story.avatar}
          ring={isSeen(story.id) ? 'seen' : 'new'}
          onPress={() => router.push(`/story/${story.id}`)}
        />
      ))}
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    bar: {
      flexGrow: 0,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.surfaceBorder,
    },
    row: {
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.md,
    },
  }),
);
