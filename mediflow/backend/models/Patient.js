import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  street: { type: String, trim: true, maxlength: 160 },
  city: { type: String, trim: true, maxlength: 80 },
  state: { type: String, trim: true, maxlength: 80 },
  postalCode: { type: String, trim: true, maxlength: 20 },
  country: { type: String, trim: true, maxlength: 80 },
}, { _id: false })

const emergencyContactSchema = new mongoose.Schema({
  name: { type: String, trim: true, maxlength: 120 },
  relationship: { type: String, trim: true, maxlength: 80 },
  phone: { type: String, trim: true, maxlength: 24 },
}, { _id: false })

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true, index: true },
  patientId: { type: String, required: true, unique: true, index: true, trim: true, uppercase: true },
  firstName: { type: String, required: true, trim: true, maxlength: 80 },
  lastName: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, trim: true, lowercase: true, maxlength: 254, index: true },
  phone: { type: String, required: true, trim: true, maxlength: 24 },
  dateOfBirth: {
    type: Date,
    default: null,
    validate: { validator: (value) => !value || value <= new Date(), message: 'Date of birth cannot be in the future' },
  },
  gender: { type: String, enum: ['female', 'male', 'non_binary', 'prefer_not_to_say'], default: 'prefer_not_to_say' },
  bloodGroup: { type: String, enum: ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], default: '' },
  address: { type: addressSchema, default: () => ({}) },
  emergencyContact: { type: emergencyContactSchema, default: () => ({}) },
  medicalHistory: { type: [String], default: [] },
  allergies: { type: [String], default: [] },
  status: { type: String, enum: ['active', 'inactive', 'archived'], default: 'active', required: true },
  profileImage: { type: String, trim: true, default: null },
}, { timestamps: true })

const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema)

export default Patient