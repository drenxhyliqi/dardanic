import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';

import { strings } from '../../i18n';
import { sizes, spacing, useColors } from '../../theme';
import { TextField } from './TextField';

export type SearchFieldProps = {
  placeholder: string;
  query: string;
  onChange: (query: string) => void;
  onFocus?: () => void;
  autoFocus?: boolean;
};

// A rounded search bar with a magnifier, and a clear (✕) button once something is typed.
export function SearchField(props: SearchFieldProps) {
  const { placeholder, query, onChange, onFocus, autoFocus } = props;
  const colors = useColors();
  return (
    <TextField
      placeholder={placeholder}
      value={query}
      onChangeText={onChange}
      onFocus={onFocus}
      autoFocus={autoFocus}
      icon="search-outline"
      round
      autoCorrect={false}
      autoCapitalize="none"
      returnKeyType="search"
      right={
        query !== '' && (
          <Pressable
            onPress={() => onChange('')}
            accessibilityRole="button"
            accessibilityLabel={strings.common.clearSearch}
            hitSlop={spacing.sm}
          >
            <Ionicons name="close-circle" size={sizes.icon} color={colors.textMuted} />
          </Pressable>
        )
      }
    />
  );
}
