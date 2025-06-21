'use server';

import { revalidatePath } from 'next/cache';
// import dbConnect from '../db';
// import Property from '@/models/property.model';
// import User from '@/models/user.model';
// import { auth } from '../auth';
import type { Property as PropertyType } from '../types';

function toPlainObject(doc: any) {
  return JSON.parse(JSON.stringify(doc));
}

// --- MOCKED FUNCTIONS ---

export async function createProperty(propertyData: any) {
  console.log('Mock Action: createProperty called with:', propertyData);
  // Revalidate paths to refresh UI, but don't hit DB
  revalidatePath('/dashboard');
  revalidatePath('/');
}

export async function getProperties(filters: { city: string, propertyType: string, priceRange: [number, number] }) {
  console.log('Mock Action: getProperties called with filters:', filters);
  // Return an empty array to show the "No properties" state on the homepage
  return [];
}


export async function getPropertyById(id: string) {
  console.log('Mock Action: getPropertyById called with id:', id);
  // Return null to trigger the notFound() page for listings
  return null;
}

export async function getLandlordProperties(landlordId: string) {
  console.log('Mock Action: getLandlordProperties called for landlord:', landlordId);
  // Return an empty array for the dashboard
  return [];
}

export async function getSimilarListings(currentProperty: PropertyType) {
  console.log('Mock Action: getSimilarListings called for property:', currentProperty._id);
  return [];
}

export async function toggleFavorite(propertyId: string, userId: string) {
  console.log(`Mock Action: toggleFavorite called for property ${propertyId} and user ${userId}`);
  revalidatePath('/favorites');
  revalidatePath(`/listing/${propertyId}`);
  // Pretend we successfully favorited it, but don't persist
  return { success: true, isFavorited: true };
}

export async function getFavoriteProperties(userId: string) {
  console.log('Mock Action: getFavoriteProperties called for user:', userId);
  return [];
}