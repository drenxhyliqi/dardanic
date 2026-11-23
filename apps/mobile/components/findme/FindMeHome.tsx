import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFindMe } from '../../context/FindMeContext';
import type { CountryCode } from '../../data/plateCountries';
import { strings } from '../../i18n';
import type { PlateSearchResult } from '../../services/findme';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { FadeIn } from '../ui/FadeIn';
import { LinkRow } from '../ui/LinkRow';
import { DriverCard } from './DriverCard';
import { PlateSearch } from './PlateSearch';
import { SearchResult } from './SearchResult';
import { VehicleSummary } from './VehicleSummary';

const t = strings.findme;

// The FindMe page: what it is in one line, the plate search with its result, your
// vehicle, links to requests / vehicles / settings, and the privacy note.
export function FindMeHome() {
  const styles = useStyles();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const findMe = useFindMe();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlateSearchResult | null>(null);
  const [country, setCountry] = useState<CountryCode>('RKS');
  const [notice, setNotice] = useState<string | null>(null);
  const [searchCount, setSearchCount] = useState(0); // replays the fade on each result

  const search = async (code: CountryCode, plate: string) => {
    setCountry(code);
    setNotice(null);
    setLoading(true);
    setResult(await findMe.search(code, plate));
    setSearchCount((count) => count + 1);
    setLoading(false);
  };

  const found = result?.status === 'found' ? result.driver : null;
  const connection = found ? findMe.connectionWith(found.username) : { state: 'none' as const };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons name="car-sport" size={sizes.headerIcon} color={colors.primaryLight} />
        </View>
        <Text style={styles.headline}>{t.headline}</Text>
        <Text style={styles.intro}>{t.intro}</Text>
      </View>

      <PlateSearch
        busy={loading}
        invalid={result?.status === 'invalid'}
        searchesLeft={findMe.searchesLeft}
        onSearch={search}
      />

      {notice && <Text style={styles.notice}>{notice}</Text>}
      <FadeIn key={loading ? 'loading' : `result-${searchCount}`}>
        <SearchResult
          loading={loading}
          result={result}
          country={country}
          found={
            found && (
              <DriverCard
                driver={found}
                connection={connection.state}
                onSend={() =>
                  router.push({
                    pathname: '/findme/request',
                    params: { ...found, photo: found.photo ?? '' },
                  })
                }
                onCancel={() => connection.requestId && findMe.cancelRequest(connection.requestId)}
                onViewProfile={() => router.push(`/user/${found.username}`)}
                onBlock={async () => {
                  await findMe.block(found.username);
                  setResult(null);
                  setNotice(t.blockedDone(found.username));
                }}
                onReport={async () => {
                  await findMe.report(found.username);
                  setNotice(t.reported);
                }}
              />
            )
          }
        />
      </FadeIn>

      <VehicleSummary />
      <View style={styles.links}>
        <LinkRow
          icon="mail-unread-outline"
          label={t.requests}
          count={findMe.incoming.length}
          onPress={() => router.push('/findme/requests')}
        />
        <LinkRow
          icon="car-outline"
          label={t.yourVehicles}
          onPress={() => router.push('/findme/vehicles')}
        />
        <LinkRow
          icon="options-outline"
          label={t.settings}
          onPress={() => router.push('/findme/settings')}
        />
      </View>

      <View style={styles.privacy}>
        <Ionicons name="shield-checkmark-outline" size={sizes.icon} color={colors.textMuted} />
        <Text style={styles.privacyText}>{t.privacy}</Text>
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { gap: spacing.xl, padding: spacing.lg },
    hero: { alignItems: 'center', gap: spacing.sm, paddingTop: spacing.sm },
    heroIcon: {
      width: sizes.heroIcon,
      height: sizes.heroIcon,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      backgroundColor: colors.primarySoft,
    },
    headline: { ...typography.title, textAlign: 'center', color: colors.text },
    intro: { ...typography.paragraph, textAlign: 'center', color: colors.textMuted },
    notice: { ...typography.label, textAlign: 'center', color: colors.primaryLight },
    links: { gap: spacing.sm },
    privacy: { flexDirection: 'row', gap: spacing.sm },
    privacyText: { ...typography.small, flex: 1, color: colors.textMuted },
  }),
);
