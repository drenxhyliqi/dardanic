import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/ui/Button';
import { Heading } from '../components/ui/Heading';
import { VibeChip } from '../components/vibes/VibeChip';
import { VibeFilters } from '../components/vibes/VibeFilters';
import { VibeSearch } from '../components/vibes/VibeSearch';
import { VibeSlots } from '../components/vibes/VibeSlots';
import { VIBE_BY_ID, VIBES, VIBES_TO_PICK, type Vibe, type VibeFilter } from '../data/vibes';
import { useOnboarding } from '../context/OnboardingContext';
import { strings } from '../i18n';
import { makeStyles, spacing, typography } from '../theme';
import { simplify } from '../utils/text';

const t = strings.vibes;

// After profile setup: pick exactly 5 vibes to shape the feed, then the intro.
// Filters show a handful per tab; search looks through every vibe (100+).
// Nothing is saved yet (no backend).
export default function VibesScreen() {
  const styles = useStyles();
  const { updateOnboarding } = useOnboarding();
  const [filter, setFilter] = useState<VibeFilter>('popular');
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<string[]>([]);

  const full = picked.length >= VIBES_TO_PICK;
  const pickedVibes = picked.map((id) => VIBE_BY_ID.get(id)).filter((v): v is Vibe => !!v);
  const searching = query.trim() !== '';
  const visible = searching
    ? VIBES.filter((vibe) => simplify(vibe.label).includes(simplify(query.trim())))
    : VIBES.filter((vibe) => vibe.filters.includes(filter));

  function toggle(id: string) {
    setPicked((current) =>
      current.includes(id) ? current.filter((p) => p !== id) : [...current, id],
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior="padding" style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View style={styles.header}>
            <View style={styles.headingText}>
              <Heading title={t.title} subtitle={t.subtitle} />
            </View>
            <Text style={[styles.counter, full && styles.counterFull]}>
              {t.counter(picked.length, VIBES_TO_PICK)}
            </Text>
          </View>

          <VibeSlots picked={pickedVibes} total={VIBES_TO_PICK} onRemove={toggle} />
          <VibeSearch query={query} onChange={setQuery} />
          {!searching && <VibeFilters active={filter} onChange={setFilter} />}

          {searching && visible.length === 0 && (
            <Text style={styles.empty}>{t.noResults(query.trim())}</Text>
          )}
          <View style={styles.chips}>
            {visible.map((vibe) => {
              const selected = picked.includes(vibe.id);
              return (
                <VibeChip
                  key={vibe.id}
                  label={vibe.label}
                  selected={selected}
                  disabled={full && !selected}
                  onPress={() => toggle(vibe.id)}
                />
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label={t.continue}
            onPress={() => {
              updateOnboarding({ vibes: picked });
              router.push('/intro');
            }}
            disabled={!full}
            strong
            centered
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xl,
      gap: spacing.xl,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.lg,
    },
    headingText: {
      flex: 1,
    },
    counter: {
      ...typography.title,
      color: colors.textMuted,
    },
    counterFull: {
      color: colors.primary,
    },
    empty: {
      ...typography.paragraph,
      color: colors.textMuted,
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    footer: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
    },
  }),
);
