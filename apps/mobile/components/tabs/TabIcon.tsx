import { Ionicons } from '@expo/vector-icons';

import { sizes, useColors } from '../../theme';

type IconName = keyof typeof Ionicons.glyphMap;

export type TabIconProps = {
  focused: boolean;
  icon: IconName; // filled version, shown when the tab is active
  iconOutline: IconName; // outline version, shown otherwise
};

// A bottom-bar icon: filled and blue when active, outline and light when not.
export function TabIcon({ focused, icon, iconOutline }: TabIconProps) {
  const colors = useColors();
  return (
    <Ionicons
      name={focused ? icon : iconOutline}
      size={sizes.tabIcon}
      color={focused ? colors.primary : colors.text}
    />
  );
}
