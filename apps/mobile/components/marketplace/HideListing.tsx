import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { useMarketplace } from '../../context/MarketplaceContext';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { Button } from '../ui/Button';

const t = strings.marketplace;

// At the end of someone else's listing: "Hide listing" with a line saying what it does.
// Hiding takes it out of your Marketplace and related listings, then goes back.
export function HideListing({ id }: { id: string }) {
  const styles = useStyles();
  const { hide } = useMarketplace();
  return (
    <View style={styles.box}>
      <Button
        label={t.hideListing}
        icon="eye-off-outline"
        variant="secondary"
        small
        centered
        onPress={() => {
          hide(id);
          router.back();
        }}
      />
      <Text style={styles.hint}>{t.hideHint}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    box: { gap: spacing.sm },
    hint: { ...typography.small, textAlign: 'center', color: colors.textMuted },
  }),
);
