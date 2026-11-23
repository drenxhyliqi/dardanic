// Sample people who watched your story (made up), newest first; `flamed` = they gave
// it a flame. Until there's a backend, every story of yours shows these.
import type { FeedAuthor } from './feed';
import { ardit, era, granit, jeta, leon, vesa } from './feedAuthors';

export type StoryViewer = { person: FeedAuthor; flamed: boolean; minutesAgo: number };

export const SAMPLE_VIEWERS: StoryViewer[] = [
  { person: leon, flamed: true, minutesAgo: 1 },
  { person: jeta, flamed: true, minutesAgo: 2 },
  { person: granit, flamed: false, minutesAgo: 3 },
  { person: era, flamed: true, minutesAgo: 5 },
  { person: ardit, flamed: false, minutesAgo: 8 },
  { person: vesa, flamed: false, minutesAgo: 12 },
];
