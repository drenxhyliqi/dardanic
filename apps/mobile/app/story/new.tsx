import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { CameraCapture } from '../../components/story/camera/CameraCapture';
import { StoryEditor } from '../../components/story/editor/StoryEditor';
import { useStories } from '../../context/StoriesContext';
import type { StoryMedia } from '../../utils/pickImage';

// Add to your story (the + on "Your story"): the camera, then the editor (move,
// resize, rotate, background, tag people, location), then it's on your story.
export default function NewStoryScreen() {
  const { addToMyStory } = useStories();
  const [media, setMedia] = useState<StoryMedia | null>(null);

  return (
    <>
      <StatusBar style="light" />
      {media ? (
        <StoryEditor
          media={media}
          onRetake={() => setMedia(null)}
          onShare={({ canvas, stickers }) => {
            addToMyStory({
              photo: media.uri,
              video: media.kind === 'video' ? media.uri : undefined,
              durationMs: media.durationMs,
              canvas,
              stickers,
            });
            router.back();
          }}
        />
      ) : (
        <CameraCapture onCaptured={setMedia} onClose={() => router.back()} />
      )}
    </>
  );
}
