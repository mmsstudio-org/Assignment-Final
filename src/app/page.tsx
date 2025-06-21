import FilterControls from '@/components/properties/FilterControls';
import PropertyList from '@/components/properties/PropertyList';
import { getProperties } from '@/lib/actions/property.actions';

interface HomeProps {
  searchParams?: {
    city?: string;
    propertyType?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const filters = {
    city: searchParams?.city || 'all',
    propertyType: searchParams?.propertyType || 'all',
    priceRange: [
      Number(searchParams?.minPrice) || 0,
      Number(searchParams?.maxPrice) || 10000,
    ] as [number, number],
  };

  const properties = await getProperties(filters);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 rounded-lg bg-primary/10 p-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary-foreground-dark dark:text-primary-foreground md:text-5xl">Find Your Next Home</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Discover the perfect rental property with RentalVista. Your dream home is just a few clicks away.
        </p>
      </section>

      <FilterControls />
      
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Properties</h2>
      </div>

      <PropertyList properties={properties} />
    </div>
  );
}
