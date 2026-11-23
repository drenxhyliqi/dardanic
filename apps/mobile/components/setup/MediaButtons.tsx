import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { pickBanner, pickProfilePhoto } from '../../utils/pickImage';

type IconName = ComponentProps<typeof Ionicons>['name'];

type MediaRowProps = {
  icon: IconName;
  title: string;
  hint: string;
  onPress: () => void;
};

// One row: icon, title with a short hint underneath, and a small blue "Add" at the end.
function MediaRow({ icon, title, hint, onPress }: MediaRowProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${hint}`}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={sizes.headerIcon} color={colors.text} />
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
      <View style={styles.add}>
        <Text style={styles.addLabel}>{strings.setup.add}</Text>
      </View>
    </Pressable>
  );
}

export type MediaButtonsProps = {
  onChangePhoto: (uri: string) => void;
  onChangeBanner: (uri: string) => void;
};

// Step 3, under the preview card: a "Your images" header and one row each
// for the profile photo and the banner (both open the photo library).
export function MediaButtons({ onChangePhoto, onChangeBanner }: MediaButtonsProps) {
  const styles = useStyles();
  const t = strings.setup;

  async function choosePhoto() {
    const uri = await pickProfilePhoto();
    if (uri) onChangePhoto(uri);
  }

  async function chooseBanner() {
    const uri = await pickBanner();
    if (uri) onChangeBanner(uri);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading} accessibilityRole="header">
          {t.imagesTitle}
        </Text>
        <Text style={styles.subtitle}>{t.imagesSubtitle}</Text>
      </View>
      <MediaRow
        icon="camera-outline"
        title={t.profilePhoto}
        hint={t.photoHint}
        onPress={choosePhoto}
      />
      <MediaRow icon="image-outline" title={t.banner} hint={t.bannerHint} onPress={chooseBanner} />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    container: {
      gap: spacing.md,
    },
    header: {
      gap: spacing.sm,
      marginBottom: spacing.xs,
    },
    heading: {
      ...typography.title,
      color: colors.text,
      textTransform: 'uppercase',
    },
    subtitle: {
      ...typography.paragraph,
      color: colors.textMuted,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
      padding: spacing.lg,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    pressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    text: {
      flex: 1,
      gap: spacing.xxs,
    },
    title: {
      ...typography.button,
      color: colors.text,
    },
    hint: {
      ...typography.small,
      color: colors.textMuted,
    },
    add: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.sm,
      backgroundColor: colors.primary,
    },
    addLabel: {
      ...typography.label,
      color: colors.white,
    },
  }),
);
