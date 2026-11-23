// Sample Explore posts (made up): from people and businesses you don't follow, each
// tagged with vibes so the ranking can match them to your taste. Unsplash photos,
// development only.
import type { MeetPost, PhotoPost } from './feed';
import {
  alignPro, ardit, arta, besnik, blendi, blerim, detailPro, driton, era, IMG, kushtrim, lira,
  photo, tuneGarage, vesa, wheelHouse,
} from './feedAuthors';
import { coffeeMeet, cruiseMeet } from './meets';

export type ExplorePost = (PhotoPost | MeetPost) & { vibes: string[] };

const post = (
  id: string,
  rest: Omit<PhotoPost, 'id' | 'kind' | 'photos'> & { photos: string[] },
  vibes: string[],
): ExplorePost => ({ id, kind: 'photo', ...rest, vibes });

export const EXPLORE_POSTS: ExplorePost[] = [
  post('x1', { author: kushtrim, minutesAgo: 90, car: 'Lamborghini Huracán', city: 'Prishtina', photos: [photo(IMG.huracan)], caption: 'E verdha është karakter. Xhiro e së dielës nëpër Bregun e Diellit.', flames: 4820, shares: 610 }, ['lamborghini', 'supercars']),
  post('x2', { author: arta, minutesAgo: 200, car: 'McLaren 720S', city: 'Munich', photos: [photo(IMG.mclaren), photo(IMG.speciale)], caption: 'Ditë garazhi në diasporë. Cilën do ta merrje në Kosovë?', flames: 3910, shares: 402 }, ['mclaren', 'supercars', 'ferrari']),
  post('x3', { author: blendi, minutesAgo: 60, car: 'BMW M4', city: 'Ferizaj', photos: [photo(IMG.m4)], caption: 'E ula 40 mm me amortizerë. Takimi i Stance Kosova javën tjetër 👀', flames: 1260, shares: 140 }, ['bmw', 'bmwM4', 'stance', 'lowered']),
  post('x4', { author: driton, minutesAgo: 400, car: 'Ford Mustang GT', city: 'Gjilan', photos: [photo(IMG.mustang)], caption: 'V8 në vendin e dizelave. Videot e ndezjes në të ftohtë vijnë së shpejti.', flames: 980, shares: 96 }, ['ford', 'muscle']),
  post('x5', { author: detailPro, minutesAgo: 30, car: 'Audi RS6 Avant', city: 'Prishtina', photos: [photo(IMG.rs6)], caption: 'Dy shtresa ceramic, 48 orë punë. Rezervoni tani mbrojtjen për dimër.', flames: 760, shares: 210 }, ['audi', 'wagons', 'detailing']),
  post('x6', { author: tuneGarage, minutesAgo: 700, car: 'BMW M3 Competition', city: 'Prizren', photos: [photo(IMG.m3)], caption: 'Stage 1 + downpipe: 610 kf në dynon tonë. Na shkruani për termin.', flames: 1890, shares: 330 }, ['bmw', 'bmwM3', 'tuner']),
  post('x7', { author: wheelHouse, minutesAgo: 1500, car: 'Ferrari 458 Speciale', city: 'Pejë', photos: [photo(IMG.speciale)], caption: 'Felne të farkëtuara të reja në stok: 19 deri 21 inç, çdo ngjyrë.', flames: 540, shares: 88 }, ['ferrari', 'wheels']),
  post('x8', { author: era, minutesAgo: 120, car: 'Nissan GT-R', city: 'Gjakova', photos: [photo(IMG.gtr)], caption: 'Godzilla në orën e artë.', flames: 2210, shares: 190 }, ['nissan', 'jdm']),
  post('x9', { author: lira, minutesAgo: 860, car: 'Porsche Panamera', city: 'Vienna', photos: [photo(IMG.panamera)], caption: 'Veturë e përditshme. Vjenë–Prishtinë pa u ndalur muajin tjetër.', flames: 1340, shares: 77 }, ['porsche', 'luxury']),
  post('x10', { author: ardit, minutesAgo: 300, car: 'BMW M5 F90', city: 'Ferizaj', photos: [photo(IMG.m5)], caption: 'Felne bronz dhe gjeometri e re. Gati për Rugovën.', flames: 1730, shares: 150 }, ['bmw', 'bmwM5', 'euro']),
  post('x11', { author: blerim, minutesAgo: 2600, car: 'Mercedes-AMG GT', city: 'Prizren', photos: [photo(IMG.amgGt)], caption: 'Foto nate pranë lumit. Takimi i AMG Kosova ishte fantastik.', flames: 2030, shares: 260 }, ['mercedes', 'luxury']),
  post('x12', { author: vesa, minutesAgo: 50, car: 'Chevrolet Camaro', city: 'Prishtina', photos: [photo(IMG.camaro)], caption: 'Blu mbi blu. Muscle car-i i parë në familje!', flames: 610, shares: 40 }, ['chevrolet', 'muscle']),
  post('x13', { author: kushtrim, minutesAgo: 3000, car: 'Bugatti Chiron', city: 'Zürich', photos: [photo(IMG.bugatti)], caption: 'E pashë në Zürich. 1500 kf, art i pastër.', flames: 6120, shares: 980 }, ['bugatti', 'hypercars']),
  post('x14', { author: besnik, minutesAgo: 180, car: 'BMW E46 330Ci', city: 'Prishtina', photos: [photo(IMG.series4)], caption: 'Pronarët e E46, ku jeni? Po bëj një listë për një takim në Gërmi.', flames: 430, shares: 60 }, ['bmw', 'e46', 'euro']),
  post('x15', { author: alignPro, minutesAgo: 1100, car: 'Ferrari LaFerrari', city: 'Prishtina', photos: [photo(IMG.laferrari)], caption: 'Gjeometri me laser për çdo veturë, edhe për këtë. Kontrolli 25 €.', flames: 880, shares: 120 }, ['ferrari', 'hypercars']),
  { ...coffeeMeet, vibes: ['meets', 'euro'] },
  { ...cruiseMeet, vibes: ['meets', 'bmw'] },
];
