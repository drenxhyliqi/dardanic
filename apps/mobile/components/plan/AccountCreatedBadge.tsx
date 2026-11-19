import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { colors, radius, sizes, spacing, typography } from '../../theme';

// "✓ Account created" pill, shown right after sign-up.
export function AccountCreatedBadge() {
  return (
    <View style={styles.badge} accessibilityRole="text">
      <View style={styles.check}>
        <Ionicons name="checkmark" size={sizes.icon - 6} color={colors.white} />
      </View>
      <Text style={styles.text}>{strings.plan.accountCreated}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.sm,
    paddingLeft: spacing.xs + spacing.xxs,
    paddingRight: spacing.md,
    paddingVertical: spacing.xs + spacing.xxs,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
  },
  check: {
    width: sizes.badgeCheck,
    height: sizes.badgeCheck,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  text: {
    ...typography.label,
    color: colors.primaryLight,
  },
});
