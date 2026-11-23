import { StyleSheet, View } from 'react-native';

import { strings } from '../../../i18n';
import { spacing } from '../../../theme';
import { CameraIcon } from '../camera/CameraIcon';

const t = strings.story;

export type EditorToolbarProps = {
  onTag: () => void;
  onLocation: () => void;
  onBackground: () => void;
  onReset: () => void;
};

// The story editor's tools, down the right side: tag people, add a location,
// background colour, and put the photo back how it was.
export function EditorToolbar({ onTag, onLocation, onBackground, onReset }: EditorToolbarProps) {
  return (
    <View style={styles.column}>
      <CameraIcon icon="at" label={t.tagPeople} onPress={onTag} filled />
      <CameraIcon icon="location-outline" label={t.addLocation} onPress={onLocation} filled />
      <CameraIcon icon="color-palette-outline" label={t.background} onPress={onBackground} filled />
      <CameraIcon icon="refresh" label={t.resetPhoto} onPress={onReset} filled />
    </View>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.md },
});
