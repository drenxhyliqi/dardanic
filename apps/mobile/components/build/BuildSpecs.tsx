import { StyleSheet, Text, View } from 'react-native';

import type { GarageCar } from '../../data/garage';
import { strings } from '../../i18n';
import { makeStyles, radius, spacing, typography } from '../../theme';
import { withCommas } from '../../utils/text';

const t = strings.profile.build;

// The car's spec sheet: engine, drivetrain, gearbox, weight, power-to-weight and fuel.
export function BuildSpecs({ car }: { car: GarageCar }) {
  const styles = useStyles();
  const rows = [
    { label: t.engine, value: car.engine },
    { label: t.drive, value: car.drive },
    { label: t.gearbox, value: car.gearbox },
    { label: t.weight, value: t.kg(withCommas(car.weight)) },
    { label: t.powerToWeight, value: t.hpPerTonne(Math.round(car.hp / (car.weight / 1000))) },
    { label: t.fuel, value: car.fuel },
  ];
  return (
    <View style={styles.block}>
      <Text style={styles.heading}>{t.specs}</Text>
      <View style={styles.card}>
        {rows.map((row, index) => (
          <View key={row.label} style={[styles.row, index > 0 && styles.divider]}>
            <Text style={styles.label}>{row.label}</Text>
            <Text style={styles.value}>{row.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    block: { gap: spacing.md },
    heading: { ...typography.cardTitle, color: colors.text },
    card: {
      paddingHorizontal: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.lg,
      paddingVertical: spacing.md,
    },
    divider: { borderTopWidth: 1, borderTopColor: colors.surfaceBorder },
    label: { ...typography.paragraph, color: colors.textMuted },
    value: { ...typography.label, flexShrink: 1, textAlign: 'right', color: colors.text },
  }),
);
