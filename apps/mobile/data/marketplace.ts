// Sample Marketplace listings (made up), written the way sellers here write them: in
// Albanian, the important bits in the title, every detail in the description. Photos
// are Unsplash car photos used as placeholders (development only), also for parts.
import type { Listing } from '../services/marketplace/types';
import {
  ardit, besnik, blendi, driton, era, granit, IMG, kushtrim, leon, photo, tuneGarage, vesa,
  wheelHouse,
} from './feedAuthors';

const l = (listing: Omit<Listing, 'status'>): Listing => ({ status: 'live', ...listing });

export const SAMPLE_LISTINGS: Listing[] = [
  l({
    id: 'l1', title: 'BMW E46 330CI COUPE VITI 2003, MANUAL', category: 'cars', price: 8900,
    condition: 'used', photos: [photo(IMG.series4), photo(IMG.m4)], city: 'Prishtina',
    minutesAgo: 35, seller: granit, saves: 41,
    description:
      'Vetura në gjendje shumë të mirë, servis i rregullt me libër servisi. 210.000 km, benzinë, manual me 6 marsha. Friksioni i ri te 195.000 km. Pa ndryshk, e mbajtur në garazh. Ndërrim nuk më intereson.',
  }),
  l({
    id: 'l2', title: 'FELNE BBS CH-R 18" 5x120', category: 'wheels', price: 1450,
    condition: 'used', photos: [photo(IMG.m3)], city: 'Peja', minutesAgo: 90,
    seller: wheelHouse, saves: 27, fits: [{ brand: 'BMW', model: 'E46' }, { brand: 'BMW', model: 'E90' }],
    description:
      'Kompleti 4 copë, të restauruara në të zezë mat. 18 x 8.5", ET35. Pa plasaritje, të drejta në balancim. Për BMW E46 dhe E90.',
  }),
  l({
    id: 'l3', title: 'AMORTIZERË KW V3 PËR BMW E46', category: 'parts', price: 950,
    condition: 'used', photos: [photo(IMG.m4)], city: 'Ferizaj', minutesAgo: 200,
    seller: blendi, saves: 18, fits: [{ brand: 'BMW', model: 'E46', years: '1998–2006' }],
    description:
      'Dy sezona në rrugë, asnjë rrjedhje. Vijnë me çelësat për rregullim të lartësisë. Numri i pjesës: 35220022.',
  }),
  l({
    id: 'l4', title: 'FRENA BREMBO GT PARA, 6 PISTONA, TË REJA', category: 'parts', price: 1800,
    condition: 'new', photos: [photo(IMG.m5)], city: 'Prizren', minutesAgo: 400,
    seller: tuneGarage, saves: 33,
    fits: [{ brand: 'BMW', model: 'E90' }, { brand: 'BMW', model: 'F82', years: 'M4' }],
    description:
      'Kaliperë me 6 pistona, disqe 380 mm, gypat të përfshirë. Të reja në kuti. Montimi mundet edhe te servisi ynë.',
  }),
  l({
    id: 'l5', title: 'AUDI RS6 AVANT C7 VITI 2016, ME DOGAN', category: 'cars', price: 48500,
    condition: 'used', photos: [photo(IMG.rs6)], city: 'Prishtina', minutesAgo: 600,
    seller: leon, saves: 96,
    description:
      'E doganuar, e regjistruar deri në 2026. 89.000 km, benzinë, automatik. Ceramic i ri, shkarkim Akrapovič, servisuar në Audi. E shes se po filloj një projekt të ri.',
  }),
  l({
    id: 'l6', title: 'KAPAKË PASQYRASH KARBON M PERFORMANCE, M4 F82', category: 'accessories',
    price: 260, condition: 'likeNew', photos: [photo(IMG.m4Orange)], city: 'Ferizaj',
    minutesAgo: 900, seller: ardit, saves: 12, fits: [{ brand: 'BMW', model: 'F82', years: 'M4' }],
    description: 'Origjinale BMW, të montuara vetëm një muaj. Vijnë me kapëset.',
  }),
  l({
    id: 'l7', title: 'KAMERË PËR VETURË 4K, PARA + PRAPA', category: 'electronics', price: 120,
    condition: 'new', photos: [photo(IMG.amgGt)], city: 'Gjilan', minutesAgo: 1200,
    seller: driton, saves: 8,
    description:
      'Kutia e pahapur, vjen me kartelë 128 GB. Ka mënyrë parkimi, me kabllo për lidhje direkte.',
  }),
  l({
    id: 'l8', title: 'ÇELËS DINAMOMETRIK + 2 KAVALETA + KRIK', category: 'tools', price: 140,
    condition: 'used', photos: [photo(IMG.garage)], city: 'Prishtina', minutesAgo: 1500,
    seller: besnik, saves: 5,
    description:
      'Çelës dinamometrik 40–200 Nm, dy kavaleta 3 tonëshe dhe krik i ulët. Të përdorura pak, krejt funksionale.',
  }),
  l({
    id: 'l10', title: 'NISSAN GT-R R35 VITI 2012, 600 KF', category: 'cars', price: 62000,
    condition: 'used', photos: [photo(IMG.gtr)], city: 'Gjakova', minutesAgo: 2600,
    seller: era, saves: 120,
    description:
      'Stage 1, 600 kuaj fuqi. 74.000 km, benzinë, DCT. Servis i ri dhe goma të reja. Vetëm blerës seriozë, ju lutem.',
  }),
  l({
    id: 'l11', title: 'GOMA DIMRI MICHELIN 225/45 R17', category: 'wheels', price: 280,
    condition: 'used', photos: [photo(IMG.camaro)], city: 'Prishtina', minutesAgo: 3200,
    seller: vesa, saves: 9,
    description: 'Kompleti 4 copë, 6 mm profil i mbetur, të përdorura vetëm një dimër.',
  }),
  l({
    id: 'l12', title: 'SHKARKIM AKRAPOVIČ TITAN PËR AUDI RS6 C7', category: 'parts',
    price: 3900, condition: 'used', photos: [photo(IMG.aventador)], city: 'Prishtina',
    minutesAgo: 4000, seller: kushtrim, saves: 31,
    fits: [{ brand: 'Audi', model: 'RS6', years: 'C7 2013–2018' }],
    description: 'Titan, me valvula. 15.000 km, pa asnjë gropë a gërvishtje.',
  }),
];

// Sellers as the listing page shows them: how they're doing (rating, items sold, since
// when) and the city they gave in their profile. No sales yet = "New seller".
export type SellerInfo = { rating: number; sold: number; since: string; city: string };

const newSeller = (city: string): SellerInfo => ({ rating: 0, sold: 0, since: '2025', city });

export const SELLERS: Record<string, SellerInfo> = {
  'wheelhouse.ks': { rating: 4.9, sold: 214, since: '2023', city: 'Peja' },
  'tunegarage.ks': { rating: 4.8, sold: 156, since: '2022', city: 'Prizren' },
  'granit.gt': { rating: 4.7, sold: 6, since: '2024', city: 'Peja' },
  'leon_builds': { rating: 5.0, sold: 3, since: '2024', city: 'Prishtina' },
  'blendi.s': newSeller('Ferizaj'),
  'ardit.stance': newSeller('Ferizaj'),
  'driton.m': newSeller('Gjilan'),
  'besnik.e30': newSeller('Prishtina'),
  'era.jdm': newSeller('Gjakova'),
  'vesa.r': newSeller('Prishtina'),
  'kushtrim.r': newSeller('Prishtina'),
};
export const NEW_SELLER = newSeller('');
