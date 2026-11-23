import { useMemo, useRef, useState } from 'react';
import { Animated, PanResponder, useWindowDimensions } from 'react-native';

const START_AFTER = 12; // finger has to move down this far before the drag starts
const CLOSE_AFTER = 120; // let go below this → close
const CLOSE_SPEED = 1; // or flick down at least this fast
const CLOSE_MS = 200;

// Drag a story down to close it: the viewer follows your finger; let go far (or fast)
// enough and it slides away and calls onClose, otherwise it springs back.
// Only takes over clearly downward moves, so sideways swipes still change person.
// `dragging` is true while a drag is happening (the story pauses).
export function useSwipeDown(onClose: () => void) {
  const { height } = useWindowDimensions();
  const offset = useRef(new Animated.Value(0)).current;
  const [dragging, setDragging] = useState(false);

  const panHandlers = useMemo(() => {
    const springBack = () => {
      Animated.spring(offset, { toValue: 0, friction: 8, useNativeDriver: true }).start();
      setDragging(false);
    };
    return PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, move) =>
        move.dy > START_AFTER && move.dy > Math.abs(move.dx) * 1.5,
      onPanResponderGrant: () => setDragging(true),
      onPanResponderMove: (_, move) => offset.setValue(Math.max(0, move.dy)),
      onPanResponderRelease: (_, move) => {
        if (move.dy > CLOSE_AFTER || move.vy > CLOSE_SPEED) {
          Animated.timing(offset, {
            toValue: height,
            duration: CLOSE_MS,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          springBack();
        }
      },
      onPanResponderTerminate: springBack,
    }).panHandlers;
  }, [offset, height, onClose]);

  return { offset, dragging, panHandlers };
}
