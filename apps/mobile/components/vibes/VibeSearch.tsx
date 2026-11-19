import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';

import { strings } from '../../i18n';
import { sizes, spacing, useColors } from '../../theme';
import { TextField } from '../ui/TextField';

export type VibeSearchProps = {
  query: string;
  onChange: (query: string) => void;
};

// Search bar for vibes, with a clear (✕) button once something is typed.
export function VibeSearch({ query, onChange }: VibeSearchProps) {
  const colors = useColors();
  const t = strings.vibes;

  return (
    <TextField
      placeholder={t.searchPlaceholder}
      value={query}
      onChangeText={onChange}
      icon="search-outline"
      autoCorrect={false}
      autoCapitalize="none"
      returnKeyType="search"
      right={
        query !== '' && (
          <Pressable
            onPress={() => onChange('')}
            accessibilityRole="button"
            accessibilityLabel={t.clearSearch}
            hitSlop={spacing.sm}
          >
            <Ionicons name="close-circle" size={sizes.icon} color={colors.textMuted} />
          </Pressable>
        )
      }
    />
  );
}
