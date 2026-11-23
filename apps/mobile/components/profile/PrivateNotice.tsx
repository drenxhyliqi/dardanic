import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

// Instead of the posts on a private profile you don't follow: a lock, "This account is
// private" and "Follow to see their photos and posts."
export function PrivateNotice() {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.wrap}>
      <View style={styles.circle}>
        <Ionicons name="lock-closed-outline" size={sizes.emptyIconGlyph} color={colors.text} />
      </View>
      <Text style={styles.title}>{strings.privacy.privateTitle}</Text>
      <Text style={styles.hint}>{strings.privacy.privateHint}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    wrap: {
      alignItems: 'center',
      gap: spacing.sm,
      paddingTop: spacing.xl,
      paddingHorizontal: spacing.xxl,
    },
    circle: {
      width: sizes.emptyIcon,
      height: sizes.emptyIcon,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
      borderRadius: radius.full,
      borderWidth: 1.5,
      borderColor: colors.text,
    },
    title: { ...typography.profileName, color: colors.text },
    hint: { ...typography.paragraph, textAlign: 'center', color: colors.textMuted },
  }),
);
