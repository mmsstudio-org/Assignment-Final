export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  images: string[];
  propertyType: 'Apartment' | 'House' | 'Villa' | 'Studio' | 'Cottage';
  landlordId: string;
  amenities: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'landlord' | 'admin';
}
