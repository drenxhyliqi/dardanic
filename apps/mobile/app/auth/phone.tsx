import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { AuthFormLayout } from '../../components/auth/AuthFormLayout';
import { PhoneCountryPicker } from '../../components/auth/PhoneCountryPicker';
import { Button } from '../../components/ui/Button';
import { TextField } from '../../components/ui/TextField';
import { PHONE_COUNTRIES } from '../../data/phoneCountries';
import { strings } from '../../i18n';

const t = strings.auth;
const MIN_DIGITS = 6;

// Sign up or log in with a phone number: pick the country code, type the number, and
// we text a 6-digit code.
export default function PhoneScreen() {
  const { intent = 'signup' } = useLocalSearchParams<{ intent?: string }>();
  const [country, setCountry] = useState(PHONE_COUNTRIES[0]);
  const [number, setNumber] = useState('');
  const digits = number.replace(/\D/g, '').replace(/^0+/, ''); // no leading 0 after the code
  const ready = digits.length >= MIN_DIGITS;
  const send = () =>
    router.push({
      pathname: '/auth/code',
      // Country and number separately: a "+" in a link can turn into a space.
      params: { intent, method: 'phone', country: country.code, number: digits },
    });

  return (
    <AuthFormLayout title={t.phoneTitle} subtitle={t.phoneSubtitle}>
      {PHONE_COUNTRIES.length > 1 && <PhoneCountryPicker value={country} onChange={setCountry} />}
      <TextField
        label={`${t.phoneLabel} (${country.dial})`}
        placeholder={t.phonePlaceholder}
        value={number}
        onChangeText={setNumber}
        keyboardType="phone-pad"
        autoComplete="tel"
        textContentType="telephoneNumber"
        autoFocus
      />
      <Button label={t.sendCode} strong centered disabled={!ready} onPress={send} />
    </AuthFormLayout>
  );
}
