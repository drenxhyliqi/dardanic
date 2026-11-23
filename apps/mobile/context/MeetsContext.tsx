import * as Haptics from 'expo-haptics';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type MeetsValue = {
  isGoing: (meetId: string) => boolean;
  isInterested: (meetId: string) => boolean;
  toggleGoing: (meetId: string) => void; // small vibration when you join
  toggleInterested: (meetId: string) => void;
};

const MeetsContext = createContext<MeetsValue | null>(null);

const toggled = (set: ReadonlySet<string>, id: string) => {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
};

// Which meets you're going to or interested in, shared by the feed card and the meet
// page so they always agree. In memory until there's a backend.
export function MeetsProvider({ children }: { children: ReactNode }) {
  const [going, setGoing] = useState<ReadonlySet<string>>(new Set());
  const [interested, setInterested] = useState<ReadonlySet<string>>(new Set());

  const toggleGoing = useCallback(
    (id: string) => {
      if (!going.has(id)) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      setGoing((set) => toggled(set, id));
    },
    [going],
  );
  const toggleInterested = useCallback((id: string) => {
    setInterested((set) => toggled(set, id));
  }, []);

  const value = useMemo<MeetsValue>(
    () => ({
      isGoing: (id) => going.has(id),
      isInterested: (id) => interested.has(id),
      toggleGoing,
      toggleInterested,
    }),
    [going, interested, toggleGoing, toggleInterested],
  );
  return <MeetsContext.Provider value={value}>{children}</MeetsContext.Provider>;
}

export function useMeets(): MeetsValue {
  const value = useContext(MeetsContext);
  if (!value) throw new Error('useMeets must be used inside MeetsProvider');
  return value;
}
