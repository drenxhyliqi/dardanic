// Sample profile content for the UI (made up). Replaced by real data once the backend exists.
// Name, username, city, bio, photo and banner come from sign-up when available.

export type GarageCar = {
  id: string;
  model: string;
  year: number;
  role: 'daily' | 'project' | 'weekend';
  hp: number;
  mods: number;
  sprint: string;
  main?: boolean;
};

export const SAMPLE_PROFILE = {
  displayName: 'Arben Krasniqi',
  username: 'arben.k',
  city: 'Prishtina',
  bio: 'Daily driver · Project in progress · E46 forever',
  crew: 'E46 Kosova',
  followers: '2.4k',
  following: '312',
  hasStory: true,
};

export const SAMPLE_STATS = { posts: '0', builds: '3', crews: '1' };

export const SAMPLE_GARAGE: GarageCar[] = [
  { id: 'e46', model: 'BMW E46 330Ci', year: 2004, role: 'daily', hp: 265, mods: 12, sprint: '6.2s', main: true },
  { id: 'e30', model: 'BMW E30 325i', year: 1989, role: 'project', hp: 170, mods: 7, sprint: '8.6s' },
  { id: 'gti', model: 'VW Golf 7 GTI', year: 2016, role: 'weekend', hp: 245, mods: 4, sprint: '6.0s' },
];

