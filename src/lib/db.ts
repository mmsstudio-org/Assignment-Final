import mongoose from 'mongoose';

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

if (MONGODB_URI.includes('<password>')) {
    const errorMessage = `
  
  ##########################################################################################
  #                                                                                        #
  #   ❌ INCOMPLETE CONNECTION STRING: PASSWORD MISSING                                    #
  #                                                                                        #
  #   Your MONGODB_URI in .env.local still contains the "<password>" placeholder.          #
  #                                                                                        #
  #   👇 FIX: Edit your .env.local file and replace "<password>" with the actual           #
  #   password for your database user.                                                     #
  #                                                                                        #
  ##########################################################################################

  `;
  
  throw new Error(errorMessage);
}


if (!MONGODB_URI.startsWith('mongodb+srv://')) {
    const errorMessage = `
  
  ##########################################################################################
  #                                                                                        #
  #   ❌ INVALID DATABASE CONNECTION STRING                                                #
  #                                                                                        #
  #   The MONGODB_URI in your .env.local file has an invalid format.                         #
  #   It MUST start with "mongodb+srv://".                                                   #
  #                                                                                        #
  #   Please check your .env.local file and ensure the value you copied from MongoDB Atlas   #
  #   is correct and complete.                                                             #
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
