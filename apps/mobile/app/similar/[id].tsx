import { useLocalSearchParams } from 'expo-router';

import { ListingSkeleton } from '../../components/marketplace/ListingSkeleton';
import { SimilarListings } from '../../components/marketplace/SimilarListings';
import { useListing } from '../../hooks/useListing';
import { spacing } from '../../theme';

// "Find similar" on a listing: every listing like that one.
export default function SimilarScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { listing, isLoading } = useListing(id);
  if (isLoading) return <ListingSkeleton width={spacing.xxl * 4} />;
  if (!listing) return null;
  return <SimilarListings listing={listing} />;
}
