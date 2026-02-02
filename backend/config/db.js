import mongoose from 'mongoose';
import dotenv from 'dotenv';

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
      if (!uri) throw new Error("MONGO_URI is missing in environment variables");

      // ✅ Reuse existing connection in serverless
      if (cached.conn) return cached.conn;
    
      if (!cached.promise) {
        cached.promise = mongoose.connect(uri).then((m) => m);
      }
    
      cached.conn = await cached.promise;
      return cached.conn;
    }
    catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        process.exit(1); //Exit the process with failure
    }
}
