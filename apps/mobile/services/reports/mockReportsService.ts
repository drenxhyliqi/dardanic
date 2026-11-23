import type { ReportsService } from './ReportsService';
import type { Report } from './types';

const NETWORK_MS = 600;
const sent: Report[] = []; // kept in memory only, until the backend exists

// A pretend reports backend: waits a moment and remembers the report.
export const mockReportsService: ReportsService = {
  async send(report) {
    await new Promise((resolve) => setTimeout(resolve, NETWORK_MS));
    sent.push(report);
  },
};
