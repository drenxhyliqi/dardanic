import type { Conversation, Message } from '../../data/messages';
import { strings } from '../../i18n';

const t = strings.messages;
const DAY = 1440; // minutes

// One line for the inbox: "You: …", "📷 Photo", "Replied to your story", "… is typing".
export function previewOf(chat: Conversation): string {
  if (chat.typing) return t.typing(chat.typing);
  const last = chat.messages.at(-1);
  if (!last) return '';
  const mine = last.from === 'me';
  const body = last.story
    ? mine
      ? t.youRepliedToStory
      : t.repliedToYourStory
    : last.photo
      ? t.photo
      : last.postId
        ? t.sharedPost
        : last.meetId
          ? t.sharedMeet
          : last.listingId
            ? t.sharedListing
            : (last.text ?? '');
  return mine && !last.story ? t.you(body) : body;
}

// Under the name in a chat: "Active now", "Active 5m ago", "Crew · 24 members".
export function statusOf(chat: Conversation): string {
  if (chat.kind === 'crew') return t.crewMembers(chat.memberCount ?? chat.members.length + 1);
  if (chat.activeMinutesAgo === undefined) return '';
  return chat.activeMinutesAgo < 5
    ? t.activeNow
    : t.activeAgo(strings.feed.timeAgo(chat.activeMinutesAgo));
}

// Day dividers in a chat: Today, Yesterday, a weekday this week, otherwise "12 Nov".
export function dayLabel(minutesAgo: number): string {
  const date = new Date(Date.now() - minutesAgo * 60_000);
  const days = Math.floor((startOfToday() - startOfDay(date)) / (DAY * 60_000));
  const locale = strings.feed.meet.dateLocale;
  if (days <= 0) return t.today;
  if (days === 1) return t.yesterday;
  if (days < 7) return date.toLocaleDateString(locale, { weekday: 'long' });
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
}

const startOfDay = (date: Date) => new Date(date).setHours(0, 0, 0, 0);
const startOfToday = () => startOfDay(new Date());

export type ChatRow =
  | { kind: 'day'; key: string; label: string }
  | { kind: 'message'; key: string; message: Message; first: boolean; last: boolean };

// The chat as rows, oldest first: a divider whenever the day changes, and each message
// marked as first / last of a run from the same sender (bubbles join up, the avatar
// sits on the last one, names show on the first one in crew chats).
export function chatRows(messages: Message[]): ChatRow[] {
  const rows: ChatRow[] = [];
  messages.forEach((message, index) => {
    const before = messages[index - 1];
    const after = messages[index + 1];
    const label = dayLabel(message.minutesAgo);
    const newDay = !before || dayLabel(before.minutesAgo) !== label;
    if (newDay) rows.push({ kind: 'day', key: `day-${message.id}`, label });
    rows.push({
      kind: 'message',
      key: message.id,
      message,
      first: newDay || before?.from !== message.from,
      last: !after || after.from !== message.from || dayLabel(after.minutesAgo) !== label,
    });
  });
  return rows;
}
