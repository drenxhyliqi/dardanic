import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import {
  makeStyles,
  sizes,
  spacing,
  radius,
  typography,
  useColors,
  useTheme,
  type ThemePreference,
} from '../../theme';

const OPTIONS: {
  value: ThemePreference;
  icon: 'sunny-outline' | 'moon-outline' | 'phone-portrait-outline';
}[] = [
  { value: 'light', icon: 'sunny-outline' },
  { value: 'dark', icon: 'moon-outline' },
  { value: 'system', icon: 'phone-portrait-outline' },
];

// Settings → Theme: Light, Dark or Automatic (follows the phone). The ✓ marks the choice,
// and the whole app switches straight away. The choice is saved on the phone.
export function ThemePicker() {
  const styles = useStyles();
  const colors = useColors();
  const { preference, setPreference } = useTheme();
  const t = strings.settings;

  return (
    <View style={styles.section}>
      <Text style={styles.heading} accessibilityRole="header">
        {t.theme}
      </Text>
      <View style={styles.card} accessibilityRole="radiogroup">
        {OPTIONS.map(({ value, icon }, i) => {
          const selected = preference === value;
          return (
            <Pressable
              key={value}
              onPress={() => setPreference(value)}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              style={({ pressed }) => [
                styles.row,
                i > 0 && styles.divider,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name={icon} size={sizes.icon} color={colors.text} />
              <Text style={styles.label}>{t.themes[value]}</Text>
              {selected && <Ionicons name="checkmark" size={sizes.icon} color={colors.primary} />}
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.hint}>{t.themeHint}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    section: {
      gap: spacing.sm,
    },
    heading: {
      ...typography.badge,
      color: colors.textMuted,
      textTransform: 'uppercase',
      marginLeft: spacing.xs,
    },
    card: {
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    divider: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.surfaceBorder,
    },
    pressed: {
      backgroundColor: colors.surfaceBorder,
    },
    label: {
      ...typography.body,
      color: colors.text,
      flex: 1,
    },
    hint: {
      ...typography.small,
      color: colors.textMuted,
      marginLeft: spacing.xs,
    },
  }),
);
