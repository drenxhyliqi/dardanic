import type { Conversation } from '../../data/messages';
import { AvatarStack } from '../profile/AvatarStack';

export type ChatAvatarProps = {
  chat: Conversation;
  size: number;
};

// A chat's picture: the person's avatar, or for crews and groups two overlapping faces.
export function ChatAvatar({ chat, size }: ChatAvatarProps) {
  const people = chat.kind === 'direct' ? chat.members.slice(0, 1) : chat.members;
  return <AvatarStack people={people} size={size} fallbackName={chat.title} />;
}
