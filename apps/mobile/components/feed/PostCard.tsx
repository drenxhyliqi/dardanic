import { router } from 'expo-router';
import { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import type { PhotoPost, TextPost } from '../../data/feed';
import { useComments } from '../../context/CommentsContext';
import { strings } from '../../i18n';
import { spacing } from '../../theme';
import { useFlame } from '../flame/useFlame';
import { MediaDots } from './MediaDots';
import { PostActions } from './PostActions';
import { PostCaption } from './PostCaption';
import { PostHeader } from './PostHeader';
import { PostMedia } from './PostMedia';
import { PostText } from './PostText';
import { ME } from '../../data/myPosts';
import { openReport } from '../report/openReport';

export type PostCardProps = {
  post: PhotoPost | TextPost;
};

// A post in the feed: header, then photos (dots under them when there are several, and
// the caption under the actions) or, for a text-only status, the text itself; then
// flame / comment / share with their counts, and save.
// Flames and saves only live on this screen for now (no backend yet).
// Double-tapping a photo always flames it; the flame button toggles.
export const PostCard = memo(function PostCard({ post }: PostCardProps) {
  const { flamed, toggle, flame } = useFlame();
  const [saved, setSaved] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { count } = useComments();
  const openComments = () => router.push(`/comments/${post.id}`);

  return (
    <View>
      <PostHeader
        author={post.author}
        details={[post.car, post.city, strings.feed.timeAgo(post.minutesAgo)].filter(isText)}
        onMore={
          post.author.username === ME.username
            ? undefined
            : () => openReport('post', post.id, post.author.username)
        }
      />
      {post.kind === 'photo' ? (
        <>
          <PostMedia photos={post.photos} onDoubleTap={flame} onIndexChange={setPhotoIndex} />
          {post.photos.length > 1 && (
            <View style={styles.dots}>
              <MediaDots count={post.photos.length} active={photoIndex} />
            </View>
          )}
        </>
      ) : (
        <PostText text={post.text} />
      )}
      <PostActions
        flamed={flamed}
        flames={post.flames + (flamed ? 1 : 0)}
        comments={count(post.id)}
        shares={post.shares}
        saved={saved}
        onToggleFlame={toggle}
        onComment={openComments}
        onSave={() => setSaved((value) => !value)}
      />
      {post.kind === 'photo' && (
        <PostCaption username={post.author.username} caption={post.caption} />
      )}
    </View>
  );
});

const isText = (value: string | undefined): value is string => Boolean(value);

const styles = StyleSheet.create({
  dots: {
    alignItems: 'center',
    paddingTop: spacing.sm,
  },
});
