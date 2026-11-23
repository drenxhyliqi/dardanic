import type { ReactNode } from 'react';

import { CommentsProvider } from './CommentsContext';
import { FindMeProvider } from './FindMeContext';
import { FollowProvider } from './FollowContext';
import { MarketplaceProvider } from './MarketplaceContext';
import { MeetsProvider } from './MeetsContext';
import { MessagesProvider } from './MessagesContext';
import { NotificationsProvider } from './NotificationsContext';
import { OnboardingProvider } from './OnboardingContext';
import { PrivacyProvider } from './PrivacyContext';
import { StoriesProvider } from './StoriesContext';

// All the app's shared data in one place (what you entered at sign-up, stories,
// your privacy, follows, stories, comments, messages, FindMe, notifications, meets), so the
// root layout stays readable.
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <OnboardingProvider>
      <PrivacyProvider>
        <FollowProvider>
          <StoriesProvider>
            <CommentsProvider>
              <MessagesProvider>
                <FindMeProvider>
                  <NotificationsProvider>
                    <MeetsProvider>
                      <MarketplaceProvider>{children}</MarketplaceProvider>
                    </MeetsProvider>
                  </NotificationsProvider>
                </FindMeProvider>
              </MessagesProvider>
            </CommentsProvider>
          </StoriesProvider>
        </FollowProvider>
      </PrivacyProvider>
    </OnboardingProvider>
  );
}
