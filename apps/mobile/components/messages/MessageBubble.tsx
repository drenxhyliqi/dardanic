import { memo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { FeedAuthor } from '../../data/feed';
import type { Message } from '../../data/messages';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { FlameIcon } from '../flame/FlameIcon';
import { Avatar } from '../profile/Avatar';
import { openReport } from '../report/openReport';
import { MessageContent } from './MessageContent';
import { Receipt, type ReceiptStatus } from './Receipt';

const DOUBLE_TAP_MS = 280;
const MAX_WIDTH = '78%';

export type MessageBubbleProps = {
  message: Message;
  sender?: FeedAuthor; // who sent it (not you)
  first: boolean; // first of a run from the same sender
  last: boolean; // last of a run
  showName: boolean; // crew chats: the sender's name above their first bubble
  status?: ReceiptStatus; // under your latest message: delivered or seen
  onToggleFlame: () => void;
};

// One message row. Yours sit on the right, theirs on the left with their avatar next to
// the last bubble of a run. Double-tap a message to flame it; a small flame shows on
// the corner when you or they flamed it.
export const MessageBubble = memo(function MessageBubble(props: MessageBubbleProps) {
  const { message, sender, first, last, showName, status, onToggleFlame } = props;
  const styles = useStyles();
  const mine = message.from === 'me';
  const flamed = message.flamedByMe || message.flamedByThem;
  const lastTap = useRef(0);

  const onTap = () => {
    const now = Date.now();
    if (now - lastTap.current < DOUBLE_TAP_MS) {
      lastTap.current = 0;
      onToggleFlame();
    } else {
      lastTap.current = now;
    }
  };

  return (
    <View
      style={[styles.row, mine && styles.rowMine, first && styles.runStart, flamed && styles.room]}
    >
      {!mine && (
        <View style={styles.avatarSlot}>
          {last && sender && (
            <Avatar photo={sender.photo} name={sender.name} size={sizes.chatAvatar} border={0} />
          )}
        </View>
      )}
      <View style={[styles.column, mine && styles.columnMine]}>
        {showName && sender && <Text style={styles.name}>{sender.username}</Text>}
        <Pressable
          onPress={onTap}
          onLongPress={mine ? undefined : () => openReport('message', message.id, message.from)}
          accessibilityHint={strings.flame.add}
        >
          <MessageContent message={message} mine={mine} first={first} last={last} />
          {flamed && (
            <View style={[styles.flame, mine ? styles.flameMine : styles.flameTheirs]}>
              <FlameIcon size={sizes.chipIcon} flamed />
            </View>
          )}
        </Pressable>
        {status && <Receipt status={status} />}
      </View>
    </View>
  );
});

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xxs,
    },
    rowMine: {
      justifyContent: 'flex-end',
    },
    runStart: {
      paddingTop: spacing.md,
    },
    room: {
      paddingBottom: spacing.sm, // space for the flame on the corner
    },
    avatarSlot: {
      width: sizes.chatAvatar,
    },
    column: {
      maxWidth: MAX_WIDTH,
      gap: spacing.xxs,
      alignItems: 'flex-start',
    },
    columnMine: {
      alignItems: 'flex-end',
    },
    name: {
      ...typography.small,
      marginLeft: spacing.md,
      color: colors.textMuted,
    },
    flame: {
      position: 'absolute',
      bottom: -spacing.sm,
      padding: spacing.xxs,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.background,
    },
    flameMine: {
      left: -spacing.sm,
    },
    flameTheirs: {
      right: -spacing.sm,
    },
  }),
);
