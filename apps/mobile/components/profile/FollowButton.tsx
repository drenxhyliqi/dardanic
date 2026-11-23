import type { FeedAuthor } from '../../data/feed';
import { useFollow, type FollowState } from '../../context/FollowContext';
import { strings } from '../../i18n';
import { Button } from '../ui/Button';

// Icon per state on full-width buttons: add, waiting for them to accept, following.
const ICONS: Record<FollowState, 'person-add-outline' | 'time-outline' | 'checkmark'> = {
  none: 'person-add-outline',
  requested: 'time-outline',
  following: 'checkmark',
};

export type FollowButtonProps = {
  person: FeedAuthor;
  compact?: boolean; // label-sized (lists); otherwise full width (profiles)
};

// Follow, Follow back (they follow you), Awaiting (private account, waiting for them)
// or Following. Blue until you've acted; tap again to unfollow / cancel the request.
export function FollowButton({ person, compact = false }: FollowButtonProps) {
  const { stateOf, toggle, followsYou } = useFollow();
  const state = stateOf(person);
  const label =
    state === 'following'
      ? strings.publicProfile.following
      : state === 'requested'
        ? strings.privacy.requested
        : followsYou(person)
          ? strings.privacy.followBack
          : strings.publicProfile.follow;

  return (
    <Button
      label={label}
      icon={compact ? undefined : ICONS[state]}
      variant={state === 'none' ? 'primary' : 'secondary'}
      small
      compact={compact}
      strong
      centered={!compact}
      onPress={() => toggle(person)}
    />
  );
}
