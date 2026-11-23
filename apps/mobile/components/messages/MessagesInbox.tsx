import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMessages } from '../../context/MessagesContext';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { simplify } from '../../utils/text';
import { tabBarSpace } from '../tabs/FloatingTabBar';
import { EmptyState } from '../ui/EmptyState';
import { IconButton } from '../ui/IconButton';
import { PillTabs } from '../ui/PillTabs';
import { SearchField } from '../ui/SearchField';
import { useRefreshable } from '../ui/useRefreshable';
import { InboxRow } from './InboxRow';
import { InboxSkeleton } from './InboxSkeleton';
import { previewOf } from './messageText';

const t = strings.messages;
const FAKE_LOAD_MS = 500; // until there's a backend to fetch from

type InboxTab = 'chats' | 'requests';

// The Messages tab: title with a ✎ (new message), search, Chats / Requests, and the
// conversations. Tapping one opens the chat.
export function MessagesInbox() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { chats, requests } = useMessages();
  const [tab, setTab] = useState<InboxTab>('chats');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { scrollProps, indicator } = useRefreshable();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), FAKE_LOAD_MS);
    return () => clearTimeout(timer);
  }, []);

  const search = simplify(query.trim());
  const list = (tab === 'chats' ? chats : requests).filter(
    (chat) => !search || simplify(`${chat.title} ${previewOf(chat)}`).includes(search),
  );

  const empty = search ? (
    <Text style={styles.noResults}>{t.noResults(query.trim())}</Text>
  ) : tab === 'chats' ? (
    <EmptyState icon="chatbubbles-outline" title={t.emptyChatsTitle} hint={t.emptyChatsHint} />
  ) : (
    <EmptyState
      icon="mail-unread-outline"
      title={t.emptyRequestsTitle}
      hint={t.emptyRequestsHint}
    />
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.title}</Text>
        <IconButton
          icon="create-outline"
          label={t.newMessage}
          onPress={() => router.push('/new-message')}
        />
      </View>
      <View style={styles.controls}>
        <SearchField placeholder={t.search} query={query} onChange={setQuery} />
        <PillTabs
          tabs={[
            { key: 'chats', label: t.chats },
            { key: 'requests', label: t.requests(requests.length) },
          ]}
          active={tab}
          onChange={setTab}
        />
      </View>
      {isLoading ? (
        <InboxSkeleton />
      ) : (
        <Animated.FlatList
          {...scrollProps}
          data={list}
          keyExtractor={(chat) => chat.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: tabBarSpace(insets.bottom) }}
          ListHeaderComponent={indicator}
          ListEmptyComponent={empty}
          renderItem={({ item }) => (
            <InboxRow chat={item} onPress={() => router.push(`/chat/${item.id}`)} />
          )}
        />
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    title: {
      ...typography.title,
      color: colors.text,
    },
    controls: {
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    noResults: {
      ...typography.paragraph,
      textAlign: 'center',
      padding: spacing.xl,
      color: colors.textMuted,
    },
  }),
);
