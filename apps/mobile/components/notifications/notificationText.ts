import { findPost } from '../../data/posts';
import { strings } from '../../i18n';
import type { AppNotification } from '../../services/notifications';

const t = strings.notifications;

// "leon_builds", "leon_builds and granit.gt", "leon_builds, granit.gt and 12 others".
function who({ people, others = 0 }: AppNotification): string {
  const [a, b] = people.map((person) => person.username);
  if (!a) return '';
  if (b) return others ? t.twoAndOthers(a, b, others) : t.two(a, b);
  return others ? t.oneAndOthers(a, others) : a;
}

function what(note: AppNotification): string {
  const quote = `“${note.text ?? ''}”`;
  switch (note.kind) {
    case 'follow':
      return t.follow;
    case 'flamePost':
      return t.flamePost;
    case 'flameStory':
      return t.flameStory;
    case 'comment':
      return t.comment(quote);
    case 'reply':
      return t.reply(quote);
    case 'mention':
      return t.mention(quote);
    case 'meetSoon': {
      const meet = note.postId ? findPost(note.postId) : undefined;
      return t.meetSoon(meet?.kind === 'meet' ? meet.title : '');
    }
    case 'findmeRequest':
      return t.findmeRequest;
    case 'findmeAccepted':
      return t.findmeAccepted;
    case 'findmeDeclined':
      return t.findmeDeclined;
    case 'findmeVerified':
      return t.findmeVerified;
  }
}

// A notification's sentence in two parts: the names (shown bold) and what they did.
export function notificationText(note: AppNotification): { names: string; action: string } {
  return { names: who(note), action: what(note) };
}
