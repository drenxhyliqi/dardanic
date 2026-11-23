import { countryByCode, type CountryCode } from '../data/plateCountries';

// Plates are stored "clean": capitals only, no spaces, dashes or dots ("01245KA").
export function cleanPlate(input: string): string {
  return input.toUpperCase().replace(/[\s.\-–·]/g, '');
}

// Does this look like a real plate from that country?
export function isValidPlate(country: CountryCode, input: string): boolean {
  return countryByCode(country).pattern.test(cleanPlate(input));
}

// A clean plate written the way it looks on the car ("01245KA" → "01-245-KA").
export function formatPlate(country: CountryCode, clean: string): string {
  if (country === 'RKS' && clean.length === 7) {
    return `${clean.slice(0, 2)}-${clean.slice(2, 5)}-${clean.slice(5)}`;
  }
  // Letters, numbers, letters → separated by spaces ("ZH48213" → "ZH 48213").
  const parts = clean.match(/^([A-ZÄÖÜ]+)(\d+)([A-Z]*)$/);
  return parts ? parts.slice(1).filter(Boolean).join(' ') : clean;
}

// The only way a plate is ever shown to others: first and last two characters
// ("01-•••-KA"), so nobody can read the full plate from the app.
export function maskPlate(country: CountryCode, clean: string): string {
  const hidden = '•••';
  if (country === 'RKS') return `${clean.slice(0, 2)}-${hidden}-${clean.slice(-2)}`;
  return `${clean.slice(0, 2)} ${hidden} ${clean.slice(-2)}`;
}
