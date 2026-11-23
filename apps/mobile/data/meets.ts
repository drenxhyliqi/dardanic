// Sample meets for the feed (made up). Start times are worked out when the app opens,
// so there's always one happening now, one at the next 21:00 and one later this week.
import type { MeetPost } from './feed';
import {
  ardit, besnik, blerim, cruiseCrew, drita, e46Crew, era, euroClub, fatos, granit, IMG, jeta,
  leon, lira, photo, vesa,
} from './feedAuthors';

const OPENED = new Date();
const HALF_HOUR = 30 * 60_000;

// The next time the clock shows hour:minute (today if still ahead, else tomorrow).
const nextAt = (hour: number, minute = 0) => {
  const at = new Date(OPENED);
  at.setHours(hour, minute, 0, 0);
  if (at <= OPENED) at.setDate(at.getDate() + 1);
  return at.getTime();
};
// hour:minute, `days` days from today.
const inDays = (days: number, hour: number, minute = 0) => {
  const at = new Date(OPENED);
  at.setDate(at.getDate() + days);
  at.setHours(hour, minute, 0, 0);
  return at.getTime();
};
// Started on the last half hour before the app opened, so it's live right now.
const startedRecently = () => Math.floor(OPENED.getTime() / HALF_HOUR) * HALF_HOUR - HALF_HOUR;

export const nightMeet: MeetPost = {
  id: 'p3', kind: 'meet', author: e46Crew, minutesAgo: 180,
  title: 'Takim nate', startsAt: nextAt(21), durationMinutes: 150,
  place: 'Parkingu i Gërmisë, Prishtinë', km: 2.1,
  going: 84, capacity: 120, expectedCars: 60,
  tags: ['Vetëm BMW', 'Takim nate', '18+'],
  attendees: [leon, granit, jeta, ardit, blerim],
  photo: photo(IMG.garage),
  description:
    'Nata jonë mujore e BMW-ve në Gërmi. Sillni E-serinë, M-të ose veturën e përditshme, të gjithë janë të mirëseardhur. Vendet për foto janë të shënuara, ka edhe kamion kafeje.',
  schedule: [
    { time: '21:00', title: 'Ardhja dhe parkimi sipas serisë' },
    { time: '21:45', title: 'Xhiro për foto me fotografin tonë' },
    { time: '22:30', title: 'Votimi për projektin më të mirë' },
    { time: '23:00', title: 'Xhiro nate drejt qytetit' },
  ],
  rules: [
    'Pa burnout dhe pa gaz të kotë',
    'Lëreni vendin më të pastër se si e gjetët',
    'Respektoni fqinjët dhe policinë',
  ],
};

export const cruiseMeet: MeetPost = {
  id: 'p9', kind: 'meet', author: cruiseCrew, minutesAgo: 600,
  title: 'Xhiro e së dielës', startsAt: startedRecently(), durationMinutes: 180,
  place: 'Gryka e Rugovës, Pejë', km: 78,
  going: 37, expectedCars: 30,
  tags: ['Xhiro', 'Të gjitha markat', 'Rrugë malore'],
  attendees: [granit, era, besnik, vesa],
  photo: photo(IMG.m4Orange),
  description:
    'Xhiro e qetë të dielën nëpër Grykën e Rugovës. Rrugë malore, ndalesë te pika e shikimit dhe drekë në Pejë. Të gjitha markat janë të mirëseardhura.',
  schedule: [
    { time: 'Nisja', title: 'Takimi te rrethrrotullimi i Pejës' },
    { time: '+30 min', title: 'Ndalesë te pika e shikimit në Rugovë' },
    { time: '+2 orë', title: 'Drekë në Pejë' },
  ],
  rules: [
    'Qëndroni në korsinë tuaj, pa parakalime në tunele',
    'Ndizni sinjalet e rrezikut kur ndalet grupi',
    'Mbushni rezervuarin para nisjes',
  ],
};

export const coffeeMeet: MeetPost = {
  id: 'p7', kind: 'meet', author: euroClub, minutesAgo: 2000,
  title: 'Kafe & vetura', startsAt: inDays(4, 10), durationMinutes: 120,
  place: 'Shadërvan, Prizren', km: 6.4,
  going: 52, entry: '5 €', expectedCars: 40,
  tags: ['Kafe & vetura', 'Të gjitha markat', 'Për familje'],
  attendees: [drita, lira, fatos, leon],
  photo: photo(IMG.panamera),
  description:
    'Kafe, vetura dhe njerëz të mirë në qytetin e vjetër. Parkoni rreth Shadërvanit, merrni një makiato dhe bisedoni për projektet. Për gjithë familjen.',
  schedule: [
    { time: '10:00', title: 'Kafe dhe parkim' },
    { time: '11:00', title: 'Shëtitje mes veturave dhe foto' },
    { time: '12:00', title: 'Foto grupi pranë lumit' },
  ],
  rules: [
    'Vetëm me shpejtësi ecjeje në qytetin e vjetër',
    'Fëmijët dhe qentë janë të mirëseardhur',
    'Hyrja shkon për klubin lokal të të rinjve',
  ],
};
