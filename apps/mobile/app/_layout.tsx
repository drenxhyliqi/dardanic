import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';

import { LaunchScreen } from '../components/launch/LaunchScreen';
import { AppProviders } from '../context/AppProviders';
import { strings } from '../i18n';
import { fontFiles, ThemeProvider, useTheme } from '../theme';

// Keep the native splash (D logo) up until our launch animation takes over.
SplashScreen.preventAutoHideAsync().catch(() => {});

// Pages that show a simple top bar with only a back arrow.
const withBackBar = { headerShown: true, title: '' } as const;
// Pages with a top bar showing a back arrow and a title.
const titled = (title: string) => ({ headerShown: true, title });

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
    <AppProviders>
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
        <Stack.Screen name="auth/email" options={withBackBar} />
        <Stack.Screen name="auth/phone" options={withBackBar} />
        <Stack.Screen name="auth/code" options={withBackBar} />
        {/* The account exists by now: no going back, finish the details. */}
        <Stack.Screen
          name="auth/details"
          options={{ ...withBackBar, headerBackVisible: false, gestureEnabled: false }}
        />
        <Stack.Screen name="terms" options={withBackBar} />
        <Stack.Screen name="privacy" options={withBackBar} />
        <Stack.Screen name="license" options={withBackBar} />
        <Stack.Screen name="guidelines" options={withBackBar} />
        <Stack.Screen name="blocked" options={titled(strings.settings.blockedTitle)} />
        <Stack.Screen name="help" options={titled(strings.settings.helpTitle)} />
        <Stack.Screen name="delete-account" options={titled(strings.settings.deleteTitle)} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen
          name="report"
          options={{
            presentation: 'transparentModal',
            animation: 'none',
            gestureEnabled: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="create/index"
          options={{
            presentation: 'transparentModal',
            animation: 'none',
            gestureEnabled: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="create/[kind]"
          options={{ headerShown: true, presentation: 'card' }}
        />
        <Stack.Screen name="new-message" options={{ presentation: 'modal' }} />
        <Stack.Screen name="chat/[id]" />
        <Stack.Screen name="user/[username]" />
        <Stack.Screen name="build/[id]" />
        <Stack.Screen name="meet/[id]" />
        <Stack.Screen name="listing/[id]" />
        <Stack.Screen
          name="photos/[id]"
          options={{ presentation: 'fullScreenModal', animation: 'fade' }}
        />
        <Stack.Screen name="similar/[id]" options={titled(strings.marketplace.similarTitle)} />
        <Stack.Screen name="sell" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="my-listings" options={titled(strings.marketplace.yourListings)} />
        <Stack.Screen name="post/[id]" options={titled(strings.search.postTitle)} />
        <Stack.Screen name="notifications" options={titled(strings.notifications.title)} />
        <Stack.Screen name="findme/index" options={titled(strings.findme.title)} />
        <Stack.Screen name="findme/requests" options={titled(strings.findme.requests)} />
        <Stack.Screen name="findme/vehicles" options={titled(strings.findme.yourVehicles)} />
        <Stack.Screen name="findme/vehicle" options={{ headerShown: true }} />
        <Stack.Screen name="findme/settings" options={titled(strings.findme.settings)} />
        <Stack.Screen
          name="findme/request"
          options={{
            presentation: 'transparentModal',
            animation: 'none',
            gestureEnabled: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        {/* See-through: the comments draw their own bottom sheet over the feed. */}
        <Stack.Screen
          name="comments/[postId]"
          options={{
            presentation: 'transparentModal',
            animation: 'none',
            gestureEnabled: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        {/* See-through, so the feed shows behind a story while you drag it down. */}
        <Stack.Screen
          name="story/new"
          options={{ presentation: 'fullScreenModal', gestureEnabled: false }}
        />
        <Stack.Screen
          name="story/[id]"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            gestureEnabled: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="settings"
          options={{ headerShown: true, title: strings.settings.title }}
        />
      </Stack>
    </AppProviders>
  );
}
