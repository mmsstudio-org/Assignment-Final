'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Property } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { createProperty } from '@/lib/actions/property.actions';

const PropertyFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(1, 'Price is required'),
  city: z.string().min(1, 'City is required'),
  propertyType: z.enum(['Apartment', 'House', 'Villa', 'Studio', 'Cottage']),
  amenities: z.string().min(1, 'Please list at least one amenity'),
  // images: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).optional(),
});


interface PropertyFormProps {
  property?: Property;
}

export default function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PropertyFormSchema>>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: {
      title: property?.title || '',
      description: property?.description || '',
      price: property?.price || 0,
      city: property?.city || '',
      propertyType: property?.propertyType || 'Apartment',
      amenities: property?.amenities.join(', ') || '',
      // images: undefined,
    }
  });

  const onSubmit = (values: z.infer<typeof PropertyFormSchema>) => {
    startTransition(async () => {
      try {
        // Here you would handle image uploads to a service like Cloudinary
        // and get back the URLs. For now, we'll use placeholders.
        const imageUrls = [
          'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg'
        ];

        const propertyData = {
          ...values,
          amenities: values.amenities.split(',').map(a => a.trim()),
          images: imageUrls,
        };
        
        // TODO: Implement updateProperty action
        await createProperty(propertyData);

        toast({
          title: `Property ${property ? 'updated' : 'added'}!`,
          description: `Your property listing is now live.`,
        });
        router.push('/dashboard');
      } catch (error) {
         toast({
          title: `Error`,
          description: `Something went wrong. Please try again.`,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{property ? 'Edit Property' : 'Add New Property'}</CardTitle>
        <CardDescription>Fill in the details below to list your property.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cozy Downtown Apartment" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide a detailed description of your property." {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (per month)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2500" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Metropolis" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Studio">Studio</SelectItem>
                        <SelectItem value="Cottage">Cottage</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenities (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., WiFi, Parking, Gym" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-3">
              <FormLabel>Image Upload</FormLabel>
              <Input id="images" type="file" multiple disabled={isPending} />
              <p className="text-xs text-muted-foreground">Image upload is not yet implemented. Placeholder images will be used.</p>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => router.back()} disabled={isPending}>Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : (property ? 'Save Changes' : 'Add Property')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
