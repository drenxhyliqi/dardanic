import { StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '../theme';

export type CenteredTitleProps = {
  title: string;
};

// A full-screen dark view with one line of text in the middle.
export function CenteredTitle({ title }: CenteredTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    ...typography.display,
    color: colors.text,
  },
});
