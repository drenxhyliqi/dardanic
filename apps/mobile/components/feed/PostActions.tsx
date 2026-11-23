import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { FlameButton } from '../flame/FlameButton';

const t = strings.feed.post;

// Ionicons draws each icon with different empty space around it, so at the same size
// the bubble looks heavier. These nudge each one so they all look the same size
// (measured on screen; the flame has its own in FlameButton). Each sits in an equal square.
const OPTICAL_SIZE: Record<string, number> = {
  'chatbubble-outline': 0.96,
  'paper-plane-outline': 0.96,
};

export type PostActionsProps = {
  flamed: boolean;
  flames: number;
  comments: number;
  shares: number;
  saved: boolean;
  onToggleFlame: () => void;
  onComment: () => void;
  onSave: () => void;
};

// The row under a post: flame, comment and share on the left, each with its count
// right next to it (short form: 1.2K), and save on the right. Tapping the comment
// icon or its number opens the comments; share does nothing yet.
export function PostActions(props: PostActionsProps) {
  const { flamed, flames, comments, shares, saved, onToggleFlame, onComment, onSave } = props;
  const styles = useStyles();

  return (
    <View style={styles.row}>
      <View style={styles.counts}>
        <Counted count={flames}>
          <FlameButton flamed={flamed} onToggle={onToggleFlame} />
        </Counted>
        <Action icon="chatbubble-outline" label={t.comment} count={comments} onPress={onComment} />
        <Action icon="paper-plane-outline" label={t.share} count={shares} />
      </View>
      <Action
        icon={saved ? 'bookmark' : 'bookmark-outline'}
        label={saved ? t.unsave : t.save}
        onPress={onSave}
      />
    </View>
  );
}

// An icon with its count beside it (no number when it's 0).
function Counted({ count, children }: { count: number; children: ReactNode }) {
  const styles = useStyles();
  return (
    <View style={styles.counted}>
      {children}
      {count > 0 && <Text style={styles.count}>{strings.common.compact(count)}</Text>}
    </View>
  );
}

type ActionProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  count?: number; // shown next to the icon, and part of the tap area
  onPress?: () => void;
};

function Action({ icon, label, count, onPress }: ActionProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={count ? t.withCount(label, count) : label}
      hitSlop={spacing.xs}
      style={({ pressed }) => [styles.counted, pressed && styles.pressed]}
    >
      <View style={styles.box}>
        <Ionicons
          name={icon}
          size={Math.round(sizes.actionIcon * (OPTICAL_SIZE[icon] ?? 1))}
          color={colors.text}
        />
      </View>
      {!!count && <Text style={styles.count}>{strings.common.compact(count)}</Text>}
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    counts: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
    },
    counted: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    box: {
      width: sizes.actionIcon,
      height: sizes.actionIcon,
      alignItems: 'center',
      justifyContent: 'center',
    },
    count: {
      ...typography.label,
      color: colors.text,
    },
    pressed: {
      opacity: 0.6,
    },
  }),
);
