import { StyleSheet, View } from 'react-native';

import { strings } from '../../i18n';
import { spacing } from '../../theme';
import { Button } from '../ui/Button';

// Edit profile and Share profile, two equal text buttons side by side.
export function ProfileActions() {
  const t = strings.profile;

  return (
    <View style={styles.row}>
      <View style={styles.half}>
        <Button label={t.editProfile} variant="secondary" small />
      </View>
      <View style={styles.half}>
        <Button label={t.share} variant="secondary" small />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  half: {
    flex: 1,
  },
});
