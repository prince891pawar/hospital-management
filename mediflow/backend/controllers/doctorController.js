import Doctor from '../models/Doctor.js'
import User from '../models/User.js'
import { createRecordId, escapeRegex, parsePagination, sendPaginated, validObjectId } from '../utils/resourceHelpers.js'

const doctorFields = ['firstName', 'lastName', 'email', 'phone', 'specialty', 'qualification', 'experience', 'consultationFee', 'bio', 'profileImage', 'availability', 'status']
const doctorOwnFields = ['phone', 'specialty', 'qualification', 'experience', 'consultationFee', 'bio', 'profileImage', 'availability']
const statuses = ['active', 'inactive', 'on_leave']

function pickFields(source, fields) {
  return Object.fromEntries(fields.filter((field) => source[field] !== undefined).map((field) => [field, source[field]]))
}

function safeDoctor(record) {
  const result = record.toObject ? record.toObject() : record
  delete result.__v
  return result
}

function ownsDoctor(doctor, userId) {
  return doctor.user && doctor.user.toString() === userId.toString()
}

async function doctorQueryForUser(req, id) {
  const doctor = await Doctor.findById(id)
  if (doctor && req.user.role === 'doctor' && !ownsDoctor(doctor, req.user._id)) return null
  return doctor
}

export async function createDoctor(req, res) {
  const body = pickFields(req.body, doctorFields)
  if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.specialty || !body.qualification || body.experience === undefined || body.consultationFee === undefined) {
    return res.status(400).json({ success: false, message: 'Name, email, phone, specialty, qualification, experience, and consultation fee are required' })
  }

  let userId
  if (req.body.user !== undefined) {
    if (!validObjectId(req.body.user)) return res.status(400).json({ success: false, message: 'Invalid linked user ID' })
    const linkedUser = await User.findById(req.body.user).select('_id role')
    if (!linkedUser || linkedUser.role !== 'doctor') return res.status(400).json({ success: false, message: 'Linked user must be an existing doctor account' })
    userId = linkedUser._id
  }

  const doctor = await Doctor.create({ ...body, user: userId, doctorId: createRecordId('DR') })
  return res.status(201).json({ success: true, message: 'Doctor created successfully', data: { doctor: safeDoctor(doctor) } })
}

export async function getDoctors(req, res) {
  const pagination = parsePagination(req.query)
  if (pagination.error) return res.status(400).json({ success: false, message: pagination.error })
  const query = {}

  if (req.query.status) {
    if (!statuses.includes(req.query.status)) return res.status(400).json({ success: false, message: 'Invalid doctor status filter' })
    query.status = req.query.status
  }
  if (req.query.specialty) query.specialty = req.query.specialty
  if (req.query.availableOn) {
    if (!['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(req.query.availableOn)) {
      return res.status(400).json({ success: false, message: 'Invalid availability day' })
    }
    query.availability = { $elemMatch: { day: req.query.availableOn, 'slots.0': { $exists: true } } }
  }
  if (req.query.search) {
    if (req.query.search.length > 100) return res.status(400).json({ success: false, message: 'Search must be 100 characters or fewer' })
    const expression = new RegExp(escapeRegex(req.query.search.trim()), 'i')
    query.$or = [{ firstName: expression }, { lastName: expression }, { email: expression }, { specialty: expression }, { doctorId: expression }]
  }

  const sortOptions = { newest: { createdAt: -1 }, oldest: { createdAt: 1 }, name: { lastName: 1, firstName: 1 }, '-name': { lastName: -1, firstName: -1 }, specialty: { specialty: 1 } }
  const sort = sortOptions[req.query.sort || 'newest']
  if (!sort) return res.status(400).json({ success: false, message: 'Invalid sort option' })
  const [doctors, total] = await Promise.all([
    Doctor.find(query).sort(sort).skip(pagination.skip).limit(pagination.limit).lean(),
    Doctor.countDocuments(query),
  ])
  return sendPaginated(res, doctors.map(safeDoctor), pagination.page, pagination.limit, total, 'Doctors loaded successfully')
}

export async function getDoctorById(req, res) {
  if (!validObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid doctor ID' })
  const doctor = await doctorQueryForUser(req, req.params.id)
  if (!doctor) return res.status(req.user.role === 'doctor' ? 403 : 404).json({ success: false, message: req.user.role === 'doctor' ? 'You can only view your own professional profile' : 'Doctor not found' })
  return res.json({ success: true, message: 'Doctor loaded successfully', data: { doctor: safeDoctor(doctor) } })
}

export async function updateDoctor(req, res) {
  if (!validObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid doctor ID' })
  const doctor = await doctorQueryForUser(req, req.params.id)
  if (!doctor) return res.status(req.user.role === 'doctor' ? 403 : 404).json({ success: false, message: req.user.role === 'doctor' ? 'You can only update your own professional profile' : 'Doctor not found' })
  const updates = pickFields(req.body, req.user.role === 'doctor' ? doctorOwnFields : doctorFields)
  if (!Object.keys(updates).length) return res.status(400).json({ success: false, message: 'No permitted doctor fields were provided' })
  Object.assign(doctor, updates)
  await doctor.save()
  return res.json({ success: true, message: 'Doctor updated successfully', data: { doctor: safeDoctor(doctor) } })
}

export async function deleteDoctor(req, res) {
  if (!validObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid doctor ID' })
  const doctor = await Doctor.findByIdAndDelete(req.params.id)
  if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' })
  return res.json({ success: true, message: 'Doctor deleted successfully', data: { id: doctor._id.toString() } })
}

export async function updateDoctorAvailability(req, res) {
  if (!validObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid doctor ID' })
  if (!Array.isArray(req.body.availability)) return res.status(400).json({ success: false, message: 'Availability must be a weekly schedule array' })
  const doctor = await doctorQueryForUser(req, req.params.id)
  if (!doctor) return res.status(req.user.role === 'doctor' ? 403 : 404).json({ success: false, message: req.user.role === 'doctor' ? 'You can only update your own availability' : 'Doctor not found' })
  doctor.availability = req.body.availability
  await doctor.save()
  return res.json({ success: true, message: 'Availability updated successfully', data: { doctor: safeDoctor(doctor) } })
}