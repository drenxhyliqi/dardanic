import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import type { Mod } from '../../data/garage';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { withCommas } from '../../utils/text';

const t = strings.profile.build;

// One modification: what it is, where it was done and when (a shop on DARDANIC is a
// blue link to its profile), what it cost, and a short note.
export function ModRow({ mod }: { mod: Mod }) {
  const styles = useStyles();
  const shopLink = mod.shopUsername;
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <Text style={styles.name}>{mod.name}</Text>
        <Text style={styles.where}>
          <Text
            style={shopLink && styles.link}
            onPress={shopLink ? () => router.push(`/user/${shopLink}`) : undefined}
          >
            {mod.shop}
          </Text>
          {` · ${mod.date}`}
        </Text>
        {mod.note && <Text style={styles.note}>{mod.note}</Text>}
      </View>
      {mod.cost !== undefined && <Text style={styles.cost}>{t.euro(withCommas(mod.cost))}</Text>}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.md },
    text: { flex: 1, gap: spacing.xxs },
    name: { ...typography.name, color: colors.text },
    where: { ...typography.small, color: colors.textMuted },
    link: { color: colors.primaryLight, fontWeight: typography.label.fontWeight },
    note: { ...typography.paragraph, color: colors.textMuted },
    cost: { ...typography.label, color: colors.text },
  }),
);
