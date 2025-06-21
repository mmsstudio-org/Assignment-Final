import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI === 'your_mongodb_connection_string') {
  let errorMessage = `
  
  ##########################################################################################
  #                                                                                        #
  #  👋 HELLO! DATABASE NOT CONNECTED.                                                     #
  #                                                                                        #
  #  Your app is crashing because it needs a database connection string.                   #
  #  This is a required manual step. I can't do it for you because it contains secrets.    #
  #                                                                                        #
  #  👇 HERE IS HOW TO FIX IT (in 3 simple steps):                                         #
  #                                                                                        #
  #  1. Create a new file in your project's root folder named: .env.local                  #
  #                                                                                        #
  #  2. Copy the contents of the .env.example file into your new .env.local file.          #
  #                                                                                        #
  #  3. In .env.local, fill in your MONGODB_URI and AUTH_SECRET.                           #
  #                                                                                        #
  #  Then, restart the server. That's it!                                                  #
  #                                                                                        #
  ##########################################################################################

  `;
  
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
