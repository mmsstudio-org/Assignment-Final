'use client';

import { useState } from 'react';
import FilterControls from '@/components/properties/FilterControls';
import PropertyList from '@/components/properties/PropertyList';
import { properties as allProperties } from '@/lib/data';
import type { Property } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties);
  const [view, setView] = useState('grid');

  const handleFilterChange = (filters: { city: string; priceRange: [number, number]; propertyType: string }) => {
    let tempProperties = allProperties;

    if (filters.city && filters.city !== 'all') {
      tempProperties = tempProperties.filter(p => p.city === filters.city);
    }

    if (filters.propertyType && filters.propertyType !== 'all') {
      tempProperties = tempProperties.filter(p => p.propertyType === filters.propertyType);
    }
    
    tempProperties = tempProperties.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    setFilteredProperties(tempProperties);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 rounded-lg bg-primary/10 p-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary-foreground-dark dark:text-primary-foreground md:text-5xl">Find Your Next Home</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Discover the perfect rental property with RentalVista. Your dream home is just a few clicks away.
        </p>
      </section>

      <FilterControls onFilterChange={handleFilterChange} />
      
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Properties</h2>
        {/* View toggle could be added here */}
      </div>

      <PropertyList properties={filteredProperties} />
    </div>
  );
}
