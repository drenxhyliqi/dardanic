import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../../i18n';
import type { Listing } from '../../../services/marketplace';
import { makeStyles, sizes, spacing, typography, useColors } from '../../../theme';
import { Button } from '../../ui/Button';

const t = strings.marketplace;
const PULSE_MS = 700;

type Outcome = {
  icon: 'checkmark-circle' | 'time-outline' | 'ban-outline';
  color: string;
  title: string;
  hint?: string;
};

export type CheckResultProps = {
  listing: Listing | null; // null while the check is running
  onEdit: () => void; // back to the form (after "Not allowed")
};

// After Publish: a pulsing shield with "Checking your listing…", then the outcome.
// Live (blue tick), Under review (clock) or Not allowed (with the reason and "Edit and
// try again").
export function CheckResult({ listing, onEdit }: CheckResultProps) {
  const styles = useStyles();
  const colors = useColors();
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (listing) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.4, duration: PULSE_MS, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: PULSE_MS, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [listing, pulse]);

  if (!listing) {
    return (
      <View style={styles.center}>
        <Animated.View style={{ opacity: pulse }}>
          <Ionicons name="shield-checkmark-outline" size={sizes.icon * 3} color={colors.primary} />
        </Animated.View>
        <Text style={styles.title}>{t.checking}</Text>
        <Text style={styles.hint}>{t.checkingHint}</Text>
      </View>
    );
  }

  const outcome = {
    live: { icon: 'checkmark-circle', color: colors.primary, title: t.liveTitle, hint: t.liveHint },
    review: {
      icon: 'time-outline', color: colors.primaryLight, title: t.reviewTitle, hint: listing.reason,
    },
    rejected: {
      icon: 'ban-outline', color: colors.textMuted, title: t.rejectedTitle, hint: listing.reason,
    },
  }[listing.status] as Outcome;

  return (
    <View style={styles.center}>
      <Ionicons name={outcome.icon} size={sizes.icon * 3} color={outcome.color} />
      <Text style={styles.title}>{outcome.title}</Text>
      {outcome.hint && <Text style={styles.hint}>{outcome.hint}</Text>}
      <View style={styles.buttons}>
        {listing.status === 'rejected' ? (
          <Button label={t.editAndRetry} small centered onPress={onEdit} />
        ) : (
          <Button
            label={t.viewListing}
            small
            centered
            onPress={() => router.replace(`/listing/${listing.id}`)}
          />
        )}
        <Button label={t.done} variant="secondary" small centered onPress={() => router.back()} />
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.md,
      padding: spacing.xl,
    },
    title: { ...typography.heading, textAlign: 'center', color: colors.text },
    hint: { ...typography.paragraph, textAlign: 'center', color: colors.textMuted },
    buttons: { alignSelf: 'stretch', gap: spacing.sm, marginTop: spacing.lg },
  }),
);
