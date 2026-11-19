import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, spacing, typography } from '../../theme';

export type HeadingProps = {
  title: string;
  subtitle?: string;
};

// A bold uppercase screen heading with an optional line of text below it.
export function Heading({ title, subtitle }: HeadingProps) {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    container: {
      gap: spacing.sm,
    },
    title: {
      ...typography.heading,
      color: colors.text,
      textTransform: 'uppercase',
    },
    subtitle: {
      ...typography.paragraph,
      color: colors.textMuted,
    },
  }),
);
