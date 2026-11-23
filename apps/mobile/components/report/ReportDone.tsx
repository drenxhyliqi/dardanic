import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { Button } from '../ui/Button';

const t = strings.report;

// The last step of a report: a blue tick, "Thanks for reporting", what happens next,
// and who you blocked (if you did).
export function ReportDone({ blocked, onDone }: { blocked?: string; onDone: () => void }) {
  const styles = useStyles();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.box, { paddingBottom: insets.bottom + spacing.lg }]}>
      <Ionicons name="checkmark-circle" size={sizes.icon * 3} color={colors.primary} />
      <Text style={styles.title}>{t.doneTitle}</Text>
      <Text style={styles.text}>{t.doneText}</Text>
      {blocked && <Text style={styles.text}>{t.doneBlocked(blocked)}</Text>}
      <View style={styles.button}>
        <Button label={t.done} small centered onPress={onDone} />
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    box: {
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
    },
    title: { ...typography.title, textAlign: 'center', color: colors.text },
    text: { ...typography.paragraph, textAlign: 'center', color: colors.textMuted },
    button: { alignSelf: 'stretch', marginTop: spacing.md },
  }),
);
