import { useState, type ReactNode } from 'react';
import { FlatList, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '../../../i18n';
import { makeStyles, radius, spacing, typography } from '../../../theme';
import { simplify } from '../../../utils/text';
import { SearchField } from '../../ui/SearchField';

export type PickerItem = { key: string; label: string; hint?: string; left?: ReactNode };

export type PickerPanelProps = {
  title: string;
  placeholder: string;
  items: PickerItem[];
  onPick: (item: PickerItem) => void;
  onClose: () => void;
};

// A panel over the story editor with a search field and a list to pick one from
// (people to tag, places to add). Tapping outside closes it.
export function PickerPanel({ title, placeholder, items, onPick, onClose }: PickerPanelProps) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const search = simplify(query.trim());
  const shown = search
    ? items.filter((item) => simplify(`${item.label} ${item.hint ?? ''}`).includes(search))
    : items;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
        accessibilityLabel={strings.common.close}
      />
      <KeyboardAvoidingView behavior="padding" style={styles.panelWrap} pointerEvents="box-none">
        <View style={[styles.panel, { paddingBottom: insets.bottom + spacing.md }]}>
          <Text style={styles.title}>{title}</Text>
          <SearchField placeholder={placeholder} query={query} onChange={setQuery} />
          <FlatList
            data={shown}
            keyExtractor={(item) => item.key}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable onPress={() => onPick(item)} accessibilityRole="button" style={styles.row}>
                {item.left}
                <View style={styles.rowText}>
                  <Text style={styles.label}>{item.label}</Text>
                  {item.hint && <Text style={styles.hint}>{item.hint}</Text>}
                </View>
              </Pressable>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    backdrop: { ...StyleSheet.absoluteFill, backgroundColor: colors.black, opacity: 0.5 },
    panelWrap: { flex: 1, justifyContent: 'flex-end' },
    panel: {
      height: '60%',
      gap: spacing.md,
      paddingTop: spacing.lg,
      paddingHorizontal: spacing.lg,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      backgroundColor: colors.background,
    },
    title: { ...typography.cardTitle, color: colors.text },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: spacing.sm,
    },
    rowText: { flex: 1 },
    label: { ...typography.name, color: colors.text },
    hint: { ...typography.small, color: colors.textMuted },
  }),
);
