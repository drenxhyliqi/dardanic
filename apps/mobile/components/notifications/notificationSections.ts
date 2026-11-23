import { strings } from '../../i18n';
import type {
  AppNotification,
  NotificationFilter,
  NotificationKind,
} from '../../services/notifications';

const DAY = 1440;
const WEEK = DAY * 7;

// Which kinds each filter chip shows ("all" shows everything).
const FILTER_KINDS: Record<Exclude<NotificationFilter, 'all'>, NotificationKind[]> = {
  follows: ['follow'],
  flames: ['flamePost', 'flameStory'],
  comments: ['comment', 'reply', 'mention'],
  findme: ['findmeRequest', 'findmeAccepted', 'findmeDeclined', 'findmeVerified'],
};

export function filterNotifications(list: AppNotification[], filter: NotificationFilter) {
  return filter === 'all' ? list : list.filter((n) => FILTER_KINDS[filter].includes(n.kind));
}

// Sorted into sections: New (unread when you opened the screen), Today, This week,
// Earlier. Empty sections are left out.
export type NotificationSection = { title: string; data: AppNotification[] };

export function notificationSections(
  list: AppNotification[],
  newIds: ReadonlySet<string>,
): NotificationSection[] {
  const t = strings.notifications.sections;
  const buckets: NotificationSection[] = [
    { title: t.new, data: list.filter((n) => newIds.has(n.id)) },
    { title: t.today, data: list.filter((n) => !newIds.has(n.id) && n.minutesAgo < DAY) },
    {
      title: t.week,
      data: list.filter((n) => !newIds.has(n.id) && n.minutesAgo >= DAY && n.minutesAgo < WEEK),
    },
    { title: t.earlier, data: list.filter((n) => !newIds.has(n.id) && n.minutesAgo >= WEEK) },
  ];
  return buckets.filter((bucket) => bucket.data.length > 0);
}
