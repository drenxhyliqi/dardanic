import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Connection } from '../../context/FindMeContext';
import { strings } from '../../i18n';
import type { Driver } from '../../services/findme';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../theme';
import { Plate } from '../intro/cards/CardParts';
import { Avatar } from '../profile/Avatar';
import { Button } from '../ui/Button';

const t = strings.findme;

export type DriverCardProps = {
  driver: Driver;
  connection: Connection;
  onSend: () => void;
  onCancel: () => void;
  onViewProfile: () => void;
  onBlock: () => void;
  onReport: () => void;
};

// A driver found by plate: photo, name, car and the masked plate (never the full one).
// Tapping the photo or name opens their profile. The button follows where you are:
// Send request → Request sent (Cancel) → View profile. Block and Report are always there.
export function DriverCard(props: DriverCardProps) {
  const { driver, connection, onSend, onCancel, onViewProfile, onBlock, onReport } = props;
  const styles = useStyles();
  const colors = useColors();

  return (
    <View style={styles.card}>
      <Pressable
        onPress={onViewProfile}
        accessibilityRole="button"
        accessibilityLabel={t.viewProfile}
        style={({ pressed }) => [styles.top, pressed && styles.pressed]}
      >
        <Avatar photo={driver.photo} name={driver.name} size={sizes.inboxAvatar} border={0} />
        <View style={styles.who}>
          <Text style={styles.name} numberOfLines={1}>
            {driver.name}
          </Text>
          <Text style={styles.muted}>@{driver.username}</Text>
        </View>
        <Plate text={driver.maskedPlate} />
        <Ionicons name="chevron-forward" size={sizes.icon} color={colors.textMuted} />
      </Pressable>
      <View style={styles.car}>
        <Ionicons name="car-sport-outline" size={sizes.icon} color={colors.textMuted} />
        <Text style={styles.carText}>{driver.car}</Text>
      </View>

      {connection === 'none' && (
        <Button label={t.sendRequest} icon="paper-plane" centered small strong onPress={onSend} />
      )}
      {connection === 'pending' && (
        <View style={styles.pending}>
          <View style={styles.grow}>
            <Button
              label={t.pending}
              icon="checkmark"
              variant="secondary"
              centered
              small
              disabled
            />
          </View>
          <Button label={t.cancelRequest} variant="secondary" compact small onPress={onCancel} />
        </View>
      )}
      {connection === 'connected' && (
        <Button
          label={t.viewProfile}
          icon="person-outline"
          variant="secondary"
          centered
          small
          onPress={onViewProfile}
        />
      )}

      <View style={styles.safety}>
        <Pressable onPress={onBlock} accessibilityRole="button" hitSlop={spacing.sm}>
          <Text style={styles.safetyText}>{t.block}</Text>
        </Pressable>
        <Text style={styles.muted}>·</Text>
        <Pressable onPress={onReport} accessibilityRole="button" hitSlop={spacing.sm}>
          <Text style={styles.safetyText}>{t.report}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    card: {
      gap: spacing.md,
      padding: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.surfaceBorder,
      backgroundColor: colors.surface,
    },
    top: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    pressed: {
      opacity: 0.7,
    },
    who: {
      flex: 1,
    },
    name: {
      ...typography.profileName,
      color: colors.text,
    },
    muted: {
      ...typography.small,
      color: colors.textMuted,
    },
    car: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    carText: {
      ...typography.paragraph,
      color: colors.text,
    },
    pending: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    grow: {
      flex: 1,
    },
    safety: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    safetyText: {
      ...typography.small,
      color: colors.textMuted,
    },
  }),
);
