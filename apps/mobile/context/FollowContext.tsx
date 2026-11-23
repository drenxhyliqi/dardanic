import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import type { FeedAuthor } from '../data/feed';
import { PEOPLE } from '../data/feedAuthors';

export type FollowState = 'none' | 'requested' | 'following';

type FollowValue = {
  stateOf: (person: FeedAuthor) => FollowState;
  followsYou: (person: FeedAuthor) => boolean;
  addFollowers: (usernames: string[]) => void; // e.g. from "started following you"
  isBlocked: (person: FeedAuthor) => boolean;
  blockedPeople: FeedAuthor[]; // for Settings → Blocked accounts, newest first
  block: (person: FeedAuthor) => void; // also unfollows, both ways
  unblock: (person: FeedAuthor) => void;
  toggle: (person: FeedAuthor) => void; // follow / unfollow / request / cancel request
  canSeePosts: (person: FeedAuthor) => boolean;
  canMessageDirectly: (person: FeedAuthor) => boolean; // otherwise it's a message request
};

const FollowContext = createContext<FollowValue | null>(null);
const APPROVE_MS = 6000; // mock: how long a private account takes to accept your request

const without = (set: ReadonlySet<string>, name: string) => {
  const next = new Set(set);
  next.delete(name);
  return next;
};

// Who you follow and the privacy rules built on it, shared by every screen:
// - public accounts: follow straight away; anyone sees their posts.
// - private accounts: following is a request they approve; only approved followers see
//   their posts.
// - messages go straight through if the account is public or you follow each other;
//   otherwise they land in their message requests.
// In memory for now; the backend will own follows and requests.
export function FollowProvider({ children }: { children: ReactNode }) {
  const [following, setFollowing] = useState<ReadonlySet<string>>(
    () => new Set(PEOPLE.filter((p) => p.followed).map((p) => p.username)),
  );
  const [requested, setRequested] = useState<ReadonlySet<string>>(new Set());
  const [followers, setFollowers] = useState<ReadonlySet<string>>(
    () => new Set(PEOPLE.filter((p) => p.followsYou).map((p) => p.username)),
  );

  // Who you've blocked (kept as people so Settings can list them).
  const [blocked, setBlocked] = useState<ReadonlyMap<string, FeedAuthor>>(new Map());

  const block = useCallback((person: FeedAuthor) => {
    const name = person.username;
    setBlocked((map) => new Map([[name, person], ...map]));
    setFollowing((set) => without(set, name));
    setRequested((set) => without(set, name));
    setFollowers((set) => without(set, name));
  }, []);
  const unblock = useCallback((person: FeedAuthor) => {
    setBlocked((map) => {
      const next = new Map(map);
      next.delete(person.username);
      return next;
    });
  }, []);

  const addFollowers = useCallback((usernames: string[]) => {
    setFollowers((set) =>
      usernames.every((name) => set.has(name)) ? set : new Set([...set, ...usernames]),
    );
  }, []);


  const toggle = useCallback(
    (person: FeedAuthor) => {
      const name = person.username;
      if (following.has(name)) return setFollowing((set) => without(set, name));
      if (requested.has(name)) return setRequested((set) => without(set, name));
      if (!person.private) return setFollowing((set) => new Set(set).add(name));
      setRequested((set) => new Set(set).add(name));
      if (person.approvesFollow) {
        setTimeout(() => {
          setRequested((set) => {
            if (!set.has(name)) return set; // cancelled meanwhile
            setFollowing((current) => new Set(current).add(name));
            return without(set, name);
          });
        }, APPROVE_MS);
      }
    },
    [following, requested],
  );

  const value = useMemo<FollowValue>(() => {
    const stateOf = (person: FeedAuthor): FollowState =>
      following.has(person.username)
        ? 'following'
        : requested.has(person.username)
          ? 'requested'
          : 'none';
    const followsYou = (person: FeedAuthor) => followers.has(person.username);
    return {
      stateOf,
      followsYou,
      addFollowers,
      isBlocked: (person) => blocked.has(person.username),
      blockedPeople: [...blocked.values()],
      block,
      unblock,
      toggle,
      canSeePosts: (person) => !person.private || stateOf(person) === 'following',
      canMessageDirectly: (person) =>
        !person.private || (stateOf(person) === 'following' && followsYou(person)),
    };
  }, [following, requested, followers, blocked, toggle, addFollowers, block, unblock]);

  return <FollowContext.Provider value={value}>{children}</FollowContext.Provider>;
}

export function useFollow(): FollowValue {
  const value = useContext(FollowContext);
  if (!value) throw new Error('useFollow must be used inside FollowProvider');
  return value;
}
