import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '../../i18n';
import { makeStyles, radius, spacing } from '../../theme';

export type StoryPanelProps = {
  onClose: () => void;
  tall?: boolean; // most of the screen (a list) instead of fitting its content
  children: ReactNode;
};

// A panel sliding over a story from the bottom (your viewers, the ••• menu), over a
// dimmed story. Tapping the dimmed part closes it.
export function StoryPanel({ onClose, tall = false, children }: StoryPanelProps) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.cover}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityLabel={strings.common.close}
        />
        <View
          style={[styles.panel, tall && styles.tall, { paddingBottom: insets.bottom + spacing.md }]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    cover: { ...StyleSheet.absoluteFill, justifyContent: 'flex-end' },
    backdrop: { ...StyleSheet.absoluteFill, backgroundColor: colors.black, opacity: 0.5 },
    panel: {
      gap: spacing.md,
      paddingTop: spacing.lg,
      paddingHorizontal: spacing.lg,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      backgroundColor: colors.background,
    },
    tall: { height: '60%' },
  }),
);
