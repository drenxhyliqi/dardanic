import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';

const t = strings.auth;

export type TermsAgreementProps = {
  value: boolean;
  onChange: (agreed: boolean) => void;
};

// The sign-up agreement: a tick box and "I agree to the Terms of Service and
// Community Guidelines, and I've read the Privacy Policy", each name a link.
export function TermsAgreement({ value, onChange }: TermsAgreementProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={() => onChange(!value)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value }}
      accessibilityLabel={t.agreeLabel}
      style={styles.row}
    >
      <Ionicons
        name={value ? 'checkbox' : 'square-outline'}
        size={sizes.icon + 2}
        color={value ? colors.primary : colors.textMuted}
      />
      <Text style={styles.text}>
        {t.agreeStart}
        <TermsLink href="/terms" label={t.terms} />
        {t.agreeAnd}
        <TermsLink href="/guidelines" label={t.guidelines} />
        {t.agreeRead}
        <TermsLink href="/privacy" label={t.privacy} />
        {t.agreeEnd}
      </Text>
    </Pressable>
  );
}

function TermsLink({ href, label }: { href: Href; label: string }) {
  const styles = useStyles();
  return (
    <Link href={href} style={styles.link}>
      {label}
    </Link>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
    text: { ...typography.paragraph, flex: 1, color: colors.textMuted },
    link: { color: colors.text, textDecorationLine: 'underline' },
  }),
);
