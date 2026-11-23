import type { Tabs } from 'expo-router';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';

import { useScrollCollapse } from '../../context/ScrollCollapseContext';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const BORDER = 1;
const HIGHLIGHT = sizes.tabBar - BORDER * 2 - sizes.tabBarInset * 2; // circle behind the active icon
const COMPACT_SCALE = 0.8; // size of the bar while scrolling down a feed

// Room to leave at the bottom of scrolling pages so nothing hides behind the bar.
export const tabBarSpace = (safeBottom: number) => safeBottom + sizes.tabBar + spacing.md;

// The bottom bar as a floating capsule (like Instagram). Tabs can show a red count
// (tabBarBadge), e.g. unread messages. The active tab has a dark-blue
// circle behind its icon that slides to the new tab when you switch. The circle is the
// same size on every tab, so it sits evenly even at the rounded ends of the bar.
// While you scroll down the Feed, the whole bar smoothly shrinks (narrower and shorter,
// staying on the same bottom line) and grows back when you scroll up.
// Tabs whose button is styled `display: 'none'` (e.g. Search) don't get a button in
// the bar, but can still be opened.
const isHidden = (options: { tabBarItemStyle?: unknown }) =>
  StyleSheet.flatten(options.tabBarItemStyle as ViewStyle)?.display === 'none';

// Left edge of the highlight circle so it's centred in tab number `index`.
const centre = (index: number, itemWidth: number) =>
  index * itemWidth + (itemWidth - HIGHLIGHT) / 2;

export function FloatingTabBar({
  state,
  descriptors,
  emitter,
  navigateToTab,
  insets,
}: TabBarProps) {
  const styles = useStyles();
  const colors = useColors();
  const [width, setWidth] = useState(0);
  const slide = useRef(new Animated.Value(0)).current;
  // Hidden tabs (e.g. Search, opened from the Feed) get no button.
  const visible = state.routes.filter((route) => !isHidden(descriptors[route.key].options));
  const activeKey = state.routes[state.index].key;
  const activeIndex = visible.findIndex((route) => route.key === activeKey); // -1 on a hidden tab
  const itemWidth = width / visible.length; // width measured inside the border
  const collapse = useScrollCollapse();
  const scale = collapse.interpolate({ inputRange: [0, 1], outputRange: [1, COMPACT_SCALE] });
  // Scaling shrinks towards the middle; push it down by half the lost height so the
  // bottom edge stays where it was.
  const sink = collapse.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (sizes.tabBar * (1 - COMPACT_SCALE)) / 2],
  });

  useEffect(() => {
    if (!itemWidth || activeIndex < 0) return;
    Animated.spring(slide, {
      toValue: centre(activeIndex, itemWidth),
      friction: 8,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, itemWidth, slide]);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width - BORDER * 2;
    // Jump straight to the right place the first time (no slide).
    if (!width) slide.setValue(centre(Math.max(0, activeIndex), w / visible.length));
    setWidth(w);
  };

  return (
    <Animated.View
      style={[
        styles.wrap,
        {
          bottom: Math.max(insets.bottom, spacing.md),
          transform: [{ translateY: sink }, { scale }],
        },
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.bar} onLayout={onLayout}>
        {itemWidth > 0 && (
          <Animated.View
            style={[
              styles.highlight,
              activeIndex < 0 && styles.hidden,
              { transform: [{ translateX: slide }] },
            ]}
          />
        )}

        {visible.map((route) => {
          const { options } = descriptors[route.key];
          const focused = route.key === activeKey;

          const onPress = () => {
            const event = emitter.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) navigateToTab(route.key);
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="tab"
              accessibilityLabel={options.title}
              accessibilityState={{ selected: focused }}
              style={styles.item}
            >
              <View>
                {options.tabBarIcon?.({ focused, color: colors.text, size: sizes.tabIcon })}
                {options.tabBarBadge === '' ? (
                  <View style={styles.dot} />
                ) : (
                  options.tabBarBadge !== undefined && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{options.tabBarBadge}</Text>
                    </View>
                  )
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    wrap: {
      position: 'absolute',
      left: spacing.xl,
      right: spacing.xl,
    },
    bar: {
      height: sizes.tabBar,
      flexDirection: 'row',
      borderRadius: radius.full,
      borderWidth: BORDER,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    hidden: {
      opacity: 0,
    },
    highlight: {
      position: 'absolute',
      top: sizes.tabBarInset,
      left: 0,
      width: HIGHLIGHT,
      height: HIGHLIGHT,
      borderRadius: radius.full,
      backgroundColor: colors.primarySoft,
    },
    item: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Red count on an icon (e.g. unread messages); red is for badges.
    badge: {
      position: 'absolute',
      top: -spacing.xs,
      right: -spacing.sm,
      minWidth: sizes.unreadBadge * 0.85,
      height: sizes.unreadBadge * 0.85,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xs,
      borderRadius: radius.full,
      borderWidth: sizes.accentRing,
      borderColor: colors.surface,
      backgroundColor: colors.alert,
    },
    // Just a dot, no number (tabBarBadge: ''), e.g. new listings on the Marketplace.
    dot: {
      position: 'absolute',
      top: -spacing.xxs,
      right: -spacing.xs,
      width: spacing.sm + sizes.accentRing * 2,
      height: spacing.sm + sizes.accentRing * 2,
      borderRadius: radius.full,
      borderWidth: sizes.accentRing,
      borderColor: colors.surface,
      backgroundColor: colors.alert,
    },
    badgeText: {
      ...typography.badge,
      letterSpacing: 0,
      color: colors.white,
    },
  }),
);
