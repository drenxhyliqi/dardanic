import { useRef, type ComponentRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';

const LENGTH = 6;

export type CodeInputProps = {
  value: string;
  onChange: (code: string) => void;
};

// Six boxes for a one-time code. One hidden field takes the typing (and the code iOS
// suggests from the SMS / email); the boxes just show the digits, with the next box
// highlighted.
export function CodeInput({ value, onChange }: CodeInputProps) {
  const styles = useStyles();
  const input = useRef<ComponentRef<typeof TextInput>>(null);
  return (
    <Pressable
      onPress={() => input.current?.focus()}
      accessibilityLabel={strings.auth.codeLabel}
    >
      <View style={styles.row}>
        {Array.from({ length: LENGTH }, (_, index) => (
          <View key={index} style={[styles.box, index === value.length && styles.boxActive]}>
            <Text style={styles.digit}>{value[index] ?? ''}</Text>
          </View>
        ))}
      </View>
      <TextInput
        ref={input}
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, LENGTH))}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        maxLength={LENGTH}
        autoFocus
        caretHidden
        style={styles.hidden}
      />
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
    box: {
      flex: 1,
      height: sizes.button,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    boxActive: { borderColor: colors.primary },
    digit: { ...typography.title, color: colors.text },
    hidden: { position: 'absolute', opacity: 0, width: 1, height: 1 },
  }),
);
