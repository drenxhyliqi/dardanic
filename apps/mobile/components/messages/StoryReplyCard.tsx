import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { LoadingImage } from '../ui/LoadingImage';

const STORY_WIDTH = sizes.chatPhoto / 2.4;
const STORY_RATIO = 16 / 9;

export type StoryReplyCardProps = {
  photo: string; // the story the message replies to
  mine: boolean; // lines up on your side when you replied
};

// Above a story reply: "Replied to a story" and a small picture of that story.
export function StoryReplyCard({ photo, mine }: StoryReplyCardProps) {
  const styles = useStyles();
  return (
    <View style={[styles.wrap, mine && styles.mine]}>
      <Text style={styles.label}>{strings.messages.storyReply}</Text>
      <View style={styles.photo}>
        <LoadingImage source={{ uri: photo }} resizeMode="cover" radius={radius.md} />
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    wrap: {
      gap: spacing.xs,
      alignItems: 'flex-start',
    },
    mine: {
      alignItems: 'flex-end',
    },
    label: {
      ...typography.small,
      color: colors.textMuted,
    },
    photo: {
      width: STORY_WIDTH,
      height: STORY_WIDTH * STORY_RATIO,
      overflow: 'hidden',
      borderRadius: radius.md,
    },
  }),
);
