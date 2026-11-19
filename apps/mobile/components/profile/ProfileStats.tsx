import { StyleSheet, Text, View } from 'react-native';

import { SAMPLE_STATS } from '../../data/profile';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';

const KEYS = ['posts', 'builds', 'crews'] as const;

// Posts · Builds · Crews: a bold number with a small label under it, no box.
export function ProfileStats() {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      {KEYS.map((key) => (
        <View key={key} style={styles.item}>
          <Text style={styles.value}>{SAMPLE_STATS[key]}</Text>
          <Text style={styles.label}>{strings.profile.stats[key]}</Text>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.xxl,
      paddingHorizontal: spacing.xl,
    },
    item: {
      alignItems: 'flex-start',
    },
    value: {
      ...typography.name,
      color: colors.text,
    },
    label: {
      ...typography.small,
      color: colors.textMuted,
    },
  }),
);
