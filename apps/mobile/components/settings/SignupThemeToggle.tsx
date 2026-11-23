import { usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '../../theme';
import { ThemeToggle, TOGGLE_WIDTH } from './ThemeToggle';

// The screens before the Feed where the button shows (not the "account ready"
// animation, and nothing after it).
const SIGNUP_ROUTES = [
  '/',
  '/login',
  '/auth/email',
  '/auth/phone',
  '/auth/code',
  '/auth/password',
  '/auth/details',
  '/choose-plan',
  '/profile-setup',
  '/vibes',
]; // (the intro has the button in its own top bar, next to Skip)

// Space a screen leaves free on the right of its top row so the button fits there.
export const THEME_TOGGLE_ROOM = TOGGLE_WIDTH + spacing.sm;

// The light / dark switch (sun and moon, the active one in a blue circle) at the top
// right of the sign-up screens. (Later it's in Settings → Theme, which also has
// Automatic.)
export function SignupThemeToggle() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  if (!SIGNUP_ROUTES.includes(pathname)) return null;
  return (
    <View style={[styles.corner, { top: insets.top + spacing.sm }]} pointerEvents="box-none">
      <ThemeToggle />
    </View>
  );
}

// Just the switch, for screens that place it themselves (the intro, before Skip).
export const ThemeToggleButton = ThemeToggle;

const styles = StyleSheet.create({
  corner: { position: 'absolute', right: spacing.lg },
});
