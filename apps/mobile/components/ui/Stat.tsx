import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, typography } from '../../theme';

export type StatProps = {
  value: string;
  label: string;
  centered?: boolean;
};

// A big number with a small label underneath (e.g. 420 / HP).
export function Stat({ value, label, centered = false }: StatProps) {
  const styles = useStyles();
  return (
    <View style={centered && styles.centered}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    centered: {
      alignItems: 'center',
    },
    value: {
      ...typography.stat,
      color: colors.text,
    },
    label: {
      ...typography.badge,
      color: colors.textMuted,
      textTransform: 'uppercase',
    },
  }),
);
