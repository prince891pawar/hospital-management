import { Router } from 'express'
import { createPatient, deletePatient, getPatientById, getPatients, updatePatient } from '../controllers/patientController.js'
import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const patientRoutes = Router()
patientRoutes.use(protect)
patientRoutes.route('/')
  .post(authorize('admin', 'receptionist'), createPatient)
  .get(authorize('admin', 'doctor', 'receptionist', 'patient'), getPatients)
patientRoutes.route('/:id')
  .get(authorize('admin', 'doctor', 'receptionist', 'patient'), getPatientById)
  .put(authorize('admin', 'doctor', 'receptionist', 'patient'), updatePatient)
  .delete(authorize('admin'), deletePatient)

export default patientRoutes