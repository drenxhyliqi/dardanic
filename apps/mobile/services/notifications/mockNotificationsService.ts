import { arta } from '../../data/feedAuthors';
import { SAMPLE_NOTIFICATIONS } from '../../data/notifications';
import type { NotificationsService } from './NotificationsService';
import type { AppNotification } from './types';

const NETWORK_MS = 400;
const LIVE_MS = 15000; // a new follower "arrives" this long after the app opens

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// A pretend backend: the sample notifications, plus one live notification shortly after
// opening, so you can see the bell's red dot appear.
export const mockNotificationsService: NotificationsService = {
  async list() {
    await wait(NETWORK_MS);
    return SAMPLE_NOTIFICATIONS;
  },

  async markAllRead() {
    await wait(NETWORK_MS);
  },

  subscribe(listener) {
    const live: AppNotification = {
      id: 'live-follow',
      kind: 'follow',
      people: [arta],
      minutesAgo: 0,
      read: false,
    };
    const timer = setTimeout(() => listener(live), LIVE_MS);
    return () => clearTimeout(timer);
  },
};
