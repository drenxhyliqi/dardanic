import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, sizes, spacing, useColors } from '../../theme';

export type ProfileTab = 'posts' | 'gallery' | 'builds';

const TABS: { tab: ProfileTab; icon: 'grid' | 'images' | 'car-sport' }[] = [
  { tab: 'posts', icon: 'grid' },
  { tab: 'gallery', icon: 'images' },
  { tab: 'builds', icon: 'car-sport' },
];

export type ProfileTabsProps = {
  active: ProfileTab;
  onChange: (tab: ProfileTab) => void;
};

// Posts · Gallery · Builds as icons (like Instagram), with a thin line under the
// active one. The names are still read out by screen readers.
export function ProfileTabs({ active, onChange }: ProfileTabsProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.row}>
      {TABS.map(({ tab, icon }) => {
        const isActive = tab === active;
        return (
          <Pressable
            key={tab}
            onPress={() => onChange(tab)}
            accessibilityRole="tab"
            accessibilityLabel={strings.profile.tabs[tab]}
            accessibilityState={{ selected: isActive }}
            style={styles.tab}
          >
            <Ionicons
              name={isActive ? icon : `${icon}-outline`}
              size={sizes.headerIcon}
              color={isActive ? colors.text : colors.textMuted}
            />
            <View style={[styles.indicator, isActive && styles.indicatorActive]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.surfaceBorder,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      gap: spacing.md,
      paddingTop: spacing.md,
    },
    indicator: {
      alignSelf: 'stretch',
      height: sizes.tabIndicator,
    },
    indicatorActive: {
      backgroundColor: colors.text,
    },
  }),
);
