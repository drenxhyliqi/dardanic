import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, spacing, typography } from '../../theme';

export type TagProps = {
  label: string;
  tone?: 'blue' | 'quiet' | 'outline'; // blue fill, quiet grey, or blue outline
};

// A small rounded label (mods, roles, Featured, Following…).
export function Tag({ label, tone = 'quiet' }: TagProps) {
  const tones = useTones();
  const styles = useStyles();
  return (
    <View style={[styles.tag, tones[tone]]}>
      <Text
        style={[
          styles.text,
          tone === 'blue' && styles.textOnBlue,
          tone === 'outline' && styles.textBlue,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

const useTones = makeStyles((colors) =>
  StyleSheet.create({
    blue: { backgroundColor: colors.primary, flexShrink: 0 }, // never cut short
    quiet: { backgroundColor: colors.surfaceBorder },
    outline: { borderWidth: 1, borderColor: colors.primary },
  }),
);

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    tag: {
      alignSelf: 'flex-start',
      flexShrink: 1,
      paddingVertical: spacing.xxs,
      paddingHorizontal: spacing.sm,
      borderRadius: radius.sm,
    },
    text: {
      ...typography.small,
      color: colors.textMuted,
    },
    textOnBlue: {
      color: colors.white,
    },
    textBlue: {
      color: colors.primary,
    },
  }),
);
