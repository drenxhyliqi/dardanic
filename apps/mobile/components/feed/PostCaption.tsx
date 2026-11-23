import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';

const t = strings.feed.post;
const PREVIEW_CHARS = 80; // longer captions are cut here with "… more"

export type PostCaptionProps = {
  username: string;
  caption: string;
};

// The caption under a photo post: "username caption"; long captions are cut short
// and open fully with "more".
export function PostCaption({ username, caption }: PostCaptionProps) {
  const styles = useStyles();
  const [expanded, setExpanded] = useState(false);
  const isLong = caption.length > PREVIEW_CHARS;
  const shown = isLong && !expanded ? `${caption.slice(0, PREVIEW_CHARS).trimEnd()}… ` : caption;

  return (
    <Text style={styles.caption} onPress={isLong ? () => setExpanded(true) : undefined}>
      <Text style={styles.username}>{username} </Text>
      {shown}
      {isLong && !expanded && <Text style={styles.muted}>{t.more}</Text>}
    </Text>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    caption: {
      ...typography.paragraph,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      color: colors.text,
    },
    username: {
      fontWeight: typography.label.fontWeight,
    },
    muted: {
      ...typography.paragraph,
      color: colors.textMuted,
    },
  }),
);
