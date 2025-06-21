import type { Property } from '@/lib/types';
import PropertyList from './PropertyList';

interface SimilarListingsProps {
  similarProperties: Property[];
}

export default function SimilarListings({ similarProperties }: SimilarListingsProps) {
  if (similarProperties.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Similar Listings</h2>
      <PropertyList properties={similarProperties} />
    </div>
  );
}
