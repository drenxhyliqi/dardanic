import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { categoryById } from '../../data/marketplaceCategories';
import { strings } from '../../i18n';
import type { Listing } from '../../services/marketplace';
import { makeStyles, spacing, typography } from '../../theme';
import { withCommas } from '../../utils/text';
import { IconButton } from '../ui/IconButton';
import { Tag } from '../ui/Tag';
import { ListingBar } from './ListingBar';
import { ListingFits } from './ListingFits';
import { ListingGallery } from './ListingGallery';
import { SafetyTips } from './SafetyTips';
import { FindSimilarButton } from './FindSimilarButton';
import { HideListing } from './HideListing';
import { RelatedListings } from './RelatedListings';
import { SellerCard } from './SellerCard';
import { SellerLocation } from './SellerLocation';
import { StatusNotice } from './StatusNotice';

const t = strings.marketplace;

// A listing's full page: photos, the seller's title as the headline with the price
// under it, condition and category, what it fits (your cars highlighted), the
// description (all details, in the seller's words), safety tips, the seller and their
// city, related listings and Hide listing, with Message seller / Save / Share at the
// bottom. On your own listing, a notice says if it's under review or not allowed.
export function ListingDetail({ listing, mine }: { listing: Listing; mine: boolean }) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const category = categoryById(listing.category);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ListingGallery
          photos={listing.photos}
          onOpen={(index) =>
            router.push({ pathname: '/photos/[id]', params: { id: listing.id, index } })
          }
        />
        <View style={styles.content}>
          {mine && listing.status !== 'live' && <StatusNotice listing={listing} />}
          <View style={styles.head}>
            <Text style={styles.title}>{listing.title}</Text>
            <Text style={styles.price}>{t.price(withCommas(listing.price))}</Text>
            <View style={styles.tags}>
              <Tag label={t.conditions[listing.condition]} />
              <Tag label={category.name} />
              <Text style={styles.meta}>
                {[listing.city, strings.feed.timeAgo(listing.minutesAgo), t.savedBy(listing.saves)]
                  .join(' · ')}
              </Text>
            </View>
          </View>
          {listing.fits && listing.fits.length > 0 && (
            <Section title={t.fits}>
              <ListingFits fits={listing.fits} />
            </Section>
          )}
          <Section title={t.description}>
            <Text style={styles.body}>{listing.description}</Text>
          </Section>
          {!mine && (
            <>
              <SafetyTips />
              <Section title={t.seller}>
                <SellerCard seller={listing.seller} />
                <SellerLocation seller={listing.seller} />
              </Section>
              <RelatedListings listing={listing} />
              <HideListing id={listing.id} />
            </>
          )}
        </View>
      </ScrollView>
      <View style={[styles.top, { top: insets.top + spacing.sm }]}>
        <IconButton
          icon="chevron-back"
          label={strings.feed.meet.back}
          round
          onPress={() => router.back()}
        />
        {!mine && <FindSimilarButton id={listing.id} />}
      </View>
      <ListingBar listing={listing} mine={mine} />
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const styles = useStyles();
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    scroll: { paddingBottom: spacing.xxl },
    content: { gap: spacing.xl, padding: spacing.lg },
    head: { gap: spacing.sm },
    title: { ...typography.title, color: colors.text },
    price: { ...typography.cardTitle, color: colors.text },
    tags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    meta: { ...typography.small, flexShrink: 1, color: colors.textMuted },
    section: { gap: spacing.md },
    heading: { ...typography.cardTitle, color: colors.text },
    body: { ...typography.paragraph, color: colors.textMuted },
    top: { position: 'absolute', left: spacing.lg, flexDirection: 'row', gap: spacing.sm },
  }),
);
