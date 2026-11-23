import { useMemo, useRef } from 'react';
import { Animated, PanResponder, type GestureResponderEvent } from 'react-native';

const MIN_SCALE = 0.3;
const MAX_SCALE = 4;

export type Transform = { x: number; y: number; scale: number; rotation: number };
const START: Transform = { x: 0, y: 0, scale: 1, rotation: 0 };

type Touch = { pageX: number; pageY: number };
const distance = (a: Touch, b: Touch) => Math.hypot(b.pageX - a.pageX, b.pageY - a.pageY);
const angle = (a: Touch, b: Touch) => Math.atan2(b.pageY - a.pageY, b.pageX - a.pageX);
const clamp = (scale: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
const middle = (a: Touch, b: Touch) => ({ x: (a.pageX + b.pageX) / 2, y: (a.pageY + b.pageY) / 2 });

// Move with one finger; pinch to resize and twist to rotate with two. Built on React
// Native's own touch handling (no extra library). Gives back animated values for the
// transform, the touch handlers, and the current numbers (to save) plus a reset.
export function useTransformGesture() {
  const value = useRef({ ...START }); // where it is now (px, scale, radians)
  // Where the current touch started: the transform then, finger count, the two-finger
  // distance / angle / midpoint, and the first finger's position.
  const base = useRef({
    ...START,
    touches: 0,
    dist: 1,
    ang: 0,
    midX: 0,
    midY: 0,
    startX: 0,
    startY: 0,
  });
  const animated = useMemo(
    () => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      scale: new Animated.Value(1),
      rotation: new Animated.Value(0),
    }),
    [],
  );

  const apply = (next: Transform) => {
    value.current = next;
    animated.x.setValue(next.x);
    animated.y.setValue(next.y);
    animated.scale.setValue(next.scale);
    animated.rotation.setValue(next.rotation);
  };

  // Remember where this touch (one or two fingers) started from.
  const begin = (event: GestureResponderEvent) => {
    const touches = event.nativeEvent.touches;
    const [a, b] = touches;
    Object.assign(base.current, value.current, {
      touches: touches.length,
      startX: a?.pageX ?? 0,
      startY: a?.pageY ?? 0,
      ...(a && b
        ? { dist: distance(a, b), ang: angle(a, b), midX: middle(a, b).x, midY: middle(a, b).y }
        : {}),
    });
  };

  const move = (event: GestureResponderEvent) => {
    const touches = event.nativeEvent.touches;
    if (touches.length !== base.current.touches) return begin(event); // finger added/lifted
    const start = base.current;
    const [a, b] = touches;
    if (a && b) {
      const mid = middle(a, b);
      apply({
        x: start.x + mid.x - start.midX,
        y: start.y + mid.y - start.midY,
        scale: clamp(start.scale * (distance(a, b) / start.dist)),
        rotation: start.rotation + angle(a, b) - start.ang,
      });
    } else if (a) {
      const x = start.x + a.pageX - start.startX;
      apply({ ...value.current, x, y: start.y + a.pageY - start.startY });
    }
  };

  const panHandlers = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: begin,
        onPanResponderMove: move,
        onPanResponderTerminationRequest: () => false,
      }).panHandlers,
    // Built once: the handlers only read refs, so they never go stale.
    [],
  );

  const rotate = animated.rotation.interpolate({
    inputRange: [-Math.PI * 4, Math.PI * 4],
    outputRange: ['-720deg', '720deg'],
  });

  return {
    style: {
      transform: [
        { translateX: animated.x },
        { translateY: animated.y },
        { scale: animated.scale },
        { rotate },
      ],
    },
    panHandlers,
    current: () => value.current,
    reset: () => apply({ ...START }),
  };
}
