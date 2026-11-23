// Marketplace categories: car-related only, there's deliberately no "Other". Each has
// an icon.
export type ListingCategory =
  | 'cars'
  | 'parts'
  | 'wheels'
  | 'tools'
  | 'electronics'
  | 'accessories';

export type CategoryInfo = {
  id: ListingCategory;
  name: string;
  icon: 'car-sport-outline' | 'construct-outline' | 'disc-outline' | 'hammer-outline'
    | 'hardware-chip-outline' | 'sparkles-outline';
};

export const LISTING_CATEGORIES: CategoryInfo[] = [
  { id: 'cars', name: 'Cars', icon: 'car-sport-outline' },
  { id: 'parts', name: 'Parts', icon: 'construct-outline' },
  { id: 'wheels', name: 'Wheels & tyres', icon: 'disc-outline' },
  { id: 'tools', name: 'Tools & garage', icon: 'hammer-outline' },
  { id: 'electronics', name: 'Car electronics', icon: 'hardware-chip-outline' },
  { id: 'accessories', name: 'Accessories', icon: 'sparkles-outline' },
];

export const categoryById = (id: ListingCategory) =>
  LISTING_CATEGORIES.find((category) => category.id === id) ?? LISTING_CATEGORIES[0];
