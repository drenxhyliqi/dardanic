import { useCallback, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { StoryCanvas, StorySticker } from '../../../data/stories';
import { strings } from '../../../i18n';
import { makeStyles, spacing, typography, useColors } from '../../../theme';
import type { StoryMedia } from '../../../utils/pickImage';
import { Button } from '../../ui/Button';
import { CameraIcon } from '../camera/CameraIcon';
import { StoryVideo } from '../StoryVideo';
import { BackgroundPicker } from './BackgroundPicker';
import { EditableSticker } from './EditableSticker';
import { EditorToolbar } from './EditorToolbar';
import { StickerPickers, type Panel } from './StickerPickers';
import { useTransformGesture } from './useTransformGesture';

const t = strings.story;
let nextId = 0;

type Point = { x: number; y: number };
type DraftSticker = StorySticker & { start: Point }; // start = where it first appears (px)

export type StoryEdit = { canvas: StoryCanvas; stickers: StorySticker[] };

export type StoryEditorProps = {
  media: StoryMedia;
  onRetake: () => void;
  onShare: (edit: StoryEdit) => void;
};

// Before a story goes up: move the photo / video with a finger, pinch to resize, twist
// to rotate; pick a background colour for behind it; tag people and add a location as
// stickers you can drag (× removes). × at the top left goes back to the camera.
export function StoryEditor({ media, onRetake, onShare }: StoryEditorProps) {
  const styles = useStyles();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const photo = useTransformGesture();
  const [background, setBackground] = useState(colors.storyBackgrounds[0]);
  const [stickers, setStickers] = useState<DraftSticker[]>([]);
  const [panel, setPanel] = useState<Panel | null>(null);
  const positions = useRef(new Map<string, () => Point>());
  const register = useCallback((id: string, current: () => Point) => {
    positions.current.set(id, current);
  }, []);

  const addSticker = (kind: StorySticker['kind'], text: string) => {
    const start = { x: width * 0.25, y: height * (0.4 + (stickers.length % 4) * 0.07) };
    setStickers((list) => [...list, { id: `st-${nextId++}`, kind, text, x: 0, y: 0, start }]);
    setPanel(null);
  };

  const share = () => {
    const now = photo.current();
    onShare({
      canvas: {
        background,
        x: now.x / width,
        y: now.y / height,
        scale: now.scale,
        rotation: now.rotation,
      },
      stickers: stickers.map(({ start, ...sticker }) => {
        const at = positions.current.get(sticker.id)?.() ?? start;
        return { ...sticker, x: at.x / width, y: at.y / height };
      }),
    });
  };

  return (
    <View style={[styles.screen, { backgroundColor: background }]}>
      <Animated.View style={[StyleSheet.absoluteFill, photo.style]} {...photo.panHandlers}>
        {media.kind === 'video' ? (
          <StoryVideo uri={media.uri} playing loop />
        ) : (
          <Image source={{ uri: media.uri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
        )}
      </Animated.View>
      {stickers.map((sticker) => (
        <EditableSticker
          key={sticker.id}
          sticker={sticker}
          start={sticker.start}
          register={register}
          onRemove={() => setStickers((list) => list.filter((item) => item.id !== sticker.id))}
        />
      ))}

      <View style={[styles.top, { paddingTop: insets.top + spacing.sm }]} pointerEvents="box-none">
        <CameraIcon icon="close" label={t.retake} onPress={onRetake} filled />
        <EditorToolbar
          onTag={() => setPanel('tag')}
          onLocation={() => setPanel('location')}
          onBackground={() => setPanel(panel === 'background' ? null : 'background')}
          onReset={photo.reset}
        />
      </View>

      <View
        style={[styles.bottom, { paddingBottom: insets.bottom + spacing.md }]}
        pointerEvents="box-none"
      >
        {panel === 'background' ? (
          <BackgroundPicker value={background} onChange={setBackground} />
        ) : (
          <Text style={styles.hint}>{t.editHint}</Text>
        )}
        <View style={styles.share}>
          <Button label={t.share} icon="add-circle-outline" strong centered onPress={share} />
        </View>
      </View>

      <StickerPickers panel={panel} onPick={addSticker} onClose={() => setPanel(null)} />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1 },
    top: {
      position: 'absolute',
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: spacing.lg,
    },
    bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, gap: spacing.md },
    hint: { ...typography.small, textAlign: 'center', color: colors.storyMuted },
    share: { paddingHorizontal: spacing.lg },
  }),
);
