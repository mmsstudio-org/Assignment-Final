'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter } from 'lucide-react';

const cities = ['Metropolis', 'Suburbia', 'Coastal City', 'Rivertown'];
const propertyTypes = ['Apartment', 'House', 'Villa', 'Studio', 'Cottage'];
const MAX_PRICE = 10000;

export default function FilterControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [city, setCity] = useState(searchParams.get('city') || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || MAX_PRICE
  ]);
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || 'all');

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };
  
  const handleApplyFilters = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (city === 'all') current.delete('city');
    else current.set('city', city);
    
    if (propertyType === 'all') current.delete('propertyType');
    else current.set('propertyType', propertyType);

    current.set('minPrice', String(priceRange[0]));
    if (priceRange[1] === MAX_PRICE) current.delete('maxPrice');
    else current.set('maxPrice', String(priceRange[1]));

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    setCity(searchParams.get('city') || 'all');
    setPropertyType(searchParams.get('propertyType') || 'all');
    setPriceRange([
      Number(searchParams.get('minPrice')) || 0,
      Number(searchParams.get('maxPrice')) || MAX_PRICE,
    ]);
  }, [searchParams]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <span>Filter Properties</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {/* City Filter */}
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger id="city">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Property Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger id="propertyType">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {propertyTypes.map(pt => <SelectItem key={pt} value={pt}>{pt}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 md:col-span-1 lg:col-span-2">
            <Label htmlFor="price">Price Range: ${priceRange[0]} - ${priceRange[1] === MAX_PRICE ? 'Any' : priceRange[1]}</Label>
            <Slider
              id="price"
              min={0}
              max={MAX_PRICE}
              step={100}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceChange}
              className="pt-2"
            />
          </div>
          <div className="lg:col-start-4 flex items-end">
             <Button onClick={handleApplyFilters} className="w-full">Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
