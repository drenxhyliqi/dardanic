import { StyleSheet, Text, View } from 'react-native';

import { makeStyles, radius, spacing, typography } from '../../theme';

// Short text on a story photo, in a solid black pill so it reads on any photo.
export function StoryCaption({ text }: { text: string }) {
  const styles = useStyles();
  return (
    <View style={styles.wrap} pointerEvents="none">
      <Text style={styles.pill}>{text}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    wrap: {
      position: 'absolute',
      left: spacing.xl,
      right: spacing.xl,
      bottom: '28%',
      alignItems: 'center',
    },
    pill: {
      ...typography.cardTitle,
      overflow: 'hidden',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radius.md,
      textAlign: 'center',
      color: colors.white,
      backgroundColor: colors.black,
    },
  }),
);
