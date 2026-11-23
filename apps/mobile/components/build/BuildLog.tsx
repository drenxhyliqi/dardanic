import { StyleSheet, Text, View } from 'react-native';

import type { BuildLogEntry } from '../../data/garage';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';

// The build's story as a timeline, newest first: a dot and line on the left, the date,
// what happened, and a few words about it.
export function BuildLog({ entries }: { entries: BuildLogEntry[] }) {
  const styles = useStyles();
  return (
    <View style={styles.block}>
      <Text style={styles.heading}>{strings.profile.build.buildLog}</Text>
      {entries.map((entry, index) => (
        <View key={entry.date + entry.title} style={styles.entry}>
          <View style={styles.rail}>
            <View style={[styles.dot, index === 0 && styles.dotLatest]} />
            {index < entries.length - 1 && <View style={styles.line} />}
          </View>
          <View style={styles.text}>
            <Text style={styles.date}>{entry.date}</Text>
            <Text style={styles.title}>{entry.title}</Text>
            <Text style={styles.body}>{entry.text}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    block: { gap: spacing.md },
    heading: { ...typography.cardTitle, color: colors.text },
    entry: { flexDirection: 'row', gap: spacing.md },
    rail: { alignItems: 'center', width: spacing.md },
    dot: {
      width: spacing.md,
      height: spacing.md,
      marginTop: spacing.xs,
      borderRadius: radius.full,
      borderWidth: sizes.accentRing,
      borderColor: colors.primary,
      backgroundColor: colors.background,
    },
    dotLatest: { backgroundColor: colors.primary },
    line: {
      flex: 1,
      width: sizes.threadLine,
      marginTop: spacing.xs,
      backgroundColor: colors.surfaceBorder,
    },
    text: { flex: 1, gap: spacing.xxs, paddingBottom: spacing.lg },
    date: { ...typography.small, color: colors.textMuted },
    title: { ...typography.name, color: colors.text },
    body: { ...typography.paragraph, color: colors.textMuted },
  }),
);
