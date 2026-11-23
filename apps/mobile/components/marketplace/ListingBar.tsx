import { router } from 'expo-router';
import { Share, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMarketplace } from '../../context/MarketplaceContext';
import { useMessages } from '../../context/MessagesContext';
import { strings } from '../../i18n';
import type { Listing } from '../../services/marketplace';
import { makeStyles, spacing } from '../../theme';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';

const t = strings.marketplace;

// Fixed at the bottom of a listing: Message seller (opens a chat with them), Save and
// Share. Your own listing has no Message button.
export function ListingBar({ listing, mine }: { listing: Listing; mine: boolean }) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { startWith } = useMessages();
  const { isSaved, toggleSave } = useMarketplace();
  const saved = isSaved(listing.id);

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + spacing.sm }]}>
      {!mine && (
        <View style={styles.main}>
          <Button
            label={t.messageSeller}
            icon="chatbubble-outline"
            small
            centered
            onPress={() =>
              router.push({
                pathname: '/chat/[id]',
                params: { id: startWith(listing.seller), listing: listing.id },
              })
            }
          />
        </View>
      )}
      <IconButton
        icon={saved ? 'bookmark' : 'bookmark-outline'}
        label={saved ? t.unsave : t.save}
        round
        onPress={() => toggleSave(listing.id)}
      />
      <IconButton
        icon="share-outline"
        label={t.share}
        round
        onPress={() => Share.share({ message: t.shareMessage(listing.title) })}
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.surfaceBorder,
      backgroundColor: colors.background,
    },
    main: { flex: 1 },
  }),
);
