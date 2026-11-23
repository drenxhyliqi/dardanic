import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps, type ReactNode, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type TextFieldProps = Omit<TextInputProps, 'style' | 'secureTextEntry'> & {
  label?: string; // shown above the field; leave out for e.g. a search bar
  password?: boolean;
  icon?: IconName; // small icon inside the field, on the left
  right?: ReactNode; // extra content inside the field, on the right (e.g. a clear button)
  round?: boolean; // search bar look: fully rounded, slimmer, smaller text
};

// A labelled text input (autocorrect off). password = hidden text with a show/hide eye button.
// multiline = a taller box for longer text (e.g. a bio).
export function TextField({
  label,
  password = false,
  icon,
  right,
  multiline,
  round = false,
  onFocus,
  onBlur,
  ...inputProps
}: TextFieldProps) {
  const styles = useStyles();
  const colors = useColors();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(password);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.field,
          round && styles.fieldRound,
          multiline && styles.fieldMultiline,
          focused && styles.fieldFocused,
        ]}
      >
        {icon && <Ionicons name={icon} size={sizes.icon} color={colors.textMuted} />}
        <TextInput
          // No autocorrect / spell check: people write in Albanian, and the phone would
          // "fix" it into English. A screen can still turn them back on.
          autoCorrect={false}
          spellCheck={false}
          {...inputProps}
          multiline={multiline}
          accessibilityLabel={label ?? inputProps.placeholder}
          secureTextEntry={hidden}
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.primary}
          style={[styles.input, round && styles.inputRound, multiline && styles.inputMultiline]}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />
        {password && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? strings.login.showPassword : strings.login.hidePassword}
            onPress={() => setHidden((h) => !h)}
            hitSlop={spacing.sm}
          >
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={sizes.icon}
              color={colors.textMuted}
            />
          </Pressable>
        )}
        {right}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    container: {
      gap: spacing.sm,
    },
    label: {
      ...typography.label,
      color: colors.text,
    },
    field: {
      height: sizes.input,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    fieldRound: {
      height: sizes.searchBar,
      borderRadius: radius.full,
    },
    fieldMultiline: {
      height: 'auto',
      minHeight: sizes.bioField,
      alignItems: 'flex-start',
      paddingVertical: spacing.md,
    },
    fieldFocused: {
      borderColor: colors.borderFocus,
    },
    input: {
      ...typography.input,
      flex: 1,
      height: '100%',
      color: colors.text,
    },
    inputRound: typography.paragraph,
    inputMultiline: {
      height: 'auto',
      textAlignVertical: 'top',
    },
  }),
);
