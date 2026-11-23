// Calling codes for phone sign-up. Kosovo only for now; add more here later (the
// country chooser appears by itself once there's more than one).
export type PhoneCountry = { code: string; dial: string; name: string };

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: 'RKS', dial: '+383', name: 'Kosovo' },
];
