import { StyleSheet, Text } from 'react-native';

import { makeStyles, typography } from '../../theme';

const MENTION = /(@[\w.]+)/g;

// A comment's text, with @mentions in blue.
export function CommentText({ text }: { text: string }) {
  const styles = useStyles();
  return (
    <Text style={styles.text}>
      {text.split(MENTION).map((part, index) =>
        part.startsWith('@') ? (
          <Text key={index} style={styles.mention}>
            {part}
          </Text>
        ) : (
          part
        ),
      )}
    </Text>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    text: {
      ...typography.paragraph,
      color: colors.text,
    },
    mention: {
      color: colors.primaryLight,
      fontWeight: typography.label.fontWeight,
    },
  }),
);
