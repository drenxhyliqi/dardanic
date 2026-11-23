import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { AuthFormLayout } from '../../components/auth/AuthFormLayout';
import type { AuthMethod } from '../../components/auth/AuthOptions';
import { BirthdayField, type Birthday } from '../../components/auth/BirthdayField';
import { TermsAgreement } from '../../components/auth/TermsAgreement';
import { Button } from '../../components/ui/Button';
import { useOnboarding } from '../../context/OnboardingContext';
import { strings } from '../../i18n';
import { ageOn, isoDate, MIN_AGE, toDate } from '../../utils/age';

const t = strings.auth;

// Right after creating an account (any way): date of birth (16+, never shown) and
// agreeing to the Terms and Community Guidelines. Then the plan step.
export default function SignupDetailsScreen() {
  const params = useLocalSearchParams<{ method?: string; contact?: string }>();
  const { updateOnboarding } = useOnboarding();
  const [birthday, setBirthday] = useState<Birthday>({ day: '', month: '', year: '' });
  const [agreed, setAgreed] = useState(false);

  const complete = birthday.day && birthday.month && birthday.year.length === 4;
  const date = complete ? toDate(birthday.day, birthday.month, birthday.year) : null;
  const oldEnough = date !== null && ageOn(date) >= MIN_AGE;
  const problem = !date ? t.notADate : !oldEnough ? t.tooYoung : undefined;
  const error = complete ? problem : undefined;

  const next = () => {
    if (!date || !oldEnough || !agreed) return;
    updateOnboarding({
      signIn: (params.method as AuthMethod | undefined) ?? null,
      contact: params.contact ?? '',
      birthDate: isoDate(date),
      acceptedTerms: true,
    });
    router.replace('/choose-plan');
  };

  return (
    <AuthFormLayout title={t.detailsTitle} subtitle={t.detailsSubtitle}>
      <BirthdayField value={birthday} onChange={setBirthday} error={error} />
      <TermsAgreement value={agreed} onChange={setAgreed} />
      <Button
        label={t.verify}
        strong
        centered
        disabled={!oldEnough || !agreed}
        onPress={next}
      />
    </AuthFormLayout>
  );
}
