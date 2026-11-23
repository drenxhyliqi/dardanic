import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { FeedAuthor } from '../../data/feed';
import { makeStyles, radius, sizes, spacing } from '../../theme';
import { Avatar } from '../profile/Avatar';

const DOTS = 3;
const CYCLE_MS = 1200;
const STAGGER = 0.15; // each dot starts this much of the cycle after the previous one
const RISE = 3; // how far a dot lifts
const DIM = 0.35; // a dot's opacity when it's resting

export type TypingBubbleProps = {
  person?: FeedAuthor; // who's typing (their avatar sits where their messages' does)
};

// "Someone is typing": their small avatar and a compact bubble with three dots that
// rise and brighten one after another in a smooth wave. Laid out exactly like a
// message row, so it lines up with their messages.
export function TypingBubble({ person }: TypingBubbleProps) {
  const styles = useStyles();
  const wave = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(wave, {
        toValue: 1,
        duration: CYCLE_MS,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [wave]);

  return (
    <View style={styles.row}>
      <View style={styles.avatarSlot}>
        {person && (
          <Avatar photo={person.photo} name={person.name} size={sizes.chatAvatar} border={0} />
        )}
      </View>
      <View style={styles.bubble}>
        {Array.from({ length: DOTS }, (_, index) => {
          const start = 0.1 + index * STAGGER;
          const inputRange = [0, start, start + 0.15, start + 0.3, 1];
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  opacity: wave.interpolate({ inputRange, outputRange: [DIM, DIM, 1, DIM, DIM] }),
                  transform: [
                    {
                      translateY: wave.interpolate({
                        inputRange,
                        outputRange: [0, 0, -RISE, 0, 0],
                      }),
                    },
                  ],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    // Same spacing as MessageBubble's row, so it sits in line with their messages.
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    avatarSlot: {
      width: sizes.chatAvatar,
    },
    bubble: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
    },
    dot: {
      width: sizes.typingDot,
      height: sizes.typingDot,
      borderRadius: radius.full,
      backgroundColor: colors.textMuted,
    },
  }),
);
