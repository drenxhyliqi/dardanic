import { CameraView, useCameraPermissions, type CameraType } from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '../../../i18n';
import { makeStyles, spacing, typography } from '../../../theme';
import { pickStoryMedia, type StoryMedia } from '../../../utils/pickImage';
import { CameraIcon } from './CameraIcon';
import { CameraPermission } from './CameraPermission';
import { RecordingTimer } from './RecordingTimer';
import { ShutterButton } from './ShutterButton';
import { useStoryRecorder } from './useStoryRecorder';
import { useSwipeToClose } from './useSwipeToClose';

const t = strings.story;
const PROBLEM_MS = 4000;

export type CameraCaptureProps = {
  onCaptured: (media: StoryMedia) => void;
  onClose: () => void;
};

// The story camera, full screen: × and flash at the top, then the live camera; at the
// bottom your library, the shutter (tap = photo, hold = video) and switch camera.
// While recording, only the shutter and the timer show.
export function CameraCapture({ onCaptured, onClose }: CameraCaptureProps) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const camera = useRef<CameraView>(null);
  const [permission, askPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState(false);
  const [unavailable, setUnavailable] = useState(false); // e.g. the iOS Simulator
  const [problem, setProblem] = useState<string | null>(null); // shown for a few seconds
  const recorder = useStoryRecorder(camera, onCaptured, useCallback(setProblem, []));
  const swipeToClose = useSwipeToClose(onClose);

  useEffect(() => {
    if (!problem) return;
    const timer = setTimeout(() => setProblem(null), PROBLEM_MS);
    return () => clearTimeout(timer);
  }, [problem]);
  const allowed = Boolean(permission?.granted);
  const busy = recorder.recording;

  const openGallery = async () => {
    const media = await pickStoryMedia();
    if (media) onCaptured(media);
  };
  const flip = () => setFacing((side) => (side === 'back' ? 'front' : 'back'));

  return (
    <View style={styles.screen} {...swipeToClose}>
      {allowed && (
        <CameraView
          ref={camera}
          style={StyleSheet.absoluteFill}
          facing={facing}
          mode={recorder.mode}
          flash={flash ? 'on' : 'off'}
          enableTorch={flash && busy}
          mute={recorder.muted}
          onMountError={() => setUnavailable(true)}
        />
      )}
      {permission && !allowed && (
        <CameraPermission
          canAsk={permission.canAskAgain}
          onAllow={askPermission}
          onGallery={openGallery}
        />
      )}
      {(unavailable || problem) && (
        <Text style={styles.notice}>{problem ?? t.noCamera}</Text>
      )}

      <View style={[styles.top, { paddingTop: insets.top + spacing.sm }]}>
        <CameraIcon icon="close" label={strings.common.close} onPress={onClose} />
        {allowed && !busy && (
          <CameraIcon
            icon={flash ? 'flash' : 'flash-off'}
            label={flash ? t.flashOn : t.flashOff}
            onPress={() => setFlash((on) => !on)}
          />
        )}
      </View>
      {busy && <RecordingTimer top={insets.top + spacing.sm} />}

      {allowed && (
        <View style={[styles.bottom, { paddingBottom: insets.bottom + spacing.lg }]}>
          {!busy && <Text style={styles.hint}>{t.cameraHint}</Text>}
          <View style={styles.controls}>
            <CameraIcon
              icon={busy ? undefined : 'images-outline'}
              label={t.gallery}
              onPress={openGallery}
            />
            <ShutterButton
              recording={busy}
              onPhoto={recorder.takePhoto}
              onRecordStart={recorder.startVideo}
              onRecordStop={recorder.stopVideo}
            />
            <CameraIcon
              icon={busy ? undefined : 'camera-reverse-outline'}
              label={t.flip}
              onPress={flip}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.black },
    top: {
      position: 'absolute',
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
    },
    notice: {
      ...typography.paragraph,
      position: 'absolute',
      top: '40%',
      left: spacing.xl,
      right: spacing.xl,
      textAlign: 'center',
      color: colors.storyMuted,
    },
    bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      gap: spacing.md,
      alignItems: 'center',
    },
    hint: { ...typography.small, color: colors.storyMuted },
    controls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      paddingHorizontal: spacing.xl,
    },
  }),
);
