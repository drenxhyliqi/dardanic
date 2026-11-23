import Ionicons from '@expo/vector-icons/Ionicons';
import { Linking, Pressable, StyleSheet, Text } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../theme';

// A person's Instagram on their profile: the Instagram logo and @handle in blue.
// Tapping it opens their Instagram (the app if installed, otherwise the website).
export function InstagramLink({ handle }: { handle: string }) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={() => Linking.openURL(`https://instagram.com/${handle}`).catch(() => {})}
      accessibilityRole="link"
      accessibilityLabel={strings.profile.openInstagram(handle)}
      hitSlop={spacing.sm}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Ionicons name="logo-instagram" size={sizes.icon} color={colors.primaryLight} />
      <Text style={styles.handle}>@{handle}</Text>
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, alignSelf: 'flex-start' },
    pressed: { opacity: 0.6 },
    handle: { ...typography.label, color: colors.primaryLight },
  }),
);
