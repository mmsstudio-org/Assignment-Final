import { notFound } from 'next/navigation';
import { properties } from '@/lib/data';
import PropertyImageGallery from '@/components/properties/PropertyImageGallery';
import BookingCalendar from '@/components/properties/BookingCalendar';
import SimilarListings from '@/components/properties/SimilarListings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bath, BedDouble, Building, CheckCircle, MessageSquare, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = properties.find(p => p.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Property Title and Location */}
          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{property.city}</span>
            </div>
          </div>
          
          {/* Image Gallery */}
          <PropertyImageGallery images={property.images} title={property.title} />

          {/* Property Details */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                  <Badge variant="secondary" className="flex items-center gap-2"><Building className="h-4 w-4"/>{property.propertyType}</Badge>
                  <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-primary"/> 3 Beds</span>
                  <span className="flex items-center gap-2"><Bath className="h-4 w-4 text-primary"/> 2 Baths</span>
              </div>
              <p className="text-foreground/80">{property.description}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {property.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Price and Contact Card */}
          <Card className="sticky top-24">
             <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">
                ${property.price.toLocaleString()}<span className="text-lg font-normal text-muted-foreground">/month</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <Button className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" /> Message Landlord
               </Button>
               <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" /> Call Now
               </Button>
            </CardContent>
          </Card>
          
          {/* Booking Calendar */}
          <BookingCalendar />
        </div>
      </div>
      
      {/* Similar Listings */}
      <SimilarListings currentProperty={property} />
    </div>
  );
}
