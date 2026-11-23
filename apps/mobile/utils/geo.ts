import { PLACES } from '../data/places';

const EARTH_KM = 6371;
const rad = (degrees: number) => (degrees * Math.PI) / 180;

// Straight-line distance in km between two places by name, or null if either is unknown.
export function distanceKm(from: string, to: string): number | null {
  const a = PLACES[from];
  const b = PLACES[to];
  if (!a || !b) return null;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.sqrt(h));
}
