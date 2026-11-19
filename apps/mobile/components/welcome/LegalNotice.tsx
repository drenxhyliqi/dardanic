import { Link, type Href } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { strings } from '../../i18n';
import { colors, typography } from '../../theme';
import type { WelcomeMode } from './useModeSwitch';

export type LegalNoticeProps = {
  mode: WelcomeMode;
};

// The legal line under the welcome buttons, with working links.
// start: Terms + Privacy. signup: Terms + License Agreement + Privacy, naming the sign-up options.
export function LegalNotice({ mode }: LegalNoticeProps) {
  const { legal } = strings;

  if (mode === 'start') {
    return (
      <Text style={styles.notice}>
        {legal.noticeStart}
        <LegalLink href="/terms" label={legal.terms} />
        {legal.noticeAnd}
        <LegalLink href="/privacy" label={legal.privacy} />
        {legal.noticeEnd}
      </Text>
    );
  }

  return (
    <Text style={styles.notice}>
      {legal.signupNoticeStart}
      <LegalLink href="/terms" label={legal.terms} />
      {legal.noticeComma}
      <LegalLink href="/license" label={legal.license} />
      {legal.noticeAnd}
      <LegalLink href="/privacy" label={legal.privacy} />
      {legal.noticeEnd}
    </Text>
  );
}

function LegalLink({ href, label }: { href: Href; label: string }) {
  return (
    <Link href={href} style={styles.link}>
      {label}
    </Link>
  );
}

const styles = StyleSheet.create({
  notice: {
    ...typography.small,
    color: colors.textMuted,
    textAlign: 'left',
  },
  link: {
    color: colors.text,
    textDecorationLine: 'underline',
  },
});
