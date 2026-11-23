// "Your" sample posts and story (the sample account, arben.k), so notifications about
// your content have something to show. Unsplash photos, development only.
import type { FeedAuthor, PhotoPost, TextPost } from './feed';
import { IMG, photo, storyPhoto } from './feedAuthors';
import { SAMPLE_PROFILE } from './profile';

export const ME: FeedAuthor = {
  name: SAMPLE_PROFILE.displayName,
  username: SAMPLE_PROFILE.username,
  photo: null,
};

export const MY_POSTS: PhotoPost[] = [
  {
    id: 'my1', kind: 'photo', author: ME, minutesAgo: 600, car: 'BMW E46 330Ci', city: 'Prishtina',
    photos: [photo(IMG.series4)], caption: 'Amortizerë të rinj, më në fund rri si duhet. E46 përgjithmonë.',
    flames: 214, shares: 9,
  },
  {
    id: 'my2', kind: 'photo', author: ME, minutesAgo: 3000, car: 'BMW E46 330Ci', city: 'Germia',
    photos: [photo(IMG.m4)], caption: 'Takim nate në Gërmi. Kush tjetër ishte?',
    flames: 389, shares: 21,
  },
];

// Your text posts (statuses), newest first.
export const MY_TEXT_POSTS: TextPost[] = [
  {
    id: 'myt1', kind: 'text', author: ME, minutesAgo: 90, city: 'Prishtina', car: 'BMW E46 330Ci',
    text: 'A di kush ndonjë servis në Prishtinë që e rregullon mirë VANOS-in e M54? Po pyes për nervat e mia.',
    flames: 46, shares: 3,
  },
  {
    id: 'myt2', kind: 'text', author: ME, minutesAgo: 1300, city: 'Prishtina',
    text: 'Takimi i natës në Gërmi ishte më i miri këtë vit. Respekt për të gjithë që erdhën dhe e mbajtën pastër 🙏',
    flames: 128, shares: 11,
  },
  {
    id: 'myt3', kind: 'text', author: ME, minutesAgo: 6000, city: 'Prishtina',
    text: 'Mendim jopopullor: marshi manual e bën çdo veturë më argëtuese, edhe një të ngadaltë.',
    flames: 302, shares: 24,
  },
];

export const MY_STORY_PHOTO = storyPhoto(IMG.series4);
