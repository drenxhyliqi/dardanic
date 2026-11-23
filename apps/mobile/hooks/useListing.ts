import { useEffect, useState } from 'react';

import { useMarketplace } from '../context/MarketplaceContext';
import { marketplaceService, type Listing } from '../services/marketplace';

// One listing by id: your own come straight from what you published, the rest load from
// the Marketplace service. listing = null when it doesn't exist (or was removed).
export function useListing(id: string) {
  const { mine } = useMarketplace();
  const own = mine.find((listing) => listing.id === id);
  const [loaded, setLoaded] = useState<Listing | null | undefined>(undefined);

  useEffect(() => {
    if (own) return;
    let current = true;
    setLoaded(undefined);
    marketplaceService.get(id).then((listing) => current && setLoaded(listing ?? null));
    return () => {
      current = false;
    };
  }, [id, own]);

  return { listing: own ?? loaded, mine: Boolean(own), isLoading: !own && loaded === undefined };
}
