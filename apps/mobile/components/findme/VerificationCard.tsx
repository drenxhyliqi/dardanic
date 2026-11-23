import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import type { Verification } from '../../services/findme';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { pickChatPhoto } from '../../utils/pickImage';
import { Button } from '../ui/Button';
import { LoadingImage } from '../ui/LoadingImage';

const t = strings.findme;

export type VerificationCardProps = {
  status: Verification;
  photo: string | null; // registration photo picked (not sent yet)
  onPick: (photo: string) => void;
};

// Proving the car is yours: verified (blue tick), being checked, or a button to add a
// photo of the registration document (sent when you save).
export function VerificationCard({ status, photo, onPick }: VerificationCardProps) {
  const styles = useStyles();
  const colors = useColors();
  const pick = async () => {
    const uri = await pickChatPhoto();
    if (uri) onPick(uri);
  };

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Ionicons
          name={status === 'verified' ? 'checkmark-circle' : 'document-text-outline'}
          size={sizes.icon}
          color={status === 'verified' ? colors.primary : colors.textMuted}
        />
        <Text style={styles.title}>
          {status === 'unverified' ? t.verifyTitle : t.verification[status]}
        </Text>
      </View>
      {status === 'unverified' && (
        <>
          <Text style={styles.hint}>{t.verifyHint}</Text>
          {photo && (
            <View style={styles.photo}>
              <LoadingImage source={{ uri: photo }} resizeMode="cover" radius={radius.md} />
            </View>
          )}
          <Button
            label={t.uploadRegistration}
            icon="camera-outline"
            variant="secondary"
            small
            centered
            onPress={pick}
          />
        </>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      gap: spacing.sm,
      padding: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    title: { ...typography.name, color: colors.text },
    hint: { ...typography.small, color: colors.textMuted },
    photo: { height: sizes.chatPhoto / 2, overflow: 'hidden', borderRadius: radius.md },
  }),
);
