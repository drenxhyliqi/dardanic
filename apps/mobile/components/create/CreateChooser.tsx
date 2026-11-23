import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { CreateOptionCard } from './CreateOptionCard';
import { CREATE_OPTIONS, type CreateKind } from './createOptions';

const t = strings.create;

// Inside the Create sheet: "What would you like to create?" and the four choices
// (Post, Build, Meeting, Crew) as cards, two per row.
export function CreateChooser({ onChoose }: { onChoose: (kind: CreateKind) => void }) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}>
      <Text style={styles.question}>{t.question}</Text>
      <View style={styles.grid}>
        {CREATE_OPTIONS.map(({ kind, icon }) => (
          <CreateOptionCard
            key={kind}
            icon={icon}
            title={t.options[kind].title}
            hint={t.options[kind].hint}
            onPress={() => onChoose(kind)}
          />
        ))}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    content: { gap: spacing.lg, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
    question: { ...typography.title, color: colors.text },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  }),
);
