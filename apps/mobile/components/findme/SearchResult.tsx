import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { countryByCode, type CountryCode } from '../../data/plateCountries';
import { strings } from '../../i18n';
import type { PlateSearchResult } from '../../services/findme';
import { makeStyles, radius, sizes, spacing } from '../../theme';
import { EmptyState } from '../ui/EmptyState';
import { Skeleton } from '../ui/Skeleton';

const t = strings.findme;

export type SearchResultProps = {
  loading: boolean;
  result: PlateSearchResult | null;
  country: CountryCode;
  found: ReactNode; // the driver card, when a driver was found
};

// Below the search: a card-shaped skeleton while searching, then the driver card, or
// a friendly message (no driver found / not a valid plate / today's limit reached).
export function SearchResult({ loading, result, country, found }: SearchResultProps) {
  const styles = useStyles();

  if (loading) {
    return (
      <View style={styles.skeleton}>
        <View style={styles.row}>
          <Skeleton width={sizes.inboxAvatar} height={sizes.inboxAvatar} radius={radius.full} />
          <View style={styles.lines}>
            <Skeleton width="50%" height={spacing.lg} />
            <Skeleton width="30%" height={spacing.md} />
          </View>
        </View>
        <Skeleton width="60%" height={spacing.md} />
        <Skeleton height={sizes.headerButton} />
      </View>
    );
  }
  if (!result) return null;
  if (result.status === 'found') return <>{found}</>;
  if (result.status === 'invalid') {
    const info = countryByCode(country);
    return (
      <EmptyState
        icon="alert-circle-outline"
        title={t.invalidTitle}
        hint={t.invalidHint(info.name, info.example)}
      />
    );
  }
  if (result.status === 'limit') {
    return <EmptyState icon="time-outline" title={t.limitTitle} hint={t.limitHint} />;
  }
  return <EmptyState icon="car-outline" title={t.notFoundTitle} hint={t.notFoundHint} />;
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    skeleton: {
      gap: spacing.md,
      padding: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    lines: {
      flex: 1,
      gap: spacing.sm,
    },
  }),
);
