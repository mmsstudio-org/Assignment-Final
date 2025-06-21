import PropertyList from '@/components/properties/PropertyList';
import { getFavoriteProperties } from '@/lib/actions/property.actions';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default async function FavoritesPage() {
  const session = await auth();
  if (!session?.user) {
    // This should not happen due to middleware, but as a fallback
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Please log in to see your favorites.</h1>
      </div>
    );
  }

  const favoriteProperties = await getFavoriteProperties(session.user.id as string);

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
