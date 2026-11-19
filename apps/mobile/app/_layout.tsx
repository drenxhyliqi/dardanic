import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';

import { LaunchScreen } from '../components/launch/LaunchScreen';
import { OnboardingProvider } from '../context/OnboardingContext';
import { strings } from '../i18n';
import { fontFiles, ThemeProvider, useTheme } from '../theme';

// Keep the native splash (D logo) up until our launch animation takes over.
SplashScreen.preventAutoHideAsync().catch(() => {});

// Pages that show a simple top bar with only a back arrow.
const withBackBar = { headerShown: true, title: '' } as const;

// The root layout: the theme (light / dark / automatic) wraps everything; inside it the
// launch animation first, then a stack of pages (welcome screen first).
export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

function AppShell() {
  const { colors, scheme, loaded } = useTheme();
  const statusBar = scheme === 'dark' ? 'light' : 'dark';
  const [fontsLoaded, fontError] = useFonts(fontFiles);
  const [launched, setLaunched] = useState(false);
  const finishLaunch = useCallback(() => setLaunched(true), []);

  if (!launched) {
    return (
      <>
        <StatusBar style={statusBar} />
        <LaunchScreen
          ready={loaded && (fontsLoaded || fontError !== null)}
          onDone={finishLaunch}
        />
      </>
    );
  }

  return (
    <OnboardingProvider>
      <StatusBar style={statusBar} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="choose-plan" options={{ gestureEnabled: false }} />
        <Stack.Screen name="profile-setup" options={{ gestureEnabled: false }} />
        <Stack.Screen name="vibes" />
        <Stack.Screen name="intro" options={{ gestureEnabled: false }} />
        <Stack.Screen name="ready" options={{ gestureEnabled: false, animation: 'fade' }} />
        <Stack.Screen name="login" options={withBackBar} />
        <Stack.Screen name="forgot-password" options={withBackBar} />
        <Stack.Screen name="terms" options={withBackBar} />
        <Stack.Screen name="privacy" options={withBackBar} />
        <Stack.Screen name="license" options={withBackBar} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="create" options={{ presentation: 'modal' }} />
        <Stack.Screen
          name="settings"
          options={{ headerShown: true, title: strings.settings.title }}
        />
      </Stack>
    </OnboardingProvider>
  );
}
