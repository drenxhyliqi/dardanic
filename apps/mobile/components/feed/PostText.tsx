import { StyleSheet, Text } from 'react-native';

import { makeStyles, spacing, typography } from '../../theme';

export type PostTextProps = {
  text: string;
};

// The body of a text-only post (a status, like a tweet): bigger than a photo caption
// since it's the whole post, shown in full.
export function PostText({ text }: PostTextProps) {
  const styles = useStyles();
  return <Text style={styles.text}>{text}</Text>;
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    text: {
      ...typography.body,
      color: colors.text,
      paddingHorizontal: spacing.lg,
    },
  }),
);
