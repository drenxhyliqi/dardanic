import type { ListingDraft, ListingStatus } from './types';
import { strings } from '../../i18n';

// A pretend "is this car-related?" check, using simple word lists. It stands in for the
// real AI check (photos + text) that will run on the server later.
// Whole words only. Albanian letters (ë, ç) count as letters, which plain \b doesn't do.
const LETTER = 'a-z0-9ëç';
const stem = (start: string) => `${start}[\\wëç]*`; // "vetur" matches veturë, veturat…
const words = (list: string[]) =>
  new RegExp(`(^|[^${LETTER}])(${list.join('|')})(?=$|[^${LETTER}])`, 'i');

const NOT_CAR = words([
  'shoes?', 'sneakers?', 'nike air', 'adidas', 'jordans?', 'iphone', 'samsung galaxy', 'phone',
  'laptop', 'sofa', 'couch', 'dress', 'shirts?', 't-shirt', 'jeans', 'handbag', 'perfume',
  'watch', 'ps5', 'playstation', 'xbox', 'bike', 'bicycle', 'furniture', 'hoodies?', 'caps?',
  'hats?', 'jackets?', 'merch', 'posters?',
  // Albanian
  'patika', stem('k[eë]puc'), stem('telefon'), stem('bluz'), stem('xhaket'), stem('kapel'),
  stem('fustan'), 'pantallona', stem('divan'), 'or[eë] dore', stem('çant'), stem('parfum'),
]);
const CAR = words([
  'car', 'bmw', 'audi', 'mercedes', 'amg', 'vw', 'volkswagen', 'golf', 'porsche', 'nissan',
  'toyota', 'honda', 'ford', 'wheels?', 'rims?', 'tyres?', 'tires?', 'brakes?', 'calipers?',
  'exhaust', 'engine', 'turbo', 'coilovers?', 'suspension', 'bumper', 'spoiler', 'diffuser',
  'headlights?', 'dashcam', 'clutch', 'gearbox', 'e46', 'e90', 'f82', 'm3', 'm4', 'rs6', 'gti',
  // Albanian
  stem('vetur'), stem('makin'), 'felne', stem('gom'), stem('fren'), stem('shkarkim'),
  stem('motor'), stem('amortizer'), stem('pjes'), stem('friksion'), stem('marsh'),
  stem('kamer'), stem('dogan'), 'krik', stem('kavalet'), 'drita', stem('parakolp'),
]);

export function checkListing(draft: ListingDraft): { status: ListingStatus; reason?: string } {
  const text = `${draft.title} ${draft.description}`;
  if (NOT_CAR.test(text)) return { status: 'rejected', reason: strings.marketplace.notCarReason };
  const strongCategory = draft.category === 'cars';
  if (strongCategory || CAR.test(text)) return { status: 'live' };
  return { status: 'review', reason: strings.marketplace.reviewReason };
}
