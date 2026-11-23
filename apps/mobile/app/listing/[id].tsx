import { useLocalSearchParams } from 'expo-router';

import { ListingDetail } from '../../components/marketplace/ListingDetail';
import { ListingDetailSkeleton } from '../../components/marketplace/ListingDetailSkeleton';
import { useListing } from '../../hooks/useListing';

// A Marketplace listing's full page (tap a listing).
export default function ListingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { listing, mine, isLoading } = useListing(id);
  if (isLoading) return <ListingDetailSkeleton />;
  if (!listing) return null;
  return <ListingDetail listing={listing} mine={mine} />;
}
