import type { CameraView } from 'expo-camera';
import { useMicrophonePermissions } from 'expo-camera';
import { useCallback, useRef, useState, type RefObject } from 'react';

import { strings } from '../../../i18n';
import type { StoryMedia } from '../../../utils/pickImage';

export const MAX_SECONDS = 15;
const MODE_SWITCH_MS = 250; // let the camera switch to video before recording

// Photo and video for the story camera. The camera normally takes photos; holding the
// shutter switches it to video, records (up to 15 s, with sound if the microphone is
// allowed) and letting go stops. Gives back the result through onCaptured.
export function useStoryRecorder(
  camera: RefObject<CameraView | null>,
  onCaptured: (media: StoryMedia) => void,
  onError: (message: string) => void, // e.g. recording isn't possible on the simulator
) {
  const [mode, setMode] = useState<'picture' | 'video'>('picture');
  const [recording, setRecording] = useState(false);
  const [mic, askMic] = useMicrophonePermissions();
  const startedAt = useRef(0);
  const stopEarly = useRef(false);

  const takePhoto = useCallback(async () => {
    try {
      const photo = await camera.current?.takePictureAsync({ quality: 0.9 });
      if (photo) onCaptured({ uri: photo.uri, kind: 'photo' });
    } catch {
      onError(strings.story.photoFailed);
    }
  }, [camera, onCaptured, onError]);

  const startVideo = useCallback(async () => {
    stopEarly.current = false;
    if (!mic?.granted && mic?.canAskAgain !== false) await askMic();
    setMode('video');
    setRecording(true);
    await new Promise((resolve) => setTimeout(resolve, MODE_SWITCH_MS));
    if (stopEarly.current) {
      setRecording(false);
      setMode('picture');
      return;
    }
    startedAt.current = Date.now();
    try {
      const video = await camera.current?.recordAsync({ maxDuration: MAX_SECONDS });
      const durationMs = Date.now() - startedAt.current;
      if (video?.uri) onCaptured({ uri: video.uri, kind: 'video', durationMs });
    } catch {
      onError(strings.story.videoFailed);
    } finally {
      setRecording(false);
      setMode('picture');
    }
  }, [mic, askMic, camera, onCaptured, onError]);

  const stopVideo = useCallback(() => {
    stopEarly.current = true; // let go before recording had started
    camera.current?.stopRecording();
  }, [camera]);

  return { mode, recording, muted: !mic?.granted, takePhoto, startVideo, stopVideo };
}
