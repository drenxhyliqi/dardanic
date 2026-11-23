import { StyleSheet, Text, View } from 'react-native';

import type { CountryCode } from '../../data/plateCountries';
import { makeStyles, radius, sizes, typography } from '../../theme';

// A country shown the way plates show it: its code (RKS, D, CH…) in white on the blue
// strip from the left edge of a European plate. Used instead of flags.
export function CountryCodeBadge({ code }: { code: CountryCode }) {
  const styles = useStyles();
  return (
    <View style={styles.badge}>
      <Text style={styles.code}>{code}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    badge: {
      width: sizes.codeBadgeWidth,
      height: sizes.codeBadge,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.sm,
      backgroundColor: colors.primary,
    },
    code: {
      ...typography.plateCode,
      color: colors.white,
    },
  }),
);
