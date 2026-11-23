import { StyleSheet, Text, View } from 'react-native';

import type { GarageCar, ModCategory } from '../../data/garage';
import { strings } from '../../i18n';
import { makeStyles, radius, spacing, typography } from '../../theme';
import { withCommas } from '../../utils/text';
import { ModRow } from './ModRow';

const t = strings.profile.build;
const ORDER: ModCategory[] = ['engine', 'exhaust', 'suspension', 'wheels', 'brakes', 'exterior'];

// Everything done to the car, grouped (Engine, Exhaust, Suspension…), each with where,
// when and what it cost, and the total invested at the bottom.
export function BuildMods({ car }: { car: GarageCar }) {
  const styles = useStyles();
  const total = car.mods.reduce((sum, mod) => sum + (mod.cost ?? 0), 0);
  const groups = ORDER.map((category) => ({
    category,
    mods: car.mods.filter((mod) => mod.category === category),
  })).filter((group) => group.mods.length > 0);

  return (
    <View style={styles.block}>
      <View style={styles.headingRow}>
        <Text style={styles.heading}>{t.modifications}</Text>
        <Text style={styles.count}>{t.modCount(car.mods.length)}</Text>
      </View>
      <View style={styles.card}>
        {groups.map((group, index) => (
          <View key={group.category} style={index > 0 && styles.divider}>
            <Text style={styles.category}>{t.categories[group.category]}</Text>
            {group.mods.map((mod) => (
              <ModRow key={mod.name} mod={mod} />
            ))}
          </View>
        ))}
        <View style={[styles.totalRow, styles.divider]}>
          <Text style={styles.totalLabel}>{t.invested}</Text>
          <Text style={styles.total}>{t.euro(withCommas(total))}</Text>
        </View>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    block: { gap: spacing.md },
    headingRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
    heading: { ...typography.cardTitle, color: colors.text },
    count: { ...typography.small, color: colors.textMuted },
    card: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    divider: { borderTopWidth: 1, borderTopColor: colors.surfaceBorder, paddingTop: spacing.md },
    category: { ...typography.badge, color: colors.primaryLight },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: spacing.md },
    totalLabel: { ...typography.label, color: colors.textMuted },
    total: { ...typography.stat, color: colors.text },
  }),
);
