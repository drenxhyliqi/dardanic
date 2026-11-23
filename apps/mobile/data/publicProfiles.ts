// Sample public profile details for other people (made up), shown when you open
// someone's profile. Missing people get a plain profile. Instagram handles are
// made-up demo handles.
export type PublicDetails = {
  bio: string;
  followers: string;
  following: string;
  instagram?: string; // handle they chose to show on their profile
  joined?: string; // "About this account"
  basedIn?: string;
};

export const PUBLIC_DETAILS: Record<string, PublicDetails> = {
  'era.jdm': { bio: 'Vetëm JDM · R35 · xhiro të dielave', followers: '1.2k', following: '418', instagram: 'era.dardanic.demo' },
  'jeta.track': { bio: 'Ditë në pistë dhe zhurmë AMG · Zürich ⇄ Prishtinë', followers: '4.0k', following: '220', instagram: 'jeta.dardanic.demo' },
  'drita.drives': { bio: 'Golf R · po organizoj kolonën e verës 🇽🇰', followers: '980', following: '540' },
  'fatos.d': { bio: 'WRX · rally · gjithmonë në autostradë', followers: '1.1k', following: '301' },
  'lira.z': { bio: '911 · Vjenë · kafe dhe vetura', followers: '6.7k', following: '190', instagram: 'lira.dardanic.demo' },
};

// More people from Explore and search.
Object.assign(PUBLIC_DETAILS, {
  'kushtrim.r': { bio: 'Supercar spotting · Huracán · Prishtinë', followers: '12.4k', following: '380' },
  'arta.k': { bio: 'Mynih ⇄ Prishtinë · McLaren', followers: '8.9k', following: '412', instagram: 'arta.dardanic.demo' },
  'blendi.s': { bio: 'Stance Kosova · ulët dhe ngadalë', followers: '2.1k', following: '640' },
  'driton.m': { bio: 'Vetëm V8 · Gjilan', followers: '1.6k', following: '290' },
  'vesa.r': { bio: 'Camaro e parë, jo e fundit', followers: '870', following: '510' },
  'leon_builds': { bio: 'RS6 Avant · detajimi është pasion', followers: '5.1k', following: '330' },
  'granit.gt': { bio: 'M4 · Rugovë çdo të diel', followers: '1.9k', following: '450' },
} satisfies Record<string, PublicDetails>);

export const PLAIN_DETAILS: PublicDetails = { bio: '', followers: '0', following: '0' };

// "About this account" when a profile doesn't say otherwise.
export const DEFAULT_ABOUT = { joined: 'March 2025', basedIn: 'Kosovo' };
// Where some sample accounts are based (the diaspora ones).
export const BASED_IN: Record<string, string> = {
  'jeta.track': 'Switzerland',
  'drita.drives': 'Germany',
  'lira.z': 'Austria',
  'arta.k': 'Germany',
};
