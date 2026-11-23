import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  notificationsService as service,
  type AppNotification,
  type NotificationKind,
} from '../services/notifications';
import type { FindMeNotification } from '../services/findme';
import { useFindMe } from './FindMeContext';
import { useFollow } from './FollowContext';

type NotificationsValue = {
  notifications: AppNotification[]; // newest first, FindMe's included
  unread: number; // for the bell's red dot
  isLoading: boolean;
  markAllRead: () => void;
};

const NotificationsContext = createContext<NotificationsValue | null>(null);

const FINDME_KIND: Record<FindMeNotification['kind'], NotificationKind> = {
  request: 'findmeRequest',
  accepted: 'findmeAccepted',
  declined: 'findmeDeclined',
  verified: 'findmeVerified',
};

// FindMe's notifications in the shared shape.
const fromFindMe = (note: FindMeNotification): AppNotification => ({
  id: `findme-${note.id}`,
  kind: FINDME_KIND[note.kind],
  people: note.person
    ? [{ name: note.person.name, username: note.person.username, photo: note.person.photo }]
    : [],
  minutesAgo: note.minutesAgo,
  read: note.read,
});

// Everything for the 🔔: follows, flames, comments, meets, plus FindMe's notifications,
// as one list. New ones arrive live from the service.
export function NotificationsProvider({ children }: { children: ReactNode }) {
  const findMe = useFindMe();
  const { addFollowers } = useFollow();
  const [own, setOwn] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let current = true;
    service.list().then((list) => {
      if (!current) return;
      setOwn(list);
      setIsLoading(false);
    });
    const unsubscribe = service.subscribe((note) => setOwn((list) => [note, ...list]));
    return () => {
      current = false;
      unsubscribe();
    };
  }, []);

  // Everyone in a "started following you" is a follower (Follow back on their profile).
  useEffect(() => {
    const names = own.filter((n) => n.kind === 'follow').flatMap((n) => n.people);
    if (names.length) addFollowers(names.map((person) => person.username));
  }, [own, addFollowers]);

  // Only changes anything when something is unread, so opening the screen can call it.
  const { markAllRead: markFindMeRead } = findMe;
  const markAllRead = useCallback(() => {
    setOwn((list) =>
      list.some((n) => !n.read) ? list.map((n) => ({ ...n, read: true })) : list,
    );
    markFindMeRead();
    service.markAllRead();
  }, [markFindMeRead]);

  const value = useMemo<NotificationsValue>(() => {
    const notifications = [...own, ...findMe.notifications.map(fromFindMe)].sort(
      (a, b) => a.minutesAgo - b.minutesAgo,
    );
    return {
      notifications,
      unread: notifications.filter((n) => !n.read).length,
      isLoading,
      markAllRead,
    };
  }, [own, findMe.notifications, isLoading, markAllRead]);

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications(): NotificationsValue {
  const value = useContext(NotificationsContext);
  if (!value) throw new Error('useNotifications must be used inside NotificationsProvider');
  return value;
}
