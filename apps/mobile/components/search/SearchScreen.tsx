import { router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { FeedAuthor } from '../../data/feed';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { SearchField } from '../ui/SearchField';
import { AccountResults } from './AccountResults';
import { ExploreView } from './ExploreView';
import { RecentSearches } from './RecentSearches';

const t = strings.search;

// Search (🔍 on the Feed, a tab without its own icon, so the bottom bar stays).
// Before you tap the field: Explore (FindMe card + a grid of
// posts from people you don't follow). Tap the field: your recent searches. Type:
// matching people and businesses. Opening one adds it to your recent searches.
export function SearchScreen() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const history = useSearchHistory();
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const open = (person: FeedAuthor) => {
    Keyboard.dismiss();
    history.add(person);
    router.push(`/user/${person.username}`);
  };

  const cancel = () => {
    Keyboard.dismiss();
    setQuery('');
    setSearching(false);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.bar}>
        <View style={styles.field}>
          <SearchField
            placeholder={t.placeholder}
            query={query}
            onChange={setQuery}
            onFocus={() => setSearching(true)}
          />
        </View>
        {searching && (
          <Pressable onPress={cancel} accessibilityRole="button" hitSlop={spacing.sm}>
            <Text style={styles.cancel}>{t.cancel}</Text>
          </Pressable>
        )}
      </View>

      {!searching ? (
        <ExploreView />
      ) : query.trim() ? (
        <AccountResults query={query} onOpen={open} />
      ) : (
        <RecentSearches
          recent={history.recent}
          onOpen={open}
          onRemove={history.remove}
          onClear={history.clear}
        />
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    field: { flex: 1 },
    cancel: { ...typography.link, color: colors.primaryLight },
  }),
);
