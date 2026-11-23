import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';

// Next to a trusted automotive business's name: a blue check and the word "Business",
// no box around it.
export function BusinessBadge() {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.row}>
      <Ionicons name="checkmark-circle" size={sizes.chipIcon} color={colors.primary} />
      <Text style={styles.text}>{strings.common.business}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xxs,
      flexShrink: 0,
    },
    text: {
      ...typography.small,
      fontWeight: typography.label.fontWeight,
      color: colors.primaryLight,
    },
  }),
);
