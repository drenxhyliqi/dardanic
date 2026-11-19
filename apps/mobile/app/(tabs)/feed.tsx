import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeedHeader } from '../../components/feed/FeedHeader';
import type { FeedFilter } from '../../components/feed/feedFilters';
import { makeStyles } from '../../theme';

// The Feed tab: top bar for now, posts come later. The filter (For you / Following /
// Crews) will decide which posts load once there's a backend.
export default function FeedScreen() {
  const styles = useStyles();
  const [filter, setFilter] = useState<FeedFilter>('forYou');

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <FeedHeader filter={filter} onChangeFilter={setFilter} />
      <View style={styles.content} />
    </SafeAreaView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
    },
  }),
);
