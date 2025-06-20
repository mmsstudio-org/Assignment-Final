'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Property } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface PropertyFormProps {
  property?: Property;
}

export default function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you would handle form submission to your API here.
    console.log('Form submitted');
    router.push('/dashboard');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{property ? 'Edit Property' : 'Add New Property'}</CardTitle>
        <CardDescription>Fill in the details below to list your property.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="title">Property Title</Label>
            <Input id="title" type="text" className="w-full" defaultValue={property?.title || ''} placeholder="e.g., Cozy Downtown Apartment" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" defaultValue={property?.description || ''} placeholder="Provide a detailed description of your property." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <div className="grid gap-3">
                <Label htmlFor="price">Price (per month)</Label>
                <Input id="price" type="number" defaultValue={property?.price || ''} placeholder="2500" />
            </div>
             <div className="grid gap-3">
                <Label htmlFor="city">City</Label>
                <Input id="city" type="text" defaultValue={property?.city || ''} placeholder="Metropolis" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="property-type">Property Type</Label>
                <Select defaultValue={property?.propertyType || ''}>
                  <SelectTrigger id="property-type">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                     <SelectItem value="Cottage">Cottage</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Input id="amenities" type="text" defaultValue={property?.amenities.join(', ') || ''} placeholder="e.g., WiFi, Parking, Gym" />
          </div>
           <div className="grid gap-3">
            <Label htmlFor="images">Image Upload</Label>
             <Input id="images" type="file" multiple />
            <p className="text-xs text-muted-foreground">Upload images for your property. The first image will be the main one.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit">{property ? 'Save Changes' : 'Add Property'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
