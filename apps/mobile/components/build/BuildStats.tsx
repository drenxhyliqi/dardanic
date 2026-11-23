import { StyleSheet, Text, View } from 'react-native';

import type { GarageCar } from '../../data/garage';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';

const t = strings.profile.build;

// The key numbers on a build page: power, torque, 0–100 and top speed, in a row.
export function BuildStats({ car }: { car: GarageCar }) {
  const styles = useStyles();
  const stats = [
    { label: t.hp, value: String(car.hp) },
    { label: t.torque, value: String(car.torque) },
    { label: t.sprint, value: car.sprint },
    { label: t.topSpeed, value: String(car.topSpeed) },
  ];
  return (
    <View style={styles.row}>
      {stats.map((stat, index) => (
        <View key={stat.label} style={[styles.stat, index > 0 && styles.divider]}>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row' },
    stat: { flex: 1, alignItems: 'center', gap: spacing.xxs },
    divider: { borderLeftWidth: 1, borderLeftColor: colors.surfaceBorder },
    value: { ...typography.stat, color: colors.text },
    label: { ...typography.small, color: colors.textMuted },
  }),
);
