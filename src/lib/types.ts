export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  images: string[];
  propertyType: 'Apartment' | 'House' | 'Villa' | 'Studio' | 'Cottage';
  landlordId: string;
  amenities: string[];
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'landlord' | 'admin';
  password?: string;
  favorites: string[];
}
