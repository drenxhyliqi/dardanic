import type { Listing } from './types';

// Short, common Albanian / English words that say nothing about the car.
const IGNORE = new Set([
  'për', 'per', 'dhe', 'me', 'pa', 'në', 'ne', 'të', 'te', 'e', 'i', 'një', 'nje', 'është',
  'jane', 'janë', 'vetëm', 'shumë', 'the', 'and', 'for', 'with', 'viti', 'km', 'copë',
]);

// The meaningful words of a listing's title and description, upper-cased.
const wordsOf = (listing: Listing) =>
  new Set(
    `${listing.title} ${listing.description}`
      .toUpperCase()
      .split(/[^A-Z0-9ËÇ]+/)
      .filter((word) => word.length > 2 && !IGNORE.has(word.toLowerCase())),
  );

// How alike another listing is to this one (0 = not at all). Fits the same car model
// counts most, then the same brand, then shared words, then the same category.
export function similarity(listing: Listing) {
  const fits = listing.fits ?? [];
  const models = fits.map((fit) => fit.model.toUpperCase());
  const brands = fits.length
    ? fits.map((fit) => fit.brand.toUpperCase())
    : [listing.title.split(' ')[0]?.toUpperCase() ?? ''];
  const words = wordsOf(listing);

  return (other: Listing) => {
    const otherFits = other.fits ?? [];
    const otherWords = wordsOf(other);
    const sameModel = otherFits.some((fit) => models.includes(fit.model.toUpperCase()));
    const sameBrand =
      brands.some((brand) => otherWords.has(brand)) ||
      otherFits.some((fit) => brands.includes(fit.brand.toUpperCase()));
    const shared = [...otherWords].filter((word) => words.has(word)).length;
    return (sameModel ? 3 : 0) + (sameBrand ? 2 : 0) + Math.min(shared, 3) * 0.5 +
      (other.category === listing.category ? 1 : 0);
  };
}
