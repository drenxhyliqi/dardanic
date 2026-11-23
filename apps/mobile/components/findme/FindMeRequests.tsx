import { router } from 'expo-router';
import { useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFindMe } from '../../context/FindMeContext';
import { strings } from '../../i18n';
import { makeStyles, spacing } from '../../theme';
import { EmptyState } from '../ui/EmptyState';
import { PillTabs } from '../ui/PillTabs';
import { useRefreshable } from '../ui/useRefreshable';
import { RequestRow } from './RequestRow';

const t = strings.findme;
type Tab = 'incoming' | 'outgoing';

// FindMe requests: Received (accept, decline or block) and Sent (cancel).
// Accepting opens the person's profile, where you can follow or message them.
export function FindMeRequests() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { incoming, outgoing, respond, cancelRequest, block } = useFindMe();
  const [tab, setTab] = useState<Tab>('incoming');
  const { scrollProps, indicator } = useRefreshable();
  const list = tab === 'incoming' ? incoming : outgoing;

  return (
    <View style={styles.screen}>
      <View style={styles.tabs}>
        <PillTabs
          tabs={[
            { key: 'incoming', label: `${t.incoming} · ${incoming.length}` },
            { key: 'outgoing', label: `${t.outgoing} · ${outgoing.length}` },
          ]}
          active={tab}
          onChange={setTab}
        />
      </View>
      <Animated.FlatList
        {...scrollProps}
        data={list}
        ListHeaderComponent={indicator}
        keyExtractor={(request) => request.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.xl }]}
        ListEmptyComponent={
          tab === 'incoming' ? (
            <EmptyState
              icon="mail-open-outline"
              title={t.noIncomingTitle}
              hint={t.noIncomingHint}
            />
          ) : (
            <EmptyState
              icon="paper-plane-outline"
              title={t.noOutgoingTitle}
              hint={t.noOutgoingHint}
            />
          )
        }
        renderItem={({ item }) => (
          <RequestRow
            request={item}
            onAccept={async () => {
              await respond(item.id, true);
              router.push(`/user/${item.person.username}`);
            }}
            onDecline={() => respond(item.id, false)}
            onBlock={() => block(item.person.username)}
            onCancel={() => cancelRequest(item.id)}
          />
        )}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    tabs: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    list: { gap: spacing.md, paddingHorizontal: spacing.lg },
  }),
);
