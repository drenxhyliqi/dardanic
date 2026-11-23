// Marketplace categories: car-related only, there's deliberately no "Other". Each has
// an icon, and whether its listings say which car they fit.
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
  fits: boolean; // the sell form offers "Fits" (one tap from your garage)
};

export const LISTING_CATEGORIES: CategoryInfo[] = [
  { id: 'cars', name: 'Cars', icon: 'car-sport-outline', fits: false },
  { id: 'parts', name: 'Parts', icon: 'construct-outline', fits: true },
  { id: 'wheels', name: 'Wheels & tyres', icon: 'disc-outline', fits: true },
  { id: 'tools', name: 'Tools & garage', icon: 'hammer-outline', fits: false },
  { id: 'electronics', name: 'Car electronics', icon: 'hardware-chip-outline', fits: false },
  { id: 'accessories', name: 'Accessories', icon: 'sparkles-outline', fits: true },
];

export const categoryById = (id: ListingCategory) =>
  LISTING_CATEGORIES.find((category) => category.id === id) ?? LISTING_CATEGORIES[0];
