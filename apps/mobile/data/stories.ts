// Sample stories for the feed's stories row and the story viewer (made up).
// Photos are free Unsplash images (development only).
import type { FeedAuthor } from './feed';
import { ardit, blerim, e46Crew, era, granit, IMG, jeta, leon, storyPhoto } from './feedAuthors';

// A sticker on a story: a tagged person (@username, opens their profile) or a place.
// x / y = its top-left corner as a share of the screen (0–1), so it lands in the same
// spot on any phone.
export type StorySticker = {
  id: string;
  kind: 'mention' | 'location';
  text: string; // the username or the place
  x: number;
  y: number;
};

// How the photo / video sits on the story after editing: moved (share of the screen),
// scaled and rotated (radians), with a solid background behind it.
export type StoryCanvas = {
  background: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

export type StoryItem = {
  id: string;
  canvas?: StoryCanvas; // missing = fills the screen as it is
  stickers?: StorySticker[];
  photo: string; // the photo (for a video: its address too, used as a fallback)
  video?: string; // a video story: plays instead of the photo
  durationMs?: number; // how long a video story plays
  minutesAgo: number;
  caption?: string; // short text shown on the photo
};

export type StoryUser = {
  id: string;
  label: string; // shown under the circle and in the viewer (username or crew name)
  name: string; // real name, for initials when there's no photo
  avatar: string | null;
  items: StoryItem[]; // oldest first, played in this order
};

const user = (id: string, author: FeedAuthor, label: string, items: StoryItem[]): StoryUser => ({
  id,
  label,
  name: author.name,
  avatar: author.photo,
  items,
});

export const SAMPLE_STORIES: StoryUser[] = [
  user('s1', leon, leon.username, [
    { id: 's1a', photo: storyPhoto(IMG.rs6), minutesAgo: 180, caption: 'Ceramic i ri 😎' },
    { id: 's1b', photo: storyPhoto(IMG.huracan), minutesAgo: 95 },
    { id: 's1c', photo: storyPhoto(IMG.aventador), minutesAgo: 30, caption: 'E pamë në Prishtinë 👀' },
  ]),
  user('s2', e46Crew, e46Crew.name, [
    { id: 's2a', photo: storyPhoto(IMG.garage), minutesAgo: 240, caption: 'Takim nate · Sonte 21:00' },
    { id: 's2b', photo: storyPhoto(IMG.series4), minutesAgo: 120, caption: 'Parkingu i Gërmisë. Mos mungoni.' },
  ]),
  user('s3', granit, granit.username, [
    { id: 's3a', photo: storyPhoto(IMG.m4), minutesAgo: 400 },
    { id: 's3b', photo: storyPhoto(IMG.m4Orange), minutesAgo: 380, caption: 'Kolona në Rugovë' },
    { id: 's3c', photo: storyPhoto(IMG.m3), minutesAgo: 360 },
    { id: 's3d', photo: storyPhoto(IMG.mustang), minutesAgo: 300, caption: 'Erdhi edhe një Mustang' },
  ]),
  user('s4', jeta, jeta.username, [
    { id: 's4a', photo: storyPhoto(IMG.amgGt), minutesAgo: 600, caption: 'Zürich → Prishtinë për 6 javë' },
  ]),
  user('s5', blerim, blerim.username, [
    { id: 's5a', photo: storyPhoto(IMG.c63), minutesAgo: 700, caption: 'Ditë në dyno' },
    { id: 's5b', photo: storyPhoto(IMG.speciale), minutesAgo: 650 },
  ]),
  user('s6', era, era.username, [
    { id: 's6a', photo: storyPhoto(IMG.gtr), minutesAgo: 900 },
    { id: 's6b', photo: storyPhoto(IMG.mclaren), minutesAgo: 850, caption: 'Projekti i radhës? 😅' },
  ]),
  user('s7', ardit, ardit.username, [
    { id: 's7a', photo: storyPhoto(IMG.m5), minutesAgo: 1000, caption: 'U vendos: bronz' },
    { id: 's7b', photo: storyPhoto(IMG.camaro), minutesAgo: 980 },
  ]),
];

// Already watched when the app starts (so the row shows both kinds of ring).
export const INITIALLY_SEEN = ['s5', 's6', 's7'];
