import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { Plate } from '../intro/cards/CardParts';

const t = strings.search;
const SAMPLE_PLATE = '01-•••-KA'; // a masked plate, like FindMe shows them

// The way into FindMe from search: a small masked plate, "Spotted a car?" and a quiet
// line under it, with a thin arrow. Minimal on purpose.
export function FindMeCard() {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={() => router.push('/findme')}
      accessibilityRole="button"
      accessibilityLabel={`${t.findMeTitle} ${t.findMeHint}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.plate}>
        <Plate text={SAMPLE_PLATE} />
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>{t.findMeTitle}</Text>
        <Text style={styles.hint}>{t.findMeHint}</Text>
      </View>
      <Ionicons name="arrow-forward" size={sizes.icon} color={colors.text} />
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
    },
    pressed: { opacity: 0.8 },
    // Thin outline so the white plate still shows on a white card (light theme).
    plate: {
      overflow: 'hidden',
      borderRadius: radius.sm,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.borderFocus,
    },
    text: { flex: 1, gap: spacing.xxs },
    title: { ...typography.name, color: colors.text },
    hint: { ...typography.small, color: colors.textMuted },
  }),
);
