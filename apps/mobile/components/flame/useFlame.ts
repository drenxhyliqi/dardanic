import * as Haptics from 'expo-haptics';
import { useCallback, useState } from 'react';

// Whether you've flamed a post or story (DARDANIC's "like"). Flaming gives a small
// vibration. Only kept on screen for now (no backend yet).
export function useFlame() {
  const [flamed, setFlamed] = useState(false);

  const setTo = useCallback((next: boolean) => {
    setFlamed(next);
    if (next) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }, []);

  const toggle = useCallback(() => setTo(!flamed), [flamed, setTo]);
  const flame = useCallback(() => setTo(true), [setTo]); // double-tap: always flames

  return { flamed, toggle, flame };
}
