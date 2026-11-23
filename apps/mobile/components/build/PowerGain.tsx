import { StyleSheet, Text, View } from 'react-native';

import type { GarageCar } from '../../data/garage';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { Tag } from '../ui/Tag';

const t = strings.profile.build;

// How much power the work added: "Stock 231 HP → 265 HP" with a "+34 HP" badge and two
// bars to compare.
export function PowerGain({ car }: { car: GarageCar }) {
  const styles = useStyles();
  const gained = car.hp - car.stockHp;
  if (gained <= 0) return null;

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.title}>{t.powerGain}</Text>
        <Tag label={t.gainBadge(gained)} tone="blue" />
      </View>
      <Text style={styles.text}>{t.gain(car.stockHp, car.hp)}</Text>
      <View style={styles.bars}>
        <View style={[styles.bar, styles.stock, { width: `${(car.stockHp / car.hp) * 100}%` }]} />
        <View style={[styles.bar, styles.now]} />
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      gap: spacing.sm,
      padding: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    title: { ...typography.label, color: colors.text },
    text: { ...typography.paragraph, color: colors.textMuted },
    bars: { gap: spacing.xs, marginTop: spacing.xs },
    bar: { height: sizes.spotsBar, borderRadius: radius.full },
    stock: { backgroundColor: colors.surfaceBorder },
    now: { width: '100%', backgroundColor: colors.primary },
  }),
);
