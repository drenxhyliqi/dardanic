import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNotifications } from '../../context/NotificationsContext';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, useColors } from '../../theme';
import { FeedFilterMenu } from './FeedFilterMenu';
import type { FeedFilter } from './feedFilters';

const wordmark = require('../../assets/brand/logo-wordmark.png');
const WORDMARK_RATIO = 1200 / 94;
const BAR_HEIGHT = sizes.headerButton + spacing.sm * 2;
const CHEVRON_GAP = spacing.sm;

// Where the logo sits, so the "account ready" animation can land exactly on it:
// the bar's height, and how far left of the screen's centre the logo's own centre is
// (the logo and the ▾ are centred together).
export const FEED_BAR_HEIGHT = BAR_HEIGHT;
export const FEED_LOGO_SHIFT = (CHEVRON_GAP + sizes.chipIcon) / 2;

type HeaderIconProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  dot?: boolean; // small red dot: something new (e.g. unread notifications)
};

// A tap area holding one icon. The label is read out by screen readers.
function HeaderIcon({ icon, label, onPress, dot }: HeaderIconProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={sizes.headerIcon} color={colors.text} />
      {dot && <View style={styles.dot} />}
    </Pressable>
  );
}

export type FeedHeaderProps = {
  filter: FeedFilter;
  onChangeFilter: (filter: FeedFilter) => void;
};

// Top bar of the Feed: + (create) on the left, the full logo with a ▾ in the middle
// (opens the For you / Following / Crews menu), search and notifications on the right.
// Search opens Search & Explore (with the way into FindMe); the bell opens
// notifications and shows a red dot when something is unread.
export function FeedHeader({ filter, onChangeFilter }: FeedHeaderProps) {
  const styles = useStyles();
  const colors = useColors();
  const t = strings.feed;
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const { unread } = useNotifications();

  return (
    <View style={styles.bar}>
      <HeaderIcon icon="add" label={t.create} onPress={() => router.push('/create')} />

      <View style={styles.center} pointerEvents="box-none">
        <Pressable
          onPress={() => setMenuOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={t.chooseFeed(t.filters[filter])}
          style={({ pressed }) => [styles.logoButton, pressed && styles.pressed]}
        >
          <Image
            source={wordmark}
            tintColor={colors.text}
            style={styles.wordmark}
            resizeMode="contain"
          />
          <Ionicons
            name={menuOpen ? 'chevron-up' : 'chevron-down'}
            size={sizes.chipIcon}
            color={colors.text}
          />
        </Pressable>
      </View>

      <View style={styles.actions}>
        <HeaderIcon icon="search-outline" label={t.search} onPress={() => router.push('/search')} />
        <HeaderIcon
          icon="notifications-outline"
          label={t.notifications}
          dot={unread > 0}
          onPress={() => router.push('/notifications')}
        />
      </View>

      <FeedFilterMenu
        visible={menuOpen}
        top={insets.top + BAR_HEIGHT + spacing.xs}
        active={filter}
        onSelect={(next) => {
          onChangeFilter(next);
          setMenuOpen(false);
        }}
        onClose={() => setMenuOpen(false)}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    bar: {
      height: BAR_HEIGHT,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.surfaceBorder,
    },
    // Spans the whole bar so the logo sits exactly in the middle of the screen.
    center: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingVertical: spacing.sm,
    },
    wordmark: {
      width: sizes.headerWordmark,
      height: sizes.headerWordmark / WORDMARK_RATIO,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    iconButton: {
      width: sizes.headerButton,
      height: sizes.headerButton,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressed: {
      opacity: 0.6,
    },
    dot: {
      position: 'absolute',
      top: spacing.sm,
      right: spacing.sm,
      width: spacing.sm,
      height: spacing.sm,
      borderRadius: radius.full,
      borderWidth: sizes.tabIndicator,
      borderColor: colors.background,
      backgroundColor: colors.alert,
    },
  }),
);
