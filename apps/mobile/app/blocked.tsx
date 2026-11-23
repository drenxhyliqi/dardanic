import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '../components/profile/Avatar';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useFollow } from '../context/FollowContext';
import { strings } from '../i18n';
import { makeStyles, sizes, spacing, typography } from '../theme';

const t = strings.settings;

// Settings → Blocked accounts: everyone you've blocked, each with Unblock.
export default function BlockedScreen() {
  const styles = useStyles();
  const { blockedPeople, unblock } = useFollow();
  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={blockedPeople}
      keyExtractor={(person) => person.username}
      ListEmptyComponent={
        <EmptyState icon="ban-outline" title={t.blockedEmptyTitle} hint={t.blockedEmptyHint} />
      }
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Avatar photo={item.photo} name={item.name} size={sizes.searchAvatar} border={0} />
          <View style={styles.text}>
            <Text style={styles.name}>{item.username}</Text>
            <Text style={styles.hint}>{item.name}</Text>
          </View>
          <Button
            label={t.unblock}
            variant="secondary"
            small
            compact
            onPress={() => unblock(item)}
          />
        </View>
      )}
    />
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.lg, gap: spacing.md },
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    text: { flex: 1 },
    name: { ...typography.name, color: colors.text },
    hint: { ...typography.small, color: colors.textMuted },
  }),
);
