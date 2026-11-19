import { useOnboarding } from '../../context/OnboardingContext';
import { SAMPLE_PROFILE } from '../../data/profile';

// Who to show on the profile: what the user entered during sign-up if they went
// through it, otherwise the sample profile (for building the UI before the backend).
export function useProfileData() {
  const onboarding = useOnboarding();

  if (onboarding.username) {
    return {
      displayName: onboarding.displayName,
      username: onboarding.username,
      city: onboarding.city,
      bio: onboarding.bio,
      photo: onboarding.photo,
      banner: onboarding.banner,
      crew: SAMPLE_PROFILE.crew,
      followers: '0', // a brand-new account
      following: '0',
      hasStory: false,
    };
  }
  return { ...SAMPLE_PROFILE, photo: null, banner: null };
}

export type ProfileData = ReturnType<typeof useProfileData>;
