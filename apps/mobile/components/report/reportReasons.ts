import type { ReportKind, ReportReason } from '../../services/reports';

const COMMON: ReportReason[] = ['spam', 'nudity', 'harassment', 'hate', 'violence', 'scam'];

// The reasons offered for each kind of thing, most likely first; "Something else" last.
export const REASONS_BY_KIND: Record<ReportKind, ReportReason[]> = {
  post: [...COMMON, 'falseInfo', 'somethingElse'],
  comment: ['spam', 'harassment', 'hate', 'nudity', 'violence', 'somethingElse'],
  story: [...COMMON, 'somethingElse'],
  message: ['spam', 'harassment', 'scam', 'nudity', 'hate', 'somethingElse'],
  listing: ['notCar', 'scam', 'prohibited', 'wrongInfo', 'spam', 'somethingElse'],
  profile: ['impersonation', 'underage', 'spam', 'scam', 'harassment', 'nudity', 'somethingElse'],
  meet: ['unsafeMeet', 'scam', 'spam', 'falseInfo', 'somethingElse'],
};

export const isReportKind = (value: string): value is ReportKind => value in REASONS_BY_KIND;
