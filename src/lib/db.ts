import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI === 'your_mongodb_connection_string') {
  let errorMessage = 'ERROR: MONGODB_URI environment variable is not configured.\n\n';
  errorMessage += 'To fix this, please follow these steps:\n';
  errorMessage += '1. In the root of your project, create a new file named `.env.local`.\n';
  errorMessage += '2. Open the `.env.example` file and copy its content into your new `.env.local` file.\n';
  errorMessage += '3. In `.env.local`, replace `"your_mongodb_connection_string"` with your actual MongoDB connection string.\n';
  errorMessage += '4. You will also need to provide an `AUTH_SECRET`.\n';
  errorMessage += '5. Restart your development server for the changes to take effect.';
  
  throw new Error(errorMessage);
}


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

// For NextAuth adapter
const clientPromise = mongoose.connect(MONGODB_URI!).then(m => m.connection.getClient());
export { clientPromise };