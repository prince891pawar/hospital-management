import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const SALT_ROUNDS = 12
const roles = ['admin', 'doctor', 'receptionist', 'patient']

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, maxlength: 80 },
  lastName: { type: String, required: true, trim: true, maxlength: 80 },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 254,
  },
  phone: { type: String, required: true, trim: true, maxlength: 24 },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: roles, default: 'patient', required: true },
  profileImage: { type: String, trim: true, default: null },
  isActive: { type: Boolean, default: true, required: true },
}, {
  timestamps: true,
  toJSON: {
    transform(document, result) {
      delete result.password
      delete result.__v
      return result
    },
  },
})

userSchema.pre('save', async function hashPassword() {
  if (this.isModified('password')) this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
})

userSchema.methods.comparePassword = function comparePassword(plainPassword) {
  return bcrypt.compare(plainPassword, this.password)
}

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User