import { KOSOVO_CITIES } from './kosovoCities';

// Places people can add to a story: well-known car spots first, every Kosovo city,
// then the diaspora cities where many of us live.
const SPOTS = [
  'Germia, Prishtina',
  'Rugova Gorge, Peja',
  'Shadërvan, Prizren',
  'Brezovica',
  'Bregu i Diellit, Prishtina',
];
const DIASPORA = ['Munich', 'Stuttgart', 'Zürich', 'Vienna', 'Berlin', 'Stockholm', 'London'];

export const STORY_LOCATIONS = [...SPOTS, ...KOSOVO_CITIES, ...DIASPORA];
