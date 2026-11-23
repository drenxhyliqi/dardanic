import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { GarageCar } from '../../data/garage';
import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { LoadingImage } from '../ui/LoadingImage';
import { Tag } from '../ui/Tag';

const t = strings.profile.build;
const PHOTO_RATIO = 16 / 9;

// A car in the garage, kept minimal: photo with its role (and "Main"), the model and
// year, and the two numbers people look at first, HP and 0–100. Project cars get a thin
// progress line. Tapping opens the full build page.
export function BuildCard({ car }: { car: GarageCar }) {
  const styles = useStyles();
  const colors = useColors();
  const numbers = [
    { value: String(car.hp), label: t.hp },
    { value: car.sprint, label: t.sprint },
  ];

  return (
    <Pressable
      onPress={() => router.push(`/build/${car.id}`)}
      accessibilityRole="button"
      accessibilityLabel={t.open(car.model)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.photo, { aspectRatio: PHOTO_RATIO }]}>
        <LoadingImage source={{ uri: car.photo }} resizeMode="cover" />
        <View style={styles.tags}>
          <Tag label={t.roles[car.role]} tone="quiet" />
          {car.main && <Tag label={strings.profile.main} tone="blue" />}
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.name}>
          <Text style={styles.model} numberOfLines={1}>
            {car.model}
          </Text>
          <Text style={styles.year}>{car.year}</Text>
        </View>
        {numbers.map((number) => (
          <View key={number.label} style={styles.number}>
            <Text style={styles.value}>{number.value}</Text>
            <Text style={styles.label}>{number.label}</Text>
          </View>
        ))}
        <Ionicons name="chevron-forward" size={sizes.icon} color={colors.textMuted} />
      </View>
      {car.progress !== undefined && (
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${car.progress * 100}%` }]} />
        </View>
      )}
    </Pressable>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      overflow: 'hidden',
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: { opacity: 0.85 },
    photo: { width: '100%' },
    tags: {
      position: 'absolute',
      top: spacing.md,
      left: spacing.md,
      right: spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    body: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, padding: spacing.lg },
    name: { flex: 1 },
    model: { ...typography.name, color: colors.text },
    year: { ...typography.small, color: colors.textMuted },
    number: { alignItems: 'flex-end' },
    value: { ...typography.stat, color: colors.text },
    label: { ...typography.small, color: colors.textMuted },
    track: { height: sizes.progressLine, backgroundColor: colors.surfaceBorder },
    fill: { height: '100%', backgroundColor: colors.primary },
  }),
);
