import { StyleSheet, View } from 'react-native';

import type { FeedAuthor } from '../../data/feed';
import { sizes, useColors } from '../../theme';
import { Avatar } from './Avatar';

const BACK_SCALE = 0.72; // two faces: each this share of the full size

export type AvatarStackProps = {
  people: FeedAuthor[]; // the first one or two are shown
  size: number;
  fallbackName?: string; // initials when there's nobody (e.g. a chat title)
};

// One avatar, or two overlapping faces when there are several people (crews, group
// chats, "leon_builds and granit.gt flamed your post").
export function AvatarStack({ people, size, fallbackName = '' }: AvatarStackProps) {
  const colors = useColors();
  const [first, second] = people;

  if (!second) {
    return (
      <Avatar
        photo={first?.photo ?? null}
        name={first?.name ?? fallbackName}
        size={size}
        border={0}
      />
    );
  }

  const small = Math.round(size * BACK_SCALE);
  return (
    <View style={{ width: size, height: size }}>
      <View style={styles.back}>
        <Avatar photo={second.photo} name={second.name} size={small} border={0} />
      </View>
      <View style={styles.front}>
        <Avatar
          photo={first.photo}
          name={first.name}
          size={small}
          ringColor={colors.background}
          border={sizes.accentRing}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: { position: 'absolute', top: 0, right: 0 },
  front: { position: 'absolute', bottom: 0, left: 0 },
});
