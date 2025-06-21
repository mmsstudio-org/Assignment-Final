'use server';

import { z } from 'zod';
// import bcrypt from 'bcryptjs';
// import crypto from 'crypto';
// import dbConnect from '../db';
// import User from '@/models/user.model';
import { revalidatePath } from 'next/cache';

const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'landlord']),
});

// --- MOCKED FUNCTIONS ---

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  console.log('Mock Action: register called with:', values);
  return { success: 'Account created! You can now log in.' };
}

export async function getUserFavorites(userId: string) {
  console.log('Mock Action: getUserFavorites called for user:', userId);
  return [];
}

// --- Password Reset ---

export async function requestPasswordReset(email: string) {
  console.log('Mock Action: requestPasswordReset called for email:', email);
   // In a real app, you would send an email here
   const resetUrl = `${process.env.AUTH_URL || 'http://localhost:3000'}/reset-password/mock-token`;
   console.log('--- (MOCK) PASSWORD RESET LINK (for testing) ---');
   console.log(resetUrl);
   console.log('-----------------------------------------');
  return { success: 'If an account with that email exists, a password reset link has been sent.' };
}

export async function verifyPasswordResetToken(token: string) {
  console.log('Mock Action: verifyPasswordResetToken called with token:', token);
  // Always return true so the reset form is visible
  return true;
}

export async function resetPassword(token: string, newPassword: string) {
  console.log(`Mock Action: resetPassword called for token ${token} with new password.`);
  revalidatePath('/login');
  return { success: 'Your password has been reset successfully.' };
}