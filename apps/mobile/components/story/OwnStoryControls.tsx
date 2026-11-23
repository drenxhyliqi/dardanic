import { useEffect, useState } from 'react';

import { OwnStoryFooter } from './OwnStoryFooter';
import { OwnStoryMenu } from './OwnStoryMenu';
import { StoryViewersPanel } from './StoryViewersPanel';

export type OwnStoryControlsProps = {
  onDelete: () => void; // delete the photo / video on screen
  onPauseChange: (paused: boolean) => void; // the story pauses while a panel is open
};

// Your own story's bottom: Seen by (opens viewers) and ••• (opens Delete story).
export function OwnStoryControls({ onDelete, onPauseChange }: OwnStoryControlsProps) {
  const [panel, setPanel] = useState<'viewers' | 'menu' | null>(null);

  useEffect(() => onPauseChange(panel !== null), [panel, onPauseChange]);

  return (
    <>
      <OwnStoryFooter onViewers={() => setPanel('viewers')} onMore={() => setPanel('menu')} />
      {panel === 'viewers' && <StoryViewersPanel onClose={() => setPanel(null)} />}
      {panel === 'menu' && (
        <OwnStoryMenu
          onClose={() => setPanel(null)}
          onDelete={() => {
            setPanel(null);
            onDelete();
          }}
        />
      )}
    </>
  );
}
