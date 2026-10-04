import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import User from '../models/User.js'

const requiredValues = ['SEED_ADMIN_FIRST_NAME', 'SEED_ADMIN_LAST_NAME', 'SEED_ADMIN_EMAIL', 'SEED_ADMIN_PHONE', 'SEED_ADMIN_PASSWORD']

try {
  const missing = requiredValues.filter((name) => !process.env[name])
  if (missing.length) throw new Error(`Set the required seed variables: ${missing.join(', ')}`)
  if (process.env.SEED_ADMIN_PASSWORD.length < 12 || Buffer.byteLength(process.env.SEED_ADMIN_PASSWORD, 'utf8') > 72) {
    throw new Error('SEED_ADMIN_PASSWORD must be at least 12 characters and no more than 72 bytes')
  }

  await connectDB()
  const email = process.env.SEED_ADMIN_EMAIL.trim().toLowerCase()
  const existing = await User.findOne({ email }).select('_id')

  if (existing) {
    console.log('An account with the configured seed email already exists; no changes made.')
  } else {
    await User.create({
      firstName: process.env.SEED_ADMIN_FIRST_NAME,
      lastName: process.env.SEED_ADMIN_LAST_NAME,
      email,
      phone: process.env.SEED_ADMIN_PHONE,
      password: process.env.SEED_ADMIN_PASSWORD,
      role: 'admin',
    })
    console.log('Development admin account created.')
  }
} catch (error) {
  console.error(error.message || 'Admin seed failed')
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}