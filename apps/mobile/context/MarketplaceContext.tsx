import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { marketplaceService, type Listing, type ListingDraft } from '../services/marketplace';

type MarketplaceValue = {
  mine: Listing[]; // what you've published, with its status
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
  isHidden: (id: string) => boolean;
  hide: (id: string) => void; // "Hide listing": never show it to you again
  hasNew: boolean; // listings went up since you last opened the Marketplace (red dot)
  markSeen: () => void; // you opened the Marketplace
  publish: (draft: ListingDraft) => Promise<Listing>;
};

const MarketplaceContext = createContext<MarketplaceValue | null>(null);

// Until there's a server remembering your last visit: anything from the last hour
// counts as new when the app opens.
const FIRST_VISIT_WINDOW = 60 * 60_000;

// Your side of the Marketplace: listings you saved, hid and published, and whether
// there's something new since your last visit (the red dot on the tab).
// Publishing goes through the Marketplace service (which runs the car-related check).
export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [mine, setMine] = useState<Listing[]>([]);
  const [saved, setSaved] = useState<ReadonlySet<string>>(new Set());
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());

  const hide = useCallback((id: string) => setHidden((set) => new Set(set).add(id)), []);
  const [lastSeen, setLastSeen] = useState(() => Date.now() - FIRST_VISIT_WINDOW);
  const [newestAt, setNewestAt] = useState(0);
  const markSeen = useCallback(() => setLastSeen(Date.now()), []);

  useEffect(() => {
    marketplaceService.newestAt().then(setNewestAt);
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSaved((set) => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const publish = useCallback(async (draft: ListingDraft) => {
    const listing = await marketplaceService.publish(draft);
    setMine((list) => [listing, ...list]);
    return listing;
  }, []);

  const value = useMemo<MarketplaceValue>(
    () => ({
      mine,
      isSaved: (id) => saved.has(id),
      toggleSave,
      isHidden: (id) => hidden.has(id),
      hide,
      hasNew: newestAt > lastSeen,
      markSeen,
      publish,
    }),
    [mine, saved, toggleSave, hidden, hide, newestAt, lastSeen, markSeen, publish],
  );
  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace(): MarketplaceValue {
  const value = useContext(MarketplaceContext);
  if (!value) throw new Error('useMarketplace must be used inside MarketplaceProvider');
  return value;
}
