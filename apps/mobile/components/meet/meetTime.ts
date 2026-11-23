import { useEffect, useState } from 'react';

import type { MeetPost } from '../../data/feed';
import { strings } from '../../i18n';

const t = strings.feed.meet;
const MINUTE = 60_000;
const EVENING_HOUR = 17; // starts at or after this → "Tonight" instead of "Today"

const clock = (ms: number) =>
  new Date(ms).toLocaleTimeString(t.dateLocale, { hour: '2-digit', minute: '2-digit' });

const startOfDay = (ms: number) => new Date(ms).setHours(0, 0, 0, 0);

// The calendar tile on the photo: "SAT" / "23" / "NOV".
export function dateTile(ms: number) {
  const date = new Date(ms);
  return {
    weekday: date.toLocaleDateString(t.dateLocale, { weekday: 'short' }).toUpperCase(),
    day: String(date.getDate()),
    month: date.toLocaleDateString(t.dateLocale, { month: 'short' }).toUpperCase(),
  };
}

export type MeetTiming = {
  live: boolean;
  badge: string; // LIVE / Tonight / Tomorrow / In 4 days / Ended
  countdown: string | null; // "Starts in 2h 15m", "Happening now · until 20:40"
  range: string; // "21:00 – 23:30"
  start: string; // "21:00"
};

// Everything time-related a meet card shows, worked out for the moment `now`.
export function meetTiming(meet: MeetPost, now: number): MeetTiming {
  const start = meet.startsAt;
  const end = start + meet.durationMinutes * MINUTE;
  const range = t.timeRange(clock(start), clock(end));
  const startTime = clock(start);

  if (now >= end) return { live: false, badge: t.ended, countdown: null, range, start: startTime };
  if (now >= start) {
    return { live: true, badge: t.live, countdown: t.happeningUntil(clock(end)), range, start: startTime };
  }

  const days = Math.round((startOfDay(start) - startOfDay(now)) / (1440 * MINUTE));
  const badge =
    days === 0
      ? new Date(start).getHours() >= EVENING_HOUR
        ? t.tonight
        : t.today
      : days === 1
        ? t.tomorrow
        : t.inDays(days);
  const minutesLeft = Math.ceil((start - now) / MINUTE);
  const countdown =
    minutesLeft < 1440 ? t.startsIn(Math.floor(minutesLeft / 60), minutesLeft % 60) : null;
  return { live: false, badge, countdown, range, start: startTime };
}

// The current time, refreshed every minute, so countdowns and LIVE badges stay right.
export function useNow(): number {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), MINUTE);
    return () => clearInterval(timer);
  }, []);
  return now;
}
