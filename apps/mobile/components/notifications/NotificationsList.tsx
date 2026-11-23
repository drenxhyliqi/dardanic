import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNotifications } from '../../context/NotificationsContext';
import { strings } from '../../i18n';
import type { AppNotification, NotificationFilter } from '../../services/notifications';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { EmptyState } from '../ui/EmptyState';
import { PillTabs } from '../ui/PillTabs';
import { Skeleton } from '../ui/Skeleton';
import { useRefreshable } from '../ui/useRefreshable';
import { filterNotifications, notificationSections } from './notificationSections';
import { NotificationRow } from './NotificationRow';

const t = strings.notifications;

// Where tapping each kind takes you.
function open(note: AppNotification) {
  const person = note.people[0]?.username;
  switch (note.kind) {
    case 'follow':
    case 'findmeAccepted':
      if (person) router.push(`/user/${person}`);
      return;
    case 'flamePost':
      if (note.postId) router.push(`/post/${note.postId}`);
      return;
    case 'meetSoon':
      if (note.postId) router.push(`/meet/${note.postId}`);
      return;
    case 'comment':
    case 'reply':
    case 'mention':
      if (note.postId) router.push(`/comments/${note.postId}`);
      return;
    case 'flameStory':
      router.push('/profile');
      return;
    case 'findmeRequest':
      router.push('/findme/requests');
      return;
    case 'findmeDeclined':
      router.push('/findme');
      return;
    case 'findmeVerified':
      router.push('/findme/vehicles');
  }
}

// Notifications (🔔 on the Feed): filter chips, then New / Today / This week / Earlier.
// Opening it marks everything as read; what was new stays highlighted until you leave.
export function NotificationsList() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { notifications, isLoading, markAllRead } = useNotifications();
  const [filter, setFilter] = useState<NotificationFilter>('all');
  const [newIds, setNewIds] = useState<ReadonlySet<string>>(new Set());
  const { scrollProps, indicator } = useRefreshable();

  // Remember what was unread (for the highlight) before marking it all read.
  useEffect(() => {
    if (isLoading) return;
    const unread = notifications.filter((n) => !n.read).map((n) => n.id);
    if (unread.length === 0) return;
    setNewIds((current) => new Set([...current, ...unread]));
    markAllRead();
  }, [isLoading, notifications, markAllRead]);

  const sections = notificationSections(filterNotifications(notifications, filter), newIds);
  const filters = (Object.keys(t.filters) as NotificationFilter[]).map((key) => ({
    key,
    label: t.filters[key],
  }));

  return (
    <View style={styles.screen}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filters}
      >
        <PillTabs tabs={filters} active={filter} onChange={setFilter} />
      </ScrollView>
      {isLoading ? (
        <View style={styles.skeletons}>
          {[0, 1, 2, 3, 4].map((key) => (
            <View key={key} style={styles.skeletonRow}>
              <Skeleton
                width={sizes.searchAvatar}
                height={sizes.searchAvatar}
                radius={radius.full}
              />
              <Skeleton width="65%" height={spacing.md} />
            </View>
          ))}
        </View>
      ) : (
        <Animated.SectionList
          {...scrollProps}
          sections={sections}
          keyExtractor={(note) => note.id}
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={indicator}
          contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}
          renderSectionHeader={({ section }) => <Text style={styles.heading}>{section.title}</Text>}
          renderItem={({ item }) => (
            <NotificationRow note={item} isNew={newIds.has(item.id)} onPress={() => open(item)} />
          )}
          ListEmptyComponent={
            <EmptyState icon="notifications-outline" title={t.emptyTitle} hint={t.emptyHint} />
          }
        />
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    filterBar: { flexGrow: 0, flexShrink: 0 }, // the list below mustn't squeeze the chips
    filters: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    heading: {
      ...typography.label,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xs,
      color: colors.text,
    },
    skeletons: { gap: spacing.lg, padding: spacing.lg },
    skeletonRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  }),
);
