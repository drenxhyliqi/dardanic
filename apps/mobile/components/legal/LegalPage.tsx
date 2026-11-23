import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '../../i18n';
import type { LegalDoc } from '../../i18n/legal';
import { makeStyles, spacing, typography } from '../../theme';

// A legal document (Terms, Privacy Policy, Community Guidelines, License): title, last
// updated, a short intro, then each section with its paragraphs and bullet points.
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xxl }]}
    >
      <View style={styles.head}>
        <Text style={styles.title}>{doc.title}</Text>
        <Text style={styles.updated}>{strings.legal.updated(doc.updated)}</Text>
        {__DEV__ && <Text style={styles.updated}>{strings.legal.draftNote}</Text>}
      </View>
      <Text style={styles.body}>{doc.intro}</Text>
      {doc.sections.map((section) => (
        <View key={section.heading} style={styles.section}>
          <Text style={styles.heading}>{section.heading}</Text>
          {section.paragraphs?.map((paragraph) => (
            <Text key={paragraph} style={styles.body}>
              {paragraph}
            </Text>
          ))}
          {section.bullets?.map((bullet) => (
            <View key={bullet} style={styles.bullet}>
              <Text style={styles.body}>•</Text>
              <Text style={[styles.body, styles.bulletText]}>{bullet}</Text>
            </View>
          ))}
          {section.closing?.map((line) => (
            <Text key={line} style={styles.body}>
              {line}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { gap: spacing.xl, paddingHorizontal: spacing.xl, paddingTop: spacing.md },
    head: { gap: spacing.xs },
    title: { ...typography.heading, color: colors.text },
    updated: { ...typography.small, color: colors.textMuted },
    section: { gap: spacing.sm },
    heading: { ...typography.cardTitle, color: colors.text },
    body: { ...typography.paragraph, color: colors.textMuted },
    bullet: { flexDirection: 'row', gap: spacing.sm },
    bulletText: { flex: 1 },
  }),
);
