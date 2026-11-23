import { strings } from '../../i18n';
import { SearchField } from '../ui/SearchField';

export type VibeSearchProps = {
  query: string;
  onChange: (query: string) => void;
};

// Search bar for vibes.
export function VibeSearch({ query, onChange }: VibeSearchProps) {
  return (
    <SearchField placeholder={strings.vibes.searchPlaceholder} query={query} onChange={onChange} />
  );
}
