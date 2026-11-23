import { useEffect, useMemo, useRef } from 'react';
import { PanResponder } from 'react-native';

const START_AFTER = 12; // px to the left before it counts as a swipe
const CLOSE_AFTER = 60; // px (or a quick flick) to close
const FLICK = -0.5;

// On the story camera: swipe left to close it (it slides back out to the left, where
// it came from). Taps and holding the shutter are left alone.
export function useSwipeToClose(onClose: () => void) {
  // Kept in a ref so the swipe handlers are built once and never reset mid-swipe.
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  }, [onClose]);

  return useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
          gesture.dx < -START_AFTER && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.5,
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dx < -CLOSE_AFTER || gesture.vx < FLICK) close.current();
        },
      }).panHandlers,
    [],
  );
}
