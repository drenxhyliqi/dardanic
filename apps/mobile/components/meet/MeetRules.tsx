import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';

// The host's rules for the meet, each with a small tick.
export function MeetRules({ rules }: { rules: string[] }) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.list}>
      {rules.map((rule) => (
        <View key={rule} style={styles.row}>
          <Ionicons name="checkmark-circle-outline" size={sizes.icon} color={colors.primaryLight} />
          <Text style={styles.text}>{rule}</Text>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    list: { gap: spacing.sm },
    row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
    text: { ...typography.paragraph, flex: 1, color: colors.text },
  }),
);
