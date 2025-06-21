import NextAuth from 'next-auth';
// import { MongoDBAdapter } from '@auth/mongodb-adapter'; // Disabled DB
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs'; // Disabled DB

import { authConfig } from '@/auth.config';
// import { clientPromise } from '@/lib/db'; // Disabled DB
// import User from '@/models/user.model'; // Disabled DB
// import dbConnect from './db'; // Disabled DB
import type { User as UserType } from './types';


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // adapter: MongoDBAdapter(clientPromise), // Disabled DB
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev',
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        
        console.log("Mock authentication successful for:", credentials.email);

        // This is a mock user. It will successfully "log in" any user.
        // You can test the landlord dashboard by changing role to 'landlord'.
        const mockUser = {
            id: 'mock-user-123',
            name: 'Test User',
            email: credentials.email as string,
            role: 'landlord', // Change to 'user' or 'landlord' to test different roles
            image: ''
        };

        return mockUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as UserType).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'user' | 'landlord' | 'admin';
      }
      return session;
    },
  },
});