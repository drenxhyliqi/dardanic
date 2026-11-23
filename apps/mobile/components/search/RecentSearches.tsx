import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { FeedAuthor } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { tabBarSpace } from '../tabs/FloatingTabBar';
import { AccountRow } from './AccountRow';

const t = strings.search;

export type RecentSearchesProps = {
  recent: FeedAuthor[];
  onOpen: (person: FeedAuthor) => void;
  onRemove: (username: string) => void;
  onClear: () => void;
};

// Shown when you tap the search field before typing: your recent searches, each with an
// ✕, and "Clear all".
export function RecentSearches({ recent, onOpen, onRemove, onClear }: RecentSearchesProps) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  return (
    <FlatList
      data={recent}
      keyExtractor={(person) => person.username}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: tabBarSpace(insets.bottom) }}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>{t.recent}</Text>
          {recent.length > 0 && (
            <Pressable onPress={onClear} accessibilityRole="button" hitSlop={spacing.sm}>
              <Text style={styles.clear}>{t.clearAll}</Text>
            </Pressable>
          )}
        </View>
      }
      ListEmptyComponent={<Text style={styles.empty}>{t.noRecent}</Text>}
      renderItem={({ item }) => (
        <AccountRow
          person={item}
          onPress={() => onOpen(item)}
          onRemove={() => onRemove(item.username)}
        />
      )}
    />
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    title: { ...typography.label, color: colors.text },
    clear: { ...typography.label, color: colors.primaryLight },
    empty: { ...typography.paragraph, paddingHorizontal: spacing.lg, color: colors.textMuted },
  }),
);
