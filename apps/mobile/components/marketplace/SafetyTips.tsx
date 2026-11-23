import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

// A short "Buy safely" box with three tips.
export function SafetyTips() {
  const styles = useStyles();
  const colors = useColors();
  const t = strings.marketplace;
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Ionicons name="shield-checkmark-outline" size={sizes.icon} color={colors.primaryLight} />
        <Text style={styles.title}>{t.safetyTitle}</Text>
      </View>
      {t.safetyTips.map((tip) => (
        <Text key={tip} style={styles.tip}>{`•  ${tip}`}</Text>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      gap: spacing.sm,
      padding: spacing.lg,
      borderRadius: radius.lg,
      backgroundColor: colors.primarySoft,
    },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    title: { ...typography.label, color: colors.primaryLight },
    tip: { ...typography.paragraph, color: colors.text },
  }),
);
