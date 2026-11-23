import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

import type { FeedAuthor } from '../data/feed';

const STORAGE_KEY = 'dardanic.searchHistory';
const MAX_RECENT = 15;

// Your recent searches (people and businesses you opened from search), newest first,
// saved on the phone so they're still there after a restart.
export function useSearchHistory() {
  const [recent, setRecent] = useState<FeedAuthor[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => saved && setRecent(JSON.parse(saved) as FeedAuthor[]))
      .catch(() => {});
  }, []);

  const save = useCallback((next: FeedAuthor[]) => {
    setRecent(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const add = useCallback(
    (person: FeedAuthor) =>
      save([person, ...recent.filter((p) => p.username !== person.username)].slice(0, MAX_RECENT)),
    [recent, save],
  );
  const remove = useCallback(
    (username: string) => save(recent.filter((p) => p.username !== username)),
    [recent, save],
  );
  const clear = useCallback(() => save([]), [save]);

  return { recent, add, remove, clear };
}
