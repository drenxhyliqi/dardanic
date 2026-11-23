import { useState } from 'react';

import { categoryById, type ListingCategory } from '../../../data/marketplaceCategories';
import { ME } from '../../../data/myPosts';
import { SAMPLE_PROFILE } from '../../../data/profile';
import type { Condition, ListingDraft } from '../../../services/marketplace';

export type SellFields = {
  photos: string[];
  category: ListingCategory | null;
  title: string;
  price: string;
  condition: Condition;
  description: string; // every detail, in the seller's own words (Albanian)
  city: string;
  fitsBrand: string; // parts, wheels, accessories: the car it fits (optional)
  fitsModel: string;
  confirmed: boolean; // "This listing is car-related"
};

const EMPTY: SellFields = {
  photos: [], category: null, title: '', price: '', condition: 'used', description: '',
  city: SAMPLE_PROFILE.city, fitsBrand: '', fitsModel: '', confirmed: false,
};

// The sell form's state: every field, a setter, whether it's ready to publish, and the
// finished listing draft.
export function useSellDraft() {
  const [fields, setFields] = useState<SellFields>(EMPTY);
  const set = <K extends keyof SellFields>(key: K, value: SellFields[K]) =>
    setFields((current) => ({ ...current, [key]: value }));

  const price = Number(fields.price.replace(/[^0-9]/g, ''));
  const ready =
    fields.photos.length > 0 && fields.category !== null && fields.title.trim().length > 2 &&
    price > 0 && fields.confirmed;

  const toDraft = (): ListingDraft => {
    const category = fields.category ?? 'parts';
    const brand = fields.fitsBrand.trim();
    const model = fields.fitsModel.trim();
    const hasFit = categoryById(category).fits && brand && model;
    return {
      title: fields.title.trim(),
      description: fields.description.trim(),
      category,
      price,
      condition: fields.condition,
      photos: fields.photos,
      city: fields.city,
      seller: ME,
      fits: hasFit ? [{ brand, model }] : undefined,
    };
  };

  return { fields, set, ready, toDraft };
}
