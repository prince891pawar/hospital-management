import mongoose from 'mongoose'

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection

  const { MONGODB_URI } = process.env

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured')
  }

  return mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
}