import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { ME } from '../data/myPosts';
import { INITIALLY_SEEN, SAMPLE_STORIES, type StoryItem, type StoryUser } from '../data/stories';

export const MY_STORY_ID = 'me';

type StoriesValue = {
  stories: StoryUser[]; // new ones first, then the ones already watched
  myStory: StoryUser | null; // what you've shared (null = nothing yet)
  isSeen: (id: string) => boolean;
  markSeen: (id: string) => void;
  addToMyStory: (item: Omit<StoryItem, 'id' | 'minutesAgo'>) => void;
  removeFromMyStory: (id: string) => void;
};

const StoriesContext = createContext<StoriesValue | null>(null);
let nextId = 0;

// Everyone's stories, which ones you've watched, and your own story. Watched stories
// get a grey ring and move to the end of the row. Kept in memory only until there's a
// backend (which will upload your photos and videos).
export function StoriesProvider({ children }: { children: ReactNode }) {
  const [seen, setSeen] = useState<ReadonlySet<string>>(() => new Set(INITIALLY_SEEN));
  const [mine, setMine] = useState<StoryItem[]>([]);

  const markSeen = useCallback((id: string) => {
    setSeen((current) => (current.has(id) ? current : new Set(current).add(id)));
  }, []);

  const addToMyStory = useCallback<StoriesValue['addToMyStory']>((item) => {
    setMine((current) => [...current, { ...item, id: `mine-${nextId++}`, minutesAgo: 0 }]);
  }, []);

  const removeFromMyStory = useCallback((id: string) => {
    setMine((current) => current.filter((item) => item.id !== id));
  }, []);

  const value = useMemo<StoriesValue>(
    () => ({
      stories: [
        ...SAMPLE_STORIES.filter((story) => !seen.has(story.id)),
        ...SAMPLE_STORIES.filter((story) => seen.has(story.id)),
      ],
      myStory: mine.length
        ? { id: MY_STORY_ID, label: ME.username, name: ME.name, avatar: ME.photo, items: mine }
        : null,
      isSeen: (id) => seen.has(id),
      markSeen,
      addToMyStory,
      removeFromMyStory,
    }),
    [seen, mine, markSeen, addToMyStory, removeFromMyStory],
  );

  return <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>;
}

export function useStories(): StoriesValue {
  const value = useContext(StoriesContext);
  if (!value) throw new Error('useStories must be used inside StoriesProvider');
  return value;
}
