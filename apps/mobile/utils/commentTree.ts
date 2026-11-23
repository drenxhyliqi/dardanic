import type { Comment } from '../data/comments';

// Every comment and reply in a thread, at any depth.
export function countAll(comments: Comment[]): number {
  return comments.reduce((total, comment) => total + 1 + countAll(comment.replies), 0);
}

// A copy of the thread with `reply` added under the comment `parentId` (any depth).
export function addReply(comments: Comment[], parentId: string, reply: Comment): Comment[] {
  return comments.map((comment) =>
    comment.id === parentId
      ? { ...comment, replies: [...comment.replies, reply] }
      : { ...comment, replies: addReply(comment.replies, parentId, reply) },
  );
}

// Ids of comments whose replies start open: the top `levels` levels of the thread.
// Deeper replies start folded behind "View N replies".
export function openAtStart(comments: Comment[], levels: number, depth = 0): string[] {
  if (depth >= levels) return [];
  return comments.flatMap((comment) => [
    ...(comment.replies.length ? [comment.id] : []),
    ...openAtStart(comment.replies, levels, depth + 1),
  ]);
}

// Pinned comments first, the rest in their original order.
export function pinnedFirst(comments: Comment[]): Comment[] {
  return [...comments.filter((c) => c.pinned), ...comments.filter((c) => !c.pinned)];
}
