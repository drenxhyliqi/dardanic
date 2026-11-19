import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../i18n';
import { makeStyles, spacing, typography } from '../theme';

export type PlaceholderPageProps = {
  title: string;
};

// A simple page with a title and "Coming soon", until the real content exists.
export function PlaceholderPage({ title }: PlaceholderPageProps) {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{strings.legal.comingSoon}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing.xl,
      gap: spacing.md,
    },
    title: {
      ...typography.title,
      color: colors.text,
    },
    body: {
      ...typography.body,
      color: colors.textMuted,
    },
  }),
);
