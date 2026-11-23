import Ionicons from '@expo/vector-icons/Ionicons';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { strings } from '../../../i18n';
import { makeStyles, sizes, spacing, typography, useColors } from '../../../theme';
import { Button } from '../../ui/Button';

const t = strings.story;

export type CameraPermissionProps = {
  canAsk: boolean; // false once they've said no: only Settings can turn it on
  onAllow: () => void;
  onGallery: () => void;
};

// Before the camera is allowed: why we need it, "Allow camera" (or "Open Settings"
// after a no), and the library as another way in.
export function CameraPermission({ canAsk, onAllow, onGallery }: CameraPermissionProps) {
  const styles = useStyles();
  const colors = useColors();
  return (
    <View style={styles.box}>
      <Ionicons name="camera-outline" size={sizes.icon * 3} color={colors.white} />
      <Text style={styles.title}>{t.cameraTitle}</Text>
      <Text style={styles.text}>{t.cameraNeeded}</Text>
      <View style={styles.buttons}>
        <Button
          label={canAsk ? t.allowCamera : t.openSettings}
          small
          centered
          onPress={canAsk ? onAllow : () => Linking.openSettings().catch(() => {})}
        />
        <Button label={t.orGallery} variant="secondary" small centered onPress={onGallery} />
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    box: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.md,
      padding: spacing.xl,
    },
    title: { ...typography.title, textAlign: 'center', color: colors.white },
    text: { ...typography.paragraph, textAlign: 'center', color: colors.storyMuted },
    buttons: { alignSelf: 'stretch', gap: spacing.sm, marginTop: spacing.lg },
  }),
);
