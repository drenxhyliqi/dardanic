// Ages from a date of birth, for the sign-up age check (16+) and FindMe (18+).
export const MIN_AGE = 16;
export const FINDME_AGE = 18;

// A real calendar date from day / month / year text, or null ("31 02 2005" → null).
export function toDate(day: string, month: string, year: string): Date | null {
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);
  if (!d || !m || year.length !== 4) return null;
  const date = new Date(y, m - 1, d);
  const real = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  return real && date <= new Date() ? date : null;
}

// Full years since `birth` (today counts).
export function ageOn(birth: Date, today = new Date()): number {
  const age = today.getFullYear() - birth.getFullYear();
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  return hadBirthday ? age : age - 1;
}

// YYYY-MM-DD (how it's stored).
export const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;

// Age from a stored YYYY-MM-DD; null when we don't know it.
export function ageFromIso(iso: string | null): number | null {
  if (!iso) return null;
  const [y, m, d] = iso.split('-');
  const date = toDate(d ?? '', m ?? '', y ?? '');
  return date ? ageOn(date) : null;
}
