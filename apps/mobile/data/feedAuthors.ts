// Sample people and crews for the feed (made up, no real people), plus the Unsplash
// photo links their posts use (development only).
import type { FeedAuthor } from './feed';

// Unsplash photo id → image link at the given width (cropped square when `square`).
const unsplash = (id: string, width: number, square = false) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop` +
  (square ? `&h=${width}` : '');
export const photo = (id: string) => unsplash(id, 1080);
// Tall 9:16 crop for full-screen stories.
export const storyPhoto = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1080&h=1920&q=80&auto=format&fit=crop`;
const avatar = (id: string) => unsplash(id, 160, true);

export const IMG = {
  rs6: '1606664515524-ed2f786a0bd6',
  c63: '1514316454349-750a7fd3da3a',
  amgGt: '1617814076367-b759c7d7e738',
  m4: '1580273916550-e323be2ae537',
  m4Orange: '1549399542-7e3f8b79c341',
  m3: '1617531653332-bd46c24f2068',
  m5: '1555215695-3004980ad54e',
  gtr: '1568605117036-5fe5e7bab0b7',
  series4: '1502877338535-766e1452684a',
  garage: '1492144534655-ae79c964c9d7',
  panamera: '1503376780353-7e6692767b70',
  mustang: '1494976388531-d1058494cdd8',
  camaro: '1552519507-da3b142c6e3d',
  mclaren: '1542362567-b07e54358753',
  huracan: '1511919884226-fd3cad34687c',
  speciale: '1503736334956-4c8f8e92946d',
  aventador: '1525609004556-c46c7d6cf023',
  bugatti: '1544636331-e26879cd4d9b',
  laferrari: '1583121274602-3e2820c69888',
};

export const leon: FeedAuthor = { name: 'Leon Berisha', username: 'leon_builds', photo: avatar(IMG.rs6), followed: true, followsYou: true };
export const blerim: FeedAuthor = { name: 'Blerim Shala', username: 'blerim.m', photo: avatar(IMG.c63), crew: 'AMG Kosova' };
export const granit: FeedAuthor = { name: 'Granit Thaçi', username: 'granit.gt', photo: null, followed: true };
export const ardit: FeedAuthor = { name: 'Ardit Gashi', username: 'ardit.stance', photo: avatar(IMG.m5) };
export const jeta: FeedAuthor = { name: 'Jeta Pllana', username: 'jeta.track', photo: avatar(IMG.amgGt), followed: true, followsYou: true, private: true };
export const era: FeedAuthor = { name: 'Era Hoxha', username: 'era.jdm', photo: null, crew: 'JDM Kosova' };
export const e46Crew: FeedAuthor = { name: 'E46 Kosova', username: 'e46kosova', photo: avatar(IMG.series4), crew: 'E46 Kosova', followed: true };
export const euroClub: FeedAuthor = { name: 'Kosova Euro Club', username: 'euroclub.ks', photo: avatar(IMG.m3), crew: 'Kosova Euro Club' };

export const drita: FeedAuthor = { name: 'Drita Morina', username: 'drita.drives', photo: null, followed: true };
export const besnik: FeedAuthor = { name: 'Besnik Limani', username: 'besnik.e30', photo: null, crew: 'E30 Kosova' };
export const fatos: FeedAuthor = { name: 'Fatos Dervishi', username: 'fatos.d', photo: null };
export const vesa: FeedAuthor = { name: 'Vesa Rexhepi', username: 'vesa.r', photo: null };
export const lira: FeedAuthor = { name: 'Liridona Zeqiri', username: 'lira.z', photo: null, private: true, approvesFollow: true };
// Trusted automotive businesses (they get a ✓ Business tag).
export const detailPro: FeedAuthor = { name: 'Detail Pro', username: 'detailpro.ks', photo: null, business: true };
export const alignPro: FeedAuthor = { name: 'Align Pro', username: 'alignpro.ks', photo: null, business: true };
export const tuneGarage: FeedAuthor = { name: 'Tune Garage', username: 'tunegarage.ks', photo: null, business: true };
export const cruiseCrew: FeedAuthor = { name: 'Dukagjini Cruise', username: 'dukagjini.cruise', photo: avatar(IMG.m4Orange), crew: 'Dukagjini Cruise' };
// People you don't follow yet (they show up in Explore and search).
export const kushtrim: FeedAuthor = { name: 'Kushtrim Rexha', username: 'kushtrim.r', photo: avatar(IMG.huracan), followsYou: true };
export const arta: FeedAuthor = { name: 'Arta Krasniqi', username: 'arta.k', photo: avatar(IMG.mclaren), private: true };
export const blendi: FeedAuthor = { name: 'Blendi Sylaj', username: 'blendi.s', photo: null, crew: 'Stance Kosova' };
export const driton: FeedAuthor = { name: 'Driton Morina', username: 'driton.m', photo: avatar(IMG.mustang) };
export const wheelHouse: FeedAuthor = { name: 'Wheel House', username: 'wheelhouse.ks', photo: avatar(IMG.speciale), business: true };

// Everyone above, for picking and searching people (e.g. a new message, search).
export const PEOPLE: FeedAuthor[] = [
  leon, granit, jeta, drita, era, blerim, ardit, besnik, fatos, vesa, lira,
  kushtrim, arta, blendi, driton,
  detailPro, alignPro, tuneGarage, wheelHouse,
];
