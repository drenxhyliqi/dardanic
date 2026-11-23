// The sample account's garage (made up): every car with its specs, the work done
// (where, when, what it cost) and a build log. Shops with a username are businesses in
// the app (tap to open their profile). Unsplash photos, development only.
import { IMG, photo } from './feedAuthors';

export type ModCategory = 'engine' | 'exhaust' | 'suspension' | 'wheels' | 'brakes' | 'exterior';

export type Mod = {
  name: string;
  category: ModCategory;
  shop: string; // where it was done ("DIY" for your own work)
  shopUsername?: string; // a business on DARDANIC
  date: string;
  cost?: number; // €
  note?: string;
};

export type BuildLogEntry = { date: string; title: string; text: string };

export type GarageCar = {
  id: string;
  model: string;
  year: number;
  role: 'daily' | 'project' | 'weekend';
  photo: string;
  main?: boolean;
  progress?: number; // project cars: how far along (0–1)
  // Numbers
  hp: number;
  stockHp: number;
  torque: number; // Nm
  sprint: string; // 0–100 km/h
  topSpeed: number; // km/h
  weight: number; // kg
  // Specs
  engine: string;
  drive: string; // RWD / AWD / FWD
  gearbox: string;
  fuel: string;
  // The work
  mods: Mod[];
  log: BuildLogEntry[];
};

const TUNE = { shop: 'Tune Garage', shopUsername: 'tunegarage.ks' };
const DETAIL = { shop: 'Detail Pro', shopUsername: 'detailpro.ks' };
const WHEELS = { shop: 'Wheel House', shopUsername: 'wheelhouse.ks' };
const ALIGN = { shop: 'Align Pro', shopUsername: 'alignpro.ks' };
const DIY = { shop: 'DIY' };

export const SAMPLE_GARAGE: GarageCar[] = [
  {
    id: 'e46', model: 'BMW E46 330Ci', year: 2004, role: 'daily', photo: photo(IMG.series4), main: true,
    hp: 265, stockHp: 231, torque: 300, sprint: '6.2s', topSpeed: 250, weight: 1430,
    engine: '3.0 L inline-6 (M54B30)', drive: 'RWD', gearbox: '6-speed manual (ZF)', fuel: 'Petrol',
    mods: [
      { name: 'Remap Stage 1', category: 'engine', ...TUNE, date: 'Feb 2025', cost: 350, note: '+34 kf në dyno, gaz më i butë.' },
      { name: 'Filtër ajri sportiv', category: 'engine', ...DIY, date: 'Jan 2025', cost: 180 },
      { name: 'Shkarkim Supersprint', category: 'exhaust', ...TUNE, date: 'Dec 2024', cost: 1450, note: 'Cat-back, zë i thellë në ralanti, i qetë në autostradë.' },
      { name: 'Amortizerë KW V3', category: 'suspension', ...ALIGN, date: 'Oct 2024', cost: 1900, note: 'E ulur 35 mm, gjeometri për rrugë dhe pistë.' },
      { name: 'BBS CH-R 18"', category: 'wheels', ...WHEELS, date: 'Sep 2024', cost: 2200, note: 'Michelin Pilot Sport 4, 225/40 dhe 255/35.' },
      { name: 'Frena Brembo para', category: 'brakes', ...TUNE, date: 'Mar 2025', cost: 1300 },
      { name: 'Parakolp M3 + ceramic', category: 'exterior', ...DETAIL, date: 'Apr 2025', cost: 900 },
    ],
    log: [
      { date: 'Apr 2025', title: 'Pamja gati', text: 'U montua parakolpi M3, dy shtresa ceramic te Detail Pro.' },
      { date: 'Feb 2025', title: 'Ditë në dyno', text: '265 kf pas remap-it dhe filtrit. Harxhim i njëjtë si origjinal.' },
      { date: 'Oct 2024', title: 'Stance i rregulluar', text: 'Amortizerët u vunë, më në fund rri si duhet mbi BBS.' },
      { date: 'Jun 2024', title: 'E bleva', text: '330Ci argjendi, 180.000 km, histori e plotë BMW nga Gjermania.' },
    ],
  },
  {
    id: 'm4', model: 'BMW M4 F82', year: 2015, role: 'project', photo: photo(IMG.m4), progress: 0.65,
    hp: 520, stockHp: 431, torque: 650, sprint: '3.9s', topSpeed: 290, weight: 1572,
    engine: '3.0 L twin-turbo inline-6 (S55)', drive: 'RWD', gearbox: '7-speed DCT', fuel: 'Petrol',
    mods: [
      { name: 'Softuer Stage 2', category: 'engine', ...TUNE, date: 'May 2025', cost: 900, note: 'Softuer i personalizuar për benzinë 98 oktan.' },
      { name: 'Downpipe pa katalizator', category: 'exhaust', ...TUNE, date: 'May 2025', cost: 1100 },
      { name: 'Charge pipe alumini', category: 'engine', ...DIY, date: 'Apr 2025', cost: 320, note: 'Ai origjinali prej plastike plas në presion më të lartë.' },
      { name: 'Difuzor karboni prapa', category: 'exterior', ...DIY, date: 'Jun 2025', cost: 650 },
    ],
    log: [
      { date: 'Jun 2025', title: 'Pjesë karboni', text: 'Difuzori u vu. Në radhë: amortizerë dhe felne të farkëtuara.' },
      { date: 'May 2025', title: 'Stage 2', text: '520 kf në rrota, në dynon e Tune Garage.' },
      { date: 'Mar 2025', title: 'Fillon projekti', text: 'E sjellë nga Gjermania, 70.000 km, do pak dashuri.' },
    ],
  },
  {
    id: 'rs6', model: 'Audi RS6 Avant', year: 2016, role: 'weekend', photo: photo(IMG.rs6),
    hp: 605, stockHp: 560, torque: 750, sprint: '3.7s', topSpeed: 305, weight: 1935,
    engine: '4.0 L twin-turbo V8', drive: 'AWD (quattro)', gearbox: '8-speed automatic', fuel: 'Petrol',
    mods: [
      { name: 'Shkarkim Akrapovič', category: 'exhaust', ...TUNE, date: 'Jul 2025', cost: 4200 },
      { name: 'Modul për suspensionin me ajër', category: 'suspension', ...DIY, date: 'Jun 2025', cost: 450, note: 'E ul 20 mm në shpejtësi, lidhet pa prerë asgjë.' },
      { name: 'Ceramic', category: 'exterior', ...DETAIL, date: 'Nov 2025', cost: 1200 },
    ],
    log: [
      { date: 'Nov 2025', title: 'Gati për dimër', text: 'Ceramic para sezonit të kripës.' },
      { date: 'Jul 2025', title: 'Zëri', text: 'U montua Akrapovič. Më në fund V8-shi tingëllon si duhet.' },
    ],
  },
];

export const findCar = (id: string) => SAMPLE_GARAGE.find((car) => car.id === id);
