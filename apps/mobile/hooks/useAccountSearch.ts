import { useEffect, useState } from 'react';

import { searchService, type AccountResults } from '../services/search';

const PAUSE_MS = 250; // wait until typing pauses before searching

// People and businesses matching what's typed, searched once typing pauses.
export function useAccountSearch(query: string) {
  const [results, setResults] = useState<AccountResults>({ people: [], businesses: [] });
  const [isLoading, setIsLoading] = useState(false);
  const trimmed = query.trim();

  useEffect(() => {
    if (!trimmed) return;
    let current = true;
    setIsLoading(true);
    const timer = setTimeout(() => {
      searchService.searchAccounts(trimmed).then((found) => {
        if (!current) return;
        setResults(found);
        setIsLoading(false);
      });
    }, PAUSE_MS);
    return () => {
      current = false;
      clearTimeout(timer);
    };
  }, [trimmed]);

  return { results, isLoading };
}
