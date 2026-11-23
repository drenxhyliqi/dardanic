import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import type { PasswordCheck } from '../../utils/password';

const ORDER: (keyof PasswordCheck)[] = ['length', 'letter', 'number', 'match'];

// The password checklist: each rule gets a blue tick once it's met, grey until then.
export function PasswordRules({ check }: { check: PasswordCheck }) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.list}>
      {ORDER.map((rule) => (
        <View key={rule} style={styles.row}>
          <Ionicons
            name={check[rule] ? 'checkmark-circle' : 'ellipse-outline'}
            size={sizes.chipIcon + 2}
            color={check[rule] ? colors.primary : colors.textMuted}
          />
          <Text style={[styles.text, check[rule] && styles.met]}>{strings.auth.rules[rule]}</Text>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    list: { gap: spacing.sm },
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    text: { ...typography.paragraph, color: colors.textMuted },
    met: { color: colors.text },
  }),
);
