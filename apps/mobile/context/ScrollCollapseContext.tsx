import { createContext, useContext, useRef, type ReactNode } from 'react';
import { Animated } from 'react-native';

// One shared animated number for the main tabs: 0 = top bar and bottom bar at full size,
// 1 = collapsed (top bar slid away, bottom bar smaller). Any scrolling tab moves it
// (through pull-to-refresh / useCollapseOnScroll); the bottom bar and the Feed's top
// bar follow it.
const ScrollCollapseContext = createContext<Animated.Value | null>(null);

export function ScrollCollapseProvider({ children }: { children: ReactNode }) {
  const collapse = useRef(new Animated.Value(0)).current;
  return (
    <ScrollCollapseContext.Provider value={collapse}>{children}</ScrollCollapseContext.Provider>
  );
}

// The same, or null outside the tabs (pages without a bottom bar).
export function useOptionalScrollCollapse(): Animated.Value | null {
  return useContext(ScrollCollapseContext);
}

export function useScrollCollapse(): Animated.Value {
  const collapse = useContext(ScrollCollapseContext);
  if (!collapse) throw new Error('useScrollCollapse must be used inside ScrollCollapseProvider');
  return collapse;
}
