import PropertyCard from './PropertyCard';
import type { Property } from '@/lib/types';

interface PropertyListProps {
  properties: Property[];
}

export default function PropertyList({ properties }: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold">No Properties Found</h2>
        <p className="text-muted-foreground mt-2">Try adjusting your filters to find more properties.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
