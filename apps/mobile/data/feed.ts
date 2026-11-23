// Sample feed content for the UI (made up). Photos are free Unsplash images loaded from
// the internet, for development only; real posts replace them once the backend exists.
import {
  ardit, besnik, blerim, drita, era, fatos, granit, IMG, jeta, leon, photo,
} from './feedAuthors';
import { coffeeMeet, cruiseMeet, nightMeet } from './meets';

export type FeedAuthor = {
  name: string;
  username: string;
  photo: string | null;
  followed?: boolean; // the viewer follows them (shows under Following)
  crew?: string; // a crew they post for (shows under Crews)
  business?: boolean; // a trusted automotive business (✓ Business tag)
  private?: boolean; // private account: posts only for approved followers
  followsYou?: boolean; // they follow you (you follow each other if `followed` too)
  approvesFollow?: boolean; // mock: accepts your follow request after a moment
};

type PostBase = {
  id: string;
  author: FeedAuthor;
  minutesAgo: number;
};

export type PhotoPost = PostBase & {
  kind: 'photo';
  car: string;
  city: string;
  photos: string[];
  caption: string;
  flames: number;
  shares: number;
};

// A status with no photos, like a tweet.
export type TextPost = PostBase & {
  kind: 'text';
  car?: string;
  city: string;
  text: string;
  flames: number;
  shares: number;
};

export type MeetPost = PostBase & {
  kind: 'meet';
  title: string;
  startsAt: number; // when it starts (ms timestamp)
  durationMinutes: number;
  place: string;
  km: number; // how far from you
  going: number;
  capacity?: number; // spots, when the host set a limit
  entry?: string; // price, e.g. "5 €"; none = free
  expectedCars?: number;
  tags: string[]; // e.g. "BMW only", "18+"
  attendees: FeedAuthor[]; // faces shown in the card (people you know first)
  photo: string;
  description: string; // "About" on the meet page
  schedule: { time: string; title: string }[];
  rules: string[];
};

export type FeedPost = PhotoPost | TextPost | MeetPost;

export const SAMPLE_FEED: FeedPost[] = [
  {
    id: 'p1', kind: 'photo', author: leon, minutesAgo: 12,
    car: 'Audi RS6 Avant', city: 'Prishtina', photos: [photo(IMG.rs6)],
    caption: 'Zi mbi zi. Ceramic i ri para dimrit, kurrë s’ka dukur kaq e thellë.',
    flames: 1284, shares: 96,
  },
  {
    id: 't1', kind: 'text', author: drita, minutesAgo: 40, city: 'Munich',
    text: 'Kush tjetër po vjen në Kosovë këtë verë? Po mendoj një kolonë të diasporës nga Mynihu, përmes Austrisë dhe Kroacisë. Shkruani nëse jeni brenda.',
    flames: 214, shares: 41,
  },
  {
    id: 'p2', kind: 'photo', author: blerim, minutesAgo: 95,
    car: 'Mercedes-AMG C63 S', city: 'Prizren', photos: [photo(IMG.c63)],
    caption: 'Stage 2 përfundoi. Downpipe, intercooler dhe softuer i ri. Të hënat në mëngjes tani janë më me zë.',
    flames: 862, shares: 30,
  },
  nightMeet,
  {
    id: 'p4', kind: 'photo', author: granit, minutesAgo: 300,
    car: 'BMW M4', city: 'Peja', photos: [photo(IMG.m4), photo(IMG.m4Orange), photo(IMG.m3)],
    caption: 'Tre M, një rrugë malore. Rugova të dielën s’mërzit kurrë. Rrëshqit për kolonën.',
    flames: 2310, shares: 210,
  },
  {
    id: 't2', kind: 'text', author: besnik, minutesAgo: 350, car: 'BMW E30', city: 'Prishtina',
    text: 'Po kërkoj një servis të mirë për gjeometri në Prishtinë. E30 po tërheq djathtas qysh i vura amortizerët e rinj. Rekomandime?',
    flames: 38, shares: 3,
  },
  {
    id: 'p5', kind: 'photo', author: ardit, minutesAgo: 420,
    car: 'BMW M5 Competition', city: 'Ferizaj', photos: [photo(IMG.m5)],
    caption: 'Felnet bronz u montuan. Javën tjetër e ul 30 mm, edhe pastaj më në fund është gati (s’është kurrë gati).',
    flames: 1530, shares: 58,
  },
  cruiseMeet,
  {
    id: 'p6', kind: 'photo', author: jeta, minutesAgo: 1500,
    car: 'Mercedes-AMG GT', city: 'Zürich', photos: [photo(IMG.amgGt)],
    caption: 'Mezi po pres verën në Kosovë. Kush po zbret në korrik?',
    flames: 3075, shares: 340,
  },
  {
    id: 't3', kind: 'text', author: fatos, minutesAgo: 1700, city: 'Gjilan',
    text: 'Mendim jopopullor: një veturë stock e pastër e mund çdo herë një të modifikuar keq.',
    flames: 1102, shares: 120,
  },
  coffeeMeet,
  {
    id: 'p8', kind: 'photo', author: era, minutesAgo: 2900,
    car: 'Nissan GT-R', city: 'Gjakova', photos: [photo(IMG.gtr)],
    caption: 'Ora e artë, rrugë e zbrazët, R35. S’ka çka me shtu.',
    flames: 941, shares: 25,
  },
];
