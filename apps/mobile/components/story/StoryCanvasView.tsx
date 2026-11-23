import type { ReactNode } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import type { StoryCanvas } from '../../data/stories';

export type StoryCanvasViewProps = {
  canvas: StoryCanvas;
  children: ReactNode; // the photo or video, full screen
};

// An edited story's photo / video as it was arranged: the background colour, with the
// photo moved, scaled and rotated on top. (Stickers are drawn separately, above the
// story's dark fade, by StoryStickers.)
export function StoryCanvasView({ canvas, children }: StoryCanvasViewProps) {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: canvas.background }]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [
              { translateX: canvas.x * width },
              { translateY: canvas.y * height },
              { scale: canvas.scale },
              { rotate: `${canvas.rotation}rad` },
            ],
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}
