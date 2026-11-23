import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

// Everything the user enters during sign-up.
export type OnboardingProfile = {
  username: string;
  displayName: string;
  city: string | null;
  bio: string;
  photo: string | null;
  banner: string | null;
  vibes: string[]; // vibe ids
  signIn: 'apple' | 'google' | 'email' | 'phone' | null; // how they signed up
  contact: string; // their email or phone number (email / phone sign-up)
  birthDate: string | null; // YYYY-MM-DD, never shown on the profile
  acceptedTerms: boolean; // Terms + Community Guidelines, ticked at sign-up
};

type OnboardingValue = OnboardingProfile & {
  updateOnboarding: (changes: Partial<OnboardingProfile>) => void;
};

const EMPTY: OnboardingProfile = {
  username: '',
  displayName: '',
  city: null,
  bio: '',
  photo: null,
  banner: null,
  vibes: [],
  signIn: null,
  contact: '',
  birthDate: null,
  acceptedTerms: false,
};

const OnboardingContext = createContext<OnboardingValue | null>(null);

// Remembers what the user entered during onboarding, so later screens (account ready,
// profile) can show it. Later this is what gets saved to the backend.
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<OnboardingProfile>(EMPTY);
  const value = useMemo(
    () => ({
      ...profile,
      updateOnboarding: (changes: Partial<OnboardingProfile>) =>
        setProfile((current) => ({ ...current, ...changes })),
    }),
    [profile],
  );
  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): OnboardingValue {
  const value = useContext(OnboardingContext);
  if (!value) throw new Error('useOnboarding must be used inside OnboardingProvider');
  return value;
}
