import { properties } from '@/lib/data';
import type { Property } from '@/lib/types';
import PropertyCard from './PropertyCard';

interface SimilarListingsProps {
  currentProperty: Property;
}

export default function SimilarListings({ currentProperty }: SimilarListingsProps) {
  const similar = properties.filter(
    p => (p.city === currentProperty.city || p.propertyType === currentProperty.propertyType) && p.id !== currentProperty.id
  ).slice(0, 4);

  if (similar.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Similar Listings</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {similar.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
