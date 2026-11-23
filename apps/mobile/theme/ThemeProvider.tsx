import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';

import { darkColors, lightColors, type Palette } from './colors';

export type ThemePreference = 'light' | 'dark' | 'system';
type Scheme = 'light' | 'dark';

type ThemeValue = {
  colors: Palette;
  scheme: Scheme; // what's showing right now
  preference: ThemePreference; // what the user picked in Settings
  setPreference: (preference: ThemePreference) => void;
  loaded: boolean; // the saved choice has been read
};

const STORAGE_KEY = 'dardanic.theme';
const ThemeContext = createContext<ThemeValue | null>(null);

// Knows which theme to show: Dark by default, or the user's choice (the sign-up switch,
// or Settings: Light / Dark / Automatic = the phone's own setting). The choice is saved
// on the phone.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>('dark'); // default
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === 'light' || saved === 'dark' || saved === 'system') setPreferenceState(saved);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const value = useMemo<ThemeValue>(() => {
    const scheme: Scheme =
      preference === 'system' ? (system === 'light' ? 'light' : 'dark') : preference;
    return {
      colors: scheme === 'light' ? lightColors : darkColors,
      scheme,
      preference,
      loaded,
      setPreference: (next) => {
        setPreferenceState(next);
        AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
      },
    };
  }, [preference, system, loaded]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeProvider');
  return value;
}

// The active palette.
export const useColors = () => useTheme().colors;

// Styles that depend on the theme. Write them like StyleSheet.create, but as a function of
// the palette; call the returned hook inside the component. Built once per theme.
export function makeStyles<T>(factory: (colors: Palette) => T): () => T {
  const cache = new Map<Palette, T>();
  return function useStyles() {
    const colors = useColors();
    let styles = cache.get(colors);
    if (!styles) {
      styles = factory(colors);
      cache.set(colors, styles);
    }
    return styles;
  };
}
