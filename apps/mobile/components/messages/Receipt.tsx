import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';
import { FlameIcon } from '../flame/FlameIcon';

export type ReceiptStatus = 'delivered' | 'seen';

// Under your latest message: a small flame that's unlit (grey outline) while it's only
// delivered and lights up red once they've seen it, with the word next to it so it
// isn't mistaken for a flame on the message.
export function Receipt({ status }: { status: ReceiptStatus }) {
  const styles = useStyles();
  const colors = useColors();
  const seen = status === 'seen';
  return (
    <View style={styles.row} accessibilityLabel={strings.messages[status]}>
      <FlameIcon size={sizes.chipIcon} flamed={seen} color={colors.textMuted} />
      <Text style={styles.text}>{strings.messages[status]}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xxs, marginTop: spacing.xs },
    text: { ...typography.small, color: colors.textMuted },
  }),
);
