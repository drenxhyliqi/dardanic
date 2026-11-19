import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';

import { LaunchScreen } from '../components/launch/LaunchScreen';
import { colors, fontFiles } from '../theme';

// Keep the native splash (dark + D logo) up until our launch animation takes over.
SplashScreen.preventAutoHideAsync().catch(() => {});

// Pages that show a simple top bar with only a back arrow.
const withBackBar = { headerShown: true, title: '' } as const;

// The root layout: launch animation first, then a stack of pages (welcome screen first).
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontFiles);
  const [launched, setLaunched] = useState(false);
  const finishLaunch = useCallback(() => setLaunched(true), []);

  if (!launched) {
    return (
      <>
        <StatusBar style="light" />
        <LaunchScreen ready={fontsLoaded || fontError !== null} onDone={finishLaunch} />
      </>
    );
  }

  return (
    <>
      <StatusBar style="light" />
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
        <Stack.Screen name="login" options={withBackBar} />
        <Stack.Screen name="forgot-password" options={withBackBar} />
        <Stack.Screen name="terms" options={withBackBar} />
        <Stack.Screen name="privacy" options={withBackBar} />
        <Stack.Screen name="license" options={withBackBar} />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
