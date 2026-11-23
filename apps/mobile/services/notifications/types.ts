// The shapes notifications use. FindMe's notifications are turned into these too, so
// the screen shows everything in one list.
import type { FeedAuthor } from '../../data/feed';

export type NotificationKind =
  | 'follow'
  | 'flamePost'
  | 'flameStory'
  | 'comment'
  | 'reply'
  | 'mention'
  | 'meetSoon'
  | 'findmeRequest'
  | 'findmeAccepted'
  | 'findmeDeclined'
  | 'findmeVerified';

export type AppNotification = {
  id: string;
  kind: NotificationKind;
  people: FeedAuthor[]; // who did it (faces shown: the first two)
  others?: number; // "+ 12 others"
  postId?: string; // the post it's about (flames, comments)
  storyPhoto?: string; // your story they flamed
  text?: string; // the comment / reply / mention
  minutesAgo: number;
  read: boolean;
};

export type NotificationFilter = 'all' | 'follows' | 'flames' | 'comments' | 'findme';
