import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useFollow } from '../../context/FollowContext';
import { useMessages } from '../../context/MessagesContext';
import { PEOPLE } from '../../data/feedAuthors';
import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, typography } from '../../theme';
import { simplify } from '../../utils/text';
import { Avatar } from '../profile/Avatar';
import { SearchField } from '../ui/SearchField';
import { BusinessBadge } from '../ui/BusinessBadge';

const t = strings.messages;
// People you follow first.
const SUGGESTED = [...PEOPLE.filter((p) => p.followed), ...PEOPLE.filter((p) => !p.followed)];

// Start a chat: search people (suggestions first: who you follow), tap one to open
// your chat with them (a new one if you haven't talked yet).
export function NewMessage() {
  const styles = useStyles();
  const { startWith } = useMessages();
  const { canMessageDirectly } = useFollow();
  const [query, setQuery] = useState('');
  const search = simplify(query.trim());
  const people = SUGGESTED.filter(
    (person) => !search || simplify(`${person.username} ${person.name}`).includes(search),
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{t.newMessage}</Text>
      <View style={styles.search}>
        <SearchField placeholder={t.searchPeople} query={query} onChange={setQuery} />
      </View>
      <FlatList
        data={people}
        keyExtractor={(person) => person.username}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          !search ? <Text style={styles.section}>{t.suggested}</Text> : undefined
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.replace(`/chat/${startWith(item, !canMessageDirectly(item))}`)
            }
            accessibilityRole="button"
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
          >
            <Avatar photo={item.photo} name={item.name} size={sizes.headerButton} border={0} />
            <View style={styles.names}>
              <View style={styles.nameRow}>
                <Text style={styles.username}>{item.username}</Text>
                {item.business && <BusinessBadge />}
              </View>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    title: {
      ...typography.label,
      textAlign: 'center',
      paddingVertical: spacing.lg,
      color: colors.text,
    },
    search: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    section: {
      ...typography.label,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      color: colors.textMuted,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    pressed: {
      backgroundColor: colors.surface,
    },
    names: {
      flex: 1,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    username: {
      ...typography.name,
      color: colors.text,
    },
    name: {
      ...typography.small,
      color: colors.textMuted,
    },
  }),
);
