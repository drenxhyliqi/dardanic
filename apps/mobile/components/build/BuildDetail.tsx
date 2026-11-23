import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { GarageCar } from '../../data/garage';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { BuildHero } from './BuildHero';
import { BuildLog } from './BuildLog';
import { BuildMods } from './BuildMods';
import { BuildSpecs } from './BuildSpecs';
import { BuildStats } from './BuildStats';
import { PowerGain } from './PowerGain';

// A car's full build page, everything an enthusiast wants to know: the photo, key
// numbers, how far along a project is, the power gained, the spec sheet, every mod
// (where, when, cost) with the total invested, and the build log.
export function BuildDetail({ car }: { car: GarageCar }) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const percent = car.progress !== undefined ? Math.round(car.progress * 100) : null;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xxl }}
    >
      <BuildHero car={car} />
      <View style={styles.content}>
        <View style={styles.card}>
          <BuildStats car={car} />
        </View>
        {percent !== null && (
          <View style={styles.progress}>
            <Text style={styles.progressText}>{strings.profile.build.progress(percent)}</Text>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${percent}%` }]} />
            </View>
          </View>
        )}
        <PowerGain car={car} />
        <BuildSpecs car={car} />
        <BuildMods car={car} />
        <BuildLog entries={car.log} />
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { gap: spacing.xl, padding: spacing.lg },
    card: {
      paddingVertical: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    progress: { gap: spacing.sm },
    progressText: { ...typography.label, color: colors.text },
    track: {
      height: sizes.spotsBar,
      overflow: 'hidden',
      borderRadius: radius.full,
      backgroundColor: colors.surfaceBorder,
    },
    fill: { height: '100%', borderRadius: radius.full, backgroundColor: colors.primary },
  }),
);
