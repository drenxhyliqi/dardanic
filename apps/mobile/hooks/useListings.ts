import { useCallback, useEffect, useState } from 'react';

import { marketplaceService, type Listing, type MarketFilter } from '../services/marketplace';

// Live listings for the current category / search, searched once typing pauses. Gives
// back the listings, loading, and a refresh for pull-to-refresh.
// Becomes a TanStack Query hook with the backend.
export function useListings(filter: MarketFilter) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category, query } = filter;

  useEffect(() => {
    let current = true;
    setIsLoading(true);
    const timer = setTimeout(() => {
      marketplaceService.list({ category, query }).then((list) => {
        if (!current) return;
        setListings(list);
        setIsLoading(false);
      });
    }, query ? 250 : 0);
    return () => {
      current = false;
      clearTimeout(timer);
    };
  }, [category, query]);

  const refresh = useCallback(async () => {
    setListings(await marketplaceService.list({ category, query }));
  }, [category, query]);

  return { listings, isLoading, refresh };
}
