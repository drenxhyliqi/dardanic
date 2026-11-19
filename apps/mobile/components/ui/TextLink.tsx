import { StyleSheet, Text } from 'react-native';

import { makeStyles, typography } from '../../theme';

export type TextLinkProps = {
  label: string;
  onPress: () => void;
};

// Tappable blue text, e.g. "Log in" or "Forgot password?". Blue because it's an action.
export function TextLink({ label, onPress }: TextLinkProps) {
  const styles = useStyles();
  return (
    <Text accessibilityRole="link" onPress={onPress} suppressHighlighting style={styles.link}>
      {label}
    </Text>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    link: {
      ...typography.link,
      color: colors.primary,
    },
  }),
);
