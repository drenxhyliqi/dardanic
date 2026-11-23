import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import type { AppNotification, NotificationKind } from '../../services/notifications';
import { makeStyles, radius, sizes, useColors } from '../../theme';
import { FlameIcon } from '../flame/FlameIcon';
import { AvatarStack } from '../profile/AvatarStack';

type IconName = ComponentProps<typeof Ionicons>['name'];

// The small badge on the corner of the faces, saying what happened.
const BADGE: Partial<Record<NotificationKind, IconName>> = {
  follow: 'person-add',
  comment: 'chatbubble',
  reply: 'chatbubble',
  mention: 'at',
  findmeRequest: 'car-sport',
  findmeAccepted: 'checkmark',
  findmeDeclined: 'car-sport',
};
// No person behind these: just an icon in a soft blue circle.
const SOLO: Partial<Record<NotificationKind, IconName>> = {
  meetSoon: 'calendar',
  findmeVerified: 'shield-checkmark',
};

// Left side of a notification: who (one or two faces) with a badge for what they did
// (🔥 for flames), or just an icon when it isn't about a person.
export function NotificationAvatar({ note }: { note: AppNotification }) {
  const styles = useStyles();
  const colors = useColors();
  const solo = SOLO[note.kind];
  if (solo || note.people.length === 0) {
    return (
      <View style={styles.solo}>
        <Ionicons name={solo ?? 'notifications'} size={sizes.icon} color={colors.primaryLight} />
      </View>
    );
  }

  const flame = note.kind === 'flamePost' || note.kind === 'flameStory';
  const badge = BADGE[note.kind];
  return (
    <View>
      <AvatarStack people={note.people} size={sizes.searchAvatar} />
      {(flame || badge) && (
        <View style={styles.badge}>
          {flame ? (
            <FlameIcon size={sizes.chipIcon - 2} flamed />
          ) : (
            badge && <Ionicons name={badge} size={sizes.chipIcon - 4} color={colors.primary} />
          )}
        </View>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    solo: {
      width: sizes.searchAvatar,
      height: sizes.searchAvatar,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      backgroundColor: colors.primarySoft,
    },
    badge: {
      position: 'absolute',
      right: -sizes.accentRing,
      bottom: -sizes.accentRing,
      width: sizes.unreadBadge,
      height: sizes.unreadBadge,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      borderWidth: sizes.accentRing,
      borderColor: colors.background,
      backgroundColor: colors.surface,
    },
  }),
);
