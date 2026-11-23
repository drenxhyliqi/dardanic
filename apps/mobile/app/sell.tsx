import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CheckResult } from '../components/marketplace/sell/CheckResult';
import { SellForm } from '../components/marketplace/sell/SellForm';
import { useSellDraft } from '../components/marketplace/sell/useSellDraft';
import { IconButton } from '../components/ui/IconButton';
import { useMarketplace } from '../context/MarketplaceContext';
import { strings } from '../i18n';
import type { Listing } from '../services/marketplace';
import { makeStyles, spacing, typography } from '../theme';

type Stage = 'form' | 'checking' | 'done';

// Sell something (from the Marketplace's Sell button): the form, then the car-related
// check, then the outcome. "Edit and try again" goes back to the filled-in form.
export default function SellScreen() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const draft = useSellDraft();
  const { publish } = useMarketplace();
  const [stage, setStage] = useState<Stage>('form');
  const [result, setResult] = useState<Listing | null>(null);

  const onPublish = async () => {
    setStage('checking');
    setResult(await publish(draft.toDraft()));
    setStage('done');
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <IconButton icon="close" label={strings.marketplace.done} onPress={() => router.back()} />
        <Text style={styles.title}>{strings.marketplace.sellTitle}</Text>
      </View>
      {stage === 'form' ? (
        <SellForm {...draft} onPublish={onPublish} />
      ) : (
        <CheckResult listing={stage === 'done' ? result : null} onEdit={() => setStage('form')} />
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    title: { ...typography.cardTitle, color: colors.text },
  }),
);
