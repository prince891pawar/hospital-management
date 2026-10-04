import Patient from '../models/Patient.js'
import User from '../models/User.js'
import { createRecordId, escapeRegex, parsePagination, sendPaginated, validObjectId } from '../utils/resourceHelpers.js'

const patientFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'bloodGroup', 'address', 'emergencyContact', 'medicalHistory', 'allergies', 'status', 'profileImage']
const receptionistFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'bloodGroup', 'address', 'emergencyContact', 'status', 'profileImage']
const doctorFields = ['bloodGroup', 'medicalHistory', 'allergies']
const patientOwnFields = ['phone', 'address', 'emergencyContact', 'profileImage']

function pickFields(source, fields) {
  return Object.fromEntries(fields.filter((field) => source[field] !== undefined).map((field) => [field, source[field]]))
}

function safePatient(record, role) {
  const result = record.toObject ? record.toObject() : record
  if (role === 'receptionist') {
    delete result.medicalHistory
    delete result.allergies
  }
  delete result.__v
  return result
}

function validStatus(status) {
  return ['active', 'inactive', 'archived'].includes(status)
}

export async function createPatient(req, res) {
  const body = pickFields(req.body, patientFields)
  if (!body.firstName || !body.lastName || !body.phone || !body.dateOfBirth || !body.gender) {
    return res.status(400).json({ success: false, message: 'First name, last name, phone, date of birth, and gender are required' })
  }

  let userId
  if (req.body.user !== undefined) {
    if (!validObjectId(req.body.user)) return res.status(400).json({ success: false, message: 'Invalid linked user ID' })
    const linkedUser = await User.findById(req.body.user).select('_id role')
    if (!linkedUser || linkedUser.role !== 'patient') return res.status(400).json({ success: false, message: 'Linked user must be an existing patient account' })
    userId = linkedUser._id
  }

  const patient = await Patient.create({ ...body, user: userId, patientId: createRecordId('PT') })
  return res.status(201).json({ success: true, message: 'Patient created successfully', data: { patient: safePatient(patient, req.user.role) } })
}

export async function getPatients(req, res) {
  const pagination = parsePagination(req.query)
  if (pagination.error) return res.status(400).json({ success: false, message: pagination.error })

  const query = {}
  if (req.user.role === 'patient') query.user = req.user._id
  if (req.query.status) {
    if (!validStatus(req.query.status)) return res.status(400).json({ success: false, message: 'Invalid patient status filter' })
    query.status = req.query.status
  }
  if (req.query.gender) query.gender = req.query.gender
  if (req.query.search) {
    if (req.query.search.length > 100) return res.status(400).json({ success: false, message: 'Search must be 100 characters or fewer' })
    const expression = new RegExp(escapeRegex(req.query.search.trim()), 'i')
    query.$or = [{ firstName: expression }, { lastName: expression }, { email: expression }, { phone: expression }, { patientId: expression }]
  }

  const sortOptions = { newest: { createdAt: -1 }, oldest: { createdAt: 1 }, name: { lastName: 1, firstName: 1 }, '-name': { lastName: -1, firstName: -1 }, patientId: { patientId: 1 } }
  const sort = sortOptions[req.query.sort || 'newest']
  if (!sort) return res.status(400).json({ success: false, message: 'Invalid sort option' })

  const [patients, total] = await Promise.all([
    Patient.find(query).sort(sort).skip(pagination.skip).limit(pagination.limit).lean(),
    Patient.countDocuments(query),
  ])
  return sendPaginated(res, patients.map((patient) => safePatient(patient, req.user.role)), pagination.page, pagination.limit, total, 'Patients loaded successfully')
}

export async function getPatientById(req, res) {
  if (!validObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid patient ID' })
  const query = { _id: req.params.id }
  if (req.user.role === 'patient') query.user = req.user._id
  const patient = await Patient.findOne(query)
  if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' })
  return res.json({ success: true, message: 'Patient loaded successfully', data: { patient: safePatient(patient, req.user.role) } })
}

export async function updatePatient(req, res) {
  if (!validObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid patient ID' })
  const role = req.user.role
  const fields = role === 'doctor' ? doctorFields : role === 'patient' ? patientOwnFields : role === 'receptionist' ? receptionistFields : patientFields
  const updates = pickFields(req.body, fields)
  if (!Object.keys(updates).length) return res.status(400).json({ success: false, message: 'No permitted patient fields were provided' })

  const query = { _id: req.params.id }
  if (role === 'patient') query.user = req.user._id
  const patient = await Patient.findOneAndUpdate(query, updates, { returnDocument: 'after', runValidators: true })
  if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' })
  return res.json({ success: true, message: 'Patient updated successfully', data: { patient: safePatient(patient, role) } })
}

export async function deletePatient(req, res) {
  if (!validObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid patient ID' })
  const patient = await Patient.findByIdAndDelete(req.params.id)
  if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' })
  return res.json({ success: true, message: 'Patient deleted successfully', data: { id: patient._id.toString() } })
}