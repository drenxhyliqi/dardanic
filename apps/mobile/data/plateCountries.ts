// Countries whose plates FindMe can search: Kosovo and its neighbours, plus the
// European and Nordic countries where most of the Kosovo-Albanian diaspora drives.
// `code` is the international code printed on the plate's blue strip (shown instead of
// a flag). `pattern` checks a plate after spaces and dashes are removed; it's a
// friendly check, not a legal one. Ordered roughly by how many of our people live there.
export type CountryCode =
  | 'RKS' | 'AL' | 'NMK' | 'MNE' | 'SRB' | 'GR' | 'HR' | 'SLO'
  | 'D' | 'CH' | 'A' | 'I' | 'F' | 'B' | 'NL' | 'UK' | 'L' | 'IRL'
  | 'S' | 'N' | 'DK' | 'FIN';

export type PlateRegion = 'home' | 'west' | 'nordic';

export type PlateCountry = {
  code: CountryCode;
  name: string;
  region: PlateRegion;
  popular?: boolean; // shown first in the picker
  example: string; // the field's placeholder and the "invalid plate" hint
  pattern: RegExp;
};

const L = '[A-ZÄÖÜÅÆØČĆŠŽĐ]'; // letters seen on European plates

export const PLATE_COUNTRIES: PlateCountry[] = [
  // Kosovo & neighbours
  { code: 'RKS', name: 'Kosovo', region: 'home', popular: true, example: '01-245-KA', pattern: /^0[1-7]\d{3}[A-Z]{2}$/ },
  { code: 'AL', name: 'Albania', region: 'home', popular: true, example: 'AA 123 BB', pattern: /^[A-Z]{2}\d{3}[A-Z]{2}$/ },
  { code: 'NMK', name: 'North Macedonia', region: 'home', example: 'SK 1234 AB', pattern: /^[A-Z]{2}\d{3,4}[A-Z]{2}$/ },
  { code: 'MNE', name: 'Montenegro', region: 'home', example: 'PG AB 123', pattern: /^[A-Z]{2}[A-Z]{2}\d{3}$/ },
  { code: 'SRB', name: 'Serbia', region: 'home', example: 'PR 123-AB', pattern: new RegExp(`^${L}{2}\\d{3,4}${L}{2}$`) },
  { code: 'GR', name: 'Greece', region: 'home', example: 'ABC-1234', pattern: /^[A-Z]{3}\d{4}$/ },
  { code: 'HR', name: 'Croatia', region: 'home', example: 'ZG 1234-AB', pattern: new RegExp(`^${L}{2}\\d{3,4}${L}{1,2}$`) },
  { code: 'SLO', name: 'Slovenia', region: 'home', example: 'LJ AB-123', pattern: /^[A-Z]{2}[A-Z0-9]{3,5}$/ },
  // Western Europe
  { code: 'D', name: 'Germany', region: 'west', popular: true, example: 'M AB 1234', pattern: new RegExp(`^${L}{1,3}[A-Z]{1,2}\\d{1,4}[EH]?$`) },
  { code: 'CH', name: 'Switzerland', region: 'west', popular: true, example: 'ZH 123456', pattern: /^[A-Z]{2}\d{1,6}$/ },
  { code: 'A', name: 'Austria', region: 'west', example: 'W 12345 A', pattern: /^[A-Z]{1,2}[A-Z0-9]{3,6}$/ },
  { code: 'I', name: 'Italy', region: 'west', example: 'AB 123 CD', pattern: /^[A-Z]{2}\d{3}[A-Z]{2}$/ },
  { code: 'F', name: 'France', region: 'west', example: 'AB-123-CD', pattern: /^[A-Z]{2}\d{3}[A-Z]{2}$/ },
  { code: 'B', name: 'Belgium', region: 'west', example: '1-ABC-123', pattern: /^\d[A-Z]{3}\d{3}$/ },
  { code: 'NL', name: 'Netherlands', region: 'west', example: 'AB-123-C', pattern: /^[A-Z0-9]{6}$/ },
  { code: 'UK', name: 'United Kingdom', region: 'west', example: 'AB12 CDE', pattern: /^[A-Z]{2}\d{2}[A-Z]{3}$/ },
  { code: 'L', name: 'Luxembourg', region: 'west', example: 'AB 1234', pattern: /^[A-Z]{0,2}\d{3,4}$/ },
  { code: 'IRL', name: 'Ireland', region: 'west', example: '231-D-12345', pattern: /^\d{2,3}[A-Z]{1,2}\d{1,6}$/ },
  // Nordic countries
  { code: 'S', name: 'Sweden', region: 'nordic', example: 'ABC 123', pattern: /^[A-Z]{3}\d{2}[A-Z0-9]$/ },
  { code: 'N', name: 'Norway', region: 'nordic', example: 'AB 12345', pattern: /^[A-Z]{2}\d{4,5}$/ },
  { code: 'DK', name: 'Denmark', region: 'nordic', example: 'AB 12 345', pattern: /^[A-Z]{2}\d{5}$/ },
  { code: 'FIN', name: 'Finland', region: 'nordic', example: 'ABC-123', pattern: /^[A-Z]{2,3}\d{1,3}$/ },
];

export const countryByCode = (code: CountryCode): PlateCountry =>
  PLATE_COUNTRIES.find((country) => country.code === code) ?? PLATE_COUNTRIES[0];
