import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import type { FeedAuthor } from '../data/feed';
import { SAMPLE_CONVERSATIONS, type Conversation, type Message } from '../data/messages';

type MessagesValue = {
  chats: Conversation[]; // newest activity first
  requests: Conversation[]; // message requests (people you don't follow, plate search)
  unreadTotal: number; // for the badge on the Messages tab
  find: (id: string) => Conversation | undefined;
  send: (id: string, message: Pick<Message, 'text' | 'photo' | 'listingId'>) => void;
  markRead: (id: string) => void;
  accept: (id: string) => void;
  remove: (id: string) => void; // delete or block a request
  toggleFlame: (id: string, messageId: string) => void;
  // Opens (or creates) your chat with someone and gives its id. `asRequest`: a new chat
  // is a message request on their side (private account, you don't follow each other).
  startWith: (person: FeedAuthor, asRequest?: boolean) => string;
};

const MessagesContext = createContext<MessagesValue | null>(null);

let nextId = 0;
const lastActivity = (chat: Conversation) => chat.messages.at(-1)?.minutesAgo ?? 0;

// All conversations and what you do in them. Kept in memory until there's a backend
// (Supabase tables + Realtime for live messages and typing).
export function MessagesProvider({ children }: { children: ReactNode }) {
  const [all, setAll] = useState<Conversation[]>(SAMPLE_CONVERSATIONS);

  const update = useCallback((id: string, change: (chat: Conversation) => Conversation) => {
    setAll((list) => list.map((chat) => (chat.id === id ? change(chat) : chat)));
  }, []);

  const send = useCallback<MessagesValue['send']>(
    (id, message) =>
      update(id, (chat) => ({
        ...chat,
        seen: false,
        messages: [
          ...chat.messages,
          { id: `me-${nextId++}`, from: 'me', minutesAgo: 0, ...message },
        ],
      })),
    [update],
  );

  // Only touches state when something is unread, so calling it on every visit is cheap.
  const markRead = useCallback((id: string) => {
    setAll((list) =>
      list.some((chat) => chat.id === id && chat.unread)
        ? list.map((chat) => (chat.id === id ? { ...chat, unread: 0 } : chat))
        : list,
    );
  }, []);

  const accept = useCallback(
    (id: string) => update(id, (chat) => ({ ...chat, request: undefined })),
    [update],
  );
  const remove = useCallback(
    (id: string) => setAll((list) => list.filter((chat) => chat.id !== id)),
    [],
  );

  const toggleFlame = useCallback<MessagesValue['toggleFlame']>(
    (id, messageId) =>
      update(id, (chat) => ({
        ...chat,
        messages: chat.messages.map((msg) =>
          msg.id === messageId ? { ...msg, flamedByMe: !msg.flamedByMe } : msg,
        ),
      })),
    [update],
  );

  const startWith = useCallback(
    (person: FeedAuthor, asRequest = false) => {
      const existing = all.find(
        (chat) => chat.kind === 'direct' && chat.title === person.username,
      );
      if (existing) return existing.id;
      const id = `new-${person.username}`;
      setAll((list) => [
        {
          id,
          kind: 'direct',
          title: person.username,
          members: [person],
          unread: 0,
          messages: [],
          outgoingRequest: asRequest,
        },
        ...list,
      ]);
      return id;
    },
    [all],
  );

  const value = useMemo<MessagesValue>(() => {
    const chats = all
      .filter((chat) => !chat.request)
      .sort((a, b) => lastActivity(a) - lastActivity(b));
    return {
      chats,
      requests: all.filter((chat) => chat.request),
      unreadTotal: chats.reduce((sum, chat) => sum + (chat.muted ? 0 : chat.unread), 0),
      find: (id) => all.find((chat) => chat.id === id),
      send,
      markRead,
      accept,
      remove,
      toggleFlame,
      startWith,
    };
  }, [all, send, markRead, accept, remove, toggleFlame, startWith]);

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}

export function useMessages(): MessagesValue {
  const value = useContext(MessagesContext);
  if (!value) throw new Error('useMessages must be used inside MessagesProvider');
  return value;
}
