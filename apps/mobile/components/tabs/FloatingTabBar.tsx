import type { Tabs } from 'expo-router';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { Animated, Pressable, StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { makeStyles, radius, sizes, spacing, useColors } from '../../theme';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const BORDER = 1;
const HIGHLIGHT = sizes.tabBar - BORDER * 2 - sizes.tabBarInset * 2; // circle behind the active icon

// Room to leave at the bottom of scrolling pages so nothing hides behind the bar.
export const tabBarSpace = (safeBottom: number) => safeBottom + sizes.tabBar + spacing.md;

// The bottom bar as a floating capsule (like Instagram). The active tab has a dark-blue
// circle behind its icon that slides to the new tab when you switch. The circle is the
// same size on every tab, so it sits evenly even at the rounded ends of the bar.
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
  const itemWidth = width / state.routes.length; // width measured inside the border

  useEffect(() => {
    if (!itemWidth) return;
    Animated.spring(slide, {
      toValue: centre(state.index, itemWidth),
      friction: 8,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [state.index, itemWidth, slide]);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width - BORDER * 2;
    if (!width) slide.setValue(centre(state.index, w / state.routes.length)); // no slide on first show
    setWidth(w);
  };

  return (
    <View
      style={[styles.wrap, { bottom: Math.max(insets.bottom, spacing.md) }]}
      pointerEvents="box-none"
    >
      <View style={styles.bar} onLayout={onLayout}>
        {itemWidth > 0 && (
          <Animated.View style={[styles.highlight, { transform: [{ translateX: slide }] }]} />
        )}

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;

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
              {options.tabBarIcon?.({ focused, color: colors.text, size: sizes.tabIcon })}
            </Pressable>
          );
        })}
      </View>
    </View>
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
  }),
);
