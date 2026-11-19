import { router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProfilePreview } from '../components/profile/ProfilePreview';
import { IdentityStep } from '../components/setup/IdentityStep';
import { MediaButtons } from '../components/setup/MediaButtons';
import { PlaceStep } from '../components/setup/PlaceStep';
import { SetupFooter } from '../components/setup/SetupFooter';
import { SetupProgress } from '../components/setup/SetupProgress';
import { Heading } from '../components/ui/Heading';
import { useOnboarding } from '../context/OnboardingContext';
import { strings } from '../i18n';
import { makeStyles, spacing } from '../theme';

const t = strings.setup;
const STEPS = [
  { title: t.identityTitle, subtitle: t.identitySubtitle },
  { title: t.placeTitle, subtitle: t.placeSubtitle },
  { title: t.mediaTitle, subtitle: t.mediaSubtitle },
];
const MIN_USERNAME = 3;

// Profile setup after choosing Standard: 1) identity, 2) place + bio, 3) photo + banner.
// A live preview of the profile sits under the title on every step (tappable on step 3).
// Nothing is saved yet (no backend); finishing goes to picking vibes.
export default function ProfileSetupScreen() {
  const styles = useStyles();
  const { updateOnboarding } = useOnboarding();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [city, setCity] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const isLast = step === STEPS.length - 1;
  const canContinue = step !== 0 || username.length >= MIN_USERNAME;

  // Close the keyboard when moving between steps, so the next step's first tap
  // goes straight to its buttons.
  function goTo(nextStep: number) {
    Keyboard.dismiss();
    setStep(nextStep);
  }

  function next() {
    if (isLast) {
      updateOnboarding({
        username,
        displayName: displayName.trim(),
        city,
        bio: bio.trim(),
        photo,
        banner,
      });
      router.push('/vibes');
    } else {
      goTo(step + 1);
    }
  }

  function back() {
    if (step === 0) router.back();
    else goTo(step - 1);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior="padding" style={styles.screen}>
        <SetupProgress current={step + 1} names={t.stepNames} />
        <ScrollView
          key={step}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <Heading title={STEPS[step].title} subtitle={STEPS[step].subtitle} />
          <ProfilePreview
            username={username}
            displayName={displayName}
            city={city}
            bio={bio}
            photo={photo}
            banner={banner}
            onChangePhoto={step === 2 ? setPhoto : undefined}
            onChangeBanner={step === 2 ? setBanner : undefined}
          />
          {step === 0 && (
            <IdentityStep
              username={username}
              displayName={displayName}
              onChangeUsername={setUsername}
              onChangeDisplayName={setDisplayName}
            />
          )}
          {step === 1 && (
            <PlaceStep city={city} bio={bio} onChangeCity={setCity} onChangeBio={setBio} />
          )}
          {step === 2 && <MediaButtons onChangePhoto={setPhoto} onChangeBanner={setBanner} />}
        </ScrollView>
        <SetupFooter
          onBack={back}
          onSkip={step > 0 ? next : undefined}
          onContinue={next}
          continueDisabled={!canContinue}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xl,
      gap: spacing.xl,
    },
  }),
);
