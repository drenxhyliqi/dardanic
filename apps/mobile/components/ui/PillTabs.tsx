import { Pressable, StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, spacing, typography } from '../../theme';

export type PillTab<Key extends string> = { key: Key; label: string };

export type PillTabsProps<Key extends string> = {
  tabs: PillTab<Key>[];
  active: Key;
  onChange: (key: Key) => void;
};

// A row of pill-shaped tabs (e.g. Chats / Requests); the active one is filled.
export function PillTabs<Key extends string>({ tabs, active, onChange }: PillTabsProps<Key>) {
  const styles = useStyles();
  return (
    <View style={styles.row} accessibilityRole="tablist">
      {tabs.map((tab) => {
        const selected = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={[styles.pill, selected && styles.pillActive]}
          >
            <Text style={[styles.label, selected && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    pill: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
    },
    pillActive: {
      borderColor: colors.text,
      backgroundColor: colors.text,
    },
    label: {
      ...typography.label,
      color: colors.text,
    },
    labelActive: {
      color: colors.background,
    },
  }),
);
