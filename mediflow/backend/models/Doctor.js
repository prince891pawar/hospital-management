import mongoose from 'mongoose'

const timeSlotSchema = new mongoose.Schema({
  start: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ },
  end: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ },
}, { _id: false })

const availabilitySchema = new mongoose.Schema({
  day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
  slots: { type: [timeSlotSchema], default: [] },
}, { _id: false })

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true, index: true },
  doctorId: { type: String, required: true, unique: true, index: true, trim: true, uppercase: true },
  firstName: { type: String, required: true, trim: true, maxlength: 80 },
  lastName: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254, index: true },
  phone: { type: String, required: true, trim: true, maxlength: 24 },
  specialty: { type: String, required: true, trim: true, maxlength: 100, index: true },
  qualification: { type: String, required: true, trim: true, maxlength: 160 },
  experience: { type: Number, required: true, min: 0, max: 80 },
  consultationFee: { type: Number, required: true, min: 0 },
  bio: { type: String, trim: true, maxlength: 2000, default: '' },
  profileImage: { type: String, trim: true, default: null },
  availability: { type: [availabilitySchema], default: [] },
  status: { type: String, enum: ['active', 'inactive', 'on_leave'], default: 'active', required: true, index: true },
}, { timestamps: true })

doctorSchema.pre('validate', function validateAvailability() {
  for (const day of this.availability) {
    const slots = day.slots
    for (const slot of slots) {
      if (slot.start >= slot.end) {
        this.invalidate('availability', `Availability end time must be after start time for ${day.day}`)
        return
      }
    }
    for (let index = 1; index < slots.length; index += 1) {
      if (slots[index - 1].end > slots[index].start) {
        this.invalidate('availability', `Availability slots cannot overlap for ${day.day}`)
        return
      }
    }
  }
})

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema)

export default Doctor