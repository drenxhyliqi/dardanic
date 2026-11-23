import type { AppNotification } from './types';

// What notifications ask the backend for (later: a Supabase table + Realtime).
export interface NotificationsService {
  list(): Promise<AppNotification[]>;
  markAllRead(): Promise<void>;
  // New notifications as they happen.
  subscribe(listener: (notification: AppNotification) => void): () => void;
}
