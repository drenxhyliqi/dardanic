import { useMemo, useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

// Drag one thing around (a sticker). Starts at `start` (px, top-left corner); gives
// back the animated position, the touch handlers and where it is now.
export function useDragGesture(start: { x: number; y: number }) {
  const position = useRef({ ...start });
  const origin = useRef({ ...start });
  const animated = useMemo(() => new Animated.ValueXY(origin.current), []); // created once

  const panHandlers = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          origin.current = { ...position.current };
        },
        onPanResponderMove: (_, gesture) => {
          position.current = { x: origin.current.x + gesture.dx, y: origin.current.y + gesture.dy };
          animated.setValue(position.current);
        },
        onPanResponderTerminationRequest: () => false,
      }).panHandlers,
    [animated],
  );

  return { animated, panHandlers, current: () => position.current };
}
