import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../theme';

export type HeadingProps = {
  title: string;
  subtitle?: string;
};

// A bold uppercase screen heading with an optional line of text below it.
export function Heading({ title, subtitle }: HeadingProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
