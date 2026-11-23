import type { Report } from './types';

// Sends reports to the moderation team. The real one stores them in Supabase, where
// moderators review them (stores expect action within 24 hours).
export interface ReportsService {
  send(report: Report): Promise<void>;
}
