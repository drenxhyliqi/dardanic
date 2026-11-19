import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { FEED_FILTERS, type FeedFilter } from './feedFilters';

export type FeedFilterMenuProps = {
  visible: boolean;
  top: number; // where the menu starts, just under the top bar
  active: FeedFilter;
  onSelect: (filter: FeedFilter) => void;
  onClose: () => void;
};

// The dropdown under the logo: For you / Following / Crews, with a ✓ on the current one.
// Tapping anywhere else closes it.
export function FeedFilterMenu({ visible, top, active, onSelect, onClose }: FeedFilterMenuProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityRole="button" />
      <View style={[styles.menu, { top }]}>
        {FEED_FILTERS.map((filter, i) => {
          const selected = filter === active;
          return (
            <Pressable
              key={filter}
              onPress={() => onSelect(filter)}
              accessibilityRole="menuitem"
              accessibilityState={{ selected }}
              style={({ pressed }) => [
                styles.item,
                i > 0 && styles.divider,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.label}>{strings.feed.filters[filter]}</Text>
              {selected && <Ionicons name="checkmark" size={sizes.icon} color={colors.primary} />}
            </Pressable>
          );
        })}
      </View>
    </Modal>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    menu: {
      position: 'absolute',
      alignSelf: 'center',
      width: sizes.feedMenu,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
      overflow: 'hidden',
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    divider: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.surfaceBorder,
    },
    pressed: {
      backgroundColor: colors.surfaceBorder,
    },
    label: {
      ...typography.body,
      color: colors.text,
    },
  }),
);
