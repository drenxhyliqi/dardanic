import { ScrollView, StyleSheet } from 'react-native';

import { VIBES } from '../../data/vibes';
import { strings } from '../../i18n';
import type { ExploreFilter } from '../../services/search';
import { makeStyles, spacing } from '../../theme';
import { PillTabs } from '../ui/PillTabs';

const VIBE_CHIPS = 3; // how many of your vibes get their own chip

export type ExploreFiltersProps = {
  active: ExploreFilter;
  vibes: string[]; // your vibe ids
  onChange: (filter: ExploreFilter) => void;
};

// Chips above Explore, scrolling sideways: For you, Businesses, Meets, then your top
// vibes (e.g. BMW, JDM).
export function ExploreFilters({ active, vibes, onChange }: ExploreFiltersProps) {
  const styles = useStyles();
  const t = strings.search.filters;
  const vibeTabs = vibes
    .slice(0, VIBE_CHIPS)
    .map((id) => VIBES.find((vibe) => vibe.id === id))
    .filter((vibe) => vibe !== undefined)
    .map((vibe) => ({ key: `vibe:${vibe.id}` as ExploreFilter, label: vibe.label }));

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      <PillTabs<ExploreFilter>
        tabs={[
          { key: 'forYou', label: t.forYou },
          { key: 'businesses', label: t.businesses },
          { key: 'meets', label: t.meets },
          ...vibeTabs,
        ]}
        active={active}
        onChange={onChange}
      />
    </ScrollView>
  );
}

const useStyles = makeStyles(() =>
  StyleSheet.create({
    row: { paddingHorizontal: spacing.lg },
  }),
);
