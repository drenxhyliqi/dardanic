import { router } from 'expo-router';
import { useMemo } from 'react';
import { PanResponder } from 'react-native';

const EDGE = 50; // the swipe has to start this close to the left edge
const START_AFTER = 12; // px to the right before it counts as a swipe
const OPEN_AFTER = 60; // px (or a quick flick) to open the camera
const FLICK = 0.5;

// Swipe from the left edge of the Feed to the right to open the story camera (it slides
// in from the left). Only from the edge, so swiping a post's photos or the stories row,
// and scrolling, work as usual.
export function useSwipeToCamera() {
  return useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (_, gesture) =>
          gesture.x0 < EDGE &&
          gesture.dx > START_AFTER &&
          Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.5,
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dx > OPEN_AFTER || gesture.vx > FLICK) router.push('/story/new');
        },
        onPanResponderTerminationRequest: () => false,
      }).panHandlers,
    [],
  );
}
