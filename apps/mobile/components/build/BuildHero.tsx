import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { GarageCar } from '../../data/garage';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { IconButton } from '../ui/IconButton';
import { LoadingImage } from '../ui/LoadingImage';
import { Tag } from '../ui/Tag';

const t = strings.profile.build;
const PHOTO_RATIO = 4 / 3;

// Top of a build page: the car's photo under the status bar, fading into the page, with
// a back button, its role (and "Main"), the model, year and engine.
export function BuildHero({ car }: { car: GarageCar }) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.photo, { aspectRatio: PHOTO_RATIO }]}>
      <LoadingImage source={{ uri: car.photo }} resizeMode="cover" />
      <View style={styles.fade} pointerEvents="none" />
      <View style={[styles.back, { top: insets.top + spacing.sm }]}>
        <IconButton icon="chevron-back" label={t.back} round onPress={() => router.back()} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.tags}>
          <Tag label={t.roles[car.role]} tone="quiet" />
          {car.main && <Tag label={strings.profile.main} tone="blue" />}
        </View>
        <Text style={styles.model}>{car.model}</Text>
        <Text style={styles.sub}>{`${car.year} · ${car.engine}`}</Text>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    photo: { width: '100%' },
    fade: { ...StyleSheet.absoluteFill, backgroundImage: colors.imageFade },
    back: { position: 'absolute', left: spacing.lg },
    bottom: {
      position: 'absolute',
      left: spacing.lg,
      right: spacing.lg,
      bottom: 0,
      gap: spacing.xs,
    },
    tags: { flexDirection: 'row', gap: spacing.xs },
    model: { ...typography.title, color: colors.text },
    sub: { ...typography.paragraph, color: colors.textMuted },
  }),
);
