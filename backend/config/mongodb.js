import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL environment variable");
} 

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  try {
    if (!cached.promise) {
        cached.promise = await mongoose.connect(MONGODB_URL, {
        bufferCommands: false,
      });
    }
    cached.conn = await cached.promise;
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error;
  }
}

export default connectDB;