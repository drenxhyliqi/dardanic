import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export type StoryTimerOptions = {
  duration: number; // ms per photo
  running: boolean; // false while paused, loading, or not the active person
  resetKey: string; // change it (the photo's id) to start again from 0
  onFinish: () => void;
};

// Fills a progress value from 0 to 1 over `duration`, for the bar of the photo being
// shown. Pausing keeps track of the time already watched, so resuming continues
// where it stopped instead of starting over.
export function useStoryTimer({ duration, running, resetKey, onFinish }: StoryTimerOptions) {
  const progress = useRef(new Animated.Value(0)).current;
  const watched = useRef(0); // ms already shown of the current photo
  const finish = useRef(onFinish);

  useEffect(() => {
    finish.current = onFinish;
  }, [onFinish]);

  // New photo → back to the start.
  useEffect(() => {
    watched.current = 0;
    progress.setValue(0);
  }, [resetKey, progress]);

  useEffect(() => {
    if (!running) return;
    const startedAt = Date.now();
    progress.setValue(watched.current / duration);
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: Math.max(0, duration - watched.current),
      easing: Easing.linear,
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished) finish.current();
    });
    return () => {
      animation.stop();
      watched.current += Date.now() - startedAt;
    };
  }, [running, resetKey, duration, progress]);

  return progress;
}
