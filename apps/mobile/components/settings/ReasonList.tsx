import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';

export type ReasonListProps = {
  reasons: readonly string[];
  value: string | null;
  onChange: (reason: string | null) => void; // tap the chosen one again to clear it
};

// Pick one reason from a list (round tick on the left), e.g. why you're leaving or
// why you're reporting something.
export function ReasonList({ reasons, value, onChange }: ReasonListProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.list}>
      {reasons.map((reason) => {
        const chosen = reason === value;
        return (
          <Pressable
            key={reason}
            onPress={() => onChange(chosen ? null : reason)}
            accessibilityRole="radio"
            accessibilityState={{ selected: chosen }}
            style={styles.row}
          >
            <Ionicons
              name={chosen ? 'radio-button-on' : 'radio-button-off'}
              size={sizes.icon}
              color={chosen ? colors.primary : colors.textMuted}
            />
            <Text style={styles.text}>{reason}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    list: { gap: spacing.xs },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: spacing.sm,
    },
    text: { ...typography.body, flex: 1, color: colors.text },
  }),
);
