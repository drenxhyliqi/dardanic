import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { SAMPLE_GARAGE } from '../../data/garage';
import { strings } from '../../i18n';
import type { Fitment } from '../../services/marketplace';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { fitsCar } from '../../utils/fitment';

// "Fits": every car the part fits; the ones in your garage are highlighted in blue with
// a tick and your car's name.
export function ListingFits({ fits }: { fits: Fitment[] }) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.list}>
      {fits.map((fit) => {
        const mine = SAMPLE_GARAGE.find((car) => fitsCar(fit, car));
        const label = [fit.brand, fit.model, fit.years].filter(Boolean).join(' · ');
        return (
          <View key={label} style={[styles.row, mine && styles.rowMine]}>
            <Ionicons
              name={mine ? 'checkmark-circle' : 'car-sport-outline'}
              size={sizes.icon}
              color={mine ? colors.primary : colors.textMuted}
            />
            <Text style={styles.text}>{label}</Text>
            {mine && <Text style={styles.mine}>{strings.marketplace.fitsYour(mine.model)}</Text>}
          </View>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    list: { gap: spacing.sm },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: spacing.sm,
      padding: spacing.md,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
    },
    rowMine: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
    text: { ...typography.label, color: colors.text },
    mine: { ...typography.small, color: colors.primaryLight },
  }),
);
