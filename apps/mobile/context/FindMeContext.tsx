import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { MY_NOTIFICATIONS, MY_REQUESTS, MY_VEHICLES, SEARCHES_PER_DAY } from '../data/findme';
import type { CountryCode } from '../data/plateCountries';
import {
  findMeService as service,
  type ConnectionRequest,
  type Driver,
  type FindMeNotification,
  type FindMeSettings,
  type PlateSearchResult,
  type Vehicle,
} from '../services/findme';
import { useFindMeEvents } from './useFindMeEvents';

export type Connection = 'none' | 'pending' | 'connected';

type FindMeValue = {
  vehicles: Vehicle[];
  incoming: ConnectionRequest[]; // waiting for your answer
  outgoing: ConnectionRequest[]; // you sent, still waiting
  notifications: FindMeNotification[];
  unread: number;
  settings: FindMeSettings;
  searchesLeft: number;
  blocked: string[];
  search: (country: CountryCode, plate: string) => Promise<PlateSearchResult>;
  connectionWith: (username: string) => { state: Connection; requestId?: string };
  sendRequest: (driver: Driver, message?: string) => Promise<void>;
  cancelRequest: (requestId: string) => Promise<void>;
  respond: (requestId: string, accept: boolean) => Promise<void>;
  saveVehicle: (vehicle: Vehicle) => Promise<void>;
  removeVehicle: (vehicleId: string) => Promise<void>;
  verifyVehicle: (vehicleId: string, photo: string) => Promise<void>;
  updateSettings: (change: Partial<FindMeSettings>) => void;
  block: (username: string) => Promise<void>;
  report: (username: string) => Promise<void>;
  markAllRead: () => void;
};

const FindMeContext = createContext<FindMeValue | null>(null);
let nextNoteId = 0;

// FindMe's state on the phone: your vehicles, requests, notifications and settings.
// Every change goes through the FindMe service (mock today, Supabase later).
export function FindMeProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState(MY_VEHICLES);
  const [requests, setRequests] = useState(MY_REQUESTS);
  const [notifications, setNotifications] = useState(MY_NOTIFICATIONS);
  const [settings, setSettings] = useState<FindMeSettings>({
    discovery: true,
    whoCanRequest: 'everyone',
  });
  const [searchesLeft, setSearchesLeft] = useState(SEARCHES_PER_DAY);
  const [blocked, setBlocked] = useState<string[]>([]);

  const notify = useCallback((note: Omit<FindMeNotification, 'id' | 'minutesAgo' | 'read'>) => {
    const full = { id: `n${nextNoteId++}`, minutesAgo: 0, read: false, ...note };
    setNotifications((list) => [full, ...list]);
  }, []);
  useFindMeEvents({ requests, setRequests, setVehicles, notify });

  // Only touches state when something is unread, so opening the list can call it freely.
  const markAllRead = useCallback(() => {
    setNotifications((list) =>
      list.some((note) => !note.read) ? list.map((note) => ({ ...note, read: true })) : list,
    );
  }, []);

  const search = useCallback(async (country: CountryCode, plate: string) => {
    const result = await service.searchPlate(country, plate);
    setSearchesLeft(result.searchesLeft);
    return result;
  }, []);

  const value = useMemo<FindMeValue>(() => {
    const pendingOf = (direction: ConnectionRequest['direction']) =>
      requests.filter((r) => r.direction === direction && r.status === 'pending');
    return {
      vehicles,
      incoming: pendingOf('incoming'),
      outgoing: pendingOf('outgoing'),
      notifications,
      unread: notifications.filter((note) => !note.read).length,
      settings,
      searchesLeft,
      blocked,
      search,
      connectionWith: (username) => {
        const request = requests.find(
          (r) => r.person.username === username && r.status !== 'declined',
        );
        if (!request) return { state: 'none' };
        const state = request.status === 'accepted' ? 'connected' : 'pending';
        return { state, requestId: request.id };
      },
      sendRequest: async (driver, message) => {
        const request = await service.sendRequest(driver, message);
        setRequests((list) => [request, ...list]);
      },
      cancelRequest: async (requestId) => {
        await service.cancelRequest(requestId);
        setRequests((list) => list.filter((r) => r.id !== requestId));
      },
      respond: async (requestId, accept) => {
        await service.respond(requestId, accept);
        const status = accept ? 'accepted' : 'declined';
        setRequests((list) => list.map((r) => (r.id === requestId ? { ...r, status } : r)));
      },
      saveVehicle: async (vehicle) => {
        const saved = await service.saveVehicle(vehicle);
        setVehicles((list) =>
          list.some((v) => v.id === saved.id)
            ? list.map((v) => (v.id === saved.id ? saved : v))
            : [...list, saved],
        );
      },
      removeVehicle: async (vehicleId) => {
        await service.removeVehicle(vehicleId);
        setVehicles((list) => list.filter((v) => v.id !== vehicleId));
      },
      verifyVehicle: async (vehicleId, photo) => {
        const verification = await service.submitVerification(vehicleId, photo);
        setVehicles((list) => list.map((v) => (v.id === vehicleId ? { ...v, verification } : v)));
      },
      updateSettings: (change) => setSettings((current) => ({ ...current, ...change })),
      block: async (username) => {
        await service.block(username);
        setBlocked((list) => [...list, username]);
        setRequests((list) => list.filter((r) => r.person.username !== username));
      },
      report: (username) => service.report(username),
      markAllRead,
    };
  }, [vehicles, requests, notifications, settings, searchesLeft, blocked, search, markAllRead]);

  return <FindMeContext.Provider value={value}>{children}</FindMeContext.Provider>;
}

export function useFindMe(): FindMeValue {
  const value = useContext(FindMeContext);
  if (!value) throw new Error('useFindMe must be used inside FindMeProvider');
  return value;
}
