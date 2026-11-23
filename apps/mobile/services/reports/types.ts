// What can be reported, and a report as the backend will receive it.
export type ReportKind = 'post' | 'comment' | 'story' | 'listing' | 'message' | 'profile' | 'meet';

export type ReportReason =
  | 'spam' | 'nudity' | 'harassment' | 'hate' | 'violence' | 'scam' | 'falseInfo'
  | 'impersonation' | 'underage' | 'notCar' | 'prohibited' | 'wrongInfo' | 'unsafeMeet'
  | 'somethingElse';

export type Report = {
  kind: ReportKind;
  id: string; // the post / comment / story / listing / message / meet id, or a username
  username?: string; // whose content it is
  reason: ReportReason;
  details?: string;
};
