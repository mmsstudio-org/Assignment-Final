'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Heart, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Property } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toggleFavorite } from '@/lib/actions/property.actions';
import { useToast } from '@/hooks/use-toast';

interface PropertyCardProps {
  property: Property;
  isInitialFavorited?: boolean;
}

export default function PropertyCard({ property, isInitialFavorited = false }: PropertyCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(isInitialFavorited);
  const [isPending, startTransition] = useTransition();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session?.user) {
      router.push('/login?callbackUrl=/');
      return;
    }

    startTransition(async () => {
      const result = await toggleFavorite(property._id, session.user.id as string);
      if (result.error) {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      } else {
        setIsFavorited(result.isFavorited ?? false);
        toast({ title: result.isFavorited ? 'Added to favorites!' : 'Removed from favorites.' });
      }
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/60 dark:bg-card/40 backdrop-blur-sm border border-white/30 dark:border-white/10">
      <CardHeader className="p-0">
        <Link href={`/listing/${property._id}`} className="relative">
          <Image
            src={property.images[0]}
            alt={property.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <Badge className="absolute top-2 left-2" variant="secondary">{property.propertyType}</Badge>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 rounded-full bg-background/70 hover:bg-background"
            onClick={handleToggleFavorite}
            disabled={isPending}
          >
            <Heart className={cn('h-5 w-5', isFavorited ? 'fill-red-500 text-red-500' : 'text-foreground/70')} />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/listing/${property._id}`}>
          <CardTitle className="text-lg font-semibold truncate hover:text-primary transition-colors">{property.title}</CardTitle>
          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.city}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2 truncate">{property.description}</p>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">${property.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
        <Button asChild size="sm">
          <Link href={`/listing/${property._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
