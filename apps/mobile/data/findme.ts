// Sample FindMe data (made up). DIRECTORY is the mock "server side": other people's
// registered plates. The rest is what your account starts with.
import type { CountryCode } from './plateCountries';
import { drita, era, fatos, granit, jeta, leon, lira, vesa } from './feedAuthors';
import type { FeedAuthor } from './feed';
import type { ConnectionRequest, FindMeNotification, Vehicle } from '../services/findme/types';

export type DirectoryEntry = {
  person: FeedAuthor;
  country: CountryCode;
  plate: string; // clean
  car: string;
  discoverable: boolean;
  verified: boolean;
  answer?: 'accept' | 'decline'; // how they'll answer your request (to demo both)
};

// Try these plates in the search:
//   RKS 01-111-AA  → leon_builds (found, will accept): the easy one to remember
//   RKS 05-902-EH  → era.jdm (found, will accept)
//   CH  ZH 48213   → jeta.track (found, won't accept)
//   D   M DR 4521  → drita.drives (found)
//   RKS 02-350-GT  → granit.gt has discovery off → "not found"
//   RKS 02-311-VR  → vesa.r hasn't verified yet → "not found"
export const DIRECTORY: DirectoryEntry[] = [
  { person: leon, country: 'RKS', plate: '01111AA', car: 'Black Audi RS6 Avant', discoverable: true, verified: true, answer: 'accept' },
  { person: era, country: 'RKS', plate: '05902EH', car: 'White Nissan GT-R', discoverable: true, verified: true, answer: 'accept' },
  { person: jeta, country: 'CH', plate: 'ZH48213', car: 'Black Mercedes-AMG GT', discoverable: true, verified: true, answer: 'decline' },
  { person: drita, country: 'D', plate: 'MDR4521', car: 'Blue VW Golf 7 R', discoverable: true, verified: true },
  { person: granit, country: 'RKS', plate: '02350GT', car: 'Grey BMW M4', discoverable: false, verified: true },
  { person: vesa, country: 'RKS', plate: '02311VR', car: 'Red MINI JCW', discoverable: true, verified: false },
];

export const SEARCHES_PER_DAY = 10;

export const MY_VEHICLES: Vehicle[] = [
  { id: 'v1', country: 'RKS', plate: '01245KA', make: 'BMW', model: 'E46 330Ci', color: 'silver', discoverable: true, verification: 'verified' },
];

const driver = (person: FeedAuthor, car: string, maskedPlate: string) => ({
  username: person.username, name: person.name, photo: person.photo, car, maskedPlate,
});

export const MY_REQUESTS: ConnectionRequest[] = [
  {
    id: 'in-fatos', direction: 'incoming', minutesAgo: 45, status: 'pending',
    person: driver(fatos, 'Blue Subaru WRX', '04-•••-FD'),
    message: 'Ta pashë E46-in në autostradë për Pejë, projekt shumë i pastër! Çfarë felne janë ato?',
  },
  {
    id: 'in-lira', direction: 'incoming', minutesAgo: 300, status: 'pending',
    person: driver(lira, 'White Porsche 911', 'W ••• LZ'),
    message: 'Ishim njëri pranë tjetrit te rrethrrotullimi në Ferizaj 😄 më duhej me të gjetë',
  },
];

export const MY_NOTIFICATIONS: FindMeNotification[] = [
  { id: 'n-fatos', kind: 'request', person: MY_REQUESTS[0].person, minutesAgo: 45, read: false },
  { id: 'n-lira', kind: 'request', person: MY_REQUESTS[1].person, minutesAgo: 300, read: true },
];
