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

// How alike another listing is to this one (0 = not at all): the same brand (the first
// word of the title, e.g. "AUDI") counts most, then shared words, then the same
// category.
export function similarity(listing: Listing) {
  const brand = listing.title.split(' ')[0]?.toUpperCase() ?? '';
  const words = wordsOf(listing);

  return (other: Listing) => {
    const otherWords = wordsOf(other);
    const sameBrand = brand.length > 1 && otherWords.has(brand);
    const shared = [...otherWords].filter((word) => words.has(word)).length;
    return (sameBrand ? 2 : 0) + Math.min(shared, 3) * 0.5 +
      (other.category === listing.category ? 1 : 0);
  };
}
