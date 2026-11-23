import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

export type StoryVideoProps = {
  uri: string;
  playing: boolean; // paused while holding, typing, or not on screen
  loop?: boolean; // the preview loops; in the viewer the bar decides when it ends
  onReady?: () => void; // first frame is ready (starts the story's progress bar)
};

// A full-screen video for stories: fills the screen (cropped like the photos), no
// controls, plays and pauses with `playing`.
export function StoryVideo({ uri, playing, loop = false, onReady }: StoryVideoProps) {
  const player = useVideoPlayer(uri, (created) => {
    created.loop = loop;
  });

  useEffect(() => {
    const subscription = player.addListener('statusChange', ({ status }) => {
      if (status === 'readyToPlay') onReady?.();
    });
    if (player.status === 'readyToPlay') onReady?.();
    return () => subscription.remove();
  }, [player, onReady]);

  useEffect(() => {
    if (playing) player.play();
    else player.pause();
  }, [player, playing]);

  return (
    <VideoView
      player={player}
      style={StyleSheet.absoluteFill}
      contentFit="cover"
      nativeControls={false}
      allowsPictureInPicture={false}
    />
  );
}
