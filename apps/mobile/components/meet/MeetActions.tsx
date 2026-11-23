import { StyleSheet, View } from 'react-native';

import { strings } from '../../i18n';
import { spacing } from '../../theme';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';

const t = strings.feed.meet;

export type MeetActionsProps = {
  joined: boolean;
  interested: boolean;
  onToggleJoin: () => void;
  onToggleInterested: () => void;
};

// The buttons on a meet: a big blue "I'm going" (turns into "Going ✓"), then round
// buttons for Interested, Directions and Share. Directions and Share do nothing yet
// (directions will open the Map tab).
export function MeetActions(props: MeetActionsProps) {
  const { joined, interested, onToggleJoin, onToggleInterested } = props;
  return (
    <View style={styles.row}>
      <View style={styles.main}>
        <Button
          label={joined ? t.joined : t.join}
          icon={joined ? 'checkmark' : 'flag-outline'}
          variant={joined ? 'secondary' : 'primary'}
          small
          strong
          onPress={onToggleJoin}
        />
      </View>
      <IconButton
        icon={interested ? 'star' : 'star-outline'}
        label={interested ? t.notInterested : t.interested}
        round
        onPress={onToggleInterested}
      />
      <IconButton icon="navigate-outline" label={t.directions} round />
      <IconButton icon="share-outline" label={t.share} round />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  main: {
    flex: 1,
  },
});
