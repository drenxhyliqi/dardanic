import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { useMessages } from '../../context/MessagesContext';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { ChatComposer } from './ChatComposer';
import { ChatHeader } from './ChatHeader';
import { ListingAttachment } from './ListingAttachment';
import { DayDivider } from './DayDivider';
import { MessageBubble } from './MessageBubble';
import { chatRows } from './messageText';
import { RequestBanner } from './RequestBanner';
import { TypingBubble } from './TypingBubble';

const t = strings.messages;
const LEAVE_MS = 300; // let the screen slide away before the request disappears

// One conversation, full screen. The list is flipped (newest at the bottom, opens
// scrolled down), with day dividers, grouped bubbles, "typing" dots and Seen / Sent.
// Message requests show Accept / Delete / Block instead of the message field; chats you
// started as a request (private account) say so above the field.
// Opening it marks the chat as read. Coming from "Message seller", the listing waits
// above the field with a message already typed; Send sends both.
export function ChatScreen({ id, listingId }: { id: string; listingId?: string }) {
  const styles = useStyles();
  const { find, send, markRead, accept, remove, toggleFlame } = useMessages();
  const chat = find(id);
  const [attached, setAttached] = useState(listingId);

  useEffect(() => {
    markRead(id);
  }, [id, markRead, chat?.unread]);

  if (!chat) return null;

  const people = new Map(chat.members.map((person) => [person.username, person]));
  const lastMessage = chat.messages.at(-1);
  const rows = chatRows(chat.messages).reverse(); // flipped list: newest first
  // The typing bubble carries on the last sender's run, so their avatar moves down to it.
  const typingContinues = !!chat.typing && lastMessage?.from === chat.typing;

  const leave = () => {
    router.back();
    setTimeout(() => remove(id), LEAVE_MS);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ChatHeader chat={chat} />
      {chat.messages.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{t.sayHi(chat.title)}</Text>
        </View>
      ) : (
        <FlatList
          inverted
          data={rows}
          keyExtractor={(row) => row.key}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            chat.typing ? <TypingBubble person={people.get(chat.typing)} /> : undefined
          }
          renderItem={({ item }) =>
            item.kind === 'day' ? (
              <DayDivider label={item.label} />
            ) : (
              <MessageBubble
                message={item.message}
                sender={people.get(item.message.from)}
                first={item.first}
                last={item.last && !(item.message === lastMessage && typingContinues)}
                showName={chat.kind === 'crew' && item.first && item.message.from !== 'me'}
                status={
                  item.message === lastMessage && item.message.from === 'me'
                    ? chat.seen
                      ? 'seen'
                      : 'delivered'
                    : undefined
                }
                onToggleFlame={() => toggleFlame(id, item.message.id)}
              />
            )
          }
        />
      )}
      {chat.outgoingRequest && (
        <Text style={styles.requestNotice}>{t.requestNotice(chat.title)}</Text>
      )}
      {chat.request ? (
        <RequestBanner chat={chat} onAccept={() => accept(id)} onDelete={leave} onBlock={leave} />
      ) : (
        <ChatComposer
          initialText={listingId ? strings.marketplace.interestedMessage : undefined}
          attachment={
            attached && (
              <ListingAttachment id={attached} onRemove={() => setAttached(undefined)} />
            )
          }
          onSend={({ text, photos }) => {
            // In order: the listing, the photos, then the text.
            if (attached) send(id, { listingId: attached });
            photos.forEach((photo) => send(id, { photo }));
            if (text) send(id, { text });
            setAttached(undefined);
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingVertical: spacing.md,
    },
    empty: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    requestNotice: {
      ...typography.small,
      textAlign: 'center',
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.sm,
      color: colors.textMuted,
    },
    emptyText: {
      ...typography.body,
      color: colors.textMuted,
    },
  }),
);
