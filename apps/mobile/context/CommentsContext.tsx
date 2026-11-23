import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { SAMPLE_COMMENTS, type Comment } from '../data/comments';
import type { FeedAuthor } from '../data/feed';
import { addReply, countAll } from '../utils/commentTree';

type CommentsValue = {
  commentsFor: (postId: string) => Comment[];
  count: (postId: string) => number; // all comments + replies on a post
  add: (postId: string, author: FeedAuthor, text: string, parentId?: string) => string;
  isFlamed: (commentId: string) => boolean;
  toggleFlame: (commentId: string) => void;
};

const CommentsContext = createContext<CommentsValue | null>(null);

let nextId = 0;

// Every post's comment threads, plus what you add (comments, replies, flames).
// Kept in memory only until there's a backend; then this is where Supabase plugs in.
export function CommentsProvider({ children }: { children: ReactNode }) {
  const [threads, setThreads] = useState<Record<string, Comment[]>>(SAMPLE_COMMENTS);
  const [flamed, setFlamed] = useState<ReadonlySet<string>>(new Set());

  const add = useCallback(
    (postId: string, author: FeedAuthor, text: string, parentId?: string) => {
      const comment: Comment = {
        id: `mine-${nextId++}`,
        author,
        text,
        minutesAgo: 0,
        flames: 0,
        replies: [],
      };
      setThreads((all) => {
        const current = all[postId] ?? [];
        const next = parentId ? addReply(current, parentId, comment) : [...current, comment];
        return { ...all, [postId]: next };
      });
      return comment.id;
    },
    [],
  );

  const toggleFlame = useCallback((commentId: string) => {
    setFlamed((current) => {
      const next = new Set(current);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  }, []);

  const value = useMemo<CommentsValue>(
    () => ({
      commentsFor: (postId) => threads[postId] ?? [],
      count: (postId) => countAll(threads[postId] ?? []),
      add,
      isFlamed: (commentId) => flamed.has(commentId),
      toggleFlame,
    }),
    [threads, flamed, add, toggleFlame],
  );

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;
}

export function useComments(): CommentsValue {
  const value = useContext(CommentsContext);
  if (!value) throw new Error('useComments must be used inside CommentsProvider');
  return value;
}
