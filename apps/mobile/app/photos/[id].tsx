import { useLocalSearchParams } from 'expo-router';

import { PhotoViewer } from '../../components/marketplace/PhotoViewer';
import { useListing } from '../../hooks/useListing';

// A listing's photos full screen (tap a photo on a listing). `index` = the photo tapped.
export default function ListingPhotosScreen() {
  const { id, index } = useLocalSearchParams<{ id: string; index?: string }>();
  const { listing } = useListing(id);
  if (!listing) return null;
  const start = Math.min(Number(index ?? 0) || 0, listing.photos.length - 1);
  return <PhotoViewer photos={listing.photos} start={start} />;
}
