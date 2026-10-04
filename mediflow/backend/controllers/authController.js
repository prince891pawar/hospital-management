import mongoose from 'mongoose'
import Patient from '../models/Patient.js'
import User from '../models/User.js'
import generateToken, { assertJwtConfiguration } from '../utils/generateToken.js'
import { createRecordId } from '../utils/resourceHelpers.js'
import { toSafeUser } from '../utils/userDto.js'

function unavailable(res) {
  return res.status(503).json({ success: false, message: 'Authentication is temporarily unavailable' })
}

function tokenConfigurationReady(res) {
  try {
    assertJwtConfiguration()
    return true
  } catch {
    unavailable(res)
    return false
  }
}

export async function register(req, res) {
  if (mongoose.connection.readyState !== 1) return unavailable(res)
  if (!tokenConfigurationReady(res)) return undefined

  if (req.body.role && req.body.role !== 'patient') {
    return res.status(403).json({ success: false, message: 'Public registration is only available for patients' })
  }

  const existingUser = await User.findOne({ email: req.body.email }).select('_id')
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists' })
  }

  const session = await mongoose.startSession()
  let user
  try {
    await session.withTransaction(async () => {
      const [createdUser] = await User.create([{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: 'patient',
      }], { session })
      user = createdUser
      await Patient.create([{
        user: createdUser._id,
        patientId: createRecordId('PT'),
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        phone: createdUser.phone,
      }], { session })
    })
  } finally {
    await session.endSession()
  }
  const token = generateToken(user)
  const safeUser = toSafeUser(user)

  return res.status(201).json({
    success: true,
    message: 'Patient account created successfully',
    data: { token, user: safeUser },
  })
}

export async function login(req, res) {
  if (mongoose.connection.readyState !== 1) return unavailable(res)
  if (!tokenConfigurationReady(res)) return undefined

  const user = await User.findOne({ email: req.body.email }).select('+password')
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' })
  }
  if (!user.isActive) {
    return res.status(403).json({ success: false, message: 'This account is inactive' })
  }

  const token = generateToken(user)
  const safeUser = toSafeUser(user)
  return res.json({ success: true, message: 'Signed in successfully', data: { token, user: safeUser } })
}

export function getCurrentUser(req, res) {
  return res.json({ success: true, message: 'Current user loaded', data: { user: toSafeUser(req.user) } })
}