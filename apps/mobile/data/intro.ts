// Sample content for the intro carousels (made up, no real people).
// Replace with real featured users, meets and builds once the backend exists.
// active = shown with a blue outline; tall = the taller card with extra details.

type CardFlags = { active?: boolean; tall?: boolean };

export type IntroPerson = CardFlags & {
  name: string;
  username: string;
  car: string;
  plate: string;
  followers: string;
};
export type IntroPlace = CardFlags & {
  kind: 'meet' | 'build' | 'shop';
  title: string;
  when: string;
  km: number;
  going: number;
};
export type IntroBuild = CardFlags & {
  car: string;
  username: string;
  hp: number;
  sprint: string;
  mods: [string, string];
};

export const INTRO_PEOPLE: IntroPerson[] = [
  { name: 'Arben Krasniqi', username: 'arben.k', car: 'BMW E46 330Ci', plate: '01-245-KA', followers: '2.4k', tall: true, active: true },
  { name: 'Drita Morina', username: 'drita.drives', car: 'Golf 7 R', plate: '04-118-DM', followers: '980' },
  { name: 'Leon Berisha', username: 'leon_builds', car: 'Audi RS3', plate: '03-777-LB', followers: '5.1k', tall: true },
  { name: 'Era Hoxha', username: 'era.jdm', car: 'Honda S2000', plate: '05-902-EH', followers: '1.2k' },
  { name: 'Blerim Shala', username: 'blerim.m', car: 'Mercedes C63', plate: '06-063-BS', followers: '3.3k', active: true },
  { name: 'Ardit Gashi', username: 'ardit.stance', car: 'Passat B6', plate: '07-450-AG', followers: '640', tall: true },
  { name: 'Vesa Rexhepi', username: 'vesa.r', car: 'MINI JCW', plate: '02-311-VR', followers: '870', tall: true },
  { name: 'Granit Thaçi', username: 'granit.gt', car: 'Nissan 350Z', plate: '02-350-GT', followers: '1.9k' },
  { name: 'Jeta Pllana', username: 'jeta.track', car: 'Toyota GR86', plate: '01-086-JP', followers: '4.0k', tall: true, active: true },
  { name: 'Besnik Limani', username: 'besnik.e30', car: 'BMW E30', plate: '01-030-BL', followers: '760' },
  { name: 'Fatos Dervishi', username: 'fatos.d', car: 'Subaru WRX', plate: '04-555-FD', followers: '1.1k', active: true },
  { name: 'Liridona Zeqiri', username: 'lira.z', car: 'Porsche 911', plate: '01-911-LZ', followers: '6.7k', tall: true },
];

export const INTRO_PLACES: IntroPlace[] = [
  { kind: 'meet', title: 'Takim nate', when: 'Tonight · 21:00', km: 2.1, going: 84, tall: true, active: true },
  { kind: 'shop', title: 'Detail Pro', when: 'Open until 19:00', km: 4.8, going: 0 },
  { kind: 'build', title: 'Golf R me suspension ajri', when: 'Posted 2h ago', km: 1.3, going: 0, tall: true },
  { kind: 'meet', title: 'Kafe & vetura', when: 'Sun · 10:00', km: 6.4, going: 52 },
  { kind: 'shop', title: 'Wrap Studio', when: 'Open now', km: 3.2, going: 0, active: true },
  { kind: 'build', title: 'E30 restomod', when: 'Posted 5h ago', km: 0.9, going: 0, tall: true },
  { kind: 'meet', title: 'Ditë në pistë', when: 'Sat · 09:00', km: 12.5, going: 120, tall: true },
  { kind: 'shop', title: 'Tune Garage', when: 'Open now', km: 1.7, going: 0 },
  { kind: 'build', title: 'RS3 stage 2', when: 'Posted 1d ago', km: 5.6, going: 0, active: true },
  { kind: 'meet', title: 'Xhiro e së dielës', when: 'Sun · 17:00', km: 8.0, going: 37, tall: true, active: true },
  { kind: 'shop', title: 'Wheel House', when: 'Open until 18:00', km: 7.3, going: 0 },
  { kind: 'build', title: 'Supra MK4', when: 'Posted 3h ago', km: 2.9, going: 0, tall: true },
];

export const INTRO_BUILDS: IntroBuild[] = [
  { car: 'BMW E46 330Ci', username: 'arben.k', hp: 265, sprint: '6.2s', mods: ['Coilovers', 'Exhaust'], tall: true, active: true },
  { car: 'Golf 7 R', username: 'drita.drives', hp: 380, sprint: '4.3s', mods: ['Stage 2', 'Wrap'] },
  { car: 'Audi RS3', username: 'leon_builds', hp: 480, sprint: '3.6s', mods: ['Downpipe', 'Wheels'], tall: true },
  { car: 'Honda S2000', username: 'era.jdm', hp: 240, sprint: '6.0s', mods: ['Hardtop', 'Intake'] },
  { car: 'Mercedes C63', username: 'blerim.m', hp: 510, sprint: '4.0s', mods: ['Tune', 'Carbon'], active: true },
  { car: 'Passat B6', username: 'ardit.stance', hp: 200, sprint: '7.6s', mods: ['Air ride', 'BBS'], tall: true },
  { car: 'Nissan 350Z', username: 'granit.gt', hp: 420, sprint: '4.4s', mods: ['Widebody', 'Turbo'], tall: true },
  { car: 'Toyota GR86', username: 'jeta.track', hp: 235, sprint: '6.1s', mods: ['Cage', 'Slicks'] },
  { car: 'BMW E30', username: 'besnik.e30', hp: 310, sprint: '5.4s', mods: ['Swap', 'Restomod'], tall: true, active: true },
  { car: 'Subaru WRX', username: 'fatos.d', hp: 330, sprint: '5.0s', mods: ['Rally', 'Exhaust'] },
  { car: 'Porsche 911', username: 'lira.z', hp: 450, sprint: '3.7s', mods: ['PPF', 'Ducktail'], active: true },
  { car: 'MINI JCW', username: 'vesa.r', hp: 231, sprint: '6.1s', mods: ['Lowered', 'Tint'], tall: true },
];

// Deal a list into n columns (card 1 → column 1, card 2 → column 2, …).
export function toColumns<T>(items: T[], n = 3): T[][] {
  return Array.from({ length: n }, (_, c) => items.filter((_, i) => i % n === c));
}
