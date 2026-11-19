import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccountCreatedBadge } from '../components/plan/AccountCreatedBadge';
import { PlanCard } from '../components/plan/PlanCard';
import { Button } from '../components/ui/Button';
import { Heading } from '../components/ui/Heading';
import { WelcomeImage } from '../components/welcome/WelcomeImage';
import { strings } from '../i18n';
import { colors, sizes, spacing } from '../theme';

const logoMark = require('../assets/brand/logo-mark.png');
const MARK_RATIO = 600 / 229;

type Plan = 'standard' | 'professional';

const t = strings.plan;

// Shown right after sign-up: pick Standard (preselected) or Professional (paid, for businesses).
// Same photo background as the welcome screen, with everything sitting at the bottom.
// Payments aren't connected yet: both plans continue into the app for now.
export default function ChoosePlanScreen() {
  const [plan, setPlan] = useState<Plan>('standard');

  return (
    <View style={styles.screen}>
      <WelcomeImage />
      <SafeAreaView style={styles.safe}>
        <Image
          source={logoMark}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="DARDANIC"
        />
        <ScrollView contentContainerStyle={styles.content} bounces={false}>
          <View style={styles.top}>
            <AccountCreatedBadge />
            <Heading title={t.title} subtitle={t.subtitle} />
          </View>

          <View style={styles.plans} accessibilityRole="radiogroup">
            <PlanCard
              title={t.standardTitle}
              description={t.standardDescription}
              selected={plan === 'standard'}
              flag
              badge={t.standardBadge}
              large
              onPress={() => setPlan('standard')}
            />
            <PlanCard
              title={t.proTitle}
              description={t.proDescription}
              selected={plan === 'professional'}
              onPress={() => setPlan('professional')}
            />
          </View>

          <Button
            label={plan === 'standard' ? t.continueStandard : t.continueProfessional}
            onPress={() => router.replace('/home')}
            showArrow
            strong
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safe: {
    flex: 1,
  },
  logo: {
    width: sizes.logoMarkSmall,
    height: sizes.logoMarkSmall / MARK_RATIO,
    marginTop: spacing.sm,
    marginLeft: spacing.xl,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    gap: spacing.xl,
  },
  top: {
    gap: spacing.lg,
  },
  plans: {
    gap: spacing.md,
    paddingTop: spacing.sm,
  },
});
