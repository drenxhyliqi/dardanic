import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { FeedAuthor } from '../../data/feed';
import { useAccountSearch } from '../../hooks/useAccountSearch';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../theme';
import { tabBarSpace } from '../tabs/FloatingTabBar';
import { Skeleton } from '../ui/Skeleton';
import { AccountRow } from './AccountRow';

const t = strings.search;

export type AccountResultsProps = {
  query: string;
  onOpen: (person: FeedAuthor) => void;
};

// While typing: matching People and Businesses in two groups, skeleton rows while
// searching, and a friendly line when nothing matches.
export function AccountResults({ query, onOpen }: AccountResultsProps) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { results, isLoading } = useAccountSearch(query);

  if (isLoading) {
    return (
      <View style={styles.skeletons}>
        {[0, 1, 2, 3].map((key) => (
          <View key={key} style={styles.skeletonRow}>
            <Skeleton
              width={sizes.searchAvatar}
              height={sizes.searchAvatar}
              radius={radius.full}
            />
            <View style={styles.lines}>
              <Skeleton width="45%" height={spacing.md} />
              <Skeleton width="30%" height={spacing.md} />
            </View>
          </View>
        ))}
      </View>
    );
  }

  const sections = [
    { title: t.people, data: results.people },
    { title: t.businesses, data: results.businesses },
  ].filter((section) => section.data.length > 0);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(person) => person.username}
      keyboardShouldPersistTaps="handled"
      stickySectionHeadersEnabled={false}
      contentContainerStyle={{ paddingBottom: tabBarSpace(insets.bottom) }}
      renderSectionHeader={({ section }) => <Text style={styles.heading}>{section.title}</Text>}
      renderItem={({ item }) => <AccountRow person={item} onPress={() => onOpen(item)} />}
      ListEmptyComponent={<Text style={styles.empty}>{t.noResults(query.trim())}</Text>}
    />
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    skeletons: { gap: spacing.md, padding: spacing.lg },
    skeletonRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    lines: { flex: 1, gap: spacing.sm },
    heading: {
      ...typography.label,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xs,
      color: colors.textMuted,
    },
    empty: {
      ...typography.paragraph,
      textAlign: 'center',
      padding: spacing.xl,
      color: colors.textMuted,
    },
  }),
);
