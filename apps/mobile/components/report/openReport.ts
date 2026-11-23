import { router } from 'expo-router';

import type { ReportKind } from '../../services/reports';

// Opens the Report sheet for something. `username` = whose it is (offers "Also block").
export function openReport(kind: ReportKind, id: string, username?: string) {
  router.push({ pathname: '/report', params: { kind, id, ...(username ? { username } : {}) } });
}
