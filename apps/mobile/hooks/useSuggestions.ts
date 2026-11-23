import { useEffect, useState } from 'react';

import { useFollow } from '../context/FollowContext';
import { PEOPLE } from '../data/feedAuthors';
import { ME } from '../data/myPosts';
import { searchService, type SuggestedAccount } from '../services/search';

// Suggested accounts for someone's profile, worked out once when it opens (so a card
// you follow stays, showing "Following"). Leaves out you, people you already follow and
// blocked accounts. Cards you remove with ✕ are hidden.
export function useSuggestions(username: string) {
  const { stateOf, isBlocked } = useFollow();
  const [suggestions, setSuggestions] = useState<SuggestedAccount[]>([]);
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    let current = true;
    const exclude = [
      ME.username,
      ...PEOPLE.filter((p) => stateOf(p) === 'following' || isBlocked(p)).map((p) => p.username),
    ];
    searchService.suggestedAccounts(username, exclude).then((list) => {
      if (current) setSuggestions(list);
    });
    return () => {
      current = false;
    };
    // Only when the profile changes, not on every follow (cards shouldn't jump away).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const hide = (name: string) => setHidden((set) => new Set(set).add(name));
  return { suggestions: suggestions.filter((s) => !hidden.has(s.person.username)), hide };
}
