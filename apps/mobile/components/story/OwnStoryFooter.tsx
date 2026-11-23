import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SAMPLE_VIEWERS } from '../../data/storyViewers';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { AvatarStack } from '../profile/AvatarStack';

const t = strings.story;
const FACES = SAMPLE_VIEWERS.map((viewer) => viewer.person);

export type OwnStoryFooterProps = {
  onViewers: () => void;
  onMore: () => void;
};

// Bottom of your own story (no reply or flame there): "Seen by 6" with the latest
// viewers' faces (opens who watched and who flamed it), and ••• for more (delete).
export function OwnStoryFooter({ onViewers, onMore }: OwnStoryFooterProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onViewers}
        accessibilityRole="button"
        accessibilityLabel={t.viewers}
        style={styles.viewers}
      >
        <AvatarStack people={FACES} size={sizes.replyAvatar} />
        <Text style={styles.seen}>{t.seenBy(SAMPLE_VIEWERS.length)}</Text>
      </Pressable>
      <Pressable
        onPress={onMore}
        accessibilityRole="button"
        accessibilityLabel={t.more}
        hitSlop={spacing.sm}
      >
        <Ionicons name="ellipsis-horizontal" size={sizes.icon + 4} color={colors.white} />
      </Pressable>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    viewers: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    seen: { ...typography.label, color: colors.white },
  }),
);
