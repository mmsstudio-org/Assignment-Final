'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '../db';
import Property from '@/models/property.model';
import User from '@/models/user.model';
import { auth } from '../auth';
import type { Property as PropertyType } from '../types';

function toPlainObject(doc: any) {
  return JSON.parse(JSON.stringify(doc));
}

export async function createProperty(propertyData: any) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== 'landlord') {
    throw new Error('Not authorized');
  }

  await dbConnect();

  const newProperty = new Property({
    ...propertyData,
    landlordId: session.user.id,
  });

  await newProperty.save();

  revalidatePath('/dashboard');
  revalidatePath('/');
}

export async function getProperties(filters: { city: string, propertyType: string, priceRange: [number, number] }) {
  await dbConnect();
  
  const query: any = {};
  if (filters.city && filters.city !== 'all') {
    query.city = filters.city;
  }
  if (filters.propertyType && filters.propertyType !== 'all') {
    query.propertyType = filters.propertyType;
  }
  query.price = { $gte: filters.priceRange[0], $lte: filters.priceRange[1] };


  const properties = await Property.find(query).sort({ createdAt: -1 });
  return toPlainObject(properties);
}


export async function getPropertyById(id: string) {
  try {
    await dbConnect();
    const property = await Property.findById(id);
    if (!property) return null;
    return toPlainObject(property);
  } catch (error) {
    // Invalid ID format
    return null;
  }
}

export async function getLandlordProperties(landlordId: string) {
  await dbConnect();
  const properties = await Property.find({ landlordId }).sort({ createdAt: -1 });
  return toPlainObject(properties);
}

export async function getSimilarListings(currentProperty: PropertyType) {
  await dbConnect();
  const similar = await Property.find({
    $and: [
      { _id: { $ne: currentProperty._id } },
      { 
        $or: [
          { city: currentProperty.city },
          { propertyType: currentProperty.propertyType }
        ]
      }
    ]
  }).limit(4);
  return toPlainObject(similar);
}

export async function toggleFavorite(propertyId: string, userId: string) {
  try {
    await dbConnect();
    const user = await User.findById(userId);

    if (!user) {
      return { error: 'User not found.' };
    }

    const isFavorited = user.favorites.includes(propertyId);

    if (isFavorited) {
      // Remove from favorites
      user.favorites.pull(propertyId);
    } else {
      // Add to favorites
      user.favorites.push(propertyId);
    }

    await user.save();
    revalidatePath('/favorites');
    revalidatePath(`/listing/${propertyId}`);

    return { success: true, isFavorited: !isFavorited };
  } catch (error) {
    console.log(error);
    return { error: 'Something went wrong.' };
  }
}

export async function getFavoriteProperties(userId: string) {
  await dbConnect();
  const user = await User.findById(userId).populate('favorites');
  if (!user) return [];
  return toPlainObject(user.favorites);
}
