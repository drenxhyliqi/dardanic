import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useSuggestions } from '../../hooks/useSuggestions';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { SuggestionCard } from './SuggestionCard';

// "Suggested for you" on someone's profile: accounts with similar vibes, as cards
// scrolling sideways. Nothing shows when there are no suggestions left.
export function SuggestedAccounts({ username }: { username: string }) {
  const styles = useStyles();
  const { suggestions, hide } = useSuggestions(username);
  if (suggestions.length === 0) return null;

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{strings.suggestions.title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.person.username}
            suggestion={suggestion}
            onHide={() => hide(suggestion.person.username)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    block: { gap: spacing.md },
    title: { ...typography.label, paddingHorizontal: spacing.xl, color: colors.text },
    row: { gap: spacing.sm, paddingHorizontal: spacing.xl },
  }),
);
