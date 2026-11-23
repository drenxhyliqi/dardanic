// Sample notifications (made up) about the sample account's posts, story and profile.
// FindMe adds its own on top.
import type { AppNotification } from '../services/notifications/types';
import { arta, blendi, drita, driton, granit, jeta, kushtrim, leon, vesa } from './feedAuthors';
import { MY_STORY_PHOTO } from './myPosts';

export const SAMPLE_NOTIFICATIONS: AppNotification[] = [
  { id: 'a1', kind: 'flamePost', people: [leon, granit], others: 12, postId: 'my1', minutesAgo: 8, read: false },
  { id: 'a2', kind: 'follow', people: [kushtrim], minutesAgo: 25, read: false },
  { id: 'a3', kind: 'comment', people: [jeta], postId: 'my1', text: 'Ai stance është perfekt 🔥', minutesAgo: 40, read: false },
  { id: 'a4', kind: 'meetSoon', people: [], postId: 'p3', minutesAgo: 55, read: false },
  { id: 'a5', kind: 'flameStory', people: [arta, blendi], others: 3, storyPhoto: MY_STORY_PHOTO, minutesAgo: 120, read: true },
  { id: 'a6', kind: 'reply', people: [leon], postId: 'my2', text: '@arben.k po! M4 gri ishte e imja', minutesAgo: 300, read: true },
  { id: 'a7', kind: 'follow', people: [vesa, driton], others: 4, minutesAgo: 1600, read: true },
  { id: 'a8', kind: 'mention', people: [drita], postId: 't1', text: '@arben.k a po vjen në korrik?', minutesAgo: 2900, read: true },
  { id: 'a9', kind: 'flamePost', people: [jeta], others: 41, postId: 'my2', minutesAgo: 12000, read: true },
];
