import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '../../../i18n';
import type { Condition } from '../../../services/marketplace';
import { makeStyles, radius, spacing, typography } from '../../../theme';
import { Button } from '../../ui/Button';
import { PillTabs } from '../../ui/PillTabs';
import { TextField } from '../../ui/TextField';
import { ToggleRow } from '../../ui/ToggleRow';
import { categoryById } from '../../../data/marketplaceCategories';
import { CategoryGrid } from './CategoryGrid';
import { FitsFields } from './FitsFields';
import { PhotoStrip } from './PhotoStrip';
import type { useSellDraft } from './useSellDraft';

const t = strings.marketplace;
const CONDITIONS: Condition[] = ['new', 'likeNew', 'used', 'forParts'];

export type SellFormProps = ReturnType<typeof useSellDraft> & { onPublish: () => void };

// The sell form, top to bottom: the "only car stuff" rule, photos, a car-only category,
// title and price, condition, which car it fits (parts / wheels / accessories), the
// description with all the details in the seller's words, city, the "This listing is
// car-related" switch, and Publish.
export function SellForm({ fields, set, ready, onPublish }: SellFormProps) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
    >
      <View style={[styles.padded, styles.rules]}>
        <Text style={styles.rulesTitle}>{t.rulesTitle}</Text>
        <Text style={styles.rulesText}>{t.rulesText}</Text>
      </View>

      <Text style={[styles.padded, styles.heading]}>{t.photos}</Text>
      <PhotoStrip photos={fields.photos} onChange={(photos) => set('photos', photos)} />

      <View style={[styles.padded, styles.group]}>
        <Text style={styles.heading}>{t.category}</Text>
        <CategoryGrid value={fields.category} onChange={(category) => set('category', category)} />
        <TextField
          label={t.listingTitle}
          placeholder={t.titlePlaceholder}
          value={fields.title}
          onChangeText={(v) => set('title', v)}
          maxLength={90}
        />
        <TextField
          label={t.priceLabel}
          value={fields.price}
          onChangeText={(v) => set('price', v)}
          keyboardType="number-pad"
        />
        <Text style={styles.heading}>{t.condition}</Text>
        <View style={styles.pills}>
          <PillTabs<Condition>
            tabs={CONDITIONS.map((key) => ({ key, label: t.conditions[key] }))}
            active={fields.condition}
            onChange={(condition) => set('condition', condition)}
          />
        </View>
        {fields.category && categoryById(fields.category).fits && (
          <FitsFields
            brand={fields.fitsBrand}
            model={fields.fitsModel}
            onChange={(brand, model) => {
              set('fitsBrand', brand);
              set('fitsModel', model);
            }}
          />
        )}
        <TextField
          label={t.description}
          placeholder={t.descriptionPlaceholder}
          value={fields.description}
          onChangeText={(v) => set('description', v)}
          multiline
        />
        <TextField label={t.city} value={fields.city} onChangeText={(v) => set('city', v)} />
        <ToggleRow
          label={t.rulesConfirm}
          value={fields.confirmed}
          onChange={(v) => set('confirmed', v)}
        />
        {!ready && <Text style={styles.missing}>{t.missing}</Text>}
        <Button label={t.publish} strong centered disabled={!ready} onPress={onPublish} />
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    content: { gap: spacing.lg, paddingTop: spacing.md },
    padded: { marginHorizontal: spacing.lg },
    group: { gap: spacing.lg },
    rules: {
      gap: spacing.xs,
      padding: spacing.lg,
      borderRadius: radius.lg,
      backgroundColor: colors.primarySoft,
    },
    rulesTitle: { ...typography.label, color: colors.primaryLight },
    rulesText: { ...typography.paragraph, color: colors.text },
    heading: { ...typography.label, color: colors.text },
    pills: { flexDirection: 'row', flexWrap: 'wrap' },
    missing: { ...typography.small, color: colors.textMuted },
  }),
);
