import { StyleSheet, Text, View } from 'react-native';

import type { FeedAuthor } from '../../data/feed';
import { BASED_IN, DEFAULT_ABOUT, PUBLIC_DETAILS } from '../../data/publicProfiles';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';

const t = strings.profileMenu;

// "About this account": when it joined, where it's based, and what kind of account it is.
export function AboutAccount({ person }: { person: FeedAuthor }) {
  const styles = useStyles();
  const details = PUBLIC_DETAILS[person.username];
  const basedIn = details?.basedIn ?? BASED_IN[person.username] ?? DEFAULT_ABOUT.basedIn;
  const kind = person.business ? t.business : t.personal;
  const visibility = person.private ? t.privateType : t.publicType;
  const rows = [
    { label: t.joined, value: details?.joined ?? DEFAULT_ABOUT.joined },
    { label: t.basedIn, value: basedIn },
    { label: t.accountType, value: `${kind} · ${visibility}` },
  ];

  return (
    <View style={styles.block}>
      <Text style={styles.hint}>{t.aboutHint}</Text>
      {rows.map((row) => (
        <View key={row.label} style={styles.row}>
          <Text style={styles.label}>{row.label}</Text>
          <Text style={styles.value}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    block: { gap: spacing.lg, padding: spacing.xl },
    hint: { ...typography.paragraph, color: colors.textMuted },
    row: { gap: spacing.xxs },
    label: { ...typography.small, color: colors.textMuted },
    value: { ...typography.name, color: colors.text },
  }),
);
