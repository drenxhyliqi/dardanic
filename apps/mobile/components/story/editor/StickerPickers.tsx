import { PEOPLE } from '../../../data/feedAuthors';
import { STORY_LOCATIONS } from '../../../data/storyLocations';
import type { StorySticker } from '../../../data/stories';
import { strings } from '../../../i18n';
import { sizes } from '../../../theme';
import { Avatar } from '../../profile/Avatar';
import { PickerPanel } from './PickerPanel';

const t = strings.story;

export type Panel = 'tag' | 'location' | 'background';

const PEOPLE_ITEMS = PEOPLE.map((person) => ({
  key: person.username,
  label: person.username,
  hint: person.name,
  left: <Avatar photo={person.photo} name={person.name} size={sizes.searchAvatar} border={0} />,
}));
const PLACE_ITEMS = STORY_LOCATIONS.map((place) => ({ key: place, label: place }));

export type StickerPickersProps = {
  panel: Panel | null;
  onPick: (kind: StorySticker['kind'], text: string) => void;
  onClose: () => void;
};

// The "Tag people" and "Add location" lists for the story editor.
export function StickerPickers({ panel, onPick, onClose }: StickerPickersProps) {
  if (panel === 'tag') {
    return (
      <PickerPanel
        title={t.tagPeople}
        placeholder={t.searchPeople}
        items={PEOPLE_ITEMS}
        onPick={(item) => onPick('mention', item.label)}
        onClose={onClose}
      />
    );
  }
  if (panel === 'location') {
    return (
      <PickerPanel
        title={t.addLocation}
        placeholder={t.searchPlaces}
        items={PLACE_ITEMS}
        onPick={(item) => onPick('location', item.label)}
        onClose={onClose}
      />
    );
  }
  return null;
}
