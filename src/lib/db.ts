import mongoose from 'mongoose';

// The entire content of this file is commented out to disable MongoDB connection.
// The user can re-enable this later by uncommenting the code and removing the mock exports below.

/*
const MONGODB_URI = process.env.MONGODB_URI?.trim();

if (!MONGODB_URI || MONGODB_URI === 'your_mongodb_connection_string') {
  const errorMessage = `
  
  ##########################################################################################
  #                                                                                        #
  #   👋 CRITICAL: DATABASE IS NOT CONFIGURED.                                             #
  #                                                                                        #
  #   This is the final, required manual setup step.                                       #
  #   Your app cannot run without a database connection string.                            #
  #                                                                                        #
  #   👇 FOLLOW THESE STEPS TO FIX THIS:                                                   #
  #                                                                                        #
  #   1. In the file explorer, create a new file in the root folder:                       #
  #      -> .env.local                                                                     #
  #                                                                                        #
  #   2. Copy the contents of .env.example into your new .env.local file.                  #
  #                                                                                        #
  #   3. In .env.local, fill in your MONGODB_URI and a secret for NEXTAUTH_SECRET.         #
  #                                                                                        #
  #   4. Restart the server for the changes to take effect. That's it!                     #
  #                                                                                        #
  ##########################################################################################

  `;
  
  throw new Error(errorMessage);
}

if (MONGODB_URI.includes('<password>') || MONGODB_URI.includes('<db_password>')) {
    const errorMessage = `
  
  ##########################################################################################
  #                                                                                        #
  #   ❌ INCOMPLETE CONNECTION STRING: PASSWORD MISSING                                    #
  #                                                                                        #
  #   Your MONGODB_URI in .env.local still contains a "<password>" or "<db_password>"        #
  #   placeholder.                                                                         #
  #                                                                                        #
  #   👇 FIX: Edit your .env.local file and replace the placeholder with the actual        #
  #   password for your database user.                                                     #
  #                                                                                        #
  ##########################################################################################

  `;
  
  throw new Error(errorMessage);
}


if (!MONGODB_URI.startsWith('mongodb+srv://') && !MONGODB_URI.startsWith('mongodb://')) {
    const displayUri = MONGODB_URI.length > 30 
      ? `${MONGODB_URI.substring(0, 15)}...${MONGODB_URI.substring(MONGODB_URI.length - 15)}` 
      : MONGODB_URI;

    const errorMessage = `
  
  ##########################################################################################
  #                                                                                        #
  #   ❌ INVALID DATABASE CONNECTION STRING                                                #
  #                                                                                        #
  #   The MONGODB_URI in your .env.local file has an invalid format.                         #
  #   It MUST start with "mongodb+srv://".                                                   #
  #                                                                                        #
  #   The application is currently reading this (redacted) value:                          #
  #   "${displayUri}"                                                                      #
  #                                                                                        #
  #   EXAMPLE OF A CORRECT STRING:                                                         #
  #   mongodb+srv://your_user:your_password@yourcluster.xxxxx.mongodb.net/your_db?retryWrites=true...
  #                                                                                        #
  #   Please go to MongoDB Atlas, get the full connection string again, and carefully        #
  #   paste it into your .env.local file.                                                    #
  #                                                                                        #
  ##########################################################################################

  `;
  
  throw new Error(errorMessage);
}


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

// For NextAuth adapter
const clientPromise = mongoose.connect(MONGODB_URI!).then(m => m.connection.getClient());
*/


// Mock implementation to avoid breaking imports
export default async function dbConnect() {
  console.log("Database connection is disabled.");
  return Promise.resolve();
}

// Mock clientPromise for NextAuth adapter placeholder
export const clientPromise = Promise.resolve({} as any);