import PropertyList from '@/components/properties/PropertyList';
import { properties } from '@/lib/data';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  // Mock favorites - in a real app, this would be fetched for the logged-in user
  const favoriteProperties = properties.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Star className="h-7 w-7 text-yellow-400" />
          My Favorite Properties
        </h1>
      </div>

      {favoriteProperties.length > 0 ? (
        <PropertyList properties={favoriteProperties} />
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold">You have no favorite properties yet.</h2>
          <p className="text-muted-foreground mt-2 mb-4">Start browsing and click the heart icon to save properties you love.</p>
          <Button asChild>
            <Link href="/">Browse Properties</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
