import { StyleSheet, View } from 'react-native';

import { strings } from '../../i18n';
import { spacing } from '../../theme';
import { Button } from '../ui/Button';
import { StoryPanel } from './StoryPanel';

export type OwnStoryMenuProps = {
  onDelete: () => void;
  onClose: () => void;
};

// ••• on your own story: Delete story (this photo / video only) or Cancel.
export function OwnStoryMenu({ onDelete, onClose }: OwnStoryMenuProps) {
  return (
    <StoryPanel onClose={onClose}>
      <View style={styles.buttons}>
        <Button
          label={strings.story.deleteStory}
          icon="trash-outline"
          variant="secondary"
          small
          centered
          onPress={onDelete}
        />
        <Button label={strings.story.cancel} variant="secondary" small centered onPress={onClose} />
      </View>
    </StoryPanel>
  );
}

const styles = StyleSheet.create({
  buttons: { gap: spacing.sm },
});
