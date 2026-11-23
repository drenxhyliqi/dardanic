import { useEffect, useState } from 'react';

import { useMarketplace } from '../context/MarketplaceContext';
import { marketplaceService, type Listing } from '../services/marketplace';

// Listings like the one you're looking at (minus ones you hid): the first few for
// "Related listings", all of them for "Find similar". null while loading.
export function useSimilarListings(listing: Listing, limit?: number) {
  const { isHidden } = useMarketplace();
  const [related, setRelated] = useState<Listing[] | null>(null); // null = loading

  useEffect(() => {
    let current = true;
    setRelated(null);
    marketplaceService.similar(listing, limit).then((list) => current && setRelated(list));
    return () => {
      current = false;
    };
  }, [listing, limit]);

  return related && related.filter((other) => !isHidden(other.id));
}
