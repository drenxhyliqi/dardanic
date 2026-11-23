import type { StoryItem } from '../../data/stories';
import { LoadingImage } from '../ui/LoadingImage';
import { StoryCanvasView } from './StoryCanvasView';
import { StoryVideo } from './StoryVideo';

export type StoryMediaViewProps = {
  item: StoryItem;
  playing: boolean; // videos only: play / pause
  onLoaded: () => void; // ready to show: starts the progress bar
};

// One story, full screen: the photo, or the video when it's a video story, arranged
// the way it was edited (if it was). Stickers are drawn on top by StoryStickers.
export function StoryMediaView({ item, playing, onLoaded }: StoryMediaViewProps) {
  const media = item.video ? (
    <StoryVideo key={item.id} uri={item.video} playing={playing} onReady={onLoaded} />
  ) : (
    <LoadingImage
      key={item.id}
      source={{ uri: item.photo }}
      resizeMode="cover"
      onLoadEnd={onLoaded}
    />
  );
  // Edited stories: background, moved / scaled / rotated photo, stickers.
  return item.canvas ? (
    <StoryCanvasView canvas={item.canvas}>
      {media}
    </StoryCanvasView>
  ) : (
    media
  );
}
