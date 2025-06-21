'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dbConnect from '../db';
import User from '@/models/user.model';
import { revalidatePath } from 'next/cache';

const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'landlord']),
});

export async function register(values: z.infer<typeof RegisterSchema>) {
  try {
    await dbConnect();

    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: 'Invalid fields!' };
    }

    const { email, password, name, role } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: 'Email already in use!' };
    }

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return { success: 'Account created! You can now log in.' };
  } catch (error) {
    console.error('Registration Error:', error);
    return { error: 'Something went wrong.' };
  }
}

export async function getUserFavorites(userId: string) {
  try {
    await dbConnect();
    const user = await User.findById(userId).select('favorites');
    if (!user) return [];
    return user.favorites.map((fav: any) => fav.toString());
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
}

// --- Password Reset ---

export async function requestPasswordReset(email: string) {
  try {
    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists for security reasons
      return { success: 'If an account with that email exists, a password reset link has been sent.' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetPasswordToken = passwordResetToken;
    user.resetPasswordExpires = passwordResetExpires;
    await user.save();
    
    // In a real app, you would send an email here
    const resetUrl = `${process.env.AUTH_URL}/reset-password/${resetToken}`;
    console.log('--- PASSWORD RESET LINK (for testing) ---');
    console.log(resetUrl);
    console.log('-----------------------------------------');

    return { success: 'If an account with that email exists, a password reset link has been sent.' };
  } catch (error) {
    console.error('Password Reset Request Error:', error);
    return { error: 'Something went wrong.' };
  }
}

export async function verifyPasswordResetToken(token: string) {
  try {
    await dbConnect();
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    return !!user;
  } catch (error) {
    console.error('Token Verification Error:', error);
    return false;
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    await dbConnect();
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return { error: 'Invalid or expired token.' };
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    revalidatePath('/login');
    return { success: 'Your password has been reset successfully.' };

  } catch (error) {
    console.error('Password Reset Error:', error);
    return { error: 'Something went wrong.' };
  }
}
